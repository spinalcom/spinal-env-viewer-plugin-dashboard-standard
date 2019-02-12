<template>
  <md-dialog :md-active.sync="showDialog"
             @md-closed="closeDialog(false)"
             class="globalCalculDialog">
    <md-dialog-title>Config Calulation rules</md-dialog-title>

    <md-dialog-content class="dialogContainer">

      <md-content class="paramContainer md-layout">
        <md-content class="md-layout-item md-size-50 paramDiv">
          <md-subheader>Nodes</md-subheader>
          <md-list class="nodeDiv md-scrollbar">
            <md-list-item v-for="(element,index) in elementsWithDashboard"
                          :key="index">
              <md-checkbox v-model="element.checked"
                           class="md-primary" />
              <span class="md-list-item-text">{{element.node.info.name.get()}}</span>
            </md-list-item>
          </md-list>
        </md-content>

        <md-content class="md-layout-item md-size-50 paramDiv">
          <md-subheader>Rules</md-subheader>

          <md-field>
            <label for="item">Select a type</label>
            <md-select v-model="endpointTypeSelected"
                       name="item"
                       id="item">
              <md-option v-for="(endpointType,index) in endpointsTypes"
                         :key="index"
                         :value="endpointType.type">{{endpointType.name}}</md-option>
            </md-select>

          </md-field>

          <md-content class="ruleDiv md-scrollbar">
            <md-list>
              <md-list-item v-for="(rule, index) in rules"
                            :key="index">
                <md-radio class="md-primary"
                          v-model="ruleSelected"
                          :value="index">{{ rule }}</md-radio>
              </md-list-item>
            </md-list>

          </md-content>
          <md-button v-tooltip="'add to list'"
                     class="md-fab md-fixed md-mini md-primary"
                     style="top: calc(45%); right: 20px;"
                     @click="addElementSelected">
            <md-icon>add</md-icon>
          </md-button>
        </md-content>
      </md-content>

      <md-content class="tableContainer">
        <md-table v-model="elementsSelected"
                  md-fixed-header>
          <md-table-toolbar>
            <h1 class="md-title">Elements</h1>
          </md-table-toolbar>

          <md-table-row slot="md-table-row"
                        slot-scope="{ item }">
            <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Endpoint Name">{{ item.endpoint }}</md-table-cell>
            <md-table-cell md-label="Calculation">{{ item.rule }}</md-table-cell>
            <md-table-cell md-label="">
              <md-button class="md-icon-button md-dense md-primary"
                         @click="removeFromList(item.node)">
                <md-icon>delete</md-icon>
              </md-button>

            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-content>

    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary"
                 @click="closeDialog(false)">Close</md-button>
      <md-button class="md-primary"
                 @click="closeDialog(true)"
                 :disabled="elementsSelected.length == 0">Save</md-button>
    </md-dialog-actions>
  </md-dialog>

</template>

<script>
import listChoices from "../js/choice";
import {
  dashboardVariables,
  dashboardService
} from "spinal-env-viewer-dashboard-standard-service";
import { find } from "../js/find";
import geographicService from "spinal-env-viewer-context-geographic-service";
import { SpinalGraphService } from "spinal-env-viewer-graph-service";

export default {
  name: "globalCalculDialog",
  props: ["onFinised"],
  data() {
    this.rules = Object.keys(dashboardVariables.CALCULATION_RULES).filter(
      el => el !== "reference"
    );
    this.endpointsTypes = Object.assign([], listChoices);
    return {
      node: null,
      elementsWithDashboard: [],
      showDialog: true,
      endpointTypeSelected: null,
      ruleSelected: null,
      elementsSelected: []
    };
  },
  methods: {
    opened(option) {
      this.node = option;
      this.getAllElementsWithDashboard().then(el => {
        this.elementsWithDashboard = [];
        el.forEach(element => {
          this.elementsWithDashboard.push({
            node: element,
            checked: false
          });
        });
      });
    },

    removed(valid) {
      if (valid) {
        this.elementsSelected.forEach(el => {
          dashboardService.addCalculationRule(
            el.node.info.id.get(),
            el.endpoint,
            el.rule
          );
        });
      }

      this.showDialog = false;
    },
    closeDialog(closeResult) {
      this.onFinised(closeResult);
    },
    getAllElementsWithDashboard() {
      return find(
        this.node.id.get(),
        geographicService.constants.GEOGRAPHIC_RELATIONS,
        async node => {
          let c = await SpinalGraphService.getChildren(node.info.id.get(), [
            dashboardVariables.ENDPOINT_RELATION_NAME
          ]);
          return c.length > 0;
        }
      );
    },
    addElementSelected() {
      this.elementsWithDashboard.forEach(el => {
        if (
          el.checked &&
          this.endpointTypeSelected != null &&
          this.ruleSelected != null &&
          !this.elementExist(el)
        ) {
          this.elementsSelected.push({
            name: el.node.info.name.get(),
            node: el.node,
            endpoint: this.endpointTypeSelected,
            rule: this.ruleSelected
          });
          el.checked = false;
        }
      });
    },
    elementExist(el) {
      let res = this.elementsSelected.find(item => {
        return (
          item.node.info.id.get() == el.node.info.id.get() &&
          item.endpoint == this.endpointTypeSelected
        );
      });

      return res !== undefined;
    },
    removeFromList(el) {
      this.elementsSelected = this.elementsSelected.filter(element => {
        return el.info.id.get() != element.node.info.id.get();
      });
    }
  }
};
</script>

<style>
.dialogContainer {
  width: calc(100%) !important;
  height: calc(100%) !important;
  overflow: hidden;
}

.globalCalculDialog {
  width: calc(60%);
  height: calc(100%);
}
.paramContainer {
  height: calc(50%);
}

.nodeDiv {
  overflow: auto;
  height: 80%;
}

.paramDiv {
  height: 100%;
  padding: 5px;
}

.ruleDiv {
  overflow: auto;
  height: 50%;
}

.tableContainer {
  height: calc(50%);
}

.md-content.md-table-content.md-scrollbar.md-theme-default {
  height: 200px !important;
}
</style>
