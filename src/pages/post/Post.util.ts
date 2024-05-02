import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

const useGetPostList = (userId: string | undefined, queryKey: string) =>
  useQuery({
    queryKey: ["post", queryKey],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      return data;
    },
  });

const useAddPost = () =>
  useMutation({
    mutationFn: (payload) =>
      axios.post("https://jsonplaceholder.typicode.com/posts", payload),
  });

const useUpdatePost = (id: number | undefined) =>
  useMutation({
    mutationFn: (payload) =>
      axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, payload),
  });

const useDeletePost = (id: number | undefined) =>
  useMutation({
    mutationFn: () =>
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`),
  });

export const usePostUtil = () => {
  const { userId } = useParams<{ userId: string }>();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [postId, setPostId] = useState<number>();

  const [queryKey, setQueryKey] = useState<string>("");

  const { data, isLoading } = useGetPostList(userId, queryKey);

  const addPost = useAddPost();
  const updatePost = useUpdatePost(postId);
  const deletePost = useDeletePost(postId);

  const onCreate = () => {
    const payload = {
      title,
      body,
      userId: Number(userId),
    };

    addPost.mutate(payload as any, {
      onSuccess: (resp) => setQueryKey(`newPost-${resp?.data?.id}`),
    });
  };

  const onUpdate = () => {
    const payload = {
      id: postId,
      title,
      body,
      userId: Number(userId),
    };

    updatePost.mutate(payload as any, {
      onSuccess: (resp) => setQueryKey(`updatePost-${resp?.data?.id}`),
    });
  };

  const onDelete = () => {
    const payload = {};

    deletePost.mutate(payload as any, {
      onSuccess: () => setQueryKey(`deletePost-${postId}`),
    });
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
  };
};
