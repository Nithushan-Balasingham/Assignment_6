import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from "../../redux/user/userSlice";
import Swal from 'sweetalert2'; 
import { toast } from 'react-toastify';
import { Edit, LogOut, Trash2 } from 'react-feather';


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [userId,setUserId] =useState('')
  const[ own,SetOwn] = useState('')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const accessToken = useSelector((state) => state.user);
  const userID = accessToken.currentUser.userId


  const [isPasswordModified, setIsPasswordModified] = useState(false); 

  const fetchUser = () => {
    const config = {
      method: "GET",
      url: `https://assignment-6-761u.vercel.app/api/users/${userID}`,
      headers: {
        Authorization: `Bearer ${accessToken.currentUser.accessToken }`,
      },
    };

    axios(config)
      .then((response) => {
        setName(response.data.name)
        setEmail(response.data.email)
        console.log(response)
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    fetchUser();
  },[]);
  const handleSignOut = () => {
    toast.success("LogOut Successfully", {position:"top-center"})
    dispatch(signOut());
  };

  const deleteUser = () => {

    const config = {
      method: "DELETE",
      url: `https://assignment-6-761u.vercel.app/${userID}`,
      headers: {
        Authorization: `Bearer ${accessToken.currentUser.accessToken }`,
      },

    };

    axios(config)
      .then((response) => {
        toast.success("Successfully Deleted The Account", {position:'top-center'})
        navigate('/')
      })
      .catch((error) => {
        console.error("Error deleting collection:", error);
        toast.error("Server Wrong", {position:"top-center"})
   
      });
  };

  return (
    <div 
      className=' w-full   items-center justify-center flex   md:h-screen xl:h-screen h-screen '>
    <div className='flex flex-col justify-center items-center shadow-xl p-16 rounded-lg shadow-black/20  '>
      <h1 
        className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-4xl font-bold'>
        Home
      </h1>
                
        <div className='m-4'>
              <div

              >
              <>
                  <div className='flex flex-col items-center justify-center'>
                  <p className='md:text-3xl sm:text-2xl text-blue-400 font-semibold m-2 '> Welcome {name}</p>              
                  <h4 className='md:text-3xl sm:text-2xl text-blue-400 font-semibold m-2 '>{email}</h4>
                
                  <hr/>
                  <div className='flex items-center justify-center mt-6'>
                    <div>
                        <Link to={`/update/${userID}`}>
                            <Edit
                                className='m-2 text-blue-500'    
                            />
                        </Link>
                       
                    </div>
                    <div>
                        <LogOut
                           className='m-2 text-rose-500'
                           onClick={() => {
                            Swal.fire({
                                title: 'Are you sure want log out?',
                                icon: 'info',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handleSignOut();
                                }
                            });
                            }} />
                    </div>
                    <div>
                        <Trash2
                            className='m-2 text-purple-500'
                            onClick={() => {
                            Swal.fire({
                                title: 'Are you sure want to Delete the Account?',
                                text: 'You will not be able to recover this Account!',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    deleteUser();}
                                    });
                                    }} 
                        />
                    </div>
                        </div>

              </div>
            </>
              
                </div>
              
        
        </div>
      
    </div>
    </div>
  )
}

export default Home