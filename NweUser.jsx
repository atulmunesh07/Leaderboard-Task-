import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaJetFighterUp } from "react-icons/fa6";
import { FaSquareWebAwesomeStroke } from "react-icons/fa6";
import Rewards from "./Rewards";

function NewUSer() {
  // ---------set user and data---------//
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [expandedUser, setExpandedUser] = useState(null)

  //========fetchUser data to backend======//
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  //==========end=========================//


  //============user add in mongodb ========//
  const addUser = async () => {
    if (!newName.trim()) return;
    await axios.post("http://localhost:3001/users", { name: newName });
    setNewName("");
    fetchUsers();
  };

  //=============point==============//
  const claimPoints = async () => {
    if (!selectedUserId) return;
    await axios.post(`http://localhost:3001/claim/${selectedUserId}`);
    fetchUsers();
  };

  return (
    <div >
      {/* -------------------input box------------- */}
      <div className='flex mt-6 items-center justify-center w-full border 
            rounded-2xl py-2 backdrop-blur-md bg-gray-700/10 shadow-black shadow
             border-gray-600/20 p-5 bottom-0 '>
        <input
          className='w-full text-sm outline-none bottom-0'
          type="text"
          value={newName}
          placeholder="Enter name"
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={addUser}>
          <FaJetFighterUp

            className='cursor-pointer hover:text-gray-400' />
        </button>
      </div>
      {/* -----------end input box-------------- */}


      <div className="h-1.5 mt-2 w-full bg-amber-200 rounded-2xl"></div>

      {/* --------select button ---------------------- */}
      <div className="flex flex-row gap-2 items-center justify-center mt-2  ">

        <select
          className="bg-gray-500 py-3 rounded-2xl hover:bg-pink-600 p-3 outline-none"

          onChange={(e) => setSelectedUserId(e.target.value)}>
          <option value=""> Select User</option>
          {users.map((user) => (
            <option
              className="outline-none"
              key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        {/* ------------point button------------ */}
        <button
          className="border py-3 p-3 rounded-2xl"
          onClick={claimPoints}>Claim Points</button>
        {/* ---------end-point-------------- */}
      </div>
      {/* -----------------------end--------------------------------------- */}

      <div className="w-full border items-center justify-center mt-2 rounded-2xl">
        <h2 className="flex items-center justify-center">Rankings</h2>
      </div>

      <div className=" max-h-110 overflow-y-auto mt-5  ">
        <table
          className="w-full mt-5border "
        >
          <thead>
            <tr >
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Rank</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Name</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Score</th>

            </tr>
          </thead>
          <tbody>
            {/* -------hit the backend---------- */}
            {users.map((u, i) => (
              <tr key={u._id}>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {i + 1}
                </td>
                <td style={{ padding: "10px" }}>{u.name}</td>

                <td style={{ padding: "10px", textAlign: "center" }}>
                  <div className="flex flex-col">
                    {u.score}
                    <button
                      onClick={() =>
                        setExpandedUser(expandedUser === u._id ? null : u._id)
                      }
                      style={{
                        marginTop: "6px",
                        padding: "4px 8px",
                        fontSize: "10px",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      {expandedUser === u._id ? "Hide Rewards" : "Show Rewards"}
                      {expandedUser === u._id && (
                        <tr>
                          <td >
                            <strong>Rewards:</strong>
                            <div
                              style={{
                                maxHeight: "140px",
                                overflowY: "auto",
                                paddingLeft: "16px",
                                border: "1px solid #ddd",
                                marginTop: "6px",
                              }}
                            >
                              <ul style={{ margin: 0, padding: 0, listStyleType: "disc" }}>
                                {u.rewards?.length > 0 ? (
                                  u.rewards.map((r, i) => (
                                    <li key={i}>
                                      Reached {r.milestone} points on{" "}
                                      {new Date(r.date).toLocaleString()}
                                    </li>
                                  ))
                                ) : (
                                  <li>No rewards yet.</li>
                                )}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}

                    </button>
                  </div>
                </td>


              </tr>
            ))}
            {/* ----------end point--------------- */}
          </tbody>
        </table>
      </div>




    </div>
  );
}

export default NewUSer;
