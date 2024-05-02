import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

const useGetCommentList = (postId: string | undefined, queryKey: string) =>
  useQuery({
    queryKey: ["comment", queryKey],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      return data;
    },
  });

const useGetPostById = (postId: string | undefined) =>
  useQuery({
    queryKey: ["postById"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      return data;
    },
  });

const useAddComment = () =>
  useMutation({
    mutationFn: (payload) =>
      axios.post("https://jsonplaceholder.typicode.com/comments", payload),
  });

const useUpdateComment = (id: number | undefined) =>
  useMutation({
    mutationFn: (payload) =>
      axios.patch(`https://jsonplaceholder.typicode.com/comments/${id}`, payload),
  });

const useDeleteComment = (id: number | undefined) =>
  useMutation({
    mutationFn: () =>
      axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`),
  });

export const useCommentUtil = () => {
  const { userId, postId } = useParams<{ userId: string; postId: string }>();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [commentId, setCommentId] = useState<number>();

  const [queryKey, setQueryKey] = useState<string>("");

  const { data, isLoading } = useGetCommentList(postId, queryKey);
  const { data: post } = useGetPostById(postId);

  const addComment = useAddComment();
  const updateComment = useUpdateComment(commentId);
  const deleteComment = useDeleteComment(commentId);

  const onCreate = () => {
    const payload = {
      title,
      body,
      userId: Number(userId),
    };

    addComment.mutate(payload as any, {
      onSuccess: (resp) => setQueryKey(`newComment-${resp?.data?.id}`),
    });
  };

  const onUpdate = () => {
    const payload = {
      id: postId,
      title,
      body,
      userId: Number(userId),
    };

    updateComment.mutate(payload as any, {
      onSuccess: (resp) => setQueryKey(`updateComment-${resp?.data?.id}`),
    });
  };

  const onDelete = () => {
    const payload = {};

    deleteComment.mutate(payload as any, {
      onSuccess: () => setQueryKey(`deleteComment-${postId}`),
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
    setCommentId,
    onDelete,
    post
  };
};
