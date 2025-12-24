import { useEffect, useState } from "react";
import { BackgroundImage } from "./components/BackgroundImage";
import { Header } from "./components/Header";
import "./reset.css";
import { MusicPlayer } from "./components/MusicPlayer";

export const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(() => Math.floor(Math.random() * 10));
    }, 20 * 60 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const imagePath = `/lofi-${currentImageIndex + 1}.jpg`;

  return (
    <div className="w-full">
      <BackgroundImage imagePath={imagePath} />
      <Header />

      <MusicPlayer />
    </div>
  );
};

export default App;
