import React, { Component } from 'react';
import List from './List/List';

class SearchPage extends Component {
   render () {
      return (
         <div className="search-page">
            <div className="search-page-container">
                <div>The Search Page</div>

                <div>Search Results:</div>
                <List />
            </div>
         </div>
      )
   }
}

export default SearchPage;