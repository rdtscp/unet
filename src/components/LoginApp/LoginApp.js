import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './LoginApp.css';

import LoginBox from './LoginBox/LoginBox.js';


export default class LoginApp extends Component {

    constructor(props) {
        super(props);
    }

    // Passes authentication call up Component stack.
    isAuthenticated() {
        this.props.auth();
    }

    render() {
        return (
            <div className="app">
                <LoginBox auth={this.isAuthenticated.bind(this)} />
            </div>
        );
    }
}