import React, { Component } from 'react';

class Search extends Component {
    render () {
        return (
            <div>
                <span>
                    <select>
                        <option value="">Category 1</option>
                        <option value="">Category 2</option>
                        <option value="">Category 3</option>
                    </select>
                    <select>
                        <option value="">Category 1</option>
                        <option value="">Category 2</option>
                        <option value="">Category 3</option>
                    </select>
                    <input className="search"/>
                    <button className="search-btn">search</button>
                </span>
            </div>
        )
    }
}

export default Search;