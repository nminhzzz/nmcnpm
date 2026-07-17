import React from 'react';
import Slider from 'react-slick';
import { Image } from 'antd';

function SliderComponent({ arrImg }) {
    var settings = {
        dots: true,
        infinite: true,
        focusOnSelect: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Slider {...settings}>
            {arrImg.map((img, index) => {
                return (
                    <div key={index}>
                        <div>
                            <Image src={img} alt="slider" preview={false} />
                        </div>
                    </div>
                );
            })}
        </Slider>
    );
}

export default SliderComponent;
