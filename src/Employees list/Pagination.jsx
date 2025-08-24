import './Pagination.css'
import { useState } from 'react';

function Pagination({pagination}) {
  const[page,setPage]=useState([1,2,3])

  //increment the pages
  function handleIncrement()
  {
    if(page[0]>1){
     let value=page.map((cur)=>cur-3)
        setPage(value)
    }
  }
 //decrement the pages
  function handleDecrement()
  {
     let value=page.map((cur)=>cur+3)
        setPage(value)
  }
  return (
    <div className="pagination-container">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link"  onClick={()=>handleIncrement()}style={{cursor:"pointer"}}>
              Previous
            </a>
          </li>
       {/* Pagination number */}
         {page.map((cur)=>{
          return(
           <li className="page-item">
             <a className="page-link"  onClick={()=>pagination(cur)} style={{cursor:"pointer"}}>
             {cur}
            </a>
          </li>)})} 
          <li className="page-item">
            <a className="page-link"  onClick={()=>handleDecrement()} style={{cursor:"pointer"}}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
