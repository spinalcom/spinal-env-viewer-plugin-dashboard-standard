<template>
  <md-dialog :md-active.sync="showDialog"
             @md-closed="closeDialog(false)">
    <md-dialog-title style="text-align : center">Parameter {{name}} calculation</md-dialog-title>
    <md-dialog-content>

      <!-- <div class="endpointTypeDiv md-layout-item md-layout md-gutter"
           v-for="(dash,index) in dashEndpoints"
           :key="index">

        <div class="md-layout-item md-size-100">
          <span class="dashName md-title">{{dash.name}}</span>

          <md-radio class="md-primary"
                    v-for="(rule, index) in rules"
                    :key="index"
                    v-model="dash.dash_cal_rule"
                    :value="index">{{ rule }}</md-radio>
        </div>

      </div> -->

      <div class="md-layout-item">
        <md-field>
          <label for="item">Select an item</label>
          <md-select name="item"
                     id="item">
            <md-option v-for="(dash,index) in dashEndpoints"
                       :key="index"
                       :value="dash.id">{{dash.name}}</md-option>
          </md-select>

        </md-field>
      </div>

    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary"
                 @click="closeDialog(false)">Close</md-button>
      <md-button class="md-primary"
                 @click="closeDialog(true)">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { dashboardVariables } from "spinal-env-viewer-dashboard-standard-service";
import { SpinalGraphService } from "spinal-env-viewer-graph-service";
export default {
  name: "parameterDashboardCalculation",
  props: ["onFinised"],
  data() {
    return {
      inputValue: dashboardVariables.CALCULATION_RULES.average,
      showDialog: true,
      name: "",
      dashEndpoints: [],
      rules: Object.keys(dashboardVariables.CALCULATION_RULES)
    };
  },
  methods: {
    opened(option) {
      this.name = option.name.get();
      SpinalGraphService.getChildren(option.id.get(), [
        dashboardVariables.ENDPOINT_RELATION_NAME
      ]).then(element => {
        element.forEach(el => {
          this.dashEndpoints.push({
            id: el.id.get(),
            name: el.type.get(),
            dash_cal_rule: el.dash_cal_rule
              ? el.dash_cal.get()
              : dashboardVariables.CALCULATION_RULES.average
          });
        });
      });
    },
    removed(option) {
      if (option.closeResult) {
        console.log("yes");
      }
      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised({ closeResult, inputValue: this.inputValue });
      }
    },
    selectChanged() {}
  }
};
</script>

<style>
.dashName {
  display: block;
  margin-bottom: 5px;
  text-align: center;
}

.endpointTypeDiv {
  padding-left: 30px !important;
  margin-right: 15px;
  /* border-right: 1px dashed gray;
  border-bottom: 1px dashed gray; */
}
</style>
