// project import
import NavCard from "./NavCard";
import Navigation from "./Navigation";
import SimpleBar from "../../../../components/third-party/SimpleBar";

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
  <SimpleBar
    sx={{
      "& .simplebar-content": {
        display: "flex",
        flexDirection: "column"
      },

      "overflow-y": "overlay",
      "::-webkit-scrollbar-track": {
        "border-radius": "0px",
        "background-color": "rgb(128, 128, 128, 0)",
      },
      "::-webkit-scrollbar": {
        "width": "7px",
        "background-color": "rgb(128, 128, 128, 0)",
      },
      "::-webkit-scrollbar-thumb": {
        "border-radius": "10px",
        "background-color": "rgb(128, 128, 128, 0.5)",

      }
    }}
  >
    <Navigation />
    {/*<NavCard />*/}
  </SimpleBar>
);

export default DrawerContent;
