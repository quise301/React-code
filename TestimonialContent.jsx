import React from "react";
import "./stories.css";
import Typed from "react-typed";
import { Row, Col, ListGroup } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";
import logoImg2 from "../../assets/images/logos/MiVet-Logo-Wordmark.png";

const TestimonialContent = () => {
   return (
      <React.Fragment>
         <div
            className="py-10 pd-5 justify-content-center bg-white bg-auto"
            style={{
               backgroundRepeat: "no-repeat",
               backgroundSize: "cover",
               backgroundPosition: "top center",
            }}
         >
            <Row className="justify-content-center story-hero-centering   mb-12">
               <Col xl={7} lg={7} md={12}>
                  <div className="  text-center">
                     <Row>
                        <h1>
                           <span className="testimonials-text align-items-center fw-bold ms-2">
                              <Typed
                                 strings={[
                                    "How MiVet Made A Difference",
                                    "Owner Testimonials",
                                    "Animal Backstories",
                                 ]}
                                 typeSpeed={60}
                                 backSpeed={50}
                                 loop
                              />
                           </span>
                        </h1>
                     </Row>
                     <p className="mb-5 pb-3 mt-3 h2 text-dark">
                        Meet other{" "}
                        <img
                           className="justify-content-center story-hero-img-even"
                           src={logoImg2}
                           width="70"
                           height="auto"
                           alt="MiVet"
                        />{" "}
                        users. Check out their personal stories, and learn how{" "}
                        <img
                           className="justify-content-center story-hero-img-even"
                           src={logoImg2}
                           width="70"
                           height="auto"
                           alt="MiVet"
                        />{" "}
                        mobile equine veterinarian services impacted their lives with
                        accessible mobile expert care and treatment.
                     </p>

                     <div className=" mb-0">
                        <ListGroup as="ul" bsPrefix="list-inline">
                           <ListGroup.Item
                              as="li"
                              bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4 me-3 mb-2 mb-md-0"
                           >
                              <span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
                                 <Icon
                                    path={mdiCheck}
                                    size={0.7}
                                    className="text-success"
                                 />
                              </span>
                              <span className="align-middle">
                                 Equine Veterinarians
                              </span>
                           </ListGroup.Item>
                           <ListGroup.Item
                              as="li"
                              bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4 me-3 mb-2 mb-md-0"
                           >
                              <span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
                                 <Icon
                                    path={mdiCheck}
                                    size={0.7}
                                    className="text-success"
                                 />
                              </span>
                              <span className="align-middle">Expert Care</span>
                           </ListGroup.Item>
                           <ListGroup.Item
                              as="li"
                              bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4"
                           >
                              <span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
                                 <Icon
                                    path={mdiCheck}
                                    size={0.7}
                                    className="text-success"
                                 />
                              </span>
                              <span className="align-middle">Insurance Accepted</span>
                           </ListGroup.Item>
                        </ListGroup>
                     </div>
                  </div>
               </Col>
            </Row>
         </div>
      </React.Fragment>
   );
};
export default TestimonialContent;
