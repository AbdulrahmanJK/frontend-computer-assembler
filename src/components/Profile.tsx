import React, { useState, useEffect } from "react";
import ProfileEditPopup from "./authorization/PatchProfile";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { fetchUserData } from "../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import AddAccessory from "./AddAccessory";

const Profile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddAccessoryOpen, setIsAddAccessoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.authReducer.currentUser);
  const token = useSelector((state: RootState) => state.authReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const handleAddAccessoryClick = () => {
    setIsAddAccessoryOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  console.log(user)
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
        <div role="status">{/* Ваш SVG код прелоадера */}</div>
      </div>
    );
  }

  return (
    <div className="bg-black font-josefin h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-2/3 h-2/3 flex flex-col justify-around items-center transform hover:scale-105 transition-transform duration-500">
        {user?.role === "Admin" ? (
          <h1 className="text-3xl text-center font-semibold text-green-500 my-6">
            Админская панель
          </h1>
        ) : null}
        <div className="text-center font-josefin">
          {user ? (
            <img
              src={user.avatarURL}
              alt="Аватар"
              className="w-40 h-40 rounded-full object-cover mb-4 shadow-lg hover:shadow-xl transform hover:rotate-6 transition-transform duration-300 rotate360"
            />
          ) : null}
          <h2 className="text-3xl font-semibold text-white font-josefin transform hover:rotate-6 transition-transform duration-300">
            {user?.username}
          </h2>
          <p className="text-white text-lg">{user?.email}</p>
          <p className="text-white mt-4">
            Адрес: {user?.adress ? user.adress : "Не указан"}
          </p>
        </div>
        <div className=" mt-4">
          {user?.role !== "Admin" && (
            <div>
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md text-lg transform hover:scale-110 transition-transform duration-300"
                onClick={handleEditClick}
              >
                Изменить профиль
              </button>
            </div>
          )}
          {user?.role === "Admin" && (
            <div>
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mt-2 text-lg transform hover:scale-110 transition-transform duration-300"
                onClick={handleAddAccessoryClick}
              >
                Добавить комплектующие
              </button>
            </div>
          )}
          <div>
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md mt-2 text-lg transform hover:scale-110 transition-transform duration-300"
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
