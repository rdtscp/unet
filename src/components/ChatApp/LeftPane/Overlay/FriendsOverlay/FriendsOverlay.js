import React, { Component } from 'react';

import Header from '../Header/Header.js';
import AddFriend from './AddFriend/AddFriend.js';
import FriendsList from './FriendsList/FriendsList.js';

export default class FriendsOverlay extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            friends: []
        }
    }

    render() {
        return (
            <div id="FriendsOverlay">
                <Header title="Friends List" close={this.props.close} />
                <AddFriend />
                <FriendsList />
            </div>
        );
    }
}




