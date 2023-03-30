import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import toastr from "toastr";
import friendsService from "../../services/FriendsService";

function FriendForm() {
   const location = useLocation();

   const [friendData, setFriendData] = useState({
      id: "",
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "Active",
      primaryImage: "",
   });

   const onFriendNameChange = (e) => {
      const target = e.target;
      const userValue = target.value;
      const nameOfField = target.name;
      setFriendData((prevState) => {
         const bestFriend = { ...prevState };
         bestFriend[nameOfField] = userValue;
         return bestFriend;
      });
   };
   const friendUser = (e) => {
      e.preventDefault();
      console.log(friendData);
      if (friendData && friendData.id) {
         friendsService
            .editFriend(friendData.id, friendData)
            .then(onEditFriendSuccess)
            .catch(onEditFriendError);
      } else friendsService.addFriend(friendData).then(onAddSuccess).catch(onAddError);
   };

   const onEditFriendSuccess = (response) => {
      toastr.success("Success", response);
   };

   const onEditFriendError = (err) => {
      toastr.error("ping no", err);
   };

   const onAddSuccess = (response, prevState) => {
      toast.success("Goodjob");
      console.log("ping ok", response);

      const editId = { ...prevState }; //the success updater
      console.log("update state obj -->", editId.id);
      return editId;
   };
   const onAddError = (err) => {
      console.log("ping err", err);
   };

   useEffect(() => {
      if (location?.state?.type === "EDITFRIEND_VIEW" && location?.state?.payload) {
         setFriendData((prevState) => {
            return {
               ...prevState,
               ...location.state.payload,
               primaryImage: location.state.payload.primaryImage.imageUrl,
            };
         });
      }
   }, []);

   return (
      <React.Fragment>
         <div>
            <form>
               <div>
                  <label htmlFor="title">Title</label>
                  <input
                     type="text"
                     name="title"
                     id="title"
                     className="form-control"
                     value={friendData.title}
                     onChange={onFriendNameChange}
                     style={{ width: "18rem" }}
                  />
               </div>
               <div>
                  <label htmlFor="bio">Bio</label>
                  <input
                     type="bio"
                     name="bio"
                     id="bio"
                     className="form-control"
                     value={friendData.bio}
                     onChange={onFriendNameChange}
                     style={{ width: "18rem" }}
                  />
               </div>
               <div>
                  <label htmlFor="summary">Summary</label>
                  <input
                     type="summary"
                     name="summary"
                     id="summary"
                     className="form-control"
                     value={friendData.summary}
                     onChange={onFriendNameChange}
                     style={{ width: "18rem" }}
                  />
               </div>
               <div>
                  <label htmlFor="headline">Headline</label>
                  <input
                     type="headline"
                     name="headline"
                     id="headline"
                     className="form-control"
                     value={friendData.headline}
                     onChange={onFriendNameChange}
                     style={{ width: "18rem" }}
                  />
               </div>
               <div>
                  <label htmlFor="slug">Slug</label>
                  <input
                     type="slug"
                     name="slug"
                     id="slug"
                     className="form-control"
                     value={friendData.slug}
                     onChange={onFriendNameChange}
                     style={{ width: "18rem" }}
                  />
               </div>
               <div>
                  <label htmlFor="statusId">StausId</label>
                  <input
                     type="statusId"
                     name="statusId"
                     id="statusid"
                     className="form-control"
                     value={friendData.statusId}
                     onChange={onFriendNameChange}
                     style={{ width: "18rem" }}
                  />
               </div>
               <div>
                  <label htmlFor="primaryImage">Primary Image</label>
                  <input
                     type="text"
                     name="primaryImage"
                     id="id"
                     className="form-control"
                     value={friendData.primaryImage}
                     onChange={onFriendNameChange}
                     style={{ width: "18rem" }}
                  />
               </div>
               <div className="btn-group" role="group">
                  <button
                     type="submit"
                     className="btn btn-primary"
                     onClick={friendUser}
                  >
                     Submit
                  </button>
                  <div></div>
               </div>
            </form>
         </div>
      </React.Fragment>
   );
}
export default FriendForm;
