import React, { Component } from 'react';
import Header from '../../Layout/Header';
import nuclearAcidIcon from './images/nuclearAcid.png';
import './nuclearAcidQuery.css';
import { HttpClient } from '../../../Api/httpClient'
import wx from 'weui.js';

export default class NuclearAcidQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idNumber: ''
        };
    }
    componentDidMount() {
        HttpClient.post();
        wx.alert('开发中');
    }
    render() {
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
                                <input className="weui-input" type="text" placeholder="请输入姓名" />
                            </div>
                        </div>
                        <div className="weui-cell weui-cell_input">
                            <div className="weui-cell__hd">
                                <div className="weui-label">身份证号</div>
                            </div>
                            <div className="weui-cell__bd">
                                <input className="weui-input" type="text" placeholder="请输入身份证号" />
                            </div>
                        </div>
                        <div className="weui-cell weui-cell_input">
                            <button className="weui-btn weui-btn_primary weui-btn_inline">立即查询</button>
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
                        <div style={{fontSize: '10px', textAlign: 'center'}}>“数据开放接口互联”能力 由 叮云科技
                            提供技术支持
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


