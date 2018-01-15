import React from 'react';
import Item from './Item/Item';

function List (props) {
   const { searchResults } = props;

   // List of category options
   let list = searchResults.map( (e, i) => {
      return (
        <li key={ e.id }>
            <Item title={ e.name } image={ e.image } />
        </li>
      )
	});

	return (
		<div className="results">
			<div className="results-container">
			{/* <div>The List Component</div> */}

				<div className="list">
					{ list.length === 0 ? 'No results' : <ul>{ list }</ul> }
				</div>
				<div className="prev-next-btn">
					<button className="previous-btn">Previous</button>
					<button className="next-btn">Next</button>
				</div>
				
			</div>
		</div>
	)
}

export default List;