import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";
import Image from "next/image";

const CarouselView = ({ stories, currentStory, setStories }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (stories[currentStory].images.length - 1 === current) {
      const updatedStories = stories.map((story) => {
        if (story.userName === stories[currentStory].userName) {
          return { ...story, seen: true };
        }
        return story;
      });
      setStories(updatedStories);
    }
  }, [current]);

  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
        setApi={setApi}
        className="w-full max-w-md mx-auto"
      >
        <CarouselContent className="md:mx-auto">
          {stories[currentStory] &&
            stories[currentStory].images.map((img, i) => (
              <CarouselItem
                key={i}
                className="md:flex items-center justify-center"
              >
                <Image
                  src={img}
                  alt="post"
                  width={960}
                  height={540}
                  className="h-screen md:h-[85vh] object-cover"
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
      <Image
        src={stories[currentStory].images[current]}
        alt="post"
        width={960}
        height={540}
        className="w-screen h-screen object-cover fixed top-0 left-0 -z-10 blur-sm scale-110 brightness-50 "
      />
    </>
  );
};
export default CarouselView;
