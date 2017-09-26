import React, { Component } from 'react';
import './ListBody.css';

import ChatEntry from './ChatEntry/ChatEntry.js';

import axios from 'axios';
import network from './networkHelper.js';

export default class ListBody extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        var chats = this.props.chats;
        chats = chats.sort(function(a,b) {return (a.updatedAt < b.updatedAt) ? 1 : ((b.updatedAt > a.updatedAt) ? -1 : 0);} );
        // Create a list of FriendEntrys.
        const chatList = chats.map((chat) =>
            // Create friend entry, pass data and remove method down.
            <ChatEntry io={this.props.io} data={chat} key={chat.id} openChat={this.props.openChat} user={this.props.user} />
        );

        return (
            <div className="list-body">
                {chatList}
            </div>
        );
    }
}