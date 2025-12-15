import { useEffect, useState } from "react";
import { BackgroundImage } from "./components/BackgroundImage";
import { Header } from "./components/Header";
import "./reset.css";

export const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex) => (currentImageIndex + 1) % 7);
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const imagePath = `/lofi-${currentImageIndex + 1}.jpg`;

  return (
    <div>
      <BackgroundImage imagePath={imagePath} />
      <Header />
    </div>
  );
};

export default App;
