import React from "react";
import { useEffect, useState } from "react";
import { fetchUser } from "../API/fetchData";
import { getALlEmployee } from "../Redux and States/Slice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./List.css";
import Pagination from "./Pagination";

function List() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const employeeData = useSelector((state) => state.employee.employeeData);
  //Because in this first time dispatch fetchuser is async call ,so employee data not found
  // after the dispatch fetch user complete ,initialRender value is true ,so we  set dependecy array as initialRender
   const initialRender= useSelector((state) => state.employee.initialRender);

  useEffect(() => {
    if (!localStorage.getItem("employeeList")) {
      //Initially fetch the data from api  and store that in local storage
      dispatch(fetchUser());
      //Get the data and store the values in employeeData state
      dispatch(getALlEmployee());
      console.log(employeeData);
    } else {
      dispatch(getALlEmployee());
    }
  },[initialRender]);
  

  //Search for the name
  useEffect(() => {
    if(employeeData){
    const result = employeeData.filter((item) =>
      item.Name?.toLowerCase().includes(search.toLowerCase() || "")
    );
    setFilteredData(result);
  }
  }, [search, employeeData]);


  //Filter for Active and Inactive
  useEffect(() => {
    if(employeeData){
       const fiter = employeeData.filter((item) => {
      if (item.Status === filter) {
        return item;
      } else if (filter === "All") {
        return item;
      }
    }
    );
    console.log(fiter);
    setFilteredData(fiter);
  }
  }, [filter]);



  //It navigates through the edit page to pass the params
  function updateData(index) {
    let updateData = employeeData[index];
    let addIndexUpdate = { ...updateData, index: index };
    navigate("/Add-employee", { state: addIndexUpdate });
  }


  function pagination(index){
      let showsPerPage=6
      let currentPage=index
      // It takes lastIndex
      let lastIndex=currentPage*showsPerPage
      // It takes  firstIndex
      let firstIndex=lastIndex-showsPerPage
     let data= employeeData.slice(firstIndex,lastIndex)
     setFilteredData(data)
      
  }




  return (
    <div className="container-xl" >
        <div className="List-header">
          <h3><i className="fa-regular fa-address-book"></i>Employee List</h3>
        </div> 


    <div className="whole-container">
        <div className="List-table-search">
          <div className="List-add">
            <div className="filter-search">
              {/* Search  input*/}
              <input
                type="text"
                placeholder="Search employees..."
                className="search-input"
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* Filter for Active and Inactive */}
              <select onChange={(e) => setFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button
              className="List-add-employee"
              onClick={() => navigate("/Add-employee")}
            >
              Add employee +
            </button>
          </div>
          <table>
            <tr>
              <th>Employee Id</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.employeeId}</td>
                <td>{item.Name}</td>
                <td>{item.Role}</td>
                <td>
                  {" "}
                  {item.Status === "Active" ? (
                    <button type="button" class="btn btn-success">
                      Active
                    </button>
                  ) : (
                    <button type="button" class="btn btn-danger">
                      Inactive
                    </button>
                  )}
                </td>
                <td>
                  {" "}
                  <button
                    className="btn btn-outline-primary"
                    onClick={() =>{ 
                      //Find the index of the specific employee
                      let EmployeeIndex=employeeData.findIndex((Cur)=>{
                        
                        if(Cur.employeeId==item.employeeId){
                          return true
                        }else{
                          return false
                        }
                      })
                      updateData(EmployeeIndex)}
                  }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </table>
           <Pagination pagination={pagination}/>
        </div>
      </div>
    </div>
  );
}

export default List;
