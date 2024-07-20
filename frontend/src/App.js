import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import RecordList from "./components/recordList";

// import all the sessions we need, using session_set as maybe our start page???
import Session_Set from "./components/session_set.js";
import Session_Delete from "./components/session_delete.js";

 
const App = () => {
 return (
   <div>
    <h1>Hello World</h1>
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/session_set" element={<Session_Set/>} />
       <Route path="/session_delete" element={<Session_Delete/>} />
     </Routes>
   </div>
 );
};
 
export default App;