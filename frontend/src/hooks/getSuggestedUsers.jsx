import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedUsers } from "../redux/userSlice";
import { axiosInstance } from "./api";

function useGetSuggestedUsers() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axiosInstance.get("/user/suggested");
        dispatch(setSuggestedUsers(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userData]);
}

export default useGetSuggestedUsers;
