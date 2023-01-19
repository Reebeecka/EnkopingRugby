import { Outlet } from "react-router-dom";
import logo from "../logo.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion"


export const Layout = (props) => {

  console.log("test from comp"+props.props);
    const location = useLocation();

    let navigate = useNavigate();


    const routeChange = () => {
        let path = `/`;
        navigate(path);
      }


    return(<>
    <header>
        <img alt="Enköpings logo"onClick={routeChange}  src={logo}></img>
        <h1>Enköping Rugbyklubb Damer</h1>
      </header>
      <main>
        <AnimatePresence initial={false}>
        <Outlet location={location} key={location.pathname}></Outlet>
        </AnimatePresence>
      </main>
    </>);
}