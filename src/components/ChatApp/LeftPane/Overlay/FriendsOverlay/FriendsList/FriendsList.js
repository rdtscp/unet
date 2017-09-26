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

    // Takes a Friend JSON element to remove, and does so,
    removeElem = (data) => {
        const friendsList   = this.state.friendships.splice(0,0);
        var index           = friendsList.indexOf(data);
        var newFriendsList  = friendsList.splice(index, 1);
        this.setState({
            friendships: newFriendsList
        });
    }

    render() {
        var friends = this.state.friendships;
        friends = friends.sort(function(a,b) {return (a.friend.username > b.friend.username) ? 1 : ((b.friend.username > a.friend.username) ? -1 : 0);} );
        // Create a list of FriendEntrys.
        const friendList = friends.map((entry) =>
            // Create friend entry, pass data and remove method down.
            <FriendEntry remove={this.removeElem} data={entry} key={entry.id} />
        );


        return (
            <div className="friendsListBody">
                {friendList}
            </div>
        );
    }
}