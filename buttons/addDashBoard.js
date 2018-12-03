const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

import {
  DASHBOARD_CONTEXT_TYPE
} from "../const";

class AddDashboard extends SpinalContextApp {
  constructor() {
    super("create dashboard", "create dashboard", {
      icon: "add",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {
    if (option.selectedNode.info.type.get() == DASHBOARD_CONTEXT_TYPE) {
      this.label = "create dashboard";
      this.description = "create dashboard";
      this.buttonCfg.icon = "add";
      return Promise.resolve(true);
    } else if (option.context.info.type.get() == DASHBOARD_CONTEXT_TYPE) {
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
      selectedNode: option.context._server_id !== option.selectedNode._server_id ?
        option.selectedNode : undefined,
      toCreate: true
    }
    if (option.context.info.type.get() == DASHBOARD_CONTEXT_TYPE &&
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