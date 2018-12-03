const sidebarName = "GraphManagerSideBar";

import {
  DASHBOARD_CONTEXT,
  DASHBOARD_CONTEXT_TYPE
} from "./const";


let graphLib = require("spinalgraph");
const {
  AbstractElement
} = require("spinal-models-building-elements");
const {
  spinalContextMenuService
} = require("spinal-env-viewer-context-menu-service");



import AddDashboard from "./buttons/addDashBoard";
import OpenDasboardPanel from "./buttons/openDasboardPanel";
import "./registerDialog";



/*
  Cette partie crée le context du dashboard standard s'il n'existe pas

  A modifier pour ajouter un bouton de creation de context
 */

window.spinal.spinalSystem.getModel().then(el => {
  if (el.graph) {
    el.graph.getContext(DASHBOARD_CONTEXT).then(context => {
      if (context) return;
      let newContext = new graphLib.SpinalContext(
        DASHBOARD_CONTEXT,
        DASHBOARD_CONTEXT_TYPE,
        new AbstractElement(DASHBOARD_CONTEXT)
      );
      el.graph.addContext(newContext);
    });
  }
});




spinalContextMenuService.registerApp(sidebarName, new AddDashboard());
spinalContextMenuService.registerApp(sidebarName, new OpenDasboardPanel());