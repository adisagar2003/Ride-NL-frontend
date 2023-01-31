import React from "react";
import { useRef } from "react";

function Notification(props) {
  const notification = useRef();
  return (
    <div
      ref={notification}
      className="p-1 hover:bg-slate-600 text-2xl h-24 items-center    relative flex justify-between text-slate-400 cursor-default"
    >
      <div className="">{props.content}</div>
      <button
        onClick={() => (notification.current.style.display = "none")}
        className="mr-4 text-red-300 p-[0.5px]  scale-50 rounded-full w-10 h-10 mt-1 bg-slate-600 text-xl absolute right-0 top-[50%] translate-y-[-50%]"
      >
        X
      </button>
    </div>
  );
}

export default Notification;
