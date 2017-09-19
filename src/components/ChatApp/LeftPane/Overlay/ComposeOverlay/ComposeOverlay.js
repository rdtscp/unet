import React, { Component } from 'react';

import Header from '../Header/Header.js';
import FriendsList from './FriendsList/FriendsList.js';
import CreateChat from './CreateChat/CreateChat.js';

import network from './networkHelper.js';
import axios from 'axios';

export default class ComposeOverlay extends Component {
    
    constructor(props) {
        super(props);
        // Have no members in chat.
        this.state = {
            chatMembers: []
        }
    }

    // Add a member to the state.
    addChatMember = (member) => {
        this.state.chatMembers.push(member);
    }

    // Remove a member from the state.
    rmChatMember = (member) => {
        var chatMembers     = this.state.chatMembers.splice(0,0);
        var index           = chatMembers.indexOf(member);
        this.state.chatMembers.splice(index, 1);
    }

    // Checks that all values for chat are valid.
    checkChat = () => {
        // Check that chat has name if more than one member.
        var chat_name = document.getElementById('chatName').value;
        if (chat_name === "") {
            if (this.state.chatMembers.length === 0) {
                alert('Cannot create an empty chat.')
            }
            else if (this.state.chatMembers.length > 1) {
                alert('Please give the chat a name.');
            }
            else {
                this.createChat(this.state.chatMembers[0].username);
            }
        } else {
            if (this.state.chatMembers.length > 0) this.createChat(chat_name);
            else alert('Cannot create an empty chat.')
        }
    }

    // Post to backend to create the chat.
    createChat = (chat_name) => {
        var token = localStorage.getItem('token');
        network.getCSRF((csrf) => {
            axios({
                method:'POST',
                url:'http://api.localhost:1337/unet/chat/create',
                data: {
                  _csrf: csrf,
                  token: token,
                  members: this.state.chatMembers,
                  chatName: chat_name
                },
                withCredentials: true,
                contentType: 'json',
            })
            .then((response) => {
                if (response.data.warning) {
                    alert(response.data.msg)
                }
                else if (response.data.msg) {
                    alert(response.data.msg)
                    window.location.reload();
                }
            })
        });
    }

    render() {
        return (
            <div id="FriendsOverlay">
                <Header type="compose" title="New Chat" close={this.props.close} />
                <CreateChat createChat={this.checkChat} />
                <FriendsList createChat={this.createChat} addChatMember={this.addChatMember} rmChatMember={this.rmChatMember} />
            </div>
        );
    }
}