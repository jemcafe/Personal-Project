import React, { Component } from 'react';
import './ContentSlider.css'
import Slider from 'react-slick';

class ContentSlider extends Component {
    render () {
        const settings = {
            arrows: false,
            autoplay: true,
            autoplaySpeed: 6000,
            dots: true,
            infinite: true,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <ul className="slider">
                <Slider {...settings}>
                    { this.props.images.map( (e, i) => (
                        <li key={i} className="slide-img">
                            <img src={ e } alt="Media pic"/>
                        </li>
                    )) }
                </Slider>
            </ul>
        )
    }
}

export default ContentSlider;