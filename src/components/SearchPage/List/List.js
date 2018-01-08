import React from 'react';
import { connect } from 'react-redux';
import Item from './Item/Item';

function List (props) {
   const { searchResults } = props;

   // List of category options ( The list order isn't changing, so using i for the key is fine )
   let list = searchResults.map( (e, i) => {
      return (
        <li key={ e.id }>
            <Item title={ e.name } image={ e.image } description={ e.deck } />
        </li>
      )
   });

   return (
      <div className="list-wrapper">
         <h5>The List Component</h5>
         <ul>
            { list }
         </ul>
      </div>
   )
}

export default connect( state => state )( List );