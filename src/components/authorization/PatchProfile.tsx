// ProfileEditPopup.tsx

import React, { useState } from 'react';

interface ProfileEditPopupProps {
  onClose: () => void;
}

const ProfileEditPopup: React.FC<ProfileEditPopupProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [avatarURL, setAvatarURL] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          Закрыть
        </button>
        <h3>Изменить профиль</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Новый никнейм:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Новая ссылка на аватар:
              <input
                type="text"
                value={avatarURL}
                onChange={(e) => setAvatarURL(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPopup;
