
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

        <div>
          <md-radio class="md-primary"
                    v-model="absType"
                    v-for="(type,index) in types"
                    :key="index"
                    :value="type">{{type}}</md-radio>
        </div>

        <div class="md-layout">
          <md-field class="md-layout-item md-size-85">
            <label>Add attribute</label>
            <md-input v-model="attr"></md-input>
          </md-field>

          <md-button class="md-layout-item md-primary md-size-10"
                     @click="addAttributes">
            ADD
          </md-button>
        </div>

        <div>

          <md-chip md-deletable
                   v-for="(att,index) in attributes"
                   :key="index">{{att}}</md-chip>
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

export default {
  name: "dialogComponent",
  props: ["onFinised"],
  data() {
    return {
        title : "",
        inputValue: "",
        context: null,
        absType: "room",
        types: ["building","floor","zone","room"],
        attr : "",
        attributes: [],
        create : true,
      showDialog: true
    };
  },
  methods: {
    opened(option) {
        this.title = option.title;
        this.node = option.selectedNode;
        this.context = option.context;
        this.inputValue = option.selectedNode ? option.selectedNode.info.name.get() : "";
        this.create = option.toCreate;
        this.absType = option.selectedNode ? this.getType(option.selectedNode.info.type.get()) : "room";
    },

    removed(option) {

      if(option.closeResult && this.create && option.inputValue.trim().length > 0) {
        utilities.createStandardDashBoard(this.context,option.inputValue.trim(),option.type, option.attributes);
      } else if(option.closeResult) {
        console.log(this.node);
      }

      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function")
        this.onFinised({ closeResult, inputValue: this.inputValue, attributes : this.attributes , type : this.absType });
    },
    addAttributes() {
      this.attr = this.attr.trim();

      if(this.attr.length > 0 && this.attributes.indexOf(this.attr) == -1) {
        this.attributes.push(this.attr);
        this.attr = "";
      }

    },

    getType(type) {
      return type.replace("geographic","").toLowerCase();
    },
    getAttributes() {
      return;
    }
  }
};
</script>
