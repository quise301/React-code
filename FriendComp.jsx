import React from "react";
import { useNavigate } from "react-router-dom";

function FriendComp(props) {
   const afriend = props.friend;
   console.log(afriend);
   const nav = useNavigate();

   const onEditClicked = (e) => {
      e.preventDefault(e);
      const state = { type: "EDITFRIEND_VIEW", payload: afriend };
      console.log("FRIENDSEDIT", state);
      nav(`/friends/edit/${props.friend.id}`, {
         state: state,
      });
   };

   const onDeleteClicked = (evt) => {
      evt.preventDefault();
      console.log(afriend);
      props.onFriendClicked(afriend.id);
   };

   return (
      <>
         <div className="col-md-3">
            <div className="card" style={{ width: "18rem" }}>
               <div className="card text-white bg-dark border-dark">
                  <img
                     src={afriend.primaryImage.imageUrl}
                     className="card-img-top"
                     alt=""
                  />
                  <div className="card-body">
                     <strong>{afriend.title}</strong>
                     <h5 className="card-title">{afriend.bio}</h5>
                     <strong>{afriend.summary}</strong>
                     <p className="card-text  text-cener">{afriend.headline}</p>
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
      </>
   );
}

export default React.memo(FriendComp);
