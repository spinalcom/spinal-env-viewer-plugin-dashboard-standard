<template>
  <md-dialog :md-active.sync="showDialog"
             @md-closed="closeDialog(false)">
    <md-dialog-title>Create Dashboard Standard context</md-dialog-title>
    <md-dialog-content>
      <md-field>
        <label>Enter context Name</label>
        <md-input v-model="inputValue"></md-input>
      </md-field>

    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary"
                 @click="closeDialog(false)">Close</md-button>
      <md-button class="md-primary"
                 @click="closeDialog(true)"
                 :disabled="!(inputValue.trim().length > 0)">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { dashboardService } from "spinal-env-viewer-dashboard-standard-service";
import { toasted } from "../toats";

export default {
  name: "createDashboardContextComponent",
  props: ["onFinised"],
  data() {
    return {
      showDialog: true,
      inputValue: ""
    };
  },
  methods: {
    opened() {
      this.inputValue = "";
    },

    removed(option) {
      let contextName = this.inputValue.trim();

      if (option.closeResult && contextName.length > 0) {
        let success = dashboardService.createStandardDashBoardContext(
          contextName
        );

        if (success) {
          toasted.success("Context created");
        } else {
          toasted.error("error");
        }
      }
      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised({ closeResult, inputValue: this.inputValue });
      }
    }
  }
};
</script>
