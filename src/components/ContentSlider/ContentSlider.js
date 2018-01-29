import React, { Component } from 'react';
import './ContentSlider.css'
import Slider from 'react-slick';

class ContentSlider extends Component {
    render () {
        const settings = {
            autoplay: true,
            autoplaySpeed: 6000,
            dots: true,
            infinite: true,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div className="slider">
                <Slider {...settings}>
                    { this.props.images.map( e => <div><div className="slide-img"><img src={ e } alt="Media pic"/></div></div> )}
                </Slider>
            </div>
        )
    }
}

export default ContentSlider;