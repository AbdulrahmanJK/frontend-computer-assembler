import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { registr } from "../../features/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

interface RegistrationForm {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationForm>({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.authReducer);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registr(formData))
      .then(() => {
        setRegistrationSuccess(true);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        if (error.response && error.response.status === 400) {
          // Обработка ошибки 400 Bad Request
          setValidationErrors(error.response.data.errors);
        } else {
          // Обработка других ошибок
          setRegistrationError("Произошла ошибка при регистрации.");
          setRegistrationSuccess(false); // Устанавливаем значение в false
        }
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Регистрация</h2>
        {status === "loading" && (
          <div className="mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        )}
        <p
          className={`mb-4 ${
            registrationSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {registrationError ||
            (registrationSuccess && "Вы успешно зарегистрировались!")}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-2 border rounded ${
                validationErrors.email ? "border-red-500" : ""
              }`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {validationErrors.email && (
              <p className="text-red-500 mt-1">{validationErrors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className={`w-full p-2 border rounded ${
                validationErrors.password ? "border-red-500" : ""
              }`}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {validationErrors.password && (
              <p className="text-red-500 mt-1">{validationErrors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
          >
            Регистрация
          </button>
        </form>
        <p>Если уже зарегистрированы: </p>
        <Link to="/auth">Войти</Link>
      </div>
    </div>
  );
};

export default Register;
