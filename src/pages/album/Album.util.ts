import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const useGetAlbumList = (userId: string | undefined) =>
  useQuery({
    queryKey: ["album"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}/albums`
      );
      return data;
    },
  });

export const useAlbumUtil = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading } = useGetAlbumList(userId);

  return {
    data,
    isLoading,
    userId,
  };
};
