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

import "./registerDialog";





spinalContextMenuService.registerApp(sidebarName, new AddDashboard());
spinalContextMenuService.registerApp(sidebarName, new LinkWithDashBoard());
spinalContextMenuService.registerApp(sidebarName, new LinkAutoWithDashboard());
spinalContextMenuService.registerApp(sidebarName, new CalculateBtn());


spinalContextMenuService.registerApp(HeaderBarName, new CreateDashBoardContext());