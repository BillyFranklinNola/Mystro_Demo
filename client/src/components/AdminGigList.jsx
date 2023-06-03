// import React, {useEffect, useState} from 'react'
// import {useNavigate, Link} from 'react-router-dom'
// import axios from 'axios'
// import DeleteButton from './DeleteButton'

// const DisplayAll = (props) => {
//     const [allMusicians, setAllMusicians] = useState([])
//     const navigate = useNavigate();
//     useEffect(() => {
//         axios.get('http://localhost:8000/api/musicians/list')
//         .then((res)=>{
//             console.log(res.data);
//             setAllMusicians(res.data);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })}, [])
        
//     const deleteMusician = (id) => {
//         axios.delete(`http://localhost:8000/api/players/deleteMusician/${id}`)
//         .then((res)=>{
//             console.log(res);
//             setAllMusicians(allMusicians.filter((musician) => musician._id !== id))
//             navigate('/musicians/list')
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
//     }

// return (
//     <div className='col-10 p-3 border border-dark rounded mx-auto p-5'>
//         <table className='table table-striped border border-dark rounded mx-auto'>
//             <thead>
//                 <tr>
//                     <th scope='col' className='col-4 text-start'>Name</th>
//                     <th scope='col' className='text-start'>Instrument</th>
//                     <th scope='col'>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                 allMusicians.map((musician)=>{
//                 return(
//                     <tr key={musician._id}>
//                         <td className='text-start'>{musician.firstName} {musician.lastName}</td>
//                         <td className='text-start'>{musician.position}</td>
//                         <td>
//                             <div className='d-flex justify-content-around mx-auto'>
//                                 <Link className='btn btn-primary' to={`/musicians/editMusician/${musician._id}`}>Edit</Link>
//                                 <DeleteButton className='btn btn-danger' id={musician._id} successCallback={()=>deleteMusician(musician._id)}/>
//                             </div>
//                         </td>
//                     </tr>
//                     )
//                 })
//                 }
//             </tbody>
//         </table>
//     </div>
// )}

// export default DisplayAll