const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");
const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

import ContextGeographicService from "spinal-env-viewer-context-geographic-service";
import {
  dashboardService
} from "spinal-env-viewer-dashboard-standard-service";


const CONTEXT_TYPE = ContextGeographicService.constants.CONTEXT_TYPE;

let hasDash = false;

class LinkWithDashBoard extends SpinalContextApp {
  constructor() {
    super("Link to a Dashboard", "Link to a Dashboard", {
      icon: "link",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });

  }

  isShown(option) {
    if (option.context.type.get() === CONTEXT_TYPE && option.selectedNode
      .type
      .get() !== CONTEXT_TYPE) {
      return dashboardService.hasDashBoard(option.selectedNode.id.get()).then(
        el => {
          console.log(hasDash, el);
          hasDash = el;
          if (el) {
            this.label = "unlink to dashboard";
            this.buttonCfg.icon = "link_off";
          } else {
            this.label = "Link to a Dashboard";
            this.buttonCfg.icon = "link";
          }

          return el;
        })
    } else {
      return Promise.resolve(-1);
    }


  }

  action(option) {
    if (hasDash) {
      dashboardService.unLinkToDashBoard(option.selectedNode.id.get());
    } else {
      let dialogParams = {
        context: option.context,
        selectedNode: option.selectedNode
      }
      spinalPanelManagerService.openPanel('linkToDashBoardDialog',
        dialogParams);
    }

  }
}

module.exports = LinkWithDashBoard;