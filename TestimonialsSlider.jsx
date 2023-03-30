import React, { Fragment } from "react";
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import StoriesList from "./storiesList";
import PropTypes from "prop-types";

const TestimonialsSlider = (props) => {
  let roles = props.user;

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <FaAngleRight />,
    prevArrow: <FaAngleLeft />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderStory = (storiesList) => {
    return storiesList.map(mapStory);
  };

  const mapStory = (item, index) => {
    return (
      <div className="item p-2 mb-3" key={item.id}>
        <TestimonialCard key={index} item={item} user={roles} />
      </div>
    );
  };

  return (
    <Fragment>
      <Slider {...settings} className="pb-5 mb-10 testimonials">
        {renderStory(StoriesList)}
      </Slider>
    </Fragment>
  );
};

TestimonialsSlider.propTypes = {
  user: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TestimonialsSlider;
