import React, { useState } from "react";
import "./stories.css";
import PropTypes from "prop-types";
import { Card, Image } from "react-bootstrap";
import StorysModal from "./StorysModal";
const TestimonialCard = ({ item, user }) => {
   const [modalState, setModalState] = useState({
      isOpen: false,
   });
   const toggleModal = () => {
      setModalState((prevState) => {
         return {
            isOpen: !prevState.isOpen,
         };
      });
   };
   return (
      <div className="d-flex align-item-stretch">
         <Card className="rounded-3 cards-even shadow-none justify-content">
            <Card.Body className="p-5 justify-content rounded card-body-bg story-card">
               <p className="lead text-dark font-italic fw-medium mb-0">
                  {`${item?.story?.slice(0, 190)}...`}
               </p>
            </Card.Body>
            <Card.Footer className="px-5 py-4 testimonial-card-bg">
               <div className="d-flex align-item-center">
                  <Image
                     src={item?.file[0].imageUrl}
                     alt=""
                     className="avatar avatar-md testimonial-img rounded-circle"
                  />
                  <div className="ms-3">
                     <span>
                        <h4 className="mb-0 testimonials-text  display-6 testimonial-card-tag bold">{`${item?.name.slice(
                           0,
                           22
                        )}`}</h4>
                     </span>
                     <p className="mb-0 invisible small">{item?.id}</p>
                     <p className="mb-0 invisible small">{item?.createdBy}</p>
                  </div>
               </div>
               <div className="float-right card-button-right">
                  <button
                     type="button"
                     className="btn btn-success card-button float-end fw-bold rounded ms-2"
                     onClick={toggleModal}
                  >
                     View Story
                  </button>
                  {user.includes("Admin") && (
                     <button
                        type="button"
                        className="btn btn-danger card-button float-end fw-bold rounded ms-2"
                     >
                        Delete
                     </button>
                  )}

                  {user.includes("Admin") && (
                     <button
                        type="button"
                        className="btn btn-light card-button edit-btn float-end fw-bold rounded ms-2"
                     >
                        Edit
                     </button>
                  )}
                  <StorysModal
                     isOpen={modalState.isOpen}
                     toggleModal={toggleModal}
                     story={item.story}
                     name={item.name}
                     image={item?.file[0].imageUrl}
                     id={item.id}
                     createdBy={item.createdBy}
                  />
               </div>
            </Card.Footer>
         </Card>
      </div>
   );
};
TestimonialCard.propTypes = {
   item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      createdBy: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      file: PropTypes.arrayOf(
         PropTypes.shape({
            imageUrl: PropTypes.string.isRequired,
         })
      ),
      story: PropTypes.string.isRequired,
   }),
   user: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TestimonialCard;
