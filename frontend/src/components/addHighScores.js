import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function AddScores({givenNumLetters}) {    
  useEffect(() => {
    async function addData(numLetters2) {
        var editedScore = {
            numLetters: numLetters2,
            score: 2,
            player: "filler"
        };

        await fetch('api/add', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedScore)
        })
        .catch(error => {
          window.alert(error);
          return;
        });
      }
    
      addData(givenNumLetters);
    
      return;
    });
  }
