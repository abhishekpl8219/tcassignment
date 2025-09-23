import React, { useEffect, useState } from "react";
import "./App.css";

const Home = () => {
  const [usersData, setUsersData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsersData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <h2 className="title">Users List</h2>
      <div className="map1">
        {usersData.map((item) => (
          <div key={item.id} className="userData">
            <h3>{item.name}</h3>
            <p>
              <strong>Email:</strong> {item.email}
            </p>
            <p>
              <strong>Company:</strong> {item.company.name}
            </p>
            <button className="btn">Edit</button>
            <button className="btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
