import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Search extends Component {
   constructor () {
      super();
      this.state = {
         categoryONE: 'All',
			categoryTWO: '',
			categoryONElist: ['All', 'Games', 'Books', 'Posters'],
			categoryTWOlist: [],
			gameGenres: [],
			bookSubjects: [],
			posterCategories: [],
			userInput: ''
      }
   }

   componentDidMount () {
      // Gets the game genres list
      axios.get('http://localhost:3005/api/games/genres').then( res => {
			console.log( res.data );
			this.setState({ gameGenres: res.data });
		}).catch( console.log() );
		
		// Gets the book subjects list
		axios.get('http://localhost:3005/api/books/subjects').then( res => {
			console.log( res.data );
			this.setState({ bookSubjects: res.data });
      }).catch( console.log() );
		
		// Gets Poster Categories
		axios.get('http://localhost:3005/api/posters/categories').then( res => {
			console.log( res.data );
			this.setState({ posterCategories: res.data });
      }).catch( console.log() );
	}
	
	handleInputChange ( val ) {
		this.setState({ userInput: val });
	}

   handleCategoryChange ( property, val ) {
      // console.log( val );
      this.setState({ [property]: val });
		
		const { gameGenres, bookSubjects, posterCategories } = this.state;

		if ( property === 'categoryONE' ) {
			if ( val === 'Games' ) {
				this.setState({ categoryTWOlist: gameGenres });
			} else if ( val === 'Books' ) {
				this.setState({ categoryTWOlist: bookSubjects });
			} else if ( val === 'Posters' ) {
				this.setState({ categoryTWOlist: posterCategories });
			} else {
				this.setState({ categoryTWOlist: [] });
			}
		}
   }

   search () {
      let { categoryONE, categoryTWO, userInput } = this.state;

      if ( categoryONE === 'Games' ) {
         axios.get(`http://localhost:3005/api/games/games`).then( res => {
            console.log( res.data );
         }).catch( console.log() ); 
      }
      if ( categoryONE === 'Books') {
         axios.get(`http://localhost:3005/api/books/volumes?search=${ userInput }&subject=${ categoryTWO }`).then( res => {
            console.log( res.data );
         }).catch( console.log() );
      }
   }

   render () {
		const { categoryONElist, categoryTWOlist } = this.state;

		// List of category options ( The list isn't changing, so using i for key is fine )
		const categories1 = categoryONElist.map( (e, i) => {
			return <option key={ i } value={ e }>{ e }</option>
		});
		const categories2 = categoryTWOlist.map( (e, i) => {
			return <option key={ i } value={ e }>{ e }</option>
		});

      return (
         <div>
               <span>
                  <select onChange={ (e) => this.handleCategoryChange("categoryONE", e.target.value) }>
                     { categories1 }
                  </select>

                  <select onChange={ (e) => this.handleCategoryChange("categoryTWO", e.target.value) }>
                     { categories2 }
                  </select>

                  <input className="search-bar" placeholder={ 'Search' } onChange={ (e) => this.handleInputChange(e.target.value) }/>
                  <Link to="/search">
                     <button className="search-btn" onClick={ () => this.search() }>Search</button>
                  </Link>
               </span>
         </div>
      )
   }
}

export default Search;