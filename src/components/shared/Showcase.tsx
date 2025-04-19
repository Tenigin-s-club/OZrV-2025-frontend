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

export function Showcase() {
  const events = useSelector(uiSelectors.getEvents);
  const requests = useSelector(uiSelectors.getRequests);

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
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {events.map((event, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img src={event.image_url} />
                  <span className="text-3xl font-semibold">{event.title}</span>
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
