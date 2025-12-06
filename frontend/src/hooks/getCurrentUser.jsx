import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { setCurrentUserStory } from "../redux/storySlice";
import { axiosInstance } from "./api";

function useGetCurrentUser() {
  const dispatch = useDispatch();
  const { storyData } = useSelector((state) => state.story);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axiosInstance.get("/user/current");
        dispatch(setUserData(result.data));
        dispatch(setCurrentUserStory(result.data.story));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [storyData]);
}

export default useGetCurrentUser;
