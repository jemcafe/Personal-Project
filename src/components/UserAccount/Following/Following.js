import React, { Component } from 'react';
import './Following.css';

class Following extends Component {
   render () {
      return (
         <div className="following">
            <div className="following-container">
                {/* <div>FOLLOWING</div> */}

                <h3>Following</h3>
                <h5>You aren't following anyone</h5>

            </div>
         </div>
      )
   }
}

export default Following;