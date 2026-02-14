import { useState, useEffect, useCallback } from "react";
import slider1 from "@/assets/slider-1.jpg";
import slider2 from "@/assets/slider-2.jpg";
import slider3 from "@/assets/slider-3.jpg";

const slides = [
  { image: slider1, caption: "অপরূপ সৌন্দর্যে ঘেরা পাথরঘাটার-হরিণঘাটা" },
  { image: slider2, caption: "সবুজ শ্যামল পাথরঘাটার প্রকৃতি" },
  { image: slider3, caption: "পাথরঘাটার স্থানীয় বাজার" },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="px-4 pt-4">
      <div className="relative rounded-lg overflow-hidden slider-shadow aspect-[16/9] max-w-screen-lg mx-auto">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-primary-foreground">
              {slide.caption}
            </p>
          </div>
        ))}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-primary-foreground w-5" : "bg-primary-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
