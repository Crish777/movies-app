import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { MdDarkMode } from "react-icons/md";
import { toogleDarkMode } from "../../store/darkModeSlice";

const Header = () => {
  const sessionId = useSelector((state) => state.session.token);
  const isDarkMode = useSelector((state) => state.darkMode.isDark);
  const dispatch = useDispatch();


  const toggleDarkMode = () => {
    dispatch(toogleDarkMode(!isDarkMode));
    if(!isDarkMode){
      document.body.classList.add("dark");
    }else{
      document.body.classList.remove("dark");
    }
  }
  return (
    <header className='w-full fixed z-40 top-0 left-0 dark:bg-black shadow-2xl bg-slate-600'>
      <div className='container flex justify-between items-center p-4 mx-auto'>
        <Link
          to='/'
          className='text-2xl font-black dark:text-white text-black hover:text-gray-400 transition-all duration-300'>
          E-movies
        </Link>

        {sessionId && (
          <div onClick={toggleDarkMode} className="cursor-pointer">
            <MdDarkMode size={30} color={isDarkMode ? "#fff" : "#000"} />
          </div>
        )}
        {!sessionId && (
          <Link
            to='/auth'
            className='shadow bg-slate-800 hover:bg-slate-950 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer transition-all duration-300'>
            Log In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
