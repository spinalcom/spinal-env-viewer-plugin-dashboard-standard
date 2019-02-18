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

      <div>
        <md-field>
          <label for="item">Select an item</label>
          <md-select v-model="endpointTypeSelected"
                     name="item"
                     id="item">
            <md-option v-for="(dash,index) in dashEndpoints"
                       :key="index"
                       :value="dash.id">{{dash.name}}</md-option>
          </md-select>

        </md-field>
      </div>

      <div v-if="endpointTypeSelected">
        <span class="dashName md-title">Choose :</span>

        <md-radio class="md-primary"
                  v-for="(rule, index) in rules"
                  :key="index"
                  v-model="ruleSelected"
                  :value="index">{{ rule }}</md-radio>
      </div>

      <div v-if="referenceSelect()">
        <md-field>
          <label for="reference">Select a reference</label>
          <md-select v-model="reference"
                     name="reference"
                     id="reference">
            <md-option v-for="(ref,index) in children"
                       :key="index"
                       :value="ref.id.get()">{{ref.name.get()}}</md-option>
          </md-select>

        </md-field>
      </div>

    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary"
                 @click="closeDialog(false)">Close</md-button>
      <md-button class="md-primary"
                 @click="closeDialog(true)"
                 :disabled="formNotValid()">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import {
  dashboardVariables,
  dashboardService
} from "spinal-env-viewer-dashboard-standard-service";
import { SpinalGraphService } from "spinal-env-viewer-graph-service";
import ContextGeographicService from "spinal-env-viewer-context-geographic-service";

export default {
  name: "parameterDashboardCalculation",
  props: ["onFinised"],
  data() {
    this.id = null;
    return {
      children: [],
      endpointTypeSelected: null,
      ruleSelected: dashboardVariables.CALCULATION_RULES.average,
      reference: "",
      showDialog: true,
      name: "",
      dashEndpoints: [],
      rules: Object.keys(dashboardVariables.CALCULATION_RULES)
    };
  },
  methods: {
    opened(option) {
      this.name = option.name.get();
      this.id = option.id.get();

      SpinalGraphService.getChildren(option.id.get(), [
        dashboardVariables.ENDPOINT_RELATION_NAME
      ]).then(element => {
        element.forEach(el => {
          this.dashEndpoints.push({
            id: el.id.get(),
            name: el.type.get()
            // ruleSelected: el.dash_cal_rule
            //   ? el.dash_cal_rule.rule.get()
            //   : dashboardVariables.CALCULATION_RULES.average,
            // reference:
            //   el.dash_cal_rule && el.dash_cal_rule.ref
            //     ? el.dash_cal_rule.ref.get()
            //     : null
          });
        });
      });
    },
    removed(option) {
      if (option) {
        if (
          this.ruleSelected !== dashboardVariables.CALCULATION_RULES.reference
        ) {
          this.reference = null;
        }

        dashboardService.addCalculationRule(
          this.id,
          this.endpointTypeSelected,
          this.ruleSelected,
          this.reference
        );
      }
      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised(closeResult);
      }
    },
    formNotValid() {
      return (
        this.endpointTypeSelected === null ||
        (this.ruleSelected === dashboardVariables.CALCULATION_RULES.reference &&
          this.reference === null)
      );
    },
    getAllChildren() {
      SpinalGraphService.getChildren(
        this.id,
        ContextGeographicService.constants.GEOGRAPHIC_RELATIONS_ORDER
      ).then(children => {
        this.children = children;
      });
    },
    referenceSelect() {
      return (
        this.ruleSelected === dashboardVariables.CALCULATION_RULES.reference
      );
    }
  },
  watch: {
    ruleSelected: function() {
      if (this.ruleSelected === dashboardVariables.CALCULATION_RULES.reference)
        this.getAllChildren();
    },
    endpointTypeSelected: function(newValue) {
      let dashInfo = SpinalGraphService.getInfo(newValue);
      if (dashInfo.dash_cal_rule) {
        this.ruleSelected = dashInfo.dash_cal_rule.rule.get();
        if (dashInfo.dash_cal_rule.ref) {
          this.reference = dashInfo.dash_cal_rule.ref.get();
          console.log("this.reference", this.reference);
        }
      }
    }
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
