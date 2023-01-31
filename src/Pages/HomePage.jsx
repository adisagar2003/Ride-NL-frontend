import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import NavBar from "../Components/Navbar";
import FindDriverModal from "../Components/FindDriverModal";
import "leaflet/dist/leaflet.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { Model } from "../models/model";
import { BsBellFill } from "react-icons/bs";
import Notification from "../Components/Notification";
import useFetch from "../hooks/useFetch";
const socket = io("http://localhost:5000");
function HomePage() {
  const [isModal, setIsModal] = useState(false);
  const { response, error, loading } = useFetch(
    "http://localhost:5000/api/v1/user"
  );

  const [tool, showTool] = useState(false);
  const tooltip = useRef();
  const [setUserId] = useState(0);
  const [message] = useState("");

  function clickInModal() {
    setIsModal(true);
  }

  useEffect(() => {
    console.log("Hello");
    socket.on("connect", (socket) => {});

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  function broadcastElement(e) {
    e.preventDefault();
    if (message.length > 1) {
      socket.emit("chat message", message);
    }
  }
  socket.on("show element", (msg) => {
    console.log("work");
    alert(msg);
  });

  // Broadcasting element

  // Close on clicking outside the function

  //Modal For Ract

  return (
    <div className="">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <NavBar />
          {isModal && <FindDriverModal setIsModal={setIsModal} />}

          <div className="b-1 bg-slate-300 h-[320px]"> </div>
          <div className="mt-10 md:mr-0 md:ml-[20px] grid md:grid-cols-3 grid-cols-1 place-items-center">
            <div className="flex flex-col  items-left gap-4 md:block hidden">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl slate-600 font-bold">0</h2>
                <span className="text-xl slate-300 font-semibold text-slate-500">
                  Rides driven
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl slate-600 font-bold">20</h2>
                <span className="text-xl slate-300 font-semibold text-slate-500">
                  Drivers nearby
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl slate-600 font-bold">
                  {response.data ? response.data.data.length : "0"}+
                </h2>
                <span className="text-xl slate-300 font-semibold text-slate-500">
                  Current Users
                </span>
              </div>
            </div>

            <div className="flex flex-col mb-auto h-full   items-left gap-4">
              <div className="w-60 bg-slate-300 h-48">
                <Canvas camera={{ fov: 35, zoom: 1.3, near: 1, far: 1000 }}>
                  <OrbitControls />
                  <pointLight position={[10, 0, 10]} />
                  <pointLight position={[-10, 0, -10]} />
                  <pointLight position={[10, 0, 10]} />
                  <Model />
                  <OrbitControls />
                  <Stats />
                </Canvas>
              </div>
              <button
                className="mt-auto p-3 rounded-xl bg-slate-300 hover:bg-slate-700 hover:text-slate-300 ease-in duration-100"
                onClick={clickInModal}
              >
                Find a driver
              </button>
            </div>
            <div className="flex flex-col relative  items-left gap-4 md:block hidden">
              <div
                ref={tooltip}
                onClick={() => showTool(true)}
                className="text-slate-700 text-4xl p-8 rounded-full bg-slate-300 hover:bg-slate-700 hover:text-slate-300 duration-100 ease-in hover:cursor-pointer "
              >
                <BsBellFill />
                {tool && (
                  <div
                    className={`absolute right-20 h-22 w-96 bottom-24 h-96 bg-slate-700`}
                  >
                    Push notifications coming soon
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
