import geographicService from "spinal-env-viewer-context-geographic-service";

const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");


class GlobalCalculateBtn extends SpinalContextApp {
  constructor() {
    super("configure calculation rules", "configure calculation rules", {
      icon: "functions",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FF0000"
    })
  }

  isShown(option) {
    if (option.selectedNode.type.get() === geographicService.constants.CONTEXT_TYPE)
      return Promise.resolve(true);
    return Promise.resolve(-1);
  }

  action(option) {
    spinalPanelManagerService.openPanel("globalCalculDialog", option.selectedNode);
  }

}

module.exports = GlobalCalculateBtn;