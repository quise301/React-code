import React, { useCallback, useEffect, useState } from "react";
import friendsService from "../../services/FriendsService";
import FriendComp from "./FriendComp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import debug from "sabio-debug";

function Friends() {
   const [pageData, setPageData] = useState({
      pageIndex: 0,
      pageSize: 5,
      arrayOfFriend: [],
      friendComponents: [],
      searchQuery: "",
      totalCount: 0,
      current: 10,
   });

   const _logger = debug.extend("Friends");
   const navigate = useNavigate();

   useEffect(() => {
      _logger("Friends");
      friendsService
         .getFriend(pageData.pageIndex, pageData.pageSize)
         .then(onGetFriendSuccess)
         .catch(onGetFriendError);
   }, [pageData.pageIndex]);

   const navigateToFriend = (editFriend) => {
      console.log(editFriend.id);
      const payload = editFriend;
      payload.primaryImage = editFriend.primaryImage.imageUrl;
      const state = { type: "EDITFRIEND_VIEW", payload: editFriend };
      navigate(`/friends/new${editFriend.id}`, state);
   };

   const onGetFriendSuccess = (response) => {
      console.log(response);
      let arrayOfFriend = response.data.item.pagedItems;
      console.log({ arrayOfFriend });

      setPageData((prevState) => {
         const pd = { ...prevState };
         pd.arrayOfFriend = arrayOfFriend;
         pd.friendComponents = arrayOfFriend.map(mapFriends);
         pd.totalCount = response.data.item.totalCount;
         return pd;
      });
   };
   const onGetFriendError = (error) => {
      console.log(error);
   };
   const onPageChange = (page) => {
      console.log(page);
      setPageData((prevState) => {
         const newPageData = { ...prevState };
         newPageData.pageIndex = page;
         return newPageData;
      });
   };

   const onDeleteRequested = useCallback((idToBeDeleted) => {
      console.log("Id to be deleted", idToBeDeleted);

      const handler = onDeleteSuccess(idToBeDeleted);
      friendsService.deleteFriend(idToBeDeleted).then(handler).catch(onDeleteError);
   }, []);
   const onDeleteSuccess = (idToBeDeleted) => {
      console.log("onDeleteSuccess", idToBeDeleted);
      return () => {
         setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfFriend = [...pd.arrayOfFriend];
            const idxOf = pd.arrayOfFriend.findIndex((friend) => {
               let result = false;
               if (friend.id === idToBeDeleted) {
                  result = true;
               }
               return result;
            });

            if (idxOf >= 0) {
               pd.arrayOfFriend.splice(idxOf, 1);
               pd.friendComponents = pd.arrayOfFriend.map(mapFriends);
            }
            return pd;
         });
      };
   };
   const onDeleteError = (error) => {
      console.log("Deleting", error);
   };

   const mapFriends = (aFriend) => {
      console.log("mapping", aFriend);
      return (
         <FriendComp
            key={"ListA-" + aFriend.id}
            friend={aFriend}
            onFriendClicked={onDeleteRequested}
            onNavigateClicked={navigateToFriend}
         />
      );
   };

   const onHeaderClicked = () => {
      setCount((prevState) => {
         return prevState + 1;
      });
   };
   const [count, setCount] = useState(0);
   const [show, setShow] = useState(true);
   const OnToggleClicked = () => {
      setShow(!show);
   };

   const onSearchSuccess = (response) => {
      console.log("the search success response is ", response);
      setPageData((prevState) => {
         const newState = { ...prevState };
         newState.arrayOfFriend = response.pagedItems;
         newState.friendComponents = newState.arrayOfFriend.map(mapFriends);
         return newState;
      });
   };
   const onSearchError = (err) => {
      console.log("ping no", err);
   };

   const onSearchNameChange = (e) => {
      const target = e.target;
      const userValue = target.value;
      const nameOfField = target.name;
      setPageData((prevState) => {
         const bestFriend = { ...prevState };
         bestFriend[nameOfField] = userValue;
         return bestFriend;
      });
   };

   const onSubmitSearch = (e) => {
      e.preventDefault();
      console.log(pageData);
      console.log(
         "pageIndex",
         pageData.pageIndex,
         "pageSize",
         pageData.pageSize,
         "searchQuery",
         pageData.searchQuery
      );
      friendsService
         .searchFriend(pageData.pageIndex, pageData.pageSize, pageData.searchQuery)
         .then(onSearchSuccess)
         .catch(onSearchError);
   };

   //https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=10

   return (
      <React.Fragment>
         <div className="container search">
            <input
               name="searchQuery"
               type="text"
               id="search"
               className="form-control"
               aria-describedby="searchHelpBlock"
               value={pageData.id}
               onChange={onSearchNameChange}
               style={{ width: "18rem" }}
            />
            <button
               type="search"
               className="btn btn-primary "
               onClick={onSubmitSearch}
            >
               Search
            </button>
         </div>
         <div className="container">
            <Link to="/friends/add">
               <button type="button"> Add Friend </button>
            </Link>
            <button onClick={OnToggleClicked}>Toggle Friends</button>
            <h1>Friends</h1>
            <h3 onClick={onHeaderClicked}>Rendering {count}</h3> This method is
            automatically fired by React after the component is rendered.
            <Pagination
               onChange={onPageChange}
               current={pageData.pageIndex}
               total={pageData.totalCount}
               pageSize={pageData.pageSize}
               locale={locale}
            />
            <div className="row">{show && pageData.friendComponents}</div>
         </div>
      </React.Fragment>
   );
}

export default Friends;
