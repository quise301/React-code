import React from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const SectionHeadingCenter = ({ title, subtitle, description }) => {
  return (
    <Row className="mb-4 justify-content-center">
      <Col lg={8} md={12} sm={12} className="text-center">
        <span className="text-primary mb-3 d-block text-uppercase fw-semi-bold ls-xl">
          {subtitle}
        </span>
        <h2 className="mb-2 display-4 fw-bold ">{title}</h2>
        <h4 className="lead">{description}</h4>
      </Col>
    </Row>
  );
};

SectionHeadingCenter.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SectionHeadingCenter;
