import { Link, Outlet } from "react-router-dom";
import logo from "../logo.png";

export const Layout = () => {
    return(<>
    <header>
        <img src={logo}></img>
        <h1>Enköping Rugbyklubb Damer</h1>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>);
}