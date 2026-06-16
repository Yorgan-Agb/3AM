import { useEffect, useState } from "react";
import { LuPlay, LuPause } from "react-icons/lu";
import { Slider } from "./ui/Slider";
import { StationName } from "./StationName";
import { useRef } from "react";
import type { Station } from "../@types";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number[]>([30]);
  const [stationName, setStationName] = useState<string>("");
  const [stationUrl, setStationUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayingClick = () => {
    if (isPlaying) {
      audioRef.current!.pause();
    } else {
      audioRef.current!.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleValueChange = (newValue: number[]) => {
    setVolume(newValue);
    audioRef.current!.volume = newValue[0] / 100;
  };

  useEffect(() => {
    const mirrors = [
      "https://de1.api.radio-browser.info",
      "https://de2.api.radio-browser.info",
      "https://all.api.radio-browser.info",
    ];

    const fetchMusic = async () => {
      for (const mirror of mirrors) {
        try {
          const httpResponse = await fetch(
            `${mirror}/json/stations/bytagexact/lofi`,
          );
          if (!httpResponse.ok) continue;
          const data: Station[] = await httpResponse.json();
          const station = data.find((s) => s.lastcheckok === 1) ?? data[0];
          if (!station) continue;
          setStationName(station.name);
          setStationUrl(station.url_resolved);
          setLoading(false);
          return;
        } catch {
          // try the next mirror
        }
      }
      setMessage("Impossible de se connecter a la radio, rechargez la page");
      setLoading(false);
    };
    fetchMusic();
  }, []);

  return (
    <section className="fixed bottom-0 z-10 w-full flex flex-row-reverse p-4 gap-4">
      {loading ? (
        <p className="text-xl text-green-100/70 font-lofi ">
          Chargement de la station...
        </p>
      ) : message !== "" ? (
        <section>
          <p className="text-xl text-green-100/70  font-lofi ">{message}</p>
        </section>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-center items-center">
            {!isPlaying ? (
              <button onClick={handlePlayingClick}>
                <LuPlay className="text-gray-700/40 hover:text-green-100/70 text-4xl" />
              </button>
            ) : (
              <button onClick={handlePlayingClick}>
                <LuPause className="text-gray-700/40 hover:text-green-100/70 text-4xl" />
              </button>
            )}
            <button>
              <Slider
                defaultValue={[30]}
                max={100}
                step={1}
                value={volume}
                onValueChange={handleValueChange}
              />
            </button>
          </div>

          <section>
            <audio ref={audioRef} src={stationUrl}></audio>
          </section>

          <section>
            <StationName name={setStationName} stationName={stationName} />
          </section>
        </div>
      )}
    </section>
  );
};
