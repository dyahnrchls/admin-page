import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/@/components/ui/card";
import { useCommentUtil } from "./Comment.util";
import { Button } from "src/@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/@/components/ui/dialog";
import { Input } from "src/@/components/ui/input";
import { Label } from "src/@/components/ui/label";
import { Toaster } from "src/@/components/ui/toaster";
import { Skeleton } from "src/@/components/ui/skeleton";

export const CommentPage = () => {
  const {
    data,
    setTitle,
    setBody,
    onCreate,
    setCommentId,
    onUpdate,
    onDelete,
    post,
    isLoading,
    isLoadingPostById,
  } = useCommentUtil();

  return (
    <div>
      <div className="mt-6 flex justify-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Post</h1>

          {isLoadingPostById ? (
            <Skeleton className="h-20 w-[50rem]" />
          ) : (
            <Card className="w-[50rem] cursor-pointer">
              <CardHeader>
                <CardTitle>{post?.title}</CardTitle>
                <CardDescription>{post?.body}</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Comment</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Comment</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Email
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Comment
                </Label>
                <Input
                  id="body"
                  className="col-span-3"
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={onCreate}>
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-center my-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-4">Comments</h1>
          {isLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item) => (
                <Skeleton key={item} className="h-20 w-[50rem]" />
              ))
            : data?.map(
                (item: {
                  id: number;
                  userId: number;
                  email: string;
                  body: string;
                }) => (
                  <Card key={item?.id} className="w-[50rem] cursor-pointer">
                    <CardHeader>
                      <CardTitle>{item?.email}</CardTitle>
                      <CardDescription>{item?.body}</CardDescription>
                      <div className="flex justify-end gap-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => setCommentId(item.id)}
                              className="text-black bg-white border"
                            >
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Comment</DialogTitle>
                            </DialogHeader>
                            <Input
                              id="body"
                              defaultValue={item.body}
                              onChange={(e) => setBody(e.target.value)}
                            />
                            <DialogFooter>
                              <Button type="submit" onClick={onUpdate}>
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Button onClick={() => setCommentId(item.id)}>
                                Delete
                              </Button>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                Are you sure want to delete this comment?
                              </DialogTitle>

                              <DialogDescription>{item.body}</DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                              <Button type="submit" onClick={onDelete}>
                                Delete
                              </Button>
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
