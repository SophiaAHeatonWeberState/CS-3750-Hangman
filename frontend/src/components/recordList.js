import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Highscores = (props) => (
 <tr>
   <td>{props.highscore.numLetters}</td>
   <td></td>
   <td></td>
   <td>{props.highscore.score}</td>
 </tr>
);
 
export default function ScoreList() {
 const [highscores, setScores] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getScores() {
     const response = await fetch('http://localhost:4000/highscores');
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const highscores = await response.json();
     setScores(highscores);
   }
 
   getScores();
 
   return;
 }, [highscores.length]);
 
 
 // This method will map out the records on the table
 function scoreList() {
   return highscores.map((highscore) => {
     return (
       <Highscores
         highscore={highscore}
         key={highscore._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Number of Letters</th>
           <th></th>
           <th></th>
           <th>High Score</th>
         </tr>
       </thead>
       <tbody>{scoreList()}</tbody>
     </table>
   </div>
 );
}