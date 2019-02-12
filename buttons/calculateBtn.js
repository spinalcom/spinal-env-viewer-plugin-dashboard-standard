const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

import {
  dashboardService
} from "spinal-env-viewer-dashboard-standard-service";

import geographicService from 'spinal-env-viewer-context-geographic-service';

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
    if (option.selectedNode.type.get() === geographicService.constants.EQUIPMENT_TYPE)
      return Promise.resolve(true);

    return dashboardService.hasDashBoard(option.selectedNode.id.get()).then(
      el => {
        if (el) return true;
        return -1;
      })

  }

  action(option) {
    if (option.selectedNode.type.get() === geographicService.constants.EQUIPMENT_TYPE) {
      spinalPanelManagerService.openPanel("bimObjectReference", option.selectedNode);

    } else {
      spinalPanelManagerService.openPanel("dashBoardCalcul", option.selectedNode);
    }
  }
}

module.exports = CalculateBtn;