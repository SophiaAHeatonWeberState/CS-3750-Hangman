import React, { useEffect, useState } from "react";

// this is the starting page which will ask for a name before starting the game

export default function Session_Set() {
    const [status, setStatus] = useState("");

    useEffect(() => {
        async function run() {
            const response = await fetch(`http://localhost:4000/session_set`,
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
                <p>{status}</p>
             </div>
    );
}

// I was meaning to set both the session set for the name of the player and
// enter the name of the player in the same file.

// export default function Create() {
//     const [form, setForm] = useState({
//         first: "",
//         last: "",
//     });

// const navigate = useNavigate();

// function updateForm(jsonObj) {
//     return setForm((prevJsonObj) => {
//         return { ...prevJsonObj, ...jsonObj};
//     });
// }

// async function onSubmit(e) {
//     e.preventDefault();
//     const currplayer = {...form};
//     }
//     await fetch(`http://localhost:4000/data/`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(currplayer),
//     })
//     .catch(error => {
//         window.alert(error);
//         return;
//     })
//     navigate("/");
// }

// return (
//     <div>
//         <h3>Please Enter Your Name!</h3>
//         <form onSubmit={onSubmit}>
//             <div>
//                 <label>First: </label>
//                 <input
//                     type="text"
//                     id="first"
//                     value={form.first}
//                     onChange={(e) => updateForm({ first: e.target.value })}
//                 />
//             </div>
//             <div>
//                 <label>Last: </label>
//                 <input
//                     type="text"
//                     id="last"
//                     value={form.last}
//                     onChange={(e) => updateForm({ last: e.target.value })}
//                 />
//             </div>
//             <div> 
//                 <p>{status}</p>
//             </div>
//             <br/>
//             <div>
//                 <input
//                     type="submit"
//                     value="Register"
//                 />
//             </div>
//         </form>
//     </div>
// )