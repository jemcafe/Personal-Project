import React, { Component } from 'react';

class SearchList extends Component {
   render () {
      const { list, property } = this.props

      let itemList = list.map( e => {
         return <li key={ i }>{ e[property] }</li>
      });

      return (
         <div>
            <ul>
               { itemlist }
            </ul>
         </div>
      )
   }
}