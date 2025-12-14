interface BackgroundImageProps {
  imagePath: string;
}

export const BackgroundImage = ({ imagePath }: BackgroundImageProps) => {
  return (
    <div className="fixed w-full h-screen -z-10">
      <img
        className="w-full h-full object-cover brightness-50"
        src={imagePath}
        alt="Image lofi"
      />
    </div>
  );
};
