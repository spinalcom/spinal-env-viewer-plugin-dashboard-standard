import spinalCore from "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;


class Dashboard extends globalType.Model {
  constructor() {
    super();
  }

  addAttr(attrName, unit, value) {
    if (typeof this[attrName] == undefined) {
      this.add_attr(attrName, {
        unit: unit || undefined,
        value: value || undefined
      })
    }

  }

}

spinalCore.register_models([Dashboard]);
module.exports = Dashboard;