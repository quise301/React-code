import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Jobs from "./components/jobs/Jobs";
import Companies from "./components/companies/Companies";
import { Routes, Route } from "react-router-dom";
import SiteNave from "./components/SiteNave";
import "../../Starter.react-componentize/src/";
import "./App.css";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import TestAndAjax from "./components/Test/TestAndAjax";
import "bootstrap/dist/css/bootstrap.min.css";
import Events from "./components/events/Events";
import Friends from "./components/friends/Friends";
import FriendForm from "./components/friends/FriendForm";
import FriendsCard from "./components/friends/FriendsCard";
import usersService from "./services/usersService";
import toastr from "toastr";
import Comment from "./components/codeChallenge/Comment";
import Schools from "./components/codeChallenge/Schools";
import EditSchool from "./components/codeChallenge/EditSchool";
import AddSchool from "./components/codeChallenge/AddSchool";
import debug from "sabio-debug";

const _logger = debug.extend("App");

function App() {
   const [userData, setCurrentUser] = useState({
      firstName: "",
      lastName: "",
      isLoggedIn: false,
   });
   console.log(userData);
   const updateUser = (userData) => {
      setCurrentUser((prevState) => {
         const newLogin = { ...prevState };
         newLogin.firstName = userData.firstName;
         newLogin.avatarUrl = userData.avatarUrl;
         newLogin.isLoggedIn = true;
         return newLogin;
      });
   };
   useEffect(() => {
      console.log("Use Effect has fired");
      _logger("it this working?");
      usersService
         .getCurrentLogin()
         .then(onGetCurrentSuccess)
         .catch(onGetCurrentError);
   }, []);

   const checkLoginSuccess = (check) => {
      console.log("check", check);
   };

   const onGetCurrentSuccess = (response) => {
      console.log(response, "get the UserLogin");
      usersService
         .getLogin(response.data.item.id)
         .then(onGetLoginSuccess)
         .catch(onGetLoginError);
   };

   const onGetCurrentError = (err) => {
      console.log("invaild", err);
   };
   const onGetLoginSuccess = (response) => {
      toastr.success(response, "You are now logged in");
      console.log("currently log in", response);
      updateUser(response.data.item);
   };
   const onGetLoginError = (err) => {
      console.log(err);
   };

   return (
      <>
         <SiteNave userData={userData}></SiteNave>

         <Routes>
            <Route path="/" element={<Home myHome={userData} />}></Route>
            <Route path="/companies" element={<Companies />}></Route>
            <Route path="/events" element={<Events />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/test" element={<TestAndAjax />}></Route>
            <Route
               path="/login"
               element={<Login user={userData} loginCheck={checkLoginSuccess} />}
            ></Route>
            <Route path="friends" element={<Friends />}></Route>
            <Route path="/friends/add" element={<FriendForm />}></Route>
            <Route path="/friends/edit/:id" element={<FriendForm />}></Route>
            <Route path="friends/new" element={<FriendsCard />}></Route>
            <Route path="friends/delete" element={<FriendsCard />}></Route>
            <Route path="/" element={<Schools />}></Route>
            <Route path="/edit/*" element={<EditSchool />}></Route>

            <Route path="/addschool/*" element={<AddSchool />}></Route>
            <Route path=":schoolId" element={<AddSchool />}></Route>

            <Route path="/jobs" element={<Jobs />}></Route>
            <Route path="/Comment" element={<Comment />}></Route>
         </Routes>
      </>
   );
}

export default App;
