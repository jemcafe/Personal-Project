import React from 'react';

function Item (props) {
   const { title, image, description } = props;

   return (
      <div className="results-item">
         <div className="image">
            <img src={ image } alt="cover"/>
         </div>
         <p>Title: { title }</p>
         <p>{ description }</p>
      </div>
   )
}

export default Item;