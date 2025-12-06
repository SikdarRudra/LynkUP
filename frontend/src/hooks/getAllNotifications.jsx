import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationData } from "../redux/userSlice";
import { axiosInstance } from "./api";

function UseGetAllNotifications() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await axiosInstance.get("/user/getAllNotifications");
        dispatch(setNotificationData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
  }, [dispatch, userData]);
}

export default UseGetAllNotifications;
