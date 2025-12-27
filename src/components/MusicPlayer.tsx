import { useEffect, useState } from "react";
import { LuPlay, LuPause } from "react-icons/lu";
import { Slider } from "./ui/Slider";
import { StationName } from "./StationName";
import { useRef } from "react";

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
    const fetchMusic = async () => {
      try {
        const httpResponse = await fetch(
          "https://de2.api.radio-browser.info/json/stations/bytagexact/lofi"
        );
        if (!httpResponse.ok) {
          throw new Error("Erreur lors du chargement de la station");
        }
        const data = await httpResponse.json();
        if (!data || data.length === 0) {
          throw new Error("Aucune station disponible");
        }
        const firstStation = data[2];
        const name = firstStation.name;
        const stationUrl = firstStation.url_resolved;
        setStationName(name);
        setStationUrl(stationUrl);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Failed to fetch") {
            setMessage(
              "Impossible de se connecter à la radio, rechargez la page"
            );
          }
        } else {
          setMessage("Une erreur est survenue");
        }
        setLoading(false);
      }
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
