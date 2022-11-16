import React, { Component } from 'react';
import Header from '../../Layout/Header';
import nuclearAcidIcon from './images/nuclearAcid.png';
import './nuclearAcidQuery.css';
import { HttpClient } from '../../../Api/httpClient'
import wx from 'weui.js';
import md5 from 'js-md5';

export default class NuclearAcidQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realName: '',
            idNumber: '',
            rnaReport: []
        };
    }
    componentWillMount() {
        console.log('等待组件挂载');
    }
    componentDidMount() {
        console.log('组件挂载完成');
    }
    getNuclearAcid() {
        if (this.state.realName === '' || this.state.idNumber === '') {
            wx.alert('姓名和身份证号不能为空！');
            return;
        }
        let loading = wx.loading('查询中');
        let that = this;
        let send_at = (new Date().getFullYear());
        HttpClient.post('http://106.12.131.105:8080/v1/healthy/nuclear-acid?token='+md5(send_at+'|'+navigator.userAgent), {
            realName: that.state.realName,
            idNumber: that.state.idNumber
        }).then((response) => {
            loading.hide();
            response.json().then((res) => {
                console.log(res);
                if (typeof(res.errorType) !== 'undefined') {
                    wx.alert('阿里运行环境报错<br>错误类型：' + res.errorType + '<br>错误信息：' + res.errorMessage + '<br>错误发生文件位置：' + res.stackTrace.file + '<br>错误代码所在行定位：' + res.stackTrace.line);
                } else {
                    switch (res.code) {
                        case 200:
                            if (res.data.length === 0) {
                                wx.alert('您所查询的人员在浙江省内暂无核酸检测记录︿(￣︶￣)︿');
                            } else {
                                that.setState({
                                    rnaReport: res.data
                                });
                            }
                            break;
                        case 400:
                            wx.alert(res.msg);
                            break;
                        case 401:
                            wx.alert('未授权的访问');
                            break;
                        case 403:
                            wx.alert('访问密钥过期，请刷新页面');
                            break;
                        case 502:
                            wx.alert('上游服务接口异常，请稍后重试');
                            break;
                        default:
                            console.log(res);
                            wx.alert('出现未知错误，状态码：' + res.code);
                            break;
                    }
                }
            }).catch((err) => {
                console.log(err);
                wx.alert('数据解析异常，请稍后重试');
            })
        }).catch((error) => {
            loading.hide();
            console.log(error);
            wx.alert('网络连接异常');
        });
    }
    render() {
        if (this.state.rnaReport.length === 0) {
            return (
                <div>
                    <Header appTitle="核酸检测结果查询"/>
                    <div className="page__hd" data-r-healthy>
                        <img className="weui-media-box__thumb" src={nuclearAcidIcon} alt={'NuclearAcidIcon'}/>
                        <div className="page__title" data-r-healthy>核酸检测结果查询</div>
                        <div className="page__desc" data-r-healthy>数据来源：浙江省大数据发展管理局</div>
                    </div>
                    <div className="page__bd" style={{textAlign: 'center'}}>
                        <div className="weui-cells">
                            <div className="weui-cell weui-cell_input">
                                <div className="weui-cell__hd">
                                    <div className="weui-label">姓名</div>
                                </div>
                                <div className="weui-cell__bd">
                                    <input className="weui-input" type="text" placeholder="请输入姓名"
                                           onChange={(event) => {
                                               this.setState({
                                                   realName: event.target.value
                                               })
                                           }} value={this.state.realName}/>
                                </div>
                            </div>
                            <div className="weui-cell weui-cell_input">
                                <div className="weui-cell__hd">
                                    <div className="weui-label">身份证号</div>
                                </div>
                                <div className="weui-cell__bd">
                                    <input className="weui-input" type="text" placeholder="请输入身份证号"
                                           onChange={(event) => {
                                               this.setState({
                                                   idNumber: event.target.value
                                               })
                                           }} value={this.state.idNumber}/>
                                </div>
                            </div>
                            <div className="weui-cell weui-cell_input">
                                <button className="weui-btn weui-btn_primary weui-btn_inline"
                                        onClick={this.getNuclearAcid.bind(this)}>立即查询
                                </button>
                                <button className="weui-btn weui-btn_default weui-btn_inline">老幼助查</button>
                            </div>
                            <div className="weui-cell weui-cell_input">
                                <ul style={{fontSize: '10px', padding: '10px', textAlign: 'left'}}>
                                    <li>温馨提示：</li>
                                    <li>本系统暂仅支持通过中国大陆公民身份证号进行查询，使用护照或其他证件的用户请通过当地健康码系统查询。</li>
                                    <li>老幼助查仅支持18周岁以下、60周岁以上的大陆公民。</li>
                                    <li>区域性全员核酸筛查、以及少数不纳入统一数据上传计划的核酸检测记录在此处可能无法查询。</li>
                                    <li>本系统暂时仅支持浙江省内数据查询，全国数据暂未开放H5端，请通过公众号查询。</li>
                                    <li>因上游服务器影响，查询结果可能存在延迟。</li>
                                </ul>
                            </div>
                            <div style={{fontSize: '10px', textAlign: 'center'}}>
                                “数据开放接口互联”能力 由 叮云科技 提供技术支持
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Header appTitle="核酸检测结果" />
                    <div className="page__hd" data-r-healthy>
                        <img className="weui-media-box__thumb" src={nuclearAcidIcon} alt={'NuclearAcidIcon'}/>
                        <div className="page__title" data-r-healthy>{this.state.realName} 的近期核酸检测</div>
                        <div className="page__desc" data-r-healthy>数据来源：浙江省大数据发展管理局</div>
                    </div>
                    <div className="page__bd" style={{textAlign: 'center'}}>
                        <div className="weui-panel weui-panel_access">
                            <div className="weui-panel__hd" onClick={() => {
                                this.setState({ rnaReport: [] })
                            }}>
                                返回搜索页面
                            </div>
                            <div className="weui-panel__bd" style={{textAlign: 'left'}}>
                                {this.state.rnaReport.map((v, i) => {
                                    return (
                                        <div className="weui-media-box weui-media-box_text" key={i}>
                                            <div className="weui-media-box__title weui-media-box__title_in-text">检测结果 - {v.result}</div>
                                            <div className="weui-media-box__bd">采样时间：{new Date(v.receivetime).toLocaleString()} </div>
                                            <div className="weui-media-box__bd">报告时间：{new Date(v.checktime).toLocaleString()}</div>
                                            <div className="weui-media-box__desc">采样机构：{v.jgmc}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}


