import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
    return(<>
    <header>
        <p>Layout component is working</p>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>);
}