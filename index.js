const sidebarName = "GraphManagerSideBar";

import {
  dashboardVaribles,
  dashboardService
} from "spinal-env-viewer-dashboard-standard-service";


const {
  spinalContextMenuService
} = require("spinal-env-viewer-context-menu-service");



import AddDashboard from "./buttons/addDashBoard";
import OpenDasboardPanel from "./buttons/openDasboardPanel";
import LinkWithDashBoard from "./buttons/linkWithDashBoard";
import LinkAutoWithDashboard from './buttons/linkAutoWithDashboard';


import "./registerDialog";



/*
  Cette partie crée le context du dashboard standard s'il n'existe pas

  A modifier pour ajouter un bouton de creation de context
 */

dashboardService.createStandardDashBoardContext(dashboardVaribles.DASHBOARD_CONTEXT);




spinalContextMenuService.registerApp(sidebarName, new AddDashboard());
spinalContextMenuService.registerApp(sidebarName, new OpenDasboardPanel());
spinalContextMenuService.registerApp(sidebarName, new LinkWithDashBoard());
spinalContextMenuService.registerApp(sidebarName, new LinkAutoWithDashboard());