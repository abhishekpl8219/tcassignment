import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const FormData = () => {
  const { index } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [msg, setMsg] = useState("");

  const [userData, setUserData] = useState([]);

  const fetchSingleUser = async () => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users/" + index
      );
      const data = await res.json();

      setName(data.name);
      setId(data.id);
      setCompanyName(data.company.name);
      setEmail(data.email);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleUser();
  }, [index]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [msg]);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (res.status === 200 || res.status === 201) {
        setMsg("User updated successfully ✅");
        setEmail("");
        setId("");
        setName("");
        setCompanyName("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-container">
      <h3 className="form-title">Create/Edit a User</h3>
      <h6 style={{ textAlign: "center" }}> {msg.length > 0 ? msg : ""}</h6>
      <div className="form-card">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label>ID:</label>
            <input
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Company:</label>
            <input
              type="text"
              placeholder="Enter Company"
              value={companyname}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormData;
