// Login.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../features/AuthSlice";
import { RootState } from "../../app/store";
import { AppDispatch } from "../../app/store";
import style from '../../css/auth.module.css'
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}


const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const token =  useSelector((state) => state.authReducer.token);
  useSelector((state) => state.categorySlice.category);

 
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.authReducer);
  const navigate = useNavigate()
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signIn(formData));
    

  };
  if(token){
    navigate('/')

  }
  return (
    <div className={style.rod_auth}>
    <div className="flex justify-center items-center ">
      <div className="w-96 p-8 bg-white rounded shadow-md block">
        <h2 className="text-2xl font-semibold mb-4">Авторизация</h2>
        {status === "loading" && (
          <div className="mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
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
            Войти
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;

