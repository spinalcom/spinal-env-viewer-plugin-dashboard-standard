<template>
  <md-dialog :md-active.sync="showDialog"
             @md-closed="closeDialog(false)">
    <md-dialog-title style="text-align : center">Select Reference</md-dialog-title>

    <md-dialog-content>
      <div>
        <md-field>
          <label for="item">Select an item</label>
          <md-select v-model="endpointTypeSelected"
                     name="item"
                     id="item">
            <md-option v-for="(dash,index) in dashEndpoints"
                       :key="index"
                       :value="dash.type">{{dash.name}}</md-option>
          </md-select>

        </md-field>
      </div>

      <div>
        <md-field>
          <label for="item">Select an item</label>
          <md-select v-model="referenceId"
                     name="item"
                     id="item">
            <md-option v-for="(endpoint,index) in allEndpoints"
                       :key="index"
                       :value="endpoint.info.id.get()">{{endpoint.info.name.get()}}</md-option>
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
import choice from "../js/choice";
import utilities from "../js/utilities";
import { dashboardService } from "spinal-env-viewer-dashboard-standard-service";

export default {
  name: "bimObjectReferenceDialog",
  props: ["onFinised"],
  data() {
    this.dashEndpoints = Object.assign([], choice);
    return {
      bimObjectId: null,
      showDialog: true,
      endpointTypeSelected: null,
      referenceId: null,
      allEndpoints: []
    };
  },
  methods: {
    opened(option) {
      this.bimObjectId = option.id.get();
      utilities._getAllEndpointOfBimObject(option.id.get()).then(el => {
        this.allEndpoints = el;
      });
    },
    removed(option) {
      if (option) {
        dashboardService.addReferenceToBimObject(
          this.bimObjectId,
          this.referenceId,
          this.endpointTypeSelected
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
      return this.referenceId !== null && this.endpointTypeSelected !== null
        ? false
        : true;
    }
  }
};
</script>