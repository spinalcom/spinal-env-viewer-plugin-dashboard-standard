
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
let utilities = require("./utilities");
import listChoices from "./choice";
import { GEOGRAPHIC_TPES } from "./const";

export default {
  name: "dialogComponent",
  props: ["onFinised"],
  data() {
    this.types = GEOGRAPHIC_TPES;

    return {
      title: "",
      inputValue: "",
      context: null,
      absType: "",
      create: true,
      showDialog: true,
      choices: Object.assign([], listChoices)
    };
  },
  methods: {
    opened(option) {
      this.title = option.title;
      this.node = option.selectedNode;
      this.context = option.context;
      this.inputValue = option.selectedNode
        ? option.selectedNode.info.name.get()
        : "";
      this.create = option.toCreate;
      this.absType = option.selectedNode
        ? option.selectedNode.info.type.get()
        : this.absType;
    },

    removed(option) {
      if (
        option.closeResult &&
        this.create &&
        option.inputValue.trim().length > 0
      ) {
        utilities.createStandardDashBoard(
          this.context,
          option.inputValue.trim(),
          option.type,
          this.choices.filter(el => el.checked)
        );
      } else if (option.closeResult && option.inputValue.trim().length > 0) {
        console.log(this.node);
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
    }
  }
};
</script>
