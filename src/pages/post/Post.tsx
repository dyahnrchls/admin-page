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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/@/components/ui/dialog";
import { Input } from "src/@/components/ui/input";
import { Label } from "src/@/components/ui/label";

export const PostPage = () => {
  const { data, setTitle, setBody, onCreate, setPostId, onUpdate, onDelete } =
    usePostUtil();

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
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  title
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  body
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
                Add Post{" "}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex justify-center my-6">
        <div className="flex flex-col gap-4">
          {data?.map(
            (item: {
              id: number;
              userId: number;
              title: string;
              body: string;
            }) => (
              <Card key={item?.id} className="w-[50rem] cursor-pointer">
                <CardHeader>
                  <CardTitle>{item?.title}</CardTitle>
                  <CardDescription>{item?.body}</CardDescription>
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
                            <Label htmlFor="username" className="text-right">
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
                          <Button type="submit" onClick={onUpdate}>
                            Save changes
                          </Button>
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
                            Title: {item.title}
                          </DialogDescription>
                          <DialogDescription>
                            Body: {item.body}
                          </DialogDescription>
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
    </div>
  );
};
