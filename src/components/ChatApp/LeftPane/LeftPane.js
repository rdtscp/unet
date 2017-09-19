import React, { Component } from 'react';
import './LeftPane.css';

import Header from './Header/Header.js';
import ListBody from './ListBody/ListBody.js';

import Overlay from './Overlay/Overlay.js';

export default class LeftPane extends Component {
    
    constructor(props) {
        super(props);
        // What overlays are enabled.
        this.state = {
            burger: false,
            compose: false,
            friends: false,
            settings: false
        }
    }

    // Left pane overlays.
    toggleBurger() {
        this.setState({burger: !this.state.burger});
    }
    toggleCompose() {
        this.setState({compose: !this.state.compose});
    }
    toggleFriends() {
        this.setState({friends: !this.state.friends});
    }
    toggleSettings() {
        this.setState({settings: !this.state.settings});
    }

    render() {
        var overlay;
        if (this.state.burger) {
            overlay = <Overlay type={'burger'} close={this.toggleBurger.bind(this)} />;
        }
        else if (this.state.compose) {
            overlay = <Overlay type={'compose'} close={this.toggleCompose.bind(this)} />;
        }
        else if (this.state.friends) {
            overlay = <Overlay type={'friends'} close={this.toggleFriends.bind(this)} />;
        }
        else if (this.state.settings) {
            overlay = <Overlay type={'settings'} close={this.toggleSettings.bind(this)} />;
        } else {
            overlay = <Header toggleBurger={this.toggleBurger.bind(this)} toggleCompose={this.toggleCompose.bind(this)} toggleFriends={this.toggleFriends.bind(this)} toggleSettings={this.toggleSettings.bind(this)} />;
        }
        return (
            <div className="left-pane">
                {overlay}
                <ListBody io={this.props.io} openChat={this.props.openChat} chats={this.props.chats} user={this.props.user} />
            </div>
        );
    }
}