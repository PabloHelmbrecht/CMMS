// project import
//import NavCard from "./NavCard";
import Navigation from "./Navigation";
import SimpleBar from "../../../../components/third-party/SimpleBar";

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
  <SimpleBar
    sx={{
      "& .simplebar-content": {
        display: "flex",
        flexDirection: "column",
      },

      overflowY: "overlay",
      "::-webkit-scrollbar-track": {
        borderRadius: "0px",
        backgroundColor: "rgb(128, 128, 128, 0)",
      },
      "::-webkit-scrollbar": {
        width: "7px",
        backgroundColor: "rgb(128, 128, 128, 0)",
      },
      "::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        backgroundColor: "rgb(128, 128, 128, 0.5)",
      },
    }}
  >
    <Navigation />
    {/*<NavCard />*/}
  </SimpleBar>
);

export default DrawerContent;
