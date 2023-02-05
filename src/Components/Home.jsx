import React, { useEffect, useState } from 'react'
import axios from "axios"
import SideBar from './SideBar';
import { AiOutlineSearch,AiOutlineMenu } from "react-icons/ai"
import Loader from "./Loader"
import Pagination from './Pagination';

function Home() {
   const [input, setInput] = useState("");
   const [books, setBooks] = useState([]);
   const [perPageShow, setPerPageShow] = useState(10);
   const [currentpage, SetCurrentpage] = useState(1);
   const [loading, setLoading] = useState(true);
   const[mobileShow, setMobileShow]=useState(false);
   const LastindexOfItems = currentpage * perPageShow;
   const FirstindexOfItems = LastindexOfItems - perPageShow;
   const CurrentBooks = books.slice(FirstindexOfItems, LastindexOfItems);
   const lastPage = books.length / perPageShow;
   useEffect(() => {
      const fetchBooks = async () => {

         try {
            const { data } = await axios.get(`https://openlibrary.org/search.json?q=${input}`);
            setBooks(data.docs)
            setLoading(false);
         }
         catch (error) {
            setLoading(false);
            console.log(error)

         }
      }
      fetchBooks();

   }, [input])

   const prevHandel = () => {
      if (currentpage > 1) {
         SetCurrentpage(currentpage - 1);
      }
   }

   const nextHandel = () => {

      if (currentpage < books.length / perPageShow) {
         SetCurrentpage(currentpage + 1);
      }


   }



   return (

      <>
         <div className="main">
             
             <div className="mobileShow" onClick={()=>setMobileShow(!mobileShow)}>
               <AiOutlineMenu/>
             </div>
            <SideBar show={mobileShow}/>
            <div className='main-1'>
               <div className='Search-bar'>
                  <input type="text" placeholder='Search Book By Titles or By Author' input={input} onChange={(e) => setInput(e.target.value)} />
                  <AiOutlineSearch />
               </div>

               {
                  loading ? <Loader /> : CurrentBooks.length > 0 ? (
                     <div className="seacrhContent">
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
                                 Array.from(CurrentBooks).map((i) => (
                                    <tr key={i.key}>
                                       <td>{i.title} {i.subtitle ? i.subtitle.substring(0, 20) + "..." : ""}</td>
                                       <td>{i.author_name ? i.author_name[0] : i.author_name}</td>
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

                     </div>
                  ) : ""
               }



            </div>




         </div>


      </>

   )
}

export default Home;