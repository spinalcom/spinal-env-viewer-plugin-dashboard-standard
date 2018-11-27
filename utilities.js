const RELATION_NAME = "hasDashBoard";
const RELATION_TYPE = "Ref";

let graphLib = require("spinalgraph");
const {
  SpinalEndpoint
} = require("spinal-models-bmsNetwork");

const {
  AbstractElement
} = require("spinal-models-building-elements");

let dashboardConf = {
  formatType(type) {
    return "geographic" + type.charAt(0).toUpperCase() + type.slice(1);
  },
  createStandardDashBoard(context, name, type, attributes) {

    let abs = new graphLib.SpinalNode(name, dashboardConf.formatType(
        type),
      new AbstractElement(name));

    context.addChildInContext(abs, RELATION_NAME, RELATION_TYPE,
      context);

    attributes.forEach(attr => {


      let element = new SpinalEndpoint(attr.name, "SpinalEndpoint", attr.value,
        attr.unit,
        typeof attr.value)

      let child = new graphLib.SpinalNode(attr.name, dashboardConf.formatType(
        type), element);

      abs.addChildInContext(child, "hasEndpoint", RELATION_TYPE, context);

    });


  }
};



module.exports = dashboardConf;