// Profile.tsx

import React, { useState } from 'react';
import ProfileEditPopup from './authorization/PatchProfile';

const Profile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <div>
      <h2>Личный кабинет</h2>
      <p>Имя пользователя: Иван Иванов</p>
      <p>Email: ivan@example.com</p>
      <button onClick={handleEditClick}>Изменить профиль</button>

      {isPopupOpen && <ProfileEditPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Profile;
