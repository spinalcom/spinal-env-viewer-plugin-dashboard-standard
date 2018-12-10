<template>
  <div>
    <md-dialog :md-active.sync="showDialog"
               @md-closed="closeDialog(false)">
      <md-dialog-title>Select a dashboard To link</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout">

          <div v-if="hasDash"
               class="choicesEmpty">

            This element already has a dashboard, the old one will be removed !
          </div>

          <!-- <md-radio class="md-layout-item md-size-30 md-primary"
                    v-for="(choice,index) in choices"
                    :key="index"
                    v-model="radio"
                    :value="choice.id">{{choice.name}}</md-radio> -->

          <div class="choicesEmpty"
               v-if="choices.length == 0">
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
      dashboards: null
    };
  },
  methods: {
    opened(option) {
      this.context = option.context;
      this.selectedNode = option.selectedNode;
      this.hasDash = dashboardService.hasDashBoard(
        option.selectedNode.id.get()
      );

      this.dashboards = dashboardService.getAllDashboardContext();

      dashboardService
        .getDashboardByType(
          option.context.id.get(),
          option.selectedNode.id.get()
        )
        .then(el => {
          this.choices = el;
        });
    },
    removed(option) {
      if (option.closeResult) {
        dashboardService.createRelation(this.selectedNode.id.get(), this.radio);
      }
      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") this.onFinised({ closeResult });
    }
  }
};
</script>

<style>
.choicesEmpty {
  color: red;
  width: 100%;
  margin-bottom: 10px;
  display: block;
}
</style>
