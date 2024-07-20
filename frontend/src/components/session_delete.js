import React, { useEffect, useState } from "react";

// Maybe this can be the page that displays top 10 high scores.
// haven't changed anything yet.

export default function Session_Set() {
    const [status, setStatus] = useState("");

    useEffect(() => {
        async function run() {
            const response = await fetch(`http://localhost:5000/session_delete`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const statusResponse = await response.json();
            setStatus(statusResponse.status);
        }
        run();
        return;
    },[]);

    return (
        <div>
            <h3>Top 10 High Scores</h3>
            <p>{status}</p>
        </div>
    )
}