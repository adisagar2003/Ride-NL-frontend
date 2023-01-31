import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { TfiCar } from "react-icons/tfi";
import MoonLoader from "react-spinners/ClipLoader";
import Taxi from "../Assets/Taxi.png";
import axios from "axios";
import usePostData from "../hooks/usePostData";
import DriverDetailsModal from "./DriverDetailsModal";
import { useSelector } from "react-redux";
export default function FindDriverModal(props, { setIsModal }) {
  const [loading, isLoading] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [apiLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [longitude, setLongitude] = useState(0);
  const [showDriverDetailsModal, setDriverDetailsModal] = useState({
    show: false,
  });
  const auth = useSelector((state) => state.auth.value);

  const formData = new FormData();
  useEffect(() => {
    console.log(auth, "Auth");
  }, [auth]);
  formData.append("latitude", latitude.toString().replace(/\s/g, ""));
  formData.append("longitude", longitude.toString().replace(/\s/g, ""));
  function fetchData(url, formData) {
    setLoading(true);
    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        setResponse(result.data.data);
        console.log(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        console.log(error);
        setLoading(false);
      });
  }

  return ReactDOM.createPortal(
    <div
      class="p-4 bg-slate-700/50"
      style={{
        position: "fixed",
        left: "50%",
        transform: "translate(-50%, -50%)",
        top: "50%",
        width: "100%",
        height: "100%",
        zIndex: 99,
      }}
    >
      <div class="relative items-center">
        <button onClick={(e) => setIsModal(false)}>Close Modal</button>
        <div className="relative  left-[50%] top-[50%] translate-x-[-50%] translate-y-[50%] bg-slate-300 md:w-1/2 w-auto h-auto flex flex-col">
          <div className="flex justify-center align-center mt-4">
            Choose a location in NL near you
            {showDriverDetailsModal.show && (
              <DriverDetailsModal
                name={showDriverDetailsModal.name}
                contact={showDriverDetailsModal.contact}
                cabName={showDriverDetailsModal.cabName}
              />
            )}
          </div>
          <div className="flex align-center justify-center mt-5 mb-5">
            <span
              onClick={() => {
                setLongitude(-52.75696212860289);
                setLatitude(47.56010412015611);
                setButtonDisabled(false);
              }}
              class="cursor-pointer hover:bg-blue-900 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-800 dark:text-blue-300"
            >
              Avalon Mall
            </span>
            {apiLoading && <div>Loading....</div>}
            <span
              onClick={() => {
                setLongitude(-52.73245579239056);
                setLatitude(47.57361816119957);
                setButtonDisabled(false);
              }}
              class="cursor-pointer hover:bg-gray-900 bg-gray-100 text-gray-800 hover:cursor text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
            >
              University
            </span>
            <span
              onClick={() => {
                setLongitude(-52.70672882416648);
                setLatitude(47.565891032812445);
                setButtonDisabled(false);
              }}
              class="cursor-pointer hover:bg-red-900 bg-red-100 text-red-800 hover:pointer text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-800 dark:text-red-300"
            >
              Downtown
            </span>
            <span
              onClick={() => {
                setLongitude(-52.804861120572085);
                setLatitude(47.52502829291922);
                setButtonDisabled(false);
              }}
              class="cursor-pointer hover:bg-green-900 bg-green-100 text-green-800 hover:pointer text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
            >
              Mt. Pearl
            </span>
          </div>
          <div className="flex justify-center hover:pointerx align-center "></div>
          <div className="grid place-center items-center justify-center hover:cursor-pointer align-center">
            <h1 className="text-2xl font-bold">Drivers Nearby</h1>
            {response != null &&
              response.map((data) => {
                console.log(data, "DATA");
                return (
                  <div className="flex items-center w-92 p-4 bg-slate-400 justify-between mt-4 mb-4">
                    <div className="">{data.name}</div>
                    <button
                      onClick={() =>
                        setDriverDetailsModal({
                          show: true,
                          name: data.name,
                          contact: data.email,
                          cabName: data.cabId.name,
                        })
                      }
                      className="p-2 bg-slate-700 text-slate-300 rounded-lg"
                    >
                      See more{" "}
                    </button>
                  </div>
                );
              })}
            {response?.length == 0 && <div>Sorry, no responses found</div>}
          </div>
          <button
            disabled={buttonDisabled}
            onClick={() =>
              fetchData(`${process.env.REACT_APP_API_URL}/api/v1/driver/find`, {
                longitude: longitude,
                latitude: latitude,
              })
            }
            className="grid items-center text-slate-300 duration-300 ease-in p-3 bg-slate-700 disabled:text-slate-500 disabled:bg-slate-300 bg-slate-500"
          >
            Find Nearby Drivers
          </button>
          {loading && (
            <div class="absolute top-0 left-0 w-full h-full grid items-center place-items-center bg-slate-900/50">
              <MoonLoader />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
