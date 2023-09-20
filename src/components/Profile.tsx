// Profile.tsx

import React, { useEffect, useState } from 'react';
import ProfileEditPopup from './authorization/PatchProfile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { fetchUsers } from '../features/AuthSlice';

const Profile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const users = useSelector((state) => state.authReducer.users)
  const dispatch = useDispatch<AppDispatch>()
  console.log(users);
  
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch]);

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <div>
      <h2>Личный кабинет</h2>
      {users.map((item)=>{
        return(
          <div>
            <span>{item.username}</span>

          </div>
        )
      })}
      <p>Email: ivan@example.com</p>
      <button onClick={handleEditClick}>Изменить профиль</button>

      {isPopupOpen && <ProfileEditPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Profile;
