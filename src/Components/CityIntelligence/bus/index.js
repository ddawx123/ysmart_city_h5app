import React, { Component } from 'react';
import Header from '../../Layout/Header';
import busIcon from './images/bus.png';
import './index.css';

class BusQueryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };
    }
    componentDidUpdate(prevProps, prevState) {
    }
    handleChange = (element) => {
        this.setState({
            keyword: element.target.value
        })
    }
    searchByKeyword() {
        if (this.state.keyword === '') {
            alert('站点名必须存在');
        } else {
            console.log(this.state.keyword)
        }
    }
    render() {
        return (
            <div>
                <Header appTitle="公交查询" />
                <div className="page__hd">
                    <img className="weui-media-box__thumb" src={busIcon} alt={'BusIcon'} />
                    <div className="page__title">公交站点动态查询</div>
                    <div className="page__desc">数据来源：各市公共交通集团有限公司</div>
                </div>
                <div className="page__bd" style={{textAlign: 'center'}}>
                    <div className="weui-cells">
                        <div className="weui-cell weui-cell_input">
                            <div className="weui-cell__hd">
                                <div className="weui-label">站点名称</div>
                            </div>
                            <div className="weui-cell__bd">
                                <input className="weui-input" type="text" placeholder="请输入站点名称" value={this.state.keyword} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <button className="weui-btn weui-btn_primary weui-btn_mini" onClick={this.searchByKeyword.bind(this)}>立即查询</button>
                    <button className="weui-btn weui-btn_default weui-btn_mini">站台扫码一键查询</button>
                    <ul style={{fontSize: '10px', padding: '10px', textAlign: 'left'}}>
                        <li>温馨提示：</li>
                        <li>* 本服务由绍兴、杭州两地公共交通集团有限公司提供数据支撑，信息仅供参考</li>
                        <li>* 由于公交车车载GPS误差与网络问题以及服务器负载能力等，信息展示可能延迟</li>
                        <li>* 因杭州公交暂仅提供扫码查询功能，故此处搜索功能仅对绍兴地区有效</li>
                        <li>* 若无法查询，系上游智慧公交服务器繁忙，可稍后重试</li>
                        <li>* 由于公交车车载GPS误差与网络问题以及服务器负载能力等，信息展示可能延迟</li>
                    </ul>
                    <div style={{fontSize: '10px', textAlign: 'center'}}>“数据开放接口互联”能力 由 叮云科技 提供技术支持</div>
                </div>
            </div>
        );
    }
}

export default BusQueryForm;
