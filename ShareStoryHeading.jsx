import React from "react";
import "./stories.css";
import { Col } from "react-bootstrap";
import titleImg from "../../assets/images/logos/MiVet-Logo_BUG.png";
import titleImg2 from "../../assets/images/logos/MiVet-Logo-Wordmark.png";
const ShareStoryHeading = () => {
   return (
      <div className="pt-lg-4  pt-4 bg-white">
         <div className="container story-header-container">
            <Col>
               <div className="text-center justify-content-center align-self-center">
                  <h1 className="display-2 text-center fw-bold mt-2 mb-2">
                     <img
                        className="justify-content-center"
                        src={titleImg}
                        width="140"
                        height="auto"
                        alt="MiVet"
                     />
                     <img
                        className="justify-content-center"
                        src={titleImg2}
                        width="130"
                        height="auto"
                        alt="MiVet"
                     />{" "}
                     <span className="header-text-even">Shared Stories</span>
                  </h1>
               </div>
            </Col>
         </div>
      </div>
   );
};
export default ShareStoryHeading;
