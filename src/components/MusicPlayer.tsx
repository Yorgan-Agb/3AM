import { useEffect, useState } from "react";
import { LuPlay, LuPause } from "react-icons/lu";
import { Slider } from "./ui/Slider";
import { StationName } from "./StationName";
import { useRef } from "react";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number[]>([0]);
  const [stationName, setStationName] = useState<string>("");
  const [stationUrl, setStationuRL] = useState<string>("");
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
    const fetchMusic = async () => {
      try {
        const httpResponse = await fetch(
          "https://de1.api.radio-browser.info/json/stations/bytagexact/lofi"
        );
        if (!httpResponse.ok) {
          throw new Error("Erreur lors du chargement de la station");
        }
        const data = await httpResponse.json();

        const firstStation = data[2];
        const name = firstStation.name;
        const stationUrl = firstStation.url_resolved;
        setStationName(name);
        setStationuRL(stationUrl);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage("Une erreur est survenue");
        }
        setLoading(false);
      }
    };
    fetchMusic();
  }, []);

  return (
    <section className="fixed bottom-20 z-10 w-full flex flex-row-reverse p-4 gap-4">
      {loading ? (
        <p className="text-2xl text-gray-700/40 font-bold font-lofi hover:text-yellow-200/40">
          Chargement de la station 🎶
        </p>
      ) : message !== "" ? (
        <section>
          <p>{message}</p>
        </section>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-center items-center">
            {!isPlaying ? (
              <button onClick={handlePlayingClick}>
                <LuPlay className="text-gray-700/40 hover:text-yellow-200/40 text-4xl" />
              </button>
            ) : (
              <button onClick={handlePlayingClick}>
                <LuPause className="text-gray-700/40 hover:text-yellow-200/40 text-4xl" />
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
            <audio ref={audioRef} src={stationUrl} autoPlay></audio>
          </section>

          <section>
            <StationName name={setStationName} stationName={stationName} />
          </section>
        </div>
      )}
    </section>
  );
};
