import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from './List/List';

class SearchPage extends Component {
   render () {
      const { searchResults } = this.props;

      return (
         <div className="search-page">
            <div className="search-page-container">
                {/* <div>The Search Page</div> */}

                <div>Search Results:</div>
                <List searchResults={ searchResults } />
            </div>
         </div>
      )
   }
}

export default connect( state => state )( SearchPage );