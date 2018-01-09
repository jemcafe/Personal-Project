import React from 'react';

function Item (props) {
   const { title, image, description } = props;

   return (
      <div className="item">
        <div className="item-container">

            <div className="image">
                <img src={ image } alt="cover"/>
            </div>
            <div className="info">
                {/* <p>{ title }</p>
                <p>{ description }</p> */}
            </div>

        </div>
      </div>
   )
}

export default Item;