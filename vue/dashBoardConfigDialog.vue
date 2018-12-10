
<template>
  <div>
    <md-dialog :md-active.sync="showDialog"
               @md-closed="closeDialog(false)">
      <md-dialog-title>{{title}}</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>DashBoard Name</label>
          <md-input v-model="inputValue"></md-input>
        </md-field>

        <br>
        <span class="md-subheading">Choose the type </span>
        <br>

        <div>

          <md-radio class="md-primary"
                    v-model="absType"
                    v-for="(geo,index) in types"
                    :key="index"
                    :value="geo.type">{{geo.name}}</md-radio>
        </div>

        <br>
        <span class="md-subheading">Choose </span>
        <br>

        <div class="md-layout">

          <md-checkbox class="md-layout-item md-size-45 md-primary"
                       v-for="(choice,index) in choices"
                       :key="index"
                       :disabled="choice.disabled"
                       v-model="choice.checked">{{choice.name}}</md-checkbox>
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
import listChoices from "../choice";
import {
  dashboardVariables,
  dashboardService
} from "spinal-env-viewer-dashboard-standard-service";

export default {
  name: "dialogComponent",
  props: ["onFinised"],
  data() {
    this.types = dashboardVariables.GEOGRAPHIC_TPES;

    return {
      title: "",
      inputValue: "",
      context: null,
      selectedNode: null,
      absType: dashboardVariables.GEOGRAPHIC_TPES[0].type, // par default le premier element de la liste
      create: true,
      showDialog: true,
      choices: Object.assign([], listChoices)
    };
  },
  methods: {
    opened(option) {
      this.title = option.title;
      this.selectedNode = option.selectedNode;
      this.context = option.context;
      this.inputValue = option.selectedNode
        ? option.selectedNode.name.get()
        : "";
      this.create = option.toCreate;
      this.absType = option.selectedNode
        ? option.selectedNode.type.get()
        : this.absType;
      this.SelectCases(option.selectedNode);
    },

    removed(option) {
      if (
        option.closeResult &&
        this.create &&
        option.inputValue.trim().length > 0
      ) {
        dashboardService.createStandardDashBoard(
          this.context.id.get(),
          option.inputValue.trim(),
          option.type,
          this.choices.filter(el => el.checked)
        );
      } else if (option.closeResult && option.inputValue.trim().length > 0) {
        console.log(this.selectedNode);
      }

      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function")
        this.onFinised({
          closeResult,
          inputValue: this.inputValue,
          type: this.absType
        });
    },
    async SelectCases(selectedNode) {
      let checkbox = this.choices.filter(el => el.disabled || el.checked);
      checkbox.forEach(el => {
        el.checked = false;
        el.disabled = false;
      });

      if (selectedNode) {
        let endpointsNode = await selectedNode.element.load();

        for (let i = 0; i < endpointsNode.sensor.length; i++) {
          const element = endpointsNode.sensor[i];
          let checkbox = this.choices.find(el => el.name == element.name.get());
          checkbox.checked = true;
          checkbox.disabled = true;
        }
      }
    }
  }
};
</script>
