import vue from "vue";
import dashBoardConfigDialog from "./vue/dashBoardConfigDialog.vue";
import dashboardPanel from "./vue/dashboardPanel.vue";
import linkToDashBoardDialog from './vue/linkToDashBoardDialog.vue';



const {
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");

const {
  SpinalForgeExtention
} = require("spinal-env-viewer-panel-manager-service_spinalforgeextention");

/***** Resgister Dialog */
var dialogs = [{
    name: "dashBoardConfigDialog",
    vueMountComponent: vue.extend(dashBoardConfigDialog),
    parentContainer: document.body
  },
  {
    name: "linkToDashBoardDialog",
    vueMountComponent: vue.extend(linkToDashBoardDialog),
    parentContainer: document.body
  }
];

for (let index = 0; index < dialogs.length; index++) {
  SpinalMountExtention.mount(dialogs[index]);
}

/*** Register Panel */

const dashboardExtension = SpinalForgeExtention.createExtention({
  name: "spinal_dashboard_panel",
  vueMountComponent: vue.extend(dashboardPanel),
  panel: {
    title: "Dashboard",
    classname: "spinal_dashboard_panel",
    closeBehaviour: "hide"
  },
  style: {
    left: "400px"
  }
});

SpinalForgeExtention.registerExtention("spinal_dashboard_panel",
  dashboardExtension);