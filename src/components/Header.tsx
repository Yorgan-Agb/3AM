import { LuGithub, LuLinkedin, LuEarth } from "react-icons/lu";

export const Header = () => {
  return (
    <header className="relative p-4 flex items-center justify-between z-50">
      <h1 className="font-lofi text-2xl text-gray-700 hover:text-purple-300">
        3AM.FM
      </h1>
      <nav className="flex gap-2">
        <a
          href="https://yorgan-portfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LuEarth className="text-gray-700 hover:text-purple-200 text-4xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/yorgan-agblemagnon/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LuLinkedin className="text-gray-700 hover:text-purple-200 text-4xl" />
        </a>
        <a
          href="https://github.com/Yorgan-Agb"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LuGithub className="text-gray-700 hover:text-purple-200 text-4xl" />
        </a>
      </nav>
    </header>
  );
};
