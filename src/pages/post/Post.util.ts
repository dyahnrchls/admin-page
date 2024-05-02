import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

export const postQueryKey = {
  posts: () => ["posts"],
};

export const useGetPostList = (userId: string | undefined) =>
  useQuery({
    queryKey: postQueryKey.posts(),
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      return data;
    },
  });

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      axios.post("https://jsonplaceholder.typicode.com/posts", payload),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: postQueryKey.posts(),
      });
    },
  });
};

export const useUpdatePost = (id: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, payload),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: postQueryKey.posts(),
      });
    },
  });
};

export const useDeletePost = (id: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};

export const usePostUtil = () => {
  const { userId } = useParams<{ userId: string }>();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [postId, setPostId] = useState<number>();

  const { data, isLoading } = useGetPostList(userId);

  const addPost = useAddPost();
  const updatePost = useUpdatePost(postId);
  const deletePost = useDeletePost(postId);

  const onCreate = () => {
    const payload = {
      title,
      body,
      userId: Number(userId),
    };

    addPost.mutate(payload as any);
  };

  const onUpdate = () => {
    const payload = {
      id: postId,
      title,
      body,
      userId: Number(userId),
    };

    updatePost.mutate(payload as any);
  };

  const onDelete = () => {
    const payload = {};

    deletePost.mutate(payload as any);
  };

  return {
    data,
    isLoading,
    title,
    setTitle,
    body,
    setBody,
    onCreate,
    onUpdate,
    setPostId,
    onDelete,
    userId,
  };
};
