const sidebarName = "GraphManagerSideBar";
const HeaderBarName = "GraphManagerTopBar";

const {
  spinalContextMenuService
} = require("spinal-env-viewer-context-menu-service");



import AddDashboard from "./buttons/addDashBoard";
import OpenDasboardPanel from "./buttons/openDasboardPanel";
import LinkWithDashBoard from "./buttons/linkWithDashBoard";
import LinkAutoWithDashboard from "./buttons/linkAutoWithDashboard";
import CreateDashBoardContext from "./buttons/createDashboardContext";


import "./registerDialog";





spinalContextMenuService.registerApp(sidebarName, new AddDashboard());
spinalContextMenuService.registerApp(sidebarName, new OpenDasboardPanel());
spinalContextMenuService.registerApp(sidebarName, new LinkWithDashBoard());
spinalContextMenuService.registerApp(sidebarName, new LinkAutoWithDashboard());


spinalContextMenuService.registerApp(HeaderBarName, new CreateDashBoardContext());