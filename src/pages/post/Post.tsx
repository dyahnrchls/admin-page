import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/@/components/ui/card";
import { usePostUtil } from "./Post.util";
import { Button } from "src/@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/@/components/ui/dialog";
import { Input } from "src/@/components/ui/input";
import { Label } from "src/@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "src/@/components/ui/toaster";
import { Skeleton } from "src/@/components/ui/skeleton";

export const PostPage = () => {
  const {
    data,
    setTitle,
    setBody,
    onCreate,
    setPostId,
    onUpdate,
    onDelete,
    userId,
    isLoading,
  } = usePostUtil();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div>
      <div className="mt-6 flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Post</DialogTitle>
              <DialogDescription>
                If you edit/create/delete, it won't change the data on the
                server because the REST API being used is only a mock.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Body
                </Label>
                <Input
                  id="body"
                  className="col-span-3"
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit" onClick={onCreate}>
                  Add Post{" "}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex justify-center my-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-4">Post List</h1>
          {isLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item) => (
                <Skeleton key={item} className="h-20 w-[50rem]" />
              ))
            : data?.map(
                (item: {
                  id: number;
                  userId: number;
                  title: string;
                  body: string;
                }) => (
                  <Card key={item?.id} className="w-[50rem] cursor-pointer">
                    <CardHeader>
                      <div
                        onClick={() =>
                          navigate(
                            `${pathname.replace(
                              `posts/user/${userId}`,
                              `comments/post/${item.id}`
                            )}`,
                            {
                              state: { albumName: item.title },
                            }
                          )
                        }
                      >
                        <CardTitle>{item?.title}</CardTitle>
                        <CardDescription>{item?.body}</CardDescription>
                      </div>
                      <div className="flex justify-end gap-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => setPostId(item.id)}
                              className="text-black bg-white border"
                            >
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Post</DialogTitle>
                              <DialogDescription>
                                If you edit/create/delete, it won't change the
                                data on the server because the REST API being
                                used is only a mock.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Title
                                </Label>
                                <Input
                                  id="title"
                                  defaultValue={item.title}
                                  className="col-span-3"
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  Body
                                </Label>
                                <Input
                                  id="body"
                                  defaultValue={item.body}
                                  className="col-span-3"
                                  onChange={(e) => setBody(e.target.value)}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose>
                                <Button type="submit" onClick={onUpdate}>
                                  Save changes
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Button onClick={() => setPostId(item.id)}>
                                Delete
                              </Button>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                Are you sure want to delete this post?
                              </DialogTitle>
                              <DialogDescription>
                                If you edit/create/delete, it won't change the
                                data on the server because the REST API being
                                used is only a mock.
                              </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                              <DialogClose>
                                <Button type="submit" onClick={onDelete}>
                                  Delete
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                  </Card>
                )
              )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};
