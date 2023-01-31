import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

function DriverDetailsModal(props) {
  return ReactDOM.createPortal(
    <div className="absolute bottom-0 right-0 z-[100] bg-slate-700/80 w-[100%] h-screen flex align-center ">
      <div className=" relative p-4 w-[100%] flex justify-center  text-slate-300">
        <table className=" relative bg-zinc-900/50 md:w-[50%] w-[100%] ">
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Cab</th>
          </tr>
          <tr>
            <th>{props.name}</th>
            <th>{props.contact}</th>
            <th>{props.cabName}</th>
          </tr>

          <button
            onClick={(e) => alert("Sent request")}
            className="p-4 font-bold bg-slate-400 grid items-center text-zinc-900 absolute top-0"
          >
            Send Request
          </button>
        </table>
      </div>
    </div>,
    document.getElementById("details")
  );
}

export default DriverDetailsModal;
