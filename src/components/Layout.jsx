import { Outlet } from "react-router-dom";

function Layout() {
    return <div className="my-20 mx-2 sm:mx-auto sm:container">
        <Outlet/>
    </div>;
}

export default Layout;
