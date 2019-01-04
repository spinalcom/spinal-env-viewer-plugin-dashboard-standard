<template>
  <div>
    <md-dialog class="dialogContainer"
               :md-active.sync="showDialog"
               @md-closed="closeDialog(false)">
      <md-dialog-title>Link Elements To Dashboard</md-dialog-title>
      <md-dialog-content>

        <!-- <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-50">
            <div class="md-layout-item">
              <md-field>
                <label for="font">Font</label>
                <md-select v-model="elementSelected"
                           name="font"
                           id="font">
                  <md-option v-for="(element,index) in children"
                             :key="index"
                             :value="element.type">{{element.name}}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>

          <div class="md-layout-item md-size-50">

          </div>
        </div> -->

        <div class="md-layout md-gutter"
             v-for="(data,index) in allData"
             :key="index">

          <div class="md-layout-item md-size-30 title">{{data.name}}</div>

          <div class="md-layout-item md-size-30">
            <md-field>
              <md-select v-model="data.contextSelected"
                         :name="data.type"
                         id="context"
                         @md-closed="getContextDashboard(data)">
                <md-option value="none">None</md-option>
                <md-option v-for="(element,index) in dashboards"
                           :key="index"
                           :value="element.id.get()">{{element.name.get()}}</md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item md-size-30">
            <md-field v-if="data.contextSelected != 'none' && data.dashboards.length > 0">
              <md-select v-model="data.dasboardSelected"
                         :name="dash"
                         id="dash">
                <md-option value="none">None</md-option>
                <md-option v-for="(dash,index) in data.dashboards"
                           :key="index"
                           :value="dash.id.get()">{{dash.name.get()}}</md-option>
              </md-select>
            </md-field>

            <md-field v-if="data.contextSelected != 'none' && data.dashboards.length == 0">
              <span class="md-caption noDashboard">No dashboard for this type</span>
            </md-field>

          </div>

        </div>

      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary"
                   @click="closeDialog(false)">Close</md-button>
        <md-button class="md-primary"
                   @click="closeDialog(true)">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import ContextGeographicService from "spinal-env-viewer-context-geographic-service";
import {
  dashboardVariables,
  dashboardService
} from "spinal-env-viewer-dashboard-standard-service";

import { find } from "../find";

const relations = ["hasContext"].concat(
  ContextGeographicService.constants.GEOGRAPHIC_RELATIONS
);

export default {
  name: "linkAutoWithDashboardDialog",
  props: ["onFinised"],
  data() {
    return {
      selectedNode: null,
      context: null,
      showDialog: true,
      allData: [],
      dashboards: []
    };
  },
  methods: {
    async opened(option) {
      this.context = option.context;
      this.selectedNode = option.selectedNode;
      this.allData = this.getChildrenElement(this.selectedNode.type.get());
      this.dashboards = await dashboardService.getAllDashboardContext();
    },
    removed(option) {
      let items = this.getItemToLink();

      if (option.closeResult) {
        items.forEach(el => {
          find(this.selectedNode.id.get(), relations, node => {
            return node.info.type.get() === el.type;
          }).then(nodes => {
            for (let i = 0; i < nodes.length; i++) {
              dashboardService.linkToDashboard(
                el.contextSelected,
                nodes[i].info.id.get(),
                el.dasboardSelected
              );
            }
          });
        });
      }

      this.showDialog = false;
    },

    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") this.onFinised({ closeResult });
    },
    getChildrenElement(type) {
      let geographicTypesOrder =
        ContextGeographicService.constants.GEOGRAPHIC_TYPES_ORDER;

      let children = dashboardVariables.GEOGRAPHIC_TYPES.slice(
        geographicTypesOrder.indexOf(type)
      );

      children.forEach(el => {
        el["dasboardSelected"] = "none";
        el["contextSelected"] = "none";
        el["dashboards"] = [];
      });

      return children;
    },
    async getContextDashboard(data) {
      if (data.contextSelected !== "none") {
        data.dashboards = await dashboardService.getDashboardByType(
          data.contextSelected,
          data.type
        );
      } else {
        console.log("condition non execute");
      }
    },
    getItemToLink() {
      return this.allData.filter(
        el => el.contextSelected !== "none" && el.dasboardSelected !== "none"
      );
    }
  }
};
</script>

<style>
.dialogContainer {
  width: calc(60%) !important;
}

.md-menu-content {
  z-index: 110;
}

.md-caption.noDashboard {
  color: red;
}
</style>
