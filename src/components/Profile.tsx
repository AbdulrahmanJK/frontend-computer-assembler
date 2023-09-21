import React, { useState, useEffect } from 'react';
import ProfileEditPopup from './authorization/PatchProfile';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { fetchUserData } from '../features/AuthSlice';

const Profile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const user = useSelector((state: RootState) => state.authReducer.currentUser);
  const token = useSelector((state: RootState) => state.authReducer.token);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token)).then(() => {
        console.log(user?.username);
      });
    }
  }, [dispatch, token]);
  console.log(user?.username)
  return (
    <div className="text-white">
      <h2>Личный кабинет</h2>
      {user ? ( // Проверяем, что user не является null или undefined
        <>
          <p>Имя пользователя: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Загрузка данных...</p>
      )}
      <button onClick={handleEditClick}>Изменить профиль</button>

      {isPopupOpen && <ProfileEditPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Profile;
