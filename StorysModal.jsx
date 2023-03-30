import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

const StorysModal = (props) => {
  return (
    <React.Fragment>
      <Modal isOpen={props.isOpen} toggle={props.toggleModal}>
        <ModalHeader className="bg-light-success" toggle={props.toggleModal}>
          MiVet Stories
        </ModalHeader>
        <ModalBody className="card-body-bg">
          {
            <div className="col">
              <div className="card card-block bg-light-success rounded">
                <div className="card-body">
                  <div className="flex text-center">
                    <img
                      className="card-img-top rounded"
                      src={props.image}
                      width="230"
                      height="auto"
                      alt=""
                    />
                  </div>
                  <h2 className="card-story-name mt-3 text-center">
                    {props.name}
                  </h2>
                  <h4 className="card-story-author text-center">
                    <span>Created By: </span>
                    {props.createdBy}
                  </h4>
                  <p className="card-story mt-3 fw-semi-bold justify-content">
                    {props.story}
                  </p>
                  <ul className="list-group list-group-flush align-items">
                    <li className="list-group-item text-center d-none">
                      {props.id}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          }
        </ModalBody>
        <ModalFooter className="bg-light-success">
          <Button color="danger" onClick={props.toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

StorysModal.propTypes = {
  id: PropTypes.number.isRequired,
  createdBy: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  story: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default StorysModal;
