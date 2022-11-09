import React, { Component } from 'react';
import { Grids, Panel, PanelHeader, PanelBody, PanelFooter, MediaBox, MediaBoxHeader, MediaBoxBody, MediaBoxTitle, MediaBoxDescription } from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Header from '../../Layout/Header';
import TabBar from '../../Layout/Tabbar';
import busIcon from '../../CityIntelligence/bus/images/bus.png';
import weatherIcon from '../../../Images/weather_sunIcon.svg';
import {HttpClient} from "../../../Api/httpClient";

class Dashboard extends Component {
    componentWillMount() {
        let currentTime = new Date();
        let hourTime = currentTime.getHours();
        let tipText = '';
        if (hourTime >= 5 && hourTime <= 11) {
            tipText = '早上好鸭(0^◇^0)一日之计在于晨，又是美好的一天~';
        } else if (hourTime >= 12 && hourTime <= 13) {
            tipText = '午餐时间，吃饱喝好，下午才有精气神！';
        } else if (hourTime >= 14 && hourTime <= 17) {
            tipText = '下午好~ 只有奋斗的人生才称得上幸福的人生！';
        } else if (hourTime >= 18 && hourTime <= 24) {
            tipText = '晚上好，又是忙碌的一天~';
        } else if (hourTime >= 0 && hourTime < 5) {
            tipText = '夜深了，别熬夜哦宝贝。早点睡，晚安~';
        } else {
            tipText = '欢迎回来（问候语系统暂时无法识别您的时区）';
        }
        this.setState({
            gridList: [{
                icon: <img src={busIcon} alt="icon" />,
                label: '公交查询',
                href: '#/bus'
            }],
            headerTip: tipText,
            weatherInfo: {
                city: '未知',
                temp: '?',
                tempn: '?',
                weather: '天气待获取',
                wd: '风向待获取',
                ws: '风速待获取'
            }
        });
    }
    componentDidMount() {
        let that = this;
        HttpClient.get('https://api.dscitech.com/api/weather').then((response) => {
            response.json().then((res) => {
                console.log(res);
                if (res.code === 200) {
                    that.setState({
                        weatherInfo: res.data.weatherinfo
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <div>
                <Header />
                <Panel>
                    <PanelHeader>
                        {this.state.headerTip}
                    </PanelHeader>
                    <PanelBody>
                        <MediaBox type="appmsg" href="#/">
                            <MediaBoxHeader><img src={weatherIcon} alt="icon" /></MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>{this.state.weatherInfo.city} {this.state.weatherInfo.weather} {this.state.weatherInfo.tempn}℃~{this.state.weatherInfo.temp}℃</MediaBoxTitle>
                                <MediaBoxDescription>
                                    {this.state.weatherInfo.wd + ' ' + this.state.weatherInfo.ws}
                                </MediaBoxDescription>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                    <PanelFooter href="#/">
                    </PanelFooter>
                </Panel>
                <Grids data={this.state.gridList} />
                <TabBar />
            </div>
        )
    }
}

export default Dashboard;
