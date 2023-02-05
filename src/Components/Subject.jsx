import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader';
import Pagination from './Pagination';
import SideBar from './SideBar';

function Subject() {
  const { input } = useSelector((state) => state.subjectValue)
  const [subject, setSubject] = useState([]);
  const [perPageShow, setPerPageShow] = useState(10);
  const [currentpage, SetCurrentpage] = useState(1);
  const [loading, setLoading] = useState(true);
  const LastindexOfItems = currentpage * perPageShow;
  const FirstindexOfItems = LastindexOfItems - perPageShow;
  const CurrentSubject = subject.slice(FirstindexOfItems, LastindexOfItems);

  const lastPage=subject.length/perPageShow

  useEffect(() => {
    const fetchBooks = async () => {
      try{
        const { data } = await axios.get(`https://openlibrary.org/search.json?q=${input}`)
        setSubject(data.docs)
        setLoading(false)
      }
      catch(error)
      { setLoading(false);
        console.log(error)
      }
    }
    fetchBooks();

  }, [input])


  const prevHandel=()=>{
    if(currentpage>1)
    {
      SetCurrentpage(currentpage-1);
    }
  }

  const nextHandel=()=>{
     
    if(currentpage<subject.length/perPageShow)
    {
      SetCurrentpage(currentpage+1);
    }


  }


  return (

    <>
      <div className="main">
          <SideBar />
        <div className="main-1">
        
          <div className="Search-bar">
            <h1>{input?input:""}</h1>
          </div>

          {
            loading ? <Loader/> : ( 
              <div className="seacrhContent">
               {
                CurrentSubject.length>0? (
                  <>
                  <table>
                  <thead>
                     <tr>
                         <th>Title and Sub Title</th>
                          <th>Author</th>
                          <th>Latest Publish Year</th>
                          <th>First Publish Year</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                         Array.from(CurrentSubject).map((i) => (
                                <tr key={i.key}>
                                   <td>{i.title} {i.subtitle? i.subtitle.substring(0, 20)+"..." :""}</td>
                                  <td>{i.author_name?i.author_name[0]:i.author_name}</td>
                                  <td>{i.first_publish_year}</td>
                                  <td>{i.publish_year ? Math.max(...i.publish_year) : i.publish_year}</td>
                                  
                                </tr>
                             ))
                     }
                  </tbody>
                 </table>
                  <Pagination 
                  prevHandel={prevHandel}
                  nextHandel={nextHandel}
                  currentpage={currentpage}
                  lastPage={lastPage}
                  />
                  </>
                ):""
               }
              </div>
            )
          }
         
        

        </div>



      </div>

    </>
  )
}

export default Subject