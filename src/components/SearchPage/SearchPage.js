import React, { Component } from 'react';
import { connect } from 'react-redux';

import Item from './Item/Item';

class SearchPage extends Component {
    render () {
        const { searchResults } = this.props;

        // List of category options
        let list = searchResults.map( (e, i) => {
            return (
            <li key={ e.id }>
                <Item title={ e.name } image={ e.image } />
            </li>
            )
        });

        return (
            <div className="search-page">
                <div className="search-page-container">
                    {/* <div>The Search Page</div> */}
                    <div>Search Results:</div>

                    <div className="results">
                        <div className="results-container">

                            <div className="list">
                                { list.length === 0 ? 'No results' : <ul>{ list }</ul> }
                            </div>
                            <div className="prev-next-btn">
                                <button className="previous-btn">Previous</button>
                                <button className="next-btn">Next</button>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default connect( state => state )( SearchPage );