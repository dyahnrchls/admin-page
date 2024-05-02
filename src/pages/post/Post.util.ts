import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const useGetUserList = (userId: string | undefined) =>
  useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      return data;
    },
  });

export const usePostUtil = () => {
  const { userId } = useParams<{ userId: string }>();

  const { status, data, error, isLoading } = useGetUserList(userId);

  return {
    data,
    isLoading,
  };
};
