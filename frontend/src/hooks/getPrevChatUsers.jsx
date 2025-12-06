import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrevChatUsers } from "../redux/messageSlice";
import { axiosInstance } from "./api";

function useGetPrevChatUsers() {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axiosInstance.get("/message/prevChats");
        dispatch(setPrevChatUsers(result.data));
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [messages]);
}

export default useGetPrevChatUsers;
