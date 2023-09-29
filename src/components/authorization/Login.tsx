import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../features/AuthSlice";
import { RootState } from "../../app/store";
import { AppDispatch } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
  username?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const token = useSelector((state: RootState) => state.authReducer.token);
  useSelector((state: RootState) => state.categorySlice.category);

  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector(
    (state: RootState) => state.authReducer
  );
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null); // Добавляем состояние для ошибки

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signIn(formData))
      .then(() => {
        // Вход успешен, очищаем ошибку
        setLoginError(null);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        if (error.response && error.response.status === 401) {
          // Ошибка 401 - Неправильный email или пароль
          setLoginError("Неправильный email или пароль");
        } else {
          // Другая ошибка
          setLoginError("Произошла ошибка при входе.");
        }
      });
  };

  if (token) {
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Авторизация</h2>
        {status === "loading" && (
          <div className="mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        )}
        {loginError && <p className="text-red-500 mb-4">{loginError}</p>} {/* Выводим ошибку входа */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <input
              required
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Войти
          </button>
        </form>
        <p>Если вы еще не зарегистрированы: </p>
        <button className="w-40 p-1 mt-2">
          <Link to="/register" className="text-black hover:text-white">
            Регистрация
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
