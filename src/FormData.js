import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//Creating a form data page which will handle create edit a new user.

const FormData = () => {
  const { index } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  //validate function for validation of various input fields
  const validate = () => {
    let newErrors = {};
    if (!id) {
      newErrors.id = "ID is required";
    } else if (isNaN(id)) {
      newErrors.id = "ID must be a number";
    }
    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be altleast 3 characters";
    }
    if (!companyname) {
      newErrors.companyname = "Company name is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is not valid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //fetching user details of the user in which client clicked on edit button
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

  //handling submit function of the form
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validate()) {
        alert("Please check your form data");
        return;
      }
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (res.status === 200 || res.status === 201) {
        setMsg("User updated successfully ✅");
        setEmail("");
        setId("");
        setName("");
        setCompanyName("");
        setPassword("");
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
            {errors.id && <p style={{ color: "red" }}>{errors.id}</p>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>
          <div className="form-group">
            <label>Company:</label>
            <input
              type="text"
              placeholder="Enter Company"
              value={companyname}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            {errors.companyname && (
              <p style={{ color: "red" }}>{errors.companyname}</p>
            )}
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
