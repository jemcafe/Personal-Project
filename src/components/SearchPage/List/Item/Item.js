import React from 'react';
import { Link } from 'react-router-dom';

function Item (props) {
   const { title, image } = props;

   let shortTitle = title.length > 20 ? `${title.slice(0,20).trim()}...` : title;

   return (
      <div className="item">
        <div className="item-container">

            <div className="image-container">
                <Link to="/item"><img src={ image } alt="cover" /></Link>
            </div>

            <div className="info-container">
                <Link to="/item"><div className="title">{ shortTitle }</div></Link>
                <div className="info">
                    <div>Rating</div>
                    <div>Date</div>
                </div>
            </div>

        </div>
      </div>
   )
}

export default Item;