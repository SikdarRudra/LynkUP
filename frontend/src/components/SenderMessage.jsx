import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function SenderMessage({ message }) {
  const { userData } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const scroll = useRef();
  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [message.message, message.image]);

  return (
    <div
      ref={scroll}
      className="w-fit max-w-[60%] border-4 border-white rounded-t-2xl rounded-bl-2xl rounded-br-0 px-[5px] py-[5px] relative ml-auto right-0 flex flex-col gap-[20px]"
    >
      {message.image && (
        <img
          src={message.image}
          alt=""
          className="h-[200px] object-cover  rounded-2xl"
        />
      )}

      {message.message && (
        <div className="text-[18px] text-white wrap-break-word">
          {message.message}
        </div>
      )}

      <div className="w-[15px] h-[15px]  rounded-full cursor-pointer overflow-hidden absolute right-[-10px] bottom-[-20px]">
        <img
          src={userData.profileImage}
          alt=""
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}

export default SenderMessage;
