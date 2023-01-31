import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../Slices/LoginSlice";
import { Lock } from "../models/lock";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
function SignIn() {
  const userData = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const Login = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/user/login`, {
        userName: userName,
        password: password,
      })
      .then((result) => {
        dispatch(login({ isLoggedIn: true, ...result.data.data }));
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="w-screen h-screen bg-slate-800 flex justify-center items-center gap-20 ">
      <div className="w-96 text-slate-100 h-[90%] bg-slate-300 flex flex-col items-center relative justify-center">
        <h1 className="text-base absolute top-4 text-slate-800 font-bold left-4 ">
          Ride NL
        </h1>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col">
            <h1 className="font-bold text-4xl text-slate-800">Welcome back</h1>
            <p className="text-xl text-slate-700">
              Continue to enter your information
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <input
              placeholder=""
              onChange={(e) => setUserName(e.target.value)}
              className="text-slate-700 pl-3 pt-3 pb-3 rounded-lg"
            />
            <input
              placeholder=""
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="text-slate-700 pl-3 pt-3 pb-3 rounded-lg"
            />
            <button
              onClick={Login}
              className="p-3 disabled:bg-slate-400 bg-slate-700 rounded-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className=" h-[90%] md:w-[60%] hidden md:block bg-slate-300">
        <Canvas
          gl={{ logarithmicDepthBuffer: true }}
          shadows
          camera={{ position: [-15, 0, 10], fov: 25 }}
        >
          <Suspense>
            <OrbitControls />
            <pointLight position={[10, 0, 10]} />
            <pointLight position={[-10, 0, -10]} />
            <pointLight position={[10, 0, 10]} />
            <Lock />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default SignIn;
