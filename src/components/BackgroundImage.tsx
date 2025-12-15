import { useEffect, useRef, useState } from "react";

interface BackgroundImageProps {
  imagePath: string;
}

export const BackgroundImage = ({ imagePath }: BackgroundImageProps) => {
  const [imageSrc1, setImageSrc1] = useState<string>(imagePath);
  const [imageSrc2, setImageSrc2] = useState<string>(imagePath);
  const [showFirst, setShowFirst] = useState<boolean>(true);

  const isFirstRender = useRef(true);

  useEffect(() => {
    const transition = () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      if (showFirst) {
        setImageSrc2(imagePath);
      } else {
        setImageSrc1(imagePath);
      }
      setTimeout(() => {
        setShowFirst(!showFirst);
      }, 50);
    };

    transition();
  }, [imagePath]);

  return (
    <div className="fixed w-full h-screen -z-10">
      <img
        className={`absolute w-full h-full object-cover brightness-50  transition-opacity duration-1500 ease-in-out ${
          showFirst ? "opacity-100" : "opacity-0"
        }`}
        src={imageSrc1}
        alt="Image lofi"
      />
      <img
        className={`absolute w-full h-full object-cover brightness-50  transition-opacity duration-1500 ease-in-out ${
          !showFirst ? "opacity-100" : "opacity-0"
        }`}
        src={imageSrc2}
        alt="Image lofi"
      />
    </div>
  );
};
