import React, { Component } from 'react';
import Header from '../../Layout/Header';

class HealthCodeCenter extends Component {
    render() {
        return (
            <div>
                <Header appTitle="疫情防控专区" />
                <div style={{textAlign: 'center'}}>
                    <p>请在微信内长按扫码访问“全国防疫健康信息码”</p>
                </div>
            </div>
        );
    }
}

export default HealthCodeCenter;
