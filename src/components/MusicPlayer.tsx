import { useEffect, useState } from "react";
import { LuPlay, LuPause } from "react-icons/lu";
import { Slider } from "./ui/Slider";

export const MusicPlayer = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    const fetchMusic = async () => {
      const httpResponse = await fetch(
        "https://de1.api.radio-browser.info/json/stations/bytagexact/lofi"
      );
      const data = await httpResponse.json();
      const firstStation = data[3];
      const name = firstStation.name;
      const stationName = firstStation.url_resolved;
      console.log(name, stationName);
    };
    fetchMusic();
  }, []);

  const handleChanger = () => {
    setIsClicked(!isClicked);
  };

  return (
    <section className="fixed bottom-20 z-10 w-full flex flex-row-reverse p-4 gap-4">
      <button>
        <Slider defaultValue={[30]} max={100} step={1} />
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
