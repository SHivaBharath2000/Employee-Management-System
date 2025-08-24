import React from "react";
import "./CreateandUpdate.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../Redux and States/Slice";
import { updateEmployee } from "../Redux and States/Slice";
import { useLocation } from "react-router-dom";

function CreateandUpdate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // This state was show the error for required fields
  const [error, setError] = useState("");
  //useLocation for edit function to recieve data
  const location = useLocation();
  const { Name, Email, dateOfJoining, Department, Role, index, employeeId } =
    location.state || {};
  //This state for take the input values
  const [formData, setFormData] = useState({
    Name: "" || Name,
    Email: "" || Email,
    dateOfJoining: "" || dateOfJoining,
    Department: "" || Department,
    Role: "" || Role,
    Status: "Active",
  });

  //Onchange event handler
  const handleChange = (event) => {
    const date = new Date();
    const minutes = date.getSeconds();
    const randomId = minutes + Math.floor(Math.random() + 100);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      employeeId: employeeId || randomId,
    });
  };

  //Insert the user
  const handleSubmit = (event) => {
    event.preventDefault();
    if ((
      formData.Name === "" ||
      formData.Email === "" ||
      formData.dateOfJoining === "" ||
      formData.Department === "" ||
      formData.Role === ""
    )||(
      formData.Name === undefined ||
      formData.Email === undefined ||
      formData.dateOfJoining === undefined ||
      formData.Department === undefined||
      formData.Role === undefined
    )) {
      setError(true);
    } else {
      setError(false);
      try {
        dispatch(addEmployee(formData));
        alert("Employee added successfully");
        navigate("/");
      } catch (error) {
        alert("Unable to add employee. Please try again later");
        console.log(error);
      }
    }
  };

//update the user
  function handleUpdate() {
    let updateData = { ...formData, index: index };
    if (
      formData.Name === "" ||
      formData.Email === "" ||
      formData.dateOfJoining === "" ||
      formData.Department === "" ||
      formData.Role === ""
    ) {
      setError(true);
    } else {
      try {
        setError(false);
        dispatch(updateEmployee(updateData));
        alert("Employee updated successfully");
        navigate("/");
      } catch (error) {
        console.log(error);
        alert("Unable to update employee. Please try again later");
      }
    }
  }

  return (
    <div className=".container-fluid">
      <div className="form-container">
        <div className="back-container">
          <button
            className="back-container-button"
            onClick={() => navigate("/")}
          >
           back 
          </button>
        </div>
        <h2>Employee Details</h2>
        <form onSubmit={handleSubmit} className="employee-form">
          {error && (
            <div class="alert alert-danger" role="alert">
             All fields are required
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              name="Name"
              onChange={handleChange}
              value={formData.Name || ""}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="Enter email address"
              onChange={handleChange}
              value={formData.Email || ""}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              name="Department"
              placeholder="Enter department"
              value={formData.Department || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              placeholder="Enter role"
              name="Role"
              onChange={handleChange}
              value={formData.Role || ""}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfJoining">Date of joining</label>
            <input
              type="date"
              name="dateOfJoining"
              onChange={handleChange}
              value={formData.dateOfJoining || ""}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select name="Status" onChange={handleChange}>
              <option style={{ color: "green", fontSize: "15px" }}>
                Active
              </option>
              <option style={{ color: "red", fontSize: "15px" }}>
                Inactive
              </option>
            </select>
          </div>
          {Name && Role ? (
            <button
              type="button"
              className="submit-button"
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="submit-button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateandUpdate;
