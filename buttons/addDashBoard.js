const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

import {
  dashboardVariables
} from "spinal-env-viewer-dashboard-standard-service";

class AddDashboard extends SpinalContextApp {
  constructor() {
    super("create dashboard", "create dashboard", {
      icon: "table_chart",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {
    if (option.selectedNode.type.get() == dashboardVariables.DASHBOARD_CONTEXT_TYPE) {
      this.label = "create dashboard";
      this.description = "create dashboard";
      this.buttonCfg.icon = "table_chart";
      return Promise.resolve(true);
    } else if (option.context.type.get() == dashboardVariables.DASHBOARD_CONTEXT_TYPE) {
      this.label = "setting dashboard";
      this.description = "setting dashboard";
      this.buttonCfg.icon = "settings";
      return Promise.resolve(true);
    }
    return Promise.resolve(-1);
  }

  action(option) {
    let params = {
      title: "",
      context: option.context,
      selectedNode: option.context.id.get() !== option.selectedNode.id.get() ?
        option.selectedNode : undefined,
      toCreate: true
    }
    if (option.context.type.get() == dashboardVariables.DASHBOARD_CONTEXT_TYPE &&
      option.context
      ._server_id !== option.selectedNode._server_id) {
      params.title = "Config DashBoard";
      params.toCreate = false;
    } else {
      params.title = "Create DashBoard";
      params.toCreate = true;
    }

    spinalPanelManagerService.openPanel("dashBoardConfigDialog", params);
  }
}

module.exports = AddDashboard;