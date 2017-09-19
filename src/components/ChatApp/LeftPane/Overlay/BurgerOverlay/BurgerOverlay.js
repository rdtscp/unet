import React, { Component } from 'react';

import Header from '../Header/Header.js';

export default class BurgerOverlay extends Component {
    
    constructor(props) {
        super(props);
    }
    
    logout() {
        localStorage.removeItem('token');
        window.location.reload()
    }

    render() {
        return (
            <div id="BurgerMenu">
                <Header title="More Apps Coming Soon!" close={this.props.close} />
                <a onClick={this.logout}> logout </a>
            </div>
        );
    }
}
