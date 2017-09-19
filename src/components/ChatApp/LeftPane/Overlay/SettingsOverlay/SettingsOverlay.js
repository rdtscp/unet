import React, { Component } from 'react';

import Header from '../Header/Header.js';

export default class SettingsOverlay extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="FriendsOverlay">
                <Header title="Settings" close={this.props.close} />
            </div>
        );
    }
}