import React, { useState } from "react";
import "./stories.css";
import { Formik, Form, ErrorMessage } from "formik";
import { shareStoryFormSchema } from "schemas/shareStoryFormSchema";
import storiesService from "../../services/storiesService";
import toastr from "toastr";

import PropTypes from "prop-types";
import debug from "sabio-debug";

const _logger = debug.extend("ShareStory");

const ShareStoryForm = (props) => {
   let { roles } = props.user.currentUser;
   _logger("Share Story Form", "roles", roles);

   const [formData] = useState({
      name: "",
      email: "",
      story: "",
      fileIds: [],
   });

   const handleSubmit = (values) => {
      _logger("Submit Click", values);
      storiesService.addStory(values).then(onStorySuccess).catch(onStoryError);
   };
   const onStorySuccess = () => {
      toastr.success("Thank you for sending your story");
   };

   const onStoryError = () => {
      toastr.error("Story sent failed");
   };
   return (
      <React.Fragment>
         <Formik
            enableReinitialize={true}
            initialValues={formData}
            onSubmit={handleSubmit}
            validationSchema={shareStoryFormSchema}
         >
            <Form>
               <div className="form-group mb-3"></div>

               <div className="form-group mb-3">
                  <ErrorMessage
                     name="story"
                     component="div"
                     className="has-error text-danger"
                  />
               </div>

               <div className="mb-3 ms-2 px-2 float-right"></div>
            </Form>
         </Formik>
      </React.Fragment>
   );
};

ShareStoryForm.propTypes = {
   user: PropTypes.shape({
      currentUser: PropTypes.shape({
         roles: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
   }).isRequired,
};

export default ShareStoryForm;
