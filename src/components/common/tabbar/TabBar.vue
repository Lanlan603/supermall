<!--  -->
<template>
<div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style  scoped>
#tab-bar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /* z-index: 9; */
    width: 100%;
    box-shadow: 0px -1px 1px rgba(100, 100, 100, .1);
}


</style>
