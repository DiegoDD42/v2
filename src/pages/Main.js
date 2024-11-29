import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import BestRouteFinder from "./BestRouteFinder";
import RoutesBuilder from "./RoutesBuilder";
import StationMatrix from "./StationMatrix";
import StationTree from "./StationTree";


const Main = () => {

  return (
    <div>
      {/* Definição das Rotas */}
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/best-route-finder" Component={BestRouteFinder} />
        <Route exact path="/routes-builder" Component={RoutesBuilder} />
        <Route exact path="/station-matrix" Component={StationMatrix} />
        <Route exact path="/station-tree" Component={StationTree} />
        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default Main;
