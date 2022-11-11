import React, { Component } from 'react';
import { Tab, TabBarItem } from 'react-weui';
import PropTypes from 'prop-types';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import './index.css';
import iconSrc from '../../logo.svg';

export default class Tabbar extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    _tabBarList = [
        {
            key: 'service-hall',
            label: '服务大厅',
            icon: 'serviceHall',
            active_icon: 'serviceHall',
            url: '/'
        }, {
            key: 'usercenter',
            label: '我',
            icon: 'userCenter',
            active_icon: 'userCenter',
            url: '/Login'
        }
    ];
    handleHashIndex(e) {
        switch (e) {
            case 0:
                window.location.hash = '/';
                break;
            case 1:
                window.location.hash = '/Login';
                break;
            default:
                window.location.hash = '/404';
                break;
        }
    }
    render() {
        return (
            <div className="tab_wrapper">
                <Tab type="tabbar" onChange={this.handleHashIndex}>
                    {
                        this._tabBarList && this._tabBarList.map(
                            (tabBar) => {
                                return <TabBarItem
                                    key={tabBar.key}
                                    label={tabBar.label}
                                    icon={<img src={iconSrc} alt="icon" />}
                                ></TabBarItem>
                            }
                        )
                    }
                </Tab>
            </div>
        )
    }
}
