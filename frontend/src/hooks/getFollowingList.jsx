import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing } from "../redux/userSlice";
import { axiosInstance } from "./api";

function useGetFollowingList() {
  const dispatch = useDispatch();
  const { storyData } = useSelector((state) => state.story);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axiosInstance.get("/user/followingList");
        dispatch(setFollowing(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [storyData]);
}

export default useGetFollowingList;
