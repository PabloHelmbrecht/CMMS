//import repositories
import { BrowserRouter } from "react-router-dom";

// import themes
import ThemeCustomization from "./themes";
//import ScrollTop from "../components/ScrollTop";
import Routes from "./routes";

function App() {
  return (
    <ThemeCustomization>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeCustomization>
  );
}

export default App;
