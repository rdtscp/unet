import React, { Component } from 'react';

import './ChatEntry.css';

import axios from 'axios';
import network from './networkHelper.js';

export default class FriendEntry extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            chat: null
        }
    }

    openChat = () => {
        this.props.openChat(this.props.data)
    }

    componentWillReceiveProps() {
        var token = localStorage.getItem('token')
        network.getCSRF((csrf) => {
            axios({
                method:'POST',
                url:'http://api.localhost:1337/unet/chat/get',
                data: {
                  _csrf: csrf,
                  token: token,
                  id: this.props.data.id
                },
                withCredentials: true,
                contentType: 'json',
            })
            .then((response) => {
                if (response.data.chat) {
                    this.setState({
                        chat: response.data.chat
                    });
                }
                
            })
        });
    }



    // Get the chat and connect to the chat socket.
    componentDidMount() {
        var token = localStorage.getItem('token')
        network.getCSRF((csrf) => {
            axios({
                method:'POST',
                url:'http://api.localhost:1337/unet/chat/get',
                data: {
                  _csrf: csrf,
                  token: token,
                  id: this.props.data.id
                },
                withCredentials: true,
                contentType: 'json',
            })
            .then((response) => {
                if (response.data.chat) {
                    this.setState({
                        chat: response.data.chat
                    });
                }
                
            })
        });
    }

    render() {
        
        var chatName    = 'Loading...';
        var colour      = 'left';
        var message     = '';
        var lastActive  = ''; 


        if (this.state.chat) {

            // Shorten chat name to fit in panel.
            chatName = this.state.chat.name;
            if (chatName.length > 19) {
                chatName = chatName.substring(0, 16);
                chatName += '...';
            }

            // Determine colour/side of last_msg.
            var colour = 'left';
            if (this.state.chat.last_sender) {
                // alert(this.state.chat.last_sender.id + ' == ' +  this.props.user)
                if (this.state.chat.last_sender.id == this.props.user) {
                    colour = 'right';
                }
            }


            // Shorten last_msg if necessary
            var message = this.state.chat.last_msg;

            var extra_styles = " ";
            if (message.indexOf('./secret') == 0) {
                message = message.replace('./secret', '');
                extra_styles += colour + "-secret";
            }

            message = message.split("<br>").join(" ");
            message = message.split('&nbsp;').join(' ');
            message = message.split('&lt;').join('<');
            message = message.split('&gt;').join('>');
            if (message.length > 25) {
                message = message.substring(0, 22);
                message += '...';
            }

            if (this.state.chat.users.length > 2) {
                if (this.state.chat.last_sender) {
                    message = this.state.chat.last_sender.username + ': ' + message;
                }
            }

            lastActive = this.state.chat.last_active
        }

        return (
            <div className="chatEntry" key={this.props.data.id} id={this.props.data.id} onMouseDown={this.openChat}>
                <div className="chatAvatar">
                    <img src="http://bulma.io/images/placeholders/64x64.png" alt="Image" />
                </div>
                <div className="chatTimestamp">
                        {lastActive}
                    </div>
                <div className="friendContent">
                    <div className="contentTop">
                        {chatName}
                    </div>
                    
                    <div className={"contentBot " + colour + extra_styles}>
                        {message}
                    </div>
                </div>
            </div>
        );
    }
}