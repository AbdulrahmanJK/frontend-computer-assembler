import React, { useState, useEffect } from "react";
import ProfileEditPopup from "./authorization/PatchProfile";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { fetchUserData } from "../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import AddAccessory from "./AddAccessory"; // Импортируйте компонент для добавления аксессуаров

const Profile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddAccessoryOpen, setIsAddAccessoryOpen] = useState(false); // Состояние для отображения компонента добавления аксессуаров
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.authReducer.currentUser);
  const token = useSelector((state: RootState) => state.authReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const handleAddAccessoryClick = () => {
    setIsAddAccessoryOpen(true); // При нажатии на кнопку "Добавить аксессуары" открываем компонент добавления аксессуаров
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token)).then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, token]);

  if (isLoading) {
    return (
      <div className="bg-gray-1000 h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-purple-500 border-opacity-50"></div>
        <div role="status">
          {/* Ваш SVG код прелоадера */}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-1000 font-josefin h-screen flex flex-col items-center justify-center mx-auto">
      <div className="bg-gray-900 p-6 rounded-lg w-2/3 h-2/3 flex justify-around items-center">
        {user?.role === "Admin" ? (
          <h1 className="text-2xl text-center  font-semibold text-green-500">Админская панель</h1>
        ) : null}
        <div className="text-center font-josefin">
          {user ? (
            <img
              src={user.avatarURL}
              alt="Аватар"
              className="w-40 h-400 rounded-xl aspect-w-3 aspect-h-2 object-contain"
            />
          ) : null}
          <h2 className="text-2xl font-semibold text-white font-josefin">
            {user?.username}
          </h2>
          <p className="text-white">{user?.email}</p>
          <p className="text-white mt-4">
            Адрес: {user?.address ? user.address : "Не указан"}
          </p>
        </div>
        <div className="flex-col">
          {user?.role !== "Admin" && (
            <div>
              <button
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md"
                onClick={handleEditClick}
              >
                Изменить профиль
              </button>
            </div>
          )}
          {user?.role === "Admin" && (
            <div>
              <button
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                onClick={handleAddAccessoryClick}
              >
                Добавить аксессуары
              </button>
            </div>
          )}
          <div>
            <button
              className="mt-2 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md"
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>
      {user && isPopupOpen && (
        <ProfileEditPopup user={user} onClose={() => setIsPopupOpen(false)} />
      )}
      {isAddAccessoryOpen && (
        <AddAccessory onClose={() => setIsAddAccessoryOpen(false)} />
      )}
    </div>
  );
};

export default Profile;
