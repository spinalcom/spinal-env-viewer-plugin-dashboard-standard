import vue from "vue";
import dashBoardConfigDialog from "./vue/dashBoardConfigDialog.vue";
import linkToDashBoardDialog from './vue/linkToDashBoardDialog.vue';
import linkAutoWithDashboardDialog from "./vue/linkAutoWithDashboardDialog.vue";
import createDashboardContextComponent from './vue/createDashboardContext.vue';

const {
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");


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
  },
  {
    name: "linkAutoWithDashboardDialog",
    vueMountComponent: vue.extend(linkAutoWithDashboardDialog),
    parentContainer: document.body
  },
  {
    name: "dashboardContextCreation",
    vueMountComponent: vue.extend(createDashboardContextComponent),
    parentContainer: document.body
  },
];

for (let index = 0; index < dialogs.length; index++) {
  SpinalMountExtention.mount(dialogs[index]);
}