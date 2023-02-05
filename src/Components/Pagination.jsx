import React from 'react'

import {AiFillCaretRight, AiFillCaretLeft} from "react-icons/ai"
function Pagination({prevHandel, nextHandel, currentpage, lastPage}) {
     let isDisable=false;
     let isdisable1=false;
    if(currentpage===1){
       isDisable=true
    }
    if(currentpage===lastPage)
    {
        isdisable1=true;
    }
  return (
    <div className="pagination">
        <button disabled={isDisable} className={isDisable?'DisableBtn':''} onClick={prevHandel}><AiFillCaretLeft/> Previous </button>
        <button disabled={isdisable1} className={isdisable1?'DisableBtn':''} onClick={nextHandel}>Next <AiFillCaretRight/></button>
    </div>
  )
}

export default Pagination