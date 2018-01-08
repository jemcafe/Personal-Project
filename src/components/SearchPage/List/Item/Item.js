import React from 'react';

function List (props) {
   const { searchResults } = props;

   // List of category options ( The list order isn't changing, so using i for the key is fine )
   let list = searchResults.map( (e, i) => {
      return <li key={ i }>{ e }</li>;
   });

   return (
      <div className="item-wrapper">
         
      </div>
   )
}

export default connect( state => state )( List );