import React, { Component } from 'react';
import './index.css';
import logo from '../../logo.svg';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            debugClicked: 0
        }
    }
    render() {
        let appTitle = typeof(this.props.appTitle) !== 'undefined' ? this.props.appTitle : '悦城云服务';
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" onClick={()=>{window.location.hash='/'}} />
                    <h2 onClick={()=>{
                        if (this.state.debugClicked === 5) {
                            window.con.show();
                            this.setState({ debugClicked: 0 });
                        } else {
                            this.setState({ debugClicked: this.state.debugClicked + 1 });
                        }
                    }}>{appTitle}</h2>
                </div>
            </div>
        )
    }
}

export default Header;
