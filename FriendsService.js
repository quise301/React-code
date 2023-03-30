import axios from "axios";
var endpoint= "https://api.remotebootcamp.dev/api/friends";



const getFriend = (pageIndex,pageSize) => {
    const config = {
       method: "GET",
       url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
       withCredentials: true,
       headers: { "Content-Type": "application/json" },
    };
    return axios(config)

 };
 
 
 let updateFriend = (payload,id) => {
   const config = {
      method: "PUT",
      url: `https://api.remotebootcamp.dev/api/friends/${id}`,
     data: payload,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
   };
   return axios(config).then(() =>{
      return id
});
 } 

 

 const deleteFriend =  (id) => {
   const config = {
      method: "DELETE",
      url: `https://api.remotebootcamp.dev/api/friends/${id}`,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      crossdomain: true
   };
    return axios(config)
 }


 

 let getFormfriend = (id) => {
   const config = {
      method: "GET",
      url: `https://api.remotebootcamp.dev/api/friends/${id}`,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
   };
   return axios(config)

 }

 let editFriend = async (id,payload) => {
   const config = {
      method: "PUT",
      url: `https://api.remotebootcamp.dev/api/friends/${id}`,
     data: payload,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
   };
   await axios(config);
    return;
 }
 

 
 
 let addFriend = (payload) => {
   const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/friends",
     data: payload,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
   };
   return axios(config).then(() =>{
      
});
 }
 

 let searchFriend = (pageIndex, pageSize, searchQuery) => {
   const config = {
     method: "GET",
     url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${searchQuery}`,
     crossdomain: true,
     headers: { "Content-Type": "application/json" },
   };
 
   return axios(config).then((response) => response.data.item);





 };





 
const friendsService = {searchFriend, getFriend,deleteFriend,getFormfriend,editFriend,addFriend,updateFriend };
export default friendsService; 

