import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import Navbar from "./components/layout/Navbar";
import XPBar  from "./components/layout/XPBar";
import Home       from "./pages/Home";
import Engagement from "./pages/Engagement";
import Game       from "./pages/Game";
import Agence     from "./pages/Agence";
import Contact    from "./pages/Contact";
import "./styles/index.css";

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main className="app-content">
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/engagement"  element={<Engagement />} />
              <Route path="/jeu"         element={<Game />} />
              <Route path="/agence"      element={<Agence />} />
              <Route path="/contact"     element={<Contact />} />
            </Routes>
          </main>
          <XPBar />
        </div>
      </BrowserRouter>
    </GameProvider>
  );
}
