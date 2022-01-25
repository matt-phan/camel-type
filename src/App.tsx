import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

function App(): JSX.Element {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<>race</>} />
        <Route path="/pit-stop" element={<>pit stop</>} />
        <Route path="/leaderboard" element={<>leaderboard</>} />
      </Routes>
    </>
  );
}

export default App;
