import React, { Component } from 'react';
import List from './List/List';

class SearchPage extends Component {
   render () {
      return (
         <div className="search-page">
            <h3>The Search Page</h3>

            <div className="search-results-wrapper">
               <h4>Search Results:</h4>
               <List />
            </div>
         </div>
      )
   }
}

export default SearchPage;