<template>
  <span :class="['badge', statusClass]">{{ title }}</span>
</template>
<script>
import { computed } from "vue";

export default {
  props: ["type"],
  setup(props) {
    console.log(props, "props");
    return {
      title: computed(() => {
        if (props.type === "active") {
          return "Aктивный";
        } else if (props.type === "done") {
          return "Законченная";
        } else if (props.type === "cancelled") {
          return "Отменненый";
        } else if (props.type === "pending") {
          return "Ожидающий";
        }
        return "Unknown";
      }),
      statusClass: computed(() => {
        if (props.type === "active" || props.type === "done") {
          return "primary";
        } else if (props.type === "cancelled") {
          return "danger";
        } else if (props.type === "pending") {
          return "warning";
        }
        return props.type;
      }),
    };
  },
};
</script>
