<?php
use RingCentral\Psr7\Response;

/*
To enable the initializer feature (https://help.aliyun.com/document_detail/89029.html)
please implement the initializer function as below：
function initializer($context) {
    echo 'initializing' . PHP_EOL;
}
*/

/**
 * 云函数入口函数
 * @param object $request 请求对象
 * @param object $context 环境上下文
 * @return mixed 集合响应数据
 */
function handler($request, $context) {
    $requestContext = array(
        'body' => $request->getBody()->getContents(),
        'queries' => $request->getQueryParams(),
        'method' => $request->getMethod(),
        'headers' => $request->getHeaders(),
        'path' => $request->getAttribute('path'),
        'requestURI' => $request->getAttribute('path'),
        'clientIP' => $request->getAttribute('clientIP')
    );
    return startResponseDispatcher($requestContext);
}

/**
 * 响应调度器入口函数
 * @param array $obj 响应上下文
 * @return mixed 云函数集合响应数据
 */
function startResponseDispatcher($obj) {
    switch ($obj['path']) {
        case '/v1/healthy/nuclear-acid':
            if (count($obj['queries']) == 0 || !isset($obj['queries']['token'])) return sendAliFcResponse([
                'code' => 401,
                'msg' => '需要认证'
            ]);
            $userAgent = !empty($obj['headers']['User-Agent']) ? $obj['headers']['User-Agent'][0] : '';
            if ($obj['queries']['token'] != md5(date('Y', time()).'|'.$userAgent)) return sendAliFcResponse([
                'code' => 403,
                'msg' => '访问令牌无效',
                'token' => md5(date('Y', time()).'|'.$userAgent)
            ]);
            if (empty($obj['body'])) return sendAliFcResponse([
                'code' => 400,
                'msg' => '请求数据为空'
            ]);
            $body = json_decode($obj['body'], true);
            if (!isset($body['realName']) || !isset($body['idNumber'])) return sendAliFcResponse([
                'code' => 400,
                'msg' => '请求数据非法'
            ]);
            $realName = $body['realName'];
            $idNumber = $body['idNumber'];
            $idCardRegex = "/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i";
            if (!preg_match($idCardRegex, $idNumber)) return sendAliFcResponse([
                'code' => 400,
                'msg' => '身份证号格式校验失败'
            ]);
            $res = executeHttpRequest('GET', sprintf('https://www.jiankangjiande.cn/17wxmh/jdEnterApply/getNasByNameAndIdCard?patientname=%s&sfzh=%s', urlencode($realName), $idNumber), null, [
                'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d36) NetType/WIFI Language/zh_CN',
                'Referer: https://servicewechat.com/wxd4531947e4ce2eba/46/page-frame.html'
            ]);
            return !isset($res['err']) ? sendAliFcResponse([
                'code' => 200, 'msg' => '成功', 'data' => json_decode($res['res'], true)['resultData']
            ]) : sendAliFcResponse([
                'code' => 502, 'msg' => '上游服务器请求超时', 'errmsg' => $res['err']
            ]);
            break;
        case '/v1/cloud/envInfo':
            return sendAliFcResponse($obj, array(
                'CurrentProxy' => $obj['clientIP'],
                'Ding-CloudNode' => 'hangzhou_original_rollback',
            ));
            break;
        default:
            return sendAliFcResponse(['code' => 400, 'msg' => '接口能力不存在或在当前访问级别下不可见']);
            break;
    }
}

/**
 * 执行HTTP请求并返回响应数据
 * @param string $method 请求方法
 * @param string $url 请求地址
 * @param mixed $data 请求体
 * @param array $headers 请求头
 * @param integer $timeout 请求超时（秒）
 * @return mixed 响应数据体
 */
function executeHttpRequest($method, $url, $data = null, $headers = null, $timeout = 15) {
    $preChk = in_array($method, ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']);
    if (!$preChk) return null;
    $ch_option = [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_URL => $url,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => $timeout
    ];
    if (!is_null($data) && in_array($method, ['POST', 'PUT', 'DELETE', 'PATCH'])) $ch_option[CURLOPT_POSTFIELDS] = is_array($data) ? json_encode($data) : $data;
    if (!is_null($headers) && is_array($headers)) $ch_option[CURLOPT_HTTPHEADER] = $headers;
    $ch = curl_init();
    curl_setopt_array($ch, $ch_option);
    $result = curl_exec($ch);
    return curl_errno($ch) == 0 ? [
        'res' => $result
    ] : [
        'err' => curl_error($ch)
    ];
}

/**
 * 生成阿里云函数响应体
 * @param mixed $data 响应数据体（支持自动处理数组为json字符串）
 * @param array $headers 响应头（可选）
 * @param integer $statusCode 状态码（可选，默认200）
 */
function sendAliFcResponse($data, array $headers = [], int $statusCode = 200) {
    if (is_array($data)) $data = json_encode($data, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
    return new Response($statusCode, $headers, $data);
}
