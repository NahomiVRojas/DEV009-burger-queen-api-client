import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <>
        <h1>PRINCIPAL</h1>
        <div id="detail">
          <Outlet />
        </div>
        </>
    )
}
