import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import BestRouteFinder from "./BestRouteFinder";
import RoutesBuilder from "./RoutesBuilder";
import StationMatrix from "./StationMatrix";
import Tree from "./tree";


const Main = () => {

  return (
    <div>
      {/* Definição das Rotas */}
      <Routes>
        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
        <Route exact path="/" Component={Home} />
        <Route exact path="/best-route-finder" Component={BestRouteFinder} />
        <Route exact path="/routes-builder" Component={RoutesBuilder} />
        <Route exact path="/station-matrix" Component={StationMatrix} />
        <Route exact path="/tree" Component={Tree} />
      </Routes>
    </div>
  );
}

export default Main;
