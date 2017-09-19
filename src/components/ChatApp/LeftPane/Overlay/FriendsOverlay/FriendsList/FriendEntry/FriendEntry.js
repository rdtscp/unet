import React, { Component } from 'react';
import './FriendEntry.css';

import network from './networkHelper.js';
import axios from 'axios';

export default class FriendEntry extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            confirmed: this.props.data.confirmed
        }
    }

    // Accept a request; sends update request to API, and updates UI on valid response.
    acceptRequest = () => {
        var token           = localStorage.getItem('token');
        var friendshipID    = this.props.data.id;
        // Get CSRF token.
        network.getCSRF((csrf) => {
            // Update Friendship.
            axios({
                method:'POST',
                url:'http://api.localhost:1337/unet/friendship/update',
                data: {
                  _csrf: csrf,
                  token: token,
                  id: friendshipID
                },
                withCredentials: true,
                contentType: 'json',
            })
            .then((response) => {
                if (response.data.friendship) {
                    this.setState({
                        confirmed: true
                    });
                }
            })
        });
    }

    // Remove(Destroy) a Friendship; sends destroy request to API, and updates UI on valid response.
    removeFriend = () => {
        var token           = localStorage.getItem('token');
        var friendshipID    = this.props.data.id;
        // Get CSRF token.
        network.getCSRF((csrf) => {
            // Update Friendship.
            axios({
                method:'POST',
                url:'http://api.localhost:1337/unet/friendship/destroy',
                data: {
                  _csrf: csrf,
                  token: token,
                  id: friendshipID
                },
                withCredentials: true,
                contentType: 'json',
            })
            .then((response) => {
                if (response.data.friendship) {
                    // Send update to parent(FriendsList) telling it the element to remove from friends list.
                    this.props.remove(this.props.data);
                }
            })
        });
    }
    
    render() {
        // Generate the Accept/Delete/Remove buttons.
        var acceptDelete;
        if (this.state.confirmed) {
            acceptDelete =  <div className="friendButs">
                                <a className="button is-small is-danger" onClick={this.removeFriend}>Remove</a>
                            </div>;
        } else {
            acceptDelete =  <div className="friendButs">
                                <a className="button is-small is-success" onClick={this.acceptRequest}>Accept</a> &nbsp; <a className="button is-small is-danger" onClick={this.removeFriend}>Delete</a>
                            </div>;
        }
        return (
            <div className="friendEntry" key={this.props.data.id} id={this.props.data.id}>
                <div className="friendAvatar">
                    <img src="http://bulma.io/images/placeholders/64x64.png" alt="Image" />
                </div>
                <div>
                    <div>
                        &nbsp; {this.props.data.friend.username}
                    </div>
                    {acceptDelete}
                </div>
            </div>
        );
    }
}