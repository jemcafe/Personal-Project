import React from 'react';
import { Link } from 'react-router-dom';

function Item (props) {
    // Didn't need the quantity property. The default quantity will be 1 per add.
    let { id, name, price, productcategoryid, imageurl } = props.result;
    const { addItem } = props;
    
    let shortenName = name.length > 20 ? `${name.slice(0,20).trim()}...` : name;

    return (
        <div className="item">
            <div className="item-container">

                <div className="image-container">
                    <Link to="/item"><img src={ imageurl } alt="cover" /></Link>
                </div>

                <div className="info-container">
                    <Link to="/item"><div className="title">{ shortenName }</div></Link>
                    <div className="info">
                        <div>Rating</div>
                        <div>Date</div>
                        <div>${ price }</div>
                    </div>
                    <button className="add-btn" onClick={ () => addItem( id, name, price, productcategoryid, 1, imageurl ) }>Add To Cart</button>
                </div>

            </div>
        </div>
    )
}

export default Item;