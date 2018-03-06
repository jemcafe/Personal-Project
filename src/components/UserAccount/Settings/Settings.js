import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {
   render () {
      return (
         <div className="settings">
            <div className="settings-container">
                <h4>SETTINGS</h4>
                
                <div>PROFILE IMAGE</div>
                <div>HEADER IMAGE</div>
                <div>CHANGE PASSWORD</div>
            </div>
         </div>
      )
   }
}

export default Settings;