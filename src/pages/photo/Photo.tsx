import * as React from "react";
import { Card } from "src/@/components/ui/card";
import { usePhotoUtil } from "./Photo.util";
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

export const PhotoPage = () => {
  const { data, albumName } = usePhotoUtil();
  const [detail, setDetail] = React.useState<{
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  } | null>(null);

  return (
    <>
      <Dialog>
        <div className="flex justify-center my-6 flex-wrap gap-6">
          {data?.map(
            (item: {
              albumId: number;
              id: number;
              title: string;
              url: string;
              thumbnailUrl: string;
            }) => (
              <DialogTrigger key={item?.id} asChild>
                <Card
                  className="cursor-pointer w-[30%]"
                  onClick={() => setDetail(item)}
                >
                  <img src={item.url} alt={item.title} />
                </Card>
              </DialogTrigger>
            )
          )}
        </div>

        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Title:</DialogTitle>
            <DialogTitle>{detail?.title}</DialogTitle>
            <DialogDescription>Album Name: {albumName}</DialogDescription>
            <img src={detail?.url} alt={detail?.title} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
