import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SingleUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);

  const [isPasswordModified, setIsPasswordModified] = useState(false); 
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.user);
  const userID = accessToken.currentUser.userId


  const fetchUser = () => {
    const config = {
      method: "GET",
      url: `https://assignment-6-761u.vercel.app/api/users/${id}`,
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
  },[id]);


  const updatehandleInput = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
    };
    

    if (isPasswordModified) {
      data.password = password;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken.currentUser.accessToken }`,
      },
    };
    if (/^\s*$/.test(name) || /^\s*$/.test(email)) {
      toast.error("Empty Space Found");
      return;
    }
   
    await axios.put(`https://assignment-6-761u.vercel.app/api/users/${id}`,data,config)
    navigate('/home');
    toast.success("Updated")
  };
 

  return userID == id ? (
      <div className='flex flex-col items-center justify-center h-screen'>
      <h1 
        className='text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-mono'
      >
        Update User
      </h1>
      <div className='flex flex-col border-none items-center justify-center p-4 rounded-lg m-6 relative  w-fit max-w-sm'>
        <form  className='flex flex-col  m-6' onSubmit={updatehandleInput}>
          <div className='flex flex-col m-3'>
            <label className=' font-bold font-mono w-fit text-2xl'>Name</label>
            <input  
              className='w-64 px-2 py-1 border rounded-lg m-2 text-teal-400 text-xl' 
              type='text' 
              placeholder='Enter Last Name' 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
            />
          </div>
        
          <div className='flex flex-col m-3'>
            <label className=' font-bold font-mono w-fit text-2xl'>Email</label>
            <input  
              className='w-64 px-2 py-1 border rounded-lg m-2 bg-gray-100 text-teal-400 text-xl' 
              type='email' 
              placeholder='Enter Email' 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
            />
          </div>
  
          <div className='flex flex-col m-3'>
          <div className="flex justify-between">
            <label className='m- font-bold font-mono w-fit text-2xl'>Password</label>
            <div onClick={() => setVisible(!visible)} className='cursor-pointer '>
                  {visible ? <EyeOff/> : <Eye/>}
            </div>
            </div>
  
            <input
              className='w-64 px-2 py-1 border rounded-lg m-2 text-teal-400 text-xl'
              type={visible ? 'password' : 'text'}
              placeholder='Enter Password'
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordModified(true);
              }}
            />        
          </div>
  
          <div className='flex items-center justify-center'>
            <button 
              className='rounded-lg text-xl font-bold bg-gray-400 w-24 font-mono text-center flex items-center justify-center hover:bg-green-400 p-2'
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <p>Not Autorized</p>
  );
};