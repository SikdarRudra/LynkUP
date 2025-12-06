import { useState } from "react";
import logo from "../assets/logo.png";
import { FaRegHeart } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import OtherUser from "./OtherUser";
import Notifications from "../pages/Notifications";
import dp from "../assets/dp.webp";
import { axiosInstance } from "../hooks/api";

function LeftHome() {
  const { userData, suggestedUsers, notificationData } = useSelector(
    (state) => state.user
  );
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await axiosInstance.get(`/auth/signout`);
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-[25%] hidden lg:flex flex-col h-[100vh] border-r border-[#2a2a5a]
      bg-gradient-to-b from-[#0a0f2c] via-[#1a103d] to-[#120021]
      ${
        showNotification ? "overflow-hidden" : "overflow-auto"
      } transition-all duration-300`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-5 border-b border-[#2a2a5a] sticky top-0 z-50 bg-[#0d0b2c]/70 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="w-[80px]" />
        </div>

        <div
          className="relative cursor-pointer p-2 rounded-full hover:bg-white/10 transition"
          onClick={() => setShowNotification((prev) => !prev)}
        >
          <FaRegHeart className="text-white w-6 h-6 hover:scale-110 transition-transform duration-200" />
          {notificationData?.length > 0 &&
            notificationData.some((n) => n.isRead === false) && (
              <div className="absolute top-[6px] right-[6px] w-[10px] h-[10px] bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full shadow-md"></div>
            )}
        </div>
      </div>

      {/* Main Content */}
      {!showNotification && (
        <>
          {/* User Info */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a5a] bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-[65px] h-[65px] rounded-full border-2 border-transparent bg-gradient-to-tr from-pink-500 to-blue-500 p-[2px]">
                <img
                  src={userData.profileImage || dp}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <div className="text-white font-semibold text-[17px]">
                  {userData.userName}
                </div>
                <div className="text-gray-400 text-[14px]">{userData.name}</div>
              </div>
            </div>

            <button
              onClick={handleLogOut}
              className="flex items-center gap-1 text-[14px] text-cyan-400 font-semibold hover:text-pink-400 transition"
            >
              <FiLogOut className="w-4 h-4" />
              Log out
            </button>
          </div>

          {/* Suggested Users */}
          <div className="flex flex-col gap-4 p-5">
            <h1 className="text-white text-[18px] font-semibold tracking-wide">
              Suggested for You
            </h1>
            <div className="flex flex-col gap-3">
              {suggestedUsers &&
                suggestedUsers.slice(0, 3).map((user, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white/5 hover:bg-white/10 transition p-2 border border-transparent hover:border-[#4a3fff] shadow-[0_0_10px_#4a3fff33]"
                  >
                    <OtherUser user={user} />
                  </div>
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto text-center py-5 text-gray-500 text-sm tracking-wide border-t border-[#2a2a5a]">
            © 2025{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b61ff] to-[#ff67d8] font-semibold">
              LynkUp
            </span>
          </div>
        </>
      )}

      {/* Notifications Panel */}
      {showNotification && (
        <div className="flex-1 bg-[#0f0f2c]/80 backdrop-blur-md">
          <Notifications />
        </div>
      )}
    </div>
  );
}

export default LeftHome;
