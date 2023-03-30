import React from "react";
import { Fragment } from "react";
import { Row, Col, Container } from "react-bootstrap";
import TestimonialsSectionHeading from "./TestimonialsSectionHeading";
import TestimonialsSlider from "./TestimonialsSlider";
import PropTypes from "prop-types";

const TestimonialSection = (props) => {
   let { roles } = props.user.currentUser;

   const title = "Do not just take our word for it.";
   const subtitle = "Testimonials";
   const description = `See what some of our users are saying about their experiences with our platform.`;

   return (
      <Fragment>
         <TestimonialsSectionHeading
            title={title}
            subtitle={subtitle}
            description={description}
         />
         <Container>
            <Row>
               <Col md={12}>
                  <TestimonialsSlider user={roles} />
               </Col>
            </Row>
         </Container>
      </Fragment>
   );
};

TestimonialSection.propTypes = {
   user: PropTypes.shape({
      currentUser: PropTypes.shape({
         roles: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
   }).isRequired,
};

export default TestimonialSection;
