const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

import * as graphLib from "spinalgraph";
import {
  ENDPOINT_RELATION_NAME
} from "../const"


class OpenDashboardPanel extends SpinalContextApp {
  constructor() {
    super("open dashboard", "open dashboard", {
      icon: "dashboard",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    })
  }

  isShown(option) {
    if (option.selectedNode.hasRelation(ENDPOINT_RELATION_NAME, graphLib.SPINAL_RELATION_TYPE)) {
      return Promise.resolve(true);
    }
    return Promise.resolve(-1);
  }

  action(option) {
    spinalPanelManagerService.openPanel("spinal_dashboard_panel", option.selectedNode);
  }

}


module.exports = OpenDashboardPanel;