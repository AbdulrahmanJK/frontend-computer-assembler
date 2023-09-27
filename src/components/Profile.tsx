import React, { useState, useEffect } from 'react';
import ProfileEditPopup from './authorization/PatchProfile';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { fetchUserData } from '../features/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const user = useSelector((state: RootState) => state.authReducer.currentUser);
  const token = useSelector((state: RootState) => state.authReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token)).then(() => {
      });
    }
  }, [dispatch, token]);

  return (
    <div className="bg-gray-900 h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-80">
        <div className="text-center">
          {user ? (
            <img
              src={user.avatarURL}
              alt="Аватар"
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
          ) : null}
          <h2 className="text-2xl font-semibold">{user?.username}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
          onClick={handleEditClick}
        >
          Изменить профиль
        </button>
        <button
          className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </button>
      </div>
      {user && isPopupOpen && (
        <ProfileEditPopup user={user} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
};

export default Profile;
