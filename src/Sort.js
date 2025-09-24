import React, { useState } from "react";

// Creating a sort function dropdown
const Sort = ({ data, setData }) => {
  const [sortType, setSortType] = useState("");

  //function used for sorting user data by name email id company name
  const handleSort = (e) => {
    const type = e.target.value;
    setSortType(type);

    let sortedData = [...data];

    if (type === "name") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "id") {
      sortedData.sort((a, b) => a.id - b.id);
    } else if (type === "email") {
      sortedData.sort((a, b) => a.email.localeCompare(b.email));
    } else if (type === "company") {
      sortedData.sort((a, b) => a.company.name.localeCompare(b.company.name));
    }

    setData(sortedData);
  };
  return (
    <div>
      <label for="sort">Sort the user list:</label>

      <select name="sort" value={sortType} onChange={handleSort}>
        <option value="">-- Select --</option>
        <option value="name">Sort by name</option>
        <option value="id">Sort by ID</option>
        <option value="email">Sort by Email</option>
        <option value="company">Sort by company name</option>
      </select>
    </div>
  );
};

export default Sort;
