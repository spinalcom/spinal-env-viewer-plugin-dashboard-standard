import {
  find
} from "./find";

const {
  SpinalBmsDevice,
  SpinalBmsEndpoint,
  SpinalBmsEndpointGroup
} = require("spinal-model-bmsnetwork");


module.exports = {
  _getAllEndpointOfBimObject(bimObjectId) {
    return find(
      bimObjectId,
      [
        "hasEndPoint",
        SpinalBmsDevice.relationName,
        SpinalBmsEndpoint.relationName,
        SpinalBmsEndpointGroup.relationName
      ],
      node => {

        return node.info.type.get() === SpinalBmsEndpoint.nodeTypeName;
      }
    );
  },
  //   _getEndpointByGroup(bimObjectId) {
  //     return this._getAllEndpointOfBimObject(bimObjectId).then(endpoints => {
  //       let groups = [];

  //       endpoints.forEach(el => {
  //           groups[el.info.name]
  //       })

  //     })
  //   }
}