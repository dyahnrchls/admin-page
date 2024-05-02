import axios from 'axios'
import { useQuery } from 'react-query';

const useGetUserList = () => (
  useQuery({
   queryKey: ['users'],
   queryFn: async () => {
     const { data } = await axios.get(
       'https://jsonplaceholder.typicode.com/users',
     )
     return data
   },
 })
);

export const useHomeUtil = (navigation: any) => {

  const { data, isLoading } = useGetUserList()

  const handleNavigateToDetail = (id: string) => {
    navigation?.navigate("Detail", { id });
  };

  const handleNavigateToAdd = () => {
    navigation?.navigate("Add");
  };


  return {
    handleNavigateToDetail,
    handleNavigateToAdd,
    users: data,
    isLoading
  };
};
