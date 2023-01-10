import { Link, Outlet } from "react-router-dom";
import logo from "../logo.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion"

export const Layout = () => {

    const location = useLocation();

    let navigate = useNavigate();


    const routeChange = () => {
        let path = `/`;
        navigate(path);
      }


    return(<>
    <header>
        <img onClick={routeChange}  src={logo}></img>
        <h1>Enköping Rugbyklubb Damer</h1>
      </header>
      <main>
        <AnimatePresence initial={false}>
        <Outlet location={location} key={location.pathname}></Outlet>
        </AnimatePresence>
      </main>
    </>);
}