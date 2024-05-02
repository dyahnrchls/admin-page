import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/@/components/ui/card";
import { useAlbumUtil } from "./Album.util";
import { useLocation, useNavigate } from "react-router-dom";

export const AlbumPage = () => {
  const { data, userId } = useAlbumUtil();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col gap-4">
        {data?.map((item: { id: number; userId: number; title: string }) => (
          <Card
            key={item?.id}
            className="w-[50rem] cursor-pointer"
            onClick={() =>
              navigate(`${pathname.replace(`user/${userId}`, `${item.id}`)}`, {
                state: { albumName: item.title },
              })
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
