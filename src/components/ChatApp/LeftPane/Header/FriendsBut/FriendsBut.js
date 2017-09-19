import React, { Component } from 'react';
import './FriendsBut.css';

export default class FriendsBut extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="friendsBut" onClick={this.props.toggleFriends}>
                <i className="fa fa-users fa-2x" aria-hidden="true"></i>
            </div>
        );
    }
}