<template>
  <span :class="['badge', statusClass]">{{ title }}</span>
</template>
<script>
import { computed } from 'vue'

export default {
  props: ["type"],
  setup(props) {
    console.log(props)
    return {
      title: computed(() => props.type.title),
      statusClass: computed(() => props.type.class),
    };
  },
};
</script>
