import React, { Component } from 'react';

import BurgerBut from './BurgerBut/BurgerBut.js';
import ComposeBut from './ComposeBut/ComposeBut.js';
import FriendsBut from './FriendsBut/FriendsBut.js';
import SettingsBut from './SettingsBut/SettingsBut.js';

import './Header.css';

export default class Header extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <BurgerBut toggleBurger={this.props.toggleBurger} />
                <ComposeBut toggleCompose={this.props.toggleCompose} />
                <FriendsBut toggleFriends={this.props.toggleFriends} />
                <SettingsBut toggleSettings={this.props.toggleSettings} />
            </div>
        );
    }
}