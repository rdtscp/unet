import React, { Component } from 'react';
import './App.css';
import network from './_common/networkHelper.js';

import LoginApp from './LoginApp/LoginApp.js';
import ChatApp from './ChatApp/ChatApp.js';



/* class to define landing page of Application.
 *
 * Checks if the auth token stored is valid,
 * and presents components appropriately.
 * 
 */
export default class App extends Component {

  constructor() {
    super();
    /*    This state should manage whether the ChatApp or LoginApp is displayed.
     *  The state should be changeable by the LoginApp, and the ChatApp (should requests return repeated errors).
     */
    this.state = {
      authenticated: true,
      loading: true
    };
  }

  isAuthenticated() {
    this.setState({
      authenticated: true
    });
  }
  
  componentDidMount () {
    
    var token = localStorage.getItem('token');

    // Get CSRF token.
    network.getCSRF((csrf) => {
      // Get Device Token's authenticity.
      network.tokenValid(token, csrf, (tokenValid) => {
        // Set state appropriately.
        this.setState({
          authenticated: tokenValid,
          loading: false
        });
        if (!tokenValid) {
          localStorage.removeItem('token');
        }
      });
    });

  }

  render() {
    if (this.state.loading) {
    return (<p> Loading Please Wait... </p>);
    } else {
      if (this.state.authenticated) {
        return (
          <ChatApp auth={this.isAuthenticated.bind(this)} />
        );
      } else {
        return (
          <LoginApp auth={this.isAuthenticated.bind(this)} />
        );
      }
    }
  }
}