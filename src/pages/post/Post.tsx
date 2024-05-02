import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/@/components/ui/card";
import { usePostUtil } from "./Post.util";

export const PostPage = () => {
  const { data } = usePostUtil();

  return (
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
              </CardHeader>
            </Card>
          )
        )}
      </div>
    </div>
  );
};
