import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <div className="min-h-screen">
      {/* Background Container - Changed to fixed to prevent stretching on scroll */}
      <div className="fixed inset-0 -z-10">
        <img className="h-full w-full object-cover" src={BG_URL} alt="logo" />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="pt-20 md:pt-0">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};
export default GPTSearch;
