import React, { Component } from 'react';
import Header from '../../Layout/Header';
import busIcon from './images/bus.png';
import './index.css';
import { HttpClient } from '../../../Api/httpClient'
import VehicleScreen from "./vehicleScreen";

export default class BusDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regionId: '',
            stationId: '',
            vehicleList: [],
            isLoad: false,
            myTimer: null
        };
    }
    componentWillMount() {
        if (this.props.location.search.split('stationId=').length <= 1 || this.props.location.search.split('regionId=').length <= 1) {
            console.log('无有效参数');
        } else {
            this.setState({
                stationId: this.props.location.search.split('stationId=')[1],
                regionId: this.props.location.search.split('regionId=')[1]
            })
        }
    }
    componentDidMount() {
        if (this.state.regionId !== '' && this.state.stationId !== '') {
            HttpClient.post('https://api.dscitech.com/api/bus/station/detail', {
                keyword: this.state.stationId,
                regionId: this.state.regionId
            }).then((response) => {
                response.json().then((res) => {
                    console.log(res);
                    this.setState({
                        vehicleList: res
                    });
                }).catch((err) => {
                    console.log(err);
                    alert('数据解析异常，请稍后重试');
                })
            }).catch((error) => {
                console.log(error);
                alert('网络连接异常');
            });
            this.setAutoRefresh();
        }
    }
    setAutoRefresh() {
        if (!this.state.isLoad) {
            this.setState({ isLoad: true });
            let that = this;
            let timer = window.setInterval(() => {
                HttpClient.post('https://api.dscitech.com/api/bus/station/detail', {
                    keyword: that.state.stationId,
                    regionId: '330600'
                }).then((response) => {
                    response.json().then((res) => {
                        console.log(res);
                        that.setState({
                            vehicleList: res
                        });
                    }).catch((err) => {
                        window.clearInterval(that.state.myTimer); //服务异常时自动停止刷新定时器
                        console.log(err);
                        alert('数据解析异常，请稍后重试');
                    })
                }).catch((error) => {
                    window.clearInterval(that.state.myTimer); //网络异常时自动停止刷新定时器
                    console.log(error);
                    alert('网络连接异常');
                })
            }, 5000);
            this.setState({ myTimer: timer })
        }
    }
    componentDidUpdate(prevProps, prevState) {}
    render() {
        return (
            <div>
                <Header appTitle="公交查询"/>
                <div className="page__hd">
                    <img className="weui-media-box__thumb" src={busIcon} alt={'BusIcon'}/>
                </div>
                <div className="page__bd" style={{textAlign: 'center'}}>
                    <VehicleScreen vehicleList={this.state.vehicleList} />
                </div>
            </div>
        );
    }
}


