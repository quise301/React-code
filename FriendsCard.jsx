import React from "react";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";

function FriendsCard(props) {
   const afriend = props.friend;
   _logger(afriend, "hi");
   const nav = useNavigate();

   const onEditClicked = () => {
      nav(`/friends/new${afriend.id}`);
   };

   const onDeleteClicked = (evt) => {
      evt.preventDefault();
      console.log(afriend);
      props.onDeleteClicked(afriend.id);
   };
   const _logger = debug.extend("FriendsCard");

   return (
      <React.Fragment>
         <h1>FriendsCard{props.friend}</h1>
         <div className="container">
            <div className="col-md-3">
               <div
                  className="card text-white bg-dark border-dark"
                  style={{ width: "18rem" }}
               >
                  <img
                     src={afriend.primaryImage.imageUrl}
                     className="card-img-top"
                     alt="NBA"
                  />
                  <div className="card-body">
                     <h5 className="card-title">{afriend.title}</h5>
                     <p className="card-text">{afriend.bio}</p>
                     <strong>{props.friend.summary}</strong>
                     <p className="card-text  text-cener"></p>
                     <button
                        type="button"
                        className="link-btn btn btn-primary"
                        onClick={onDeleteClicked}
                     >
                        Delete Me
                     </button>
                     <button
                        onClick={onEditClicked}
                        type="button"
                        className="btn btn-light btn-outline-danger"
                     >
                        Edit
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
}

export default FriendsCard;
