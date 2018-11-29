import ContextGeographicService from "spinal-env-viewer-context-geographic-service";


const DASHBOARD_CONTEXT = "Dashboard Standard";
const DASHBOARD_CONTEXT_TYPE = "dashboardContext";
const RELATION_NAME = "hasDashBoard";




const GEOGRAPHIC_TPES = [{
    name: "Building",
    type: ContextGeographicService.constants.BUILDING_TYPE
  },
  {
    name: "Floor",
    type: ContextGeographicService.constants.FLOOR_TYPE
  },
  {
    name: "Zone",
    type: ContextGeographicService.constants.ZONE_TYPE
  },
  {
    name: "Room",
    type: ContextGeographicService.constants.ROOM_TYPE
  }

]



export {
  DASHBOARD_CONTEXT,
  DASHBOARD_CONTEXT_TYPE,
  RELATION_NAME,
  GEOGRAPHIC_TPES
}