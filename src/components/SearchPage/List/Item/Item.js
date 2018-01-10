import React from 'react';

function Item (props) {
   const { title, image, description } = props;

   return (
      <div className="item">
        <div className="item-container">

            <div className="image-container">
                <img src={ image } alt="cover" />
            </div>
            <div className="info">
                <div>Title</div>
                <div>Rating</div>
                <div>Date</div>
                {/* <p>{ title }</p> */}
            </div>

        </div>
      </div>
   )
}

export default Item;