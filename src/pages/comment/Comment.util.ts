import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useToast } from "src/@/components/ui/use-toast";

export const commentQueryKey = {
  comments: () => ["comments"],
};

const useGetCommentList = (postId: string | undefined) =>
  useQuery({
    queryKey: commentQueryKey.comments(),
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

const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      axios.post("https://jsonplaceholder.typicode.com/comments", payload),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: commentQueryKey.comments(),
      });
    },
  });
};

const useUpdateComment = (id: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      axios.patch(
        `https://jsonplaceholder.typicode.com/comments/${id}`,
        payload
      ),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: commentQueryKey.comments(),
      });
    },
  });
};

const useDeleteComment = (id: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: commentQueryKey.comments(),
      });
    },
  });
};

export const useCommentUtil = () => {
  const { toast } = useToast();

  const { userId, postId } = useParams<{ userId: string; postId: string }>();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [commentId, setCommentId] = useState<number>();

  const { data, isLoading } = useGetCommentList(postId);
  const { data: post, isLoading: isLoadingPostById } = useGetPostById(postId);

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
      onSuccess: () => {
        toast({
          title: "Comment Created Successfully",
        });
      },
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
      onSuccess: () => {
        toast({
          title: "Comment Updated Successfully",
        });
      },
    });
  };

  const onDelete = () => {
    const payload = {};

    deleteComment.mutate(payload as any, {
      onSuccess: () => {
        toast({
          title: "Comment Deleted Successfully",
        });
      },
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
    post,
    isLoadingPostById
  };
};
