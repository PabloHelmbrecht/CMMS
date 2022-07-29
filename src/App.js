//import repositories
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";

// import themes
import ThemeCustomization from "./themes";
//import ScrollTop from "#components/ScrollTop";

//project render imports
import Loadable from "#components/Loadable";
import MainLayout from "#layout/MainLayout";

//pages render
const DashboardDefault = Loadable(lazy(() => import("#pages/dashboard")));
const SamplePage = Loadable(
  lazy(() => import("#pages/extra-pages/SamplePage"))
);
const Typography = Loadable(
  lazy(() => import("#pages/components-overview/Typography"))
);
const Color = Loadable(lazy(() => import("#pages/components-overview/Color")));
const Shadow = Loadable(
  lazy(() => import("#pages/components-overview/Shadow"))
);
const AntIcons = Loadable(
  lazy(() => import("#pages/components-overview/AntIcons"))
);

function App() {
  return (
    <ThemeCustomization>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardDefault />}/>

        </Routes>
      </BrowserRouter>
    </ThemeCustomization>
  );
}

export default App;
