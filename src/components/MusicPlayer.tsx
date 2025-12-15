import { useState } from "react";
import { LuPlay, LuPause } from "react-icons/lu";
import { Slider } from "./ui/Slider";

export const MusicPlayer = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleChanger = () => {
    setIsClicked(!isClicked);
  };

  return (
    <section className="fixed bottom-20 z-10 w-full flex flex-row-reverse p-4 gap-4">
      <button>
        <Slider defaultValue={[99]} max={100} step={1} />
      </button>
      <button
        className=""
        onClick={() => {
          handleChanger();
        }}
      >
        {!isClicked ? (
          <LuPlay className="text-gray-700 hover:text-purple-200 text-4xl" />
        ) : (
          <LuPause className="text-gray-700 hover:text-purple-200 text-4xl" />
        )}
      </button>
    </section>
  );
};
