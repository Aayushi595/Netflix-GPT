import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import useLanguage from "../hooks/useLanguage";
import useOnlineStatus from "../hooks/useOnlineStatus";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const { lang, changeLanguage } = useLanguage();
  const isOnline = useOnlineStatus();
   const handleSignOut = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        if (window.location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        if (window.location.pathname !== "/") {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  return (
    <div
  className={`fixed left-0 w-full px-8 py-2 bg-gradient-to-b from-black z-40 flex justify-between items-center ${
    isOnline ? "top-0" : "top-6"
  }`}
>
      {/* <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" /> */}
      <img
        className="w-24 h-24 object-contain"
        alt="logo-icon"
        src="../../logo.png"
      />
      {user && (
        <div className="flex items-center gap-4">
          {showGptSearch && (
            <select
              value={lang}
              className="p-2 bg-gray-900 text-white rounded-lg"
              onChange={(e) => changeLanguage(e.target.value)}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-1 px-4 my-1 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
         
          <button
            onClick={handleSignOut}
            className="py-1 px-4 my-1 bg-red-800 text-white rounded-lg hover:bg-red-900"
          >
            LogOut
          </button>
           <img
            className="hidden md:block w-10 h-10 rounded-full object-cover border-2 border-white"
            alt="usericon"
            src={user?.photoURL}
          />
        </div>
      )}
    </div>
  );
};
export default Header;
