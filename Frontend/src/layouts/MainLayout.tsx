import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export function MainLayout() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
