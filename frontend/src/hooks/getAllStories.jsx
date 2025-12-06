import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoryList } from "../redux/storySlice";
import { axiosInstance } from "./api";

function useGetAllStories() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { storyData } = useSelector((state) => state.story);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const result = await axiosInstance.get("/story/getAll");
        dispatch(setStoryList(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchStories();
  }, [userData, storyData]);
}

export default useGetAllStories;
