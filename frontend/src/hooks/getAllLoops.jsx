import { axiosInstance } from "./api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoopData } from "../redux/loopSlice";

function useGetAllLoops() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchloops = async () => {
      try {
        const result = await axiosInstance.get("/loop/getAll");
        dispatch(setLoopData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchloops();
  }, [dispatch, userData]);
}

export default useGetAllLoops;
