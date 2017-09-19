import React, { Component } from 'react';
import './FriendsList.css';

import FriendEntry from './FriendEntry/FriendEntry.js';

import network from './networkHelper.js';
import axios from 'axios';

export default class FriendsList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            friendships: []
        }
    }

    // Retrieve list of Friendships, and set the state.
    componentDidMount () {
        var token = localStorage.getItem('token');
        // Get CSRF token.
        network.getCSRF((csrf) => {
            // Get Friends.
            axios({
                method:'POST',
                url:'http://api.localhost:1337/unet/friendship/get/all',
                data: {
                  _csrf: csrf,
                  token: token
                },
                withCredentials: true,
                contentType: 'json',
            })
            .then((response) => {
                if (response.data.friendships) {
                    this.setState({
                        friendships: response.data.friendships
                    });
                }
            })
        });
    }

    render() {
        // Create a list of FriendEntrys.
        const friendList = this.state.friendships.map((entry) =>
            // Create friend entry, pass data and add/remove from Chat method down.
            <FriendEntry createChat={this.props.createChat} addChatMember={this.props.addChatMember} rmChatMember={this.props.rmChatMember} data={entry} key={entry.id} />
        );

        return (
            <div className="friendsListBody">
                {friendList}
            </div>
        );
    }
}