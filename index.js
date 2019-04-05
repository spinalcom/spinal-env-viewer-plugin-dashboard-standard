const sidebarName = "GraphManagerSideBar";
const HeaderBarName = "GraphManagerTopBar";

const {
  spinalContextMenuService
} = require("spinal-env-viewer-context-menu-service");



import AddDashboard from "./buttons/addDashBoard";
import LinkWithDashBoard from "./buttons/linkWithDashBoard";
import LinkAutoWithDashboard from "./buttons/linkAutoWithDashboard";
import CreateDashBoardContext from "./buttons/createDashboardContext";
import CalculateBtn from './buttons/calculateBtn';
import GlobalCalculateBtn from "./buttons/globalCalculate";

import "./js/registerDialog";





spinalContextMenuService.registerApp(sidebarName, new AddDashboard(),[3]);
spinalContextMenuService.registerApp(sidebarName, new LinkWithDashBoard(),[3]);
spinalContextMenuService.registerApp(sidebarName, new LinkAutoWithDashboard(),[3]);
spinalContextMenuService.registerApp(sidebarName, new CalculateBtn(),[3]);
spinalContextMenuService.registerApp(sidebarName, new GlobalCalculateBtn(),[3]);
spinalContextMenuService.registerApp(HeaderBarName, new CreateDashBoardContext(),[3]);