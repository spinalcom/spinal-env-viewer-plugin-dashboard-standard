import {
  RELATION_NAME
} from './const';

import * as graphLib from "spinalgraph";
const {
  AbstractElement
} = require("spinal-models-building-elements");

let dashboardConf = {

  createStandardDashBoard(context, name, type, attributes) {
    let abstract = new AbstractElement(name);

    abstract.add_attr({
      sensor: []
    });

    attributes.forEach(attr => {
      delete attr.checked;
      abstract.sensor.push(attr);
    });

    let abstractNode = new graphLib.SpinalNode(
      name,
      type,
      abstract
    );

    context.addChildInContext(
      abstractNode,
      RELATION_NAME,
      graphLib.SPINAL_RELATION_TYPE,
      context
    );
  }
};

module.exports = dashboardConf;