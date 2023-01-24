import { Outlet } from "react-router-dom";
import logo from "../logo.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react";


export const Layout = () => {

  const location = useLocation();

  const [heading, setHeading] = useState(["Enköping Rugbyklubb Damer"]);
  let navigate = useNavigate();


  const routeChange = () => {
    let path = `/`;
    navigate(path);
  }


  window.addEventListener('storage', () => {
    setHeading(localStorage.getItem('heading'))
  });

  return (<>
    <header>
      <button onClick={routeChange}><img alt="Enköpings logo länk till startsida" src={logo}></img></button>
      <h1>{heading}</h1>
    </header>
    <main>
      <AnimatePresence initial={false}>
        <Outlet location={location} key={location.pathname}></Outlet>
      </AnimatePresence>
    </main>
  </>);
}