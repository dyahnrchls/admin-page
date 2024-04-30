import { useCallback, useEffect } from "react";
import { fetchUserLists, userListSelector } from "../../store/slices";
import { useAppDispatch, useAppSelector } from "../../store";

export const useUserUtil = (navigation: any) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(userListSelector);

  const handleNavigateToDetail = (id: string) => {
    navigation?.navigate("Detail", { id });
  };

  const handleNavigateToAdd = () => {
    navigation?.navigate("Add");
  };

  const getUserList = useCallback(() => {
    dispatch(fetchUserLists());
  }, [dispatch]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  return {
    handleNavigateToDetail,
    handleNavigateToAdd,
    users,
    getUserList,
  };
};
