import React from 'react';

function Item (props) {
   const { title, image, description } = props;

   return (
      <div className="item">
         <div className="image-wrapper">
            <img src={ image } alt="Cover image"/>
         </div>
         <p>Title: { title }</p>
         <p>{ description }</p>
      </div>
   )
}

export default Item;