import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [deletemsg, setDeleteMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsersData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    try {
      console.log("Delete button clicked for ID:", id);
      const res = await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      if (res.status === 200 || res.status === 204) {
        setDeleteMsg("User deleted successfully ✅");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeleteMsg("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [deletemsg]);
  const pageSize = 3;
  const totalUsers = usersData.length;
  const startPage = currentPage * pageSize;
  const endPage = startPage + pageSize;
  const numberofpages = Math.ceil(totalUsers / pageSize);

  return (
    <div className="main">
      <h6 style={{ textAlign: "center" }}>
        {" "}
        {deletemsg.length > 0 ? deletemsg : ""}
      </h6>

      <h2 className="title">Users List</h2>
      <div className="map1">
        {usersData.slice(startPage, endPage).map((item) => (
          <div key={item.id} className="userData">
            <h3>{item.name}</h3>
            <p>
              <strong>ID:</strong> {item.id}
            </p>
            <p>
              <strong>Email:</strong> {item.email}
            </p>
            <p>
              <strong>Company:</strong> {item.company.name}
            </p>
            <button
              className="btn"
              onClick={() => navigate("/modify/" + item.id)}
            >
              Edit
            </button>
            <button className="btn" onClick={() => deleteUser(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="newuser">
        <button className="btn" onClick={() => navigate("/createUser/")}>
          Create a new User
        </button>
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        {[...Array(numberofpages)].keys().map((item) => (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </span>
        ))}
        <button
          disabled={currentPage === numberofpages - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
