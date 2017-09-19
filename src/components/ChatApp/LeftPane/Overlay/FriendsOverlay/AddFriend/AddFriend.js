import React, { Component } from 'react';
import './AddFriend.css';

import axios from 'axios'
import network from './networkHelper';

export default class AddFriend extends Component {
    
    constructor(props) {
        super(props);
    }

    // Processes the request of sending a friend request.
    processRequest = (uname) => {
        var token = localStorage.getItem('token');
        network.getCSRF((csrf) => {
            axios({
                method:'POST',
                url:'http://api.localhost:1337/unet/friendship/create',
                data: {
                  username: uname,
                  _csrf: csrf,
                  token: token
                },
                withCredentials: true,
                contentType: 'json',
            })
            .then((response) => {
                alert(response.data.msg);
            });
        });
    }

    sendRequest = () => {
        var requestedUser = document.getElementById('addUserInput').value;
        if (requestedUser !== '') {
            document.getElementById('addUserInput').value = '';
            this.processRequest(requestedUser);
        }
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          this.sendRequest()
        }
    }

    render() {
        return (
            <div className="addFriendEntry">
                <div className="addFriend">
                    <div className="field has-addons">
                        <div className="control">
                            <input id="addUserInput" onKeyPress={this._handleKeyPress} className="input" type="text" placeholder="Username" />
                        </div>
                        <div className="control">
                            <a onClick={this.sendRequest} className="button is-info">
                                Add
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}