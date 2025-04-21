import { useDispatch, useSelector } from "react-redux";
import {
  followUserAsync,
  unfollowUserAsync,
} from "../features/users/usersSlice";
import {
  addNewFollower,
  removeExistingFollower,
} from "../features/auth/authSlice";

export const useFollower = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleFollowUser = async (followedUser) => {
    if (!user || !followedUser) return;

    const userId = user._id;
    const followedUserId = followedUser._id;

    try {
      if (!user.following.includes(followedUserId)) {
        const result = await dispatch(
          followUserAsync({ userId, followedUserId })
        );
        if (followUserAsync.fulfilled.match(result)) {
          dispatch(addNewFollower({ followedUserId }));
        }
      } else {
        const result = await dispatch(
          unfollowUserAsync({ userId, unfollowedUserId: followedUserId })
        );
        if (unfollowUserAsync.fulfilled.match(result)) {
          dispatch(
            removeExistingFollower({ unfollowedUserId: followedUserId })
          );
        }
      }
    } catch (error) {
      console.error("Follow/unfollow failed:", error);
    }
  };

  return { handleFollowUser };
};
