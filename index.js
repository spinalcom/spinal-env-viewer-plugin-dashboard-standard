const sidebarName = "GraphManagerSideBar";
const DASHBOARD_CONTEXT = "Dashboard Standard";
const DASHBOARD_CONTEXT_TYPE = "dashboardContext";

let graphLib = require("spinalgraph");
const {
  AbstractElement
} = require("spinal-models-building-elements");
const {
  spinalContextMenuService
} = require("spinal-env-viewer-context-menu-service");
const {
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");


import AddDashboard from "./buttons/addDashBoard";
import vue from "vue";
import dialogComponent from "./dashBoardConfigDialog.vue";

/***** Cette partie crée le context du dashboard standard s'il n'existe pas   ********************/
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
/*** * Fin de la partie */

SpinalMountExtention.mount({
  name: "dashBoardConfigDialog",
  vueMountComponent: vue.extend(dialogComponent),
  parentContainer: document.body
});
spinalContextMenuService.registerApp(sidebarName, new AddDashboard());