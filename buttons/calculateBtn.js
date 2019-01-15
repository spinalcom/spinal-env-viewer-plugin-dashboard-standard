const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

import {
  dashboardService
} from "spinal-env-viewer-dashboard-standard-service";

class CalculateBtn extends SpinalContextApp {
  constructor() {
    super("Config calculation method", "configure the calculation method", {
      icon: "functions",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {
    return dashboardService.hasDashBoard(option.selectedNode.id.get()).then(
      el => {
        if (el) return true;
        return -1;
      })

  }

  action(option) {
    spinalPanelManagerService.openPanel("dashBoardCalcul", option.selectedNode);
  }
}

module.exports = CalculateBtn;