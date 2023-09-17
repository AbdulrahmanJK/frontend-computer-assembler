// Register.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { registr } from "../../features/AuthSlice";

interface RegistrationForm {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationForm>({
    email: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Состояние для отслеживания успешной регистрации

  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.authReducer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registr(formData))
      .then(() => {
        setRegistrationSuccess(true); // Устанавливаем состояние успешной регистрации в true
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        {status === "loading" && (
          <div className="mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        )}
        {registrationSuccess && ( // Показываем сообщение при успешной регистрации
          <p className="text-green-500 mb-4">Вы успешно зарегистрировались!</p>
        )}
        {status === "failed" && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
