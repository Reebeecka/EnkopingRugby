import { Link, Outlet } from "react-router-dom";
import logo from "../logo.png";
import { useNavigate } from 'react-router-dom';

export const Layout = () => {

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
        <Outlet></Outlet>
      </main>
    </>);
}