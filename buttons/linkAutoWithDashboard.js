const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");
const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

import ContextGeographicService from "spinal-env-viewer-context-geographic-service";

const CONTEXT_TYPE = ContextGeographicService.constants.CONTEXT_TYPE;


class LinkAutoWithDashboard extends SpinalContextApp {
  constructor() {
    super("Automate dashboard linking", "automate dashboard binding", {
      icon: "transform",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {
    if (option.context.type.get() === CONTEXT_TYPE)
      return Promise.resolve(true);
    return Promise.resolve(-1);
  }

  action(option) {
    spinalPanelManagerService.openPanel('linkAutoWithDashboardDialog', option)
  }
}

module.exports = LinkAutoWithDashboard;