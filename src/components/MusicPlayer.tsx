import { useEffect, useState } from "react";
import { LuPlay, LuPause } from "react-icons/lu";
import { Slider } from "./ui/Slider";
import { useRef } from "react";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stationName, setStationName] = useState<string>("");
  const [stationUrl, setStationuRL] = useState<string>("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayingClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const fetchMusic = async () => {
      const httpResponse = await fetch(
        "https://de1.api.radio-browser.info/json/stations/bytagexact/lofi"
      );
      const data = await httpResponse.json();
      const firstStation = data[2];
      const name = firstStation.name;
      const stationUrl = firstStation.url_resolved;
      setStationName(name);
      setStationuRL(stationUrl);
      console.log(stationUrl);
    };
    fetchMusic();
  }, []);

  return (
    <section className="fixed bottom-20 z-10 w-full flex flex-row-reverse p-4 gap-4">
      {stationUrl === "" ? (
        <p>Chargement ...</p>
      ) : (
        <>
          <button>
            <Slider defaultValue={[30]} max={100} step={1} />
          </button>

          {!isPlaying ? (
            <button onClick={handlePlayingClick}>
              <LuPlay className="text-gray-700 hover:text-purple-200 text-4xl" />
            </button>
          ) : (
            <button onClick={handlePlayingClick}>
              <LuPause className="text-gray-700 hover:text-purple-200 text-4xl" />
            </button>
          )}

          <div>
            <audio ref={audioRef} src={stationUrl}></audio>
          </div>
        </>
      )}
    </section>
  );
};
