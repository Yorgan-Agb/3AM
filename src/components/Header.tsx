import { LuGithub } from "react-icons/lu";
import { LuLinkedin } from "react-icons/lu";

export const Header = () => {
  return (
    <header className="relative flex items-center justify-between z-50">
      <h1 className="font-lofi text-white">3AM.FM</h1>
      <div className="flex">
        <LuGithub className="text-white" />
        <LuLinkedin className="text-white" />
      </div>
    </header>
  );
};
