import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { uiSelectors } from "@/store/ui";
import { useSelector } from "react-redux";
import Loader from "./Loader/Loader";
import { useEffect } from "react";
import { fetchEvents } from "@/store/ui/thunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

export function Showcase() {
  const events = useSelector(uiSelectors.getEvents);
  const requests = useSelector(uiSelectors.getRequests);
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchEvents(dispatch);
  }, [dispatch]);
  if (requests["events"] === "pending")
    return (
      <div className="w-full max-w-sm">
        <Loader />
      </div>
    );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {events.map((event, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center aspect-square p-2 max-h-40 w-full">
                      <img
                        className="object-cover rounded w-auto h-[80%] max-sm:w-[30%]"
                        src={event.image_url}
                      />
                      <span className="text-xl font-semibold">
                        {event.title}
                      </span>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent
                  color="rgba(0,0,0,0.5)"
                  className="max-md:w-[90%] h-[50vh] w-[50%] rounded"
                >
                  <div className="flex gap-4 p-4 flex-col items-center justify-center aspect-square  ">
                    <img
                      className="rounded w-auto h-[80%] max-md:w-[90%] object-cover"
                      src={event.image_url}
                    />
                    <span className="text-xl font-semibold">{event.title}</span>
                    <span className="font-base text-black">
                      {event.description}
                    </span>
                    <Button>Записаться</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
