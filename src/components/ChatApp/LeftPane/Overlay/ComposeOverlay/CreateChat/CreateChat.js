import React, { Component } from 'react';
import './CreateChat.css';

export default class AddFriend extends Component {
    
    constructor(props) {
        super(props);
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.createChat();
        }
    }

    render() {
        return (
            <div className="createChatEntry">
                <div className="createChat">
                    <div className="field has-addons">
                        <div className="control">
                            <input id="chatName" onKeyPress={this._handleKeyPress} className="input" type="text" placeholder="Chat Name" />
                        </div>
                        <div className="control">
                            <a onClick={this.props.createChat} className="button is-info">
                                Create
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}