const RELATION_NAME = "hasDashBoard";
const RELATION_TYPE = "Ref";

let graphLib = require("spinalgraph");
const {
  AbstractElement
} = require("spinal-models-building-elements");

let dashboardConf = {
  formatType(type) {
    return "geographic" + type.charAt(0).toUpperCase() + type.slice(1);
  },
  createStandardDashBoard(context, name, type, attributes) {
    let element = new AbstractElement(name);

    attributes.forEach(attrName => {
      if (!element[attrName]) {
        element.add_attr(attrName, "");
      }
    });

    let child = new graphLib.SpinalNode(name, dashboardConf.formatType(type),
      element);
    context.addChildInContext(child, RELATION_NAME, RELATION_TYPE, context);
  }
};



module.exports = dashboardConf;