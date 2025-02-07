import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { ProfileApi } from '../../api/profileApi';
import { toast } from 'react-toastify';
import { updateUser } from '../../reducers/authSlice';

export interface IUser {
  photo: {
    url: string;
    publicId: string;
  };
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string; 
  byteId: string; 
  country: string;
  isEnabled: boolean;
  lastLogin: string; // Assuming ISO 8601 format
}

const Profile = () => {
  const dispatch = useAppDispatch();
  const user: IUser = useAppSelector((state) => state.auth.user);

  console.log(user);

  const [userData, setUserData] = useState<IUser>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
  }

  // const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    console.log(file);

    ProfileApi.uploadProfileImage(file)
      .then((data) => {
        console.log(data);
        if (data.user) {
          dispatch(updateUser(data.user));
        }
        toast.success('Profile image uploaded successfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Profile image upload failed');
      });
  }

  return (
    <div className='max-w-[800px] mx-auto mt-4 px-4'>
      <h1
        className='text-2xl font-bold mb-10'
      >Profile</h1>

      {/* profile image */}
      <div>
        <img
          className='w-36 h-32 rounded-3xl mb-10 text-center m-auto object-cover'
          src={userData.photo.url || 'https://avatar.iran.liara.run/public/boy?username=Ash'} alt="profile" />

        <label htmlFor="" className='block text-center m-auto'>
          UpdateProfile Image
        </label>
        <input
          className='text-center block m-auto'
        type="file" id="photo" name="photo" onChange={(e) => handleProfileImage(e)} />
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className='mb-4'
        >
          <label htmlFor="firstName">First Name</label>
          <input 
            className='border border-gray-300 rounded-md p-2 block w-full'
          type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} />
        </div>
        <div
          className='mb-4'
        >
          <label htmlFor="lastName">Last Name</label>
          <input
            className='border border-gray-300 rounded-md p-2 block w-full'
            type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} />
        </div>
        <div
          className='mb-4'
        >
          <label htmlFor="email">Email</label>
          <input
            className='border border-gray-300 rounded-md p-2 block w-full'
            type="email" id="email" name="email" value={userData.email} onChange={handleChange} />
        </div>
        <div
          className='mb-4'
        >
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            className='border border-gray-300 rounded-md p-2 block w-full'
            type="text" id="phoneNumber" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
        </div>
        {/* byteId */}
        <div
          className='mb-4'
        >
          <label htmlFor="byteId">Byte ID</label>
          <input
            className='border border-gray-300 rounded-md p-2 block w-full'
            type="text" id="byteId" name="byteId" value={userData.byteId.toUpperCase()} onChange={handleChange} />
        </div>
        <button
          className='bg-blue-500 text-white rounded-md p-2 block w-full'
          type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Profile