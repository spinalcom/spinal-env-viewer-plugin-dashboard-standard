<template>
  <div class="dialogContainer">
    <md-dialog :md-active.sync="showDialog"
               @md-closed="closeDialog(false)">
      <md-dialog-title>Link</md-dialog-title>
      <md-dialog-content>

        <md-tabs md-sync-route
                 v-if="selectedNode">
          <md-tab v-for="(tab,index) in children"
                  :key="index"
                  :id="tab.type"
                  :md-label="tab.name">

            <md-app>
              <md-app-toolbar class="md-transparent"
                              md-elevation="0">
                <span class="md-title">Dashboard</span>
              </md-app-toolbar>

              <md-app-drawer md-permanent="full">
                <md-toolbar class="md-transparent"
                            md-elevation="0">
                  <span class="md-title">Elements</span>
                </md-toolbar>

                <md-list>
                  <md-list-item>
                    <md-radio class="md-primary"
                              v-model="tab.all"
                              :value="true">All</md-radio>
                    <md-radio class="md-primary"
                              v-model="tab.all"
                              :value="false">Perso</md-radio>
                  </md-list-item>

                  <md-list-item class="md-primary"
                                v-for="(el,index) in tab.element"
                                :key="index">
                    <md-checkbox class="md-primary"
                                 v-model="el.checked"
                                 :disabled="tab.all">{{el.name}}</md-checkbox>
                  </md-list-item>

                </md-list>
              </md-app-drawer>

              <md-app-content>
                <div class="md-layout">

                  <md-radio class="md-layout-item md-size-30 md-primary"
                            v-for="(choice,index) in tab.dashboard"
                            :key="index"
                            v-model="dashboardSelected"
                            :value="choice.name">{{choice.name}}</md-radio>
                  <div v-if="tab.dashboard.length === 0">
                    No dashboard for this type
                  </div>

                </div>
              </md-app-content>
            </md-app>

          </md-tab>
        </md-tabs>

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
      children: [],
      dashboardSelected: null
    };
  },
  methods: {
    opened(option) {
      this.selectedNode = option.selectedNode;
      this.context = option.getContext;
      this.children = this.getAllChildren(this.selectedNode);
    },
    removed(option) {
      this.showDialog = false;
    },

    closeDialog(closeResult) {
      this.getDashboardAndItemSelected();

      if (typeof this.onFinised === "function") this.onFinised({ closeResult });
    },
    getAllChildren(selectedNode) {
      let geographicTypesOrder =
        ContextGeographicService.constants.GEOGRAPHIC_TYPES_ORDER;

      let children = dashboardVariables.GEOGRAPHIC_TPES.slice(
        geographicTypesOrder.indexOf(selectedNode.info.type.get())
      );

      let childrenCopy = Object.assign([], children);

      childrenCopy.forEach(async element => {
        element["all"] = true;
        element["dashboard"] = await this.getDashboard(
          this.context,
          element.type
        );
        element["element"] = await this.getNodeByType(
          this.selectedNode,
          element.type
        );
      });
      return childrenCopy;
    },
    async getDashboard(context, selectedNode) {
      let d = await dashboardService.getDashboardByType(context, selectedNode);
      return d;
    },

    async getNodeByType(selectedNode, type) {
      let nodes = await find(selectedNode, relations, node => {
        return node.info.type.get() === type;
      });

      var objs = [];

      for (let node of nodes) {
        objs.push({ checked: true, name: node.info.name.get(), node: node });
      }

      return objs;
    },
    getDashboardSelected() {
      return this.children.dasboard.find(
        el => el.name === this.dashboardSelected
      );
    },
    getDashboardAndItemSelected() {
      console.log(this.getDashboardSelected());
    }
  }
};
</script>

<style scoped>
</style>
