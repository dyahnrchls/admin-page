import axios from "axios";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";

const useGetPhotoList = (albumId: string | undefined) =>
  useQuery({
    queryKey: ["photo"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
      );
      return data;
    },
  });

export const usePhotoUtil = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { state } = useLocation();

  const { data, isLoading } = useGetPhotoList(albumId);

  return {
    data,
    isLoading,
    albumName: state?.albumName,
  };
};
