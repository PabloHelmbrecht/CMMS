// project import
//import pages from './pages';
import dashboard from "./dashboard";
import utilities from "./utilities";
import support from "./support";
import elementos from "./elementos";

// ==============================|| MENU ITEMS ||============================== //

/*  
! Se eliminó del menú las siguientes secciones:
! - pages
*/
const menuItems = {
  items: [dashboard /*, pages*/, elementos, utilities, support],
};

export default menuItems;
