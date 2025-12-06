import { useDispatch, useSelector } from "react-redux";
import { toggleFollow } from "../redux/userSlice";
import { axiosInstance } from "../hooks/api";

function FollowButton({ targetUserId, tailwind, onFollowChange }) {
  const { following } = useSelector((state) => state.user);
  const isFollowing = following.includes(targetUserId);
  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      const result = await axiosInstance.get(`/user/follow/${targetUserId}`);
      if (onFollowChange) {
        onFollowChange();
      }
      dispatch(toggleFollow(targetUserId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className={tailwind} onClick={handleFollow}>
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
