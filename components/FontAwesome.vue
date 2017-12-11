<template>
  <i :class="['fa', `fa-${name}`]"></i>
</template>

<script>
export default {
  props: ['name'],
};
</script>
