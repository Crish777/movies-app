import { Outlet } from "react-router"
import Header from "../components/header"
import { useSelector } from "react-redux";
import { useEffect } from "react";


const MainLayout = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDark)
  useEffect(() => {

    if(isDarkMode){
      document.body.classList.add("dark");
    }else{
      document.body.classList.remove("dark");
    }
    
  }, []);
  return (
    <>
    <Header />
    <main className="pt-32 dark:bg-slate-900 bg-slate-200 min-h-screen">
      <Outlet />
    </main>
    </>
  )
}

export default MainLayout