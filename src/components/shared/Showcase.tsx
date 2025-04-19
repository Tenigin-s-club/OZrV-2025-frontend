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
              <Card>
                <CardContent className="flex flex-col items-center justify-center aspect-square p-2 max-h-40 w-full">
                  <img
                    className="rounded w-auto h-[80%] max-sm:w-[30%]"
                    src={event.image_url}
                  />
                  <span className="text-xl font-semibold">{event.title}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
