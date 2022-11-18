import React from "react";
import Header from "../../../Layout/Header";
import './ssoLoginForm.css';


export default function SSOLoginForm(props) {
    if (typeof(props.servletUrl) !== 'undefined' && typeof(props.loginTitle) !== 'undefined') {
        return (
            <div className="App-casiframe">
                <Header appTitle={typeof (props.loginTitle) !== 'undefined' ? props.loginTitle : '统一登录中心'} />
                <iframe frameBorder={"no"}
                        src={typeof (props.servletUrl) !== 'undefined' ? props.servletUrl : 'about:blank'}
                        style={{position: 'absolute', width: '100%', height: '100%'}}></iframe>
            </div>
        )
    } else {
        return (
            <div className="App-casiframe">
                <Header appTitle="统一登录中心 - 异常"/>
                <div className="App-intro">未正确配置统一登录中心接入信息，请检查前端项目是否正确部署。</div>
            </div>
        )
    }
}
