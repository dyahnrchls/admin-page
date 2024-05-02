import * as React from "react";
import { Card, CardHeader, CardTitle } from "src/@/components/ui/card";
import { useAlbumUtil } from "./Album.util";
import { useLocation, useNavigate } from "react-router-dom";
import { Skeleton } from "src/@/components/ui/skeleton";

export const AlbumPage = () => {
  const { data, userId, isLoading } = useAlbumUtil();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-4">Album List</h1>
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item) => (
              <Skeleton key={item} className="h-10 w-[50rem]" />
            ))
          : data?.map((item: { id: number; userId: number; title: string }) => (
              <Card
                key={item?.id}
                className="w-[50rem] cursor-pointer"
                onClick={() =>
                  navigate(
                    `${pathname.replace(`user/${userId}`, `${item.id}`)}`,
                    {
                      state: { albumName: item.title },
                    }
                  )
                }
              >
                <CardHeader>
                  <CardTitle>{item?.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
      </div>
    </div>
  );
};
