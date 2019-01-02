const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");


class CreateDashboardContext extends SpinalContextApp {
  constructor() {
    super("create dashboard Context", "create dashboard Context", {
      icon: "pie_chart",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }

  isShown() {
    return Promise.resolve(true);
  }

  action() {
    spinalPanelManagerService.openPanel("dashboardContextCreation", {});
  }
}

module.exports = CreateDashboardContext;