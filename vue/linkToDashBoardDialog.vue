<template>
  <div>
    <md-dialog class="DashboardDialog"
               :md-active.sync="showDialog"
               @md-closed="closeDialog(false)">
      <md-dialog-title>Select a dashboard To link</md-dialog-title>
      <md-dialog-content>

        <div v-if="hasDash"
             class="choicesEmpty">

          This element already has a dashboard, the old one will be removed !
        </div>

        <div class="md-layout-item">
          <md-field>
            <md-select v-if="dashboards.length"
                       v-model="dashboardContextSelected"
                       placeholder="Select context">
              <md-option v-for="(d,index) in dashboards"
                         :key="index"
                         :value="d.id">{{d.name}}</md-option>
            </md-select>
          </md-field>
        </div>

        <!-- <div class="contextDiv">
          <span class="md-caption">Select a Context</span>
          <md-radio class="md-layout-item md-size-30 md-primary"
                    v-for="(dashboard,index) in dashboards"
                    :key="index"
                    v-model="dashboardContextSelected"
                    :value="dashboard.id">{{dashboard.name}}</md-radio>
        </div> -->

        <div class="dashboardDiv">
          <span class="md-caption">Select a dashboard</span>

          <md-radio class="md-layout-item md-size-30 md-primary"
                    v-for="(choice,index) in choices"
                    :key="index"
                    v-model="radio"
                    :value="choice.id.get()">{{choice.name.get()}}</md-radio>

          <div class="choicesEmpty"
               v-if="choices.length == 0 && dashboardContextSelected.length !== 0">
            There is no Dahboard created for this type
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
import { dashboardService } from "spinal-env-viewer-dashboard-standard-service";

export default {
  name: "linkToDashBoardDialog",
  props: ["onFinised"],
  data() {
    return {
      selectedNode: null,
      context: null,
      showDialog: true,
      choices: [],
      radio: "",
      hasDash: false,
      dashboards: [],
      dashboardContextSelected: ""
    };
  },
  methods: {
    async opened(option) {
      this.context = option.context;
      this.selectedNode = option.selectedNode;
      this.hasDash = await dashboardService.hasDashBoard(
        option.selectedNode.id.get()
      );

      this.dashboards = this.lstToJson(
        await dashboardService.getAllDashboardContext()
      );
    },
    removed(option) {
      if (option.closeResult) {
        dashboardService.linkToDashboard(
          this.selectedNode.id.get(),
          this.radio
        );
      }
      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") this.onFinised({ closeResult });
    },
    lstToJson(lst) {
      let json = [];

      for (let loop = 0; loop < lst.length; loop++) {
        json.push(lst[loop].get());
      }

      return json;
    }
  },
  watch: {
    dashboardContextSelected: async function(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.choices = await dashboardService.getDashboardByType(
          newValue,
          this.selectedNode.type.get()
        );
      }
    }
  }
};
</script>

<style>
.DashboardDialog {
  width: calc(45%);
}
.choicesEmpty {
  color: red;
  width: 100%;
  margin-bottom: 10px;
  display: block;
}

.contextDiv {
  width: 100%;
  min-height: 10px;
  border-bottom: 1px solid gray;
  display: block;
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.dashboardDiv {
  width: 100%;
  display: block;
  min-height: 10px;
}

.dashboardDiv span.md-caption,
.contextDiv span.md-caption {
  display: block;
  font-size: 13px;
}

.md-menu-content {
  z-index: 110;
}
</style>
