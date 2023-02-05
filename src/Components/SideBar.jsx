import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function SideBar({show}) {
   const navigate=useNavigate();
   const dispatch=useDispatch();

   const sidebarHandel=(value)=>{
    navigate('/subject')
    dispatch({
      type:"ADD_INPUT",
      payload:value
    })
  }
  
  return (

    <div className={show ?"sidebar show-mobile-sidebar" :"sidebar"} >

      <h2>Trending Subjects</h2>
       <input type="text" placeholder='Search Subject' onChange={(e)=>sidebarHandel(e.target.value)}  />

          <ul>
            <li onClick={()=>sidebarHandel("javascript")}>javascript</li>
             <li onClick={()=>sidebarHandel("Harry potter")}>Harry Potter</li>
             <li onClick={()=>sidebarHandel("Crypto currency")}>Crypto currency</li>
             <li onClick={()=>sidebarHandel("Criminal Law") }>Criminal Law</li>
          </ul>
    </div>
  
  )
}

export default SideBar;