import React, { Component } from 'react';
import List from './List/List';

class SearchPage extends Component {
   render () {
      return (
         <div>
            <h3>The Search Page</h3>

            <div className="search-results-wrapper">
               <h5>Search Results</h5>
               <List />
            </div>
         </div>
      )
   }
}

export default SearchPage;