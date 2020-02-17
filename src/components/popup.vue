<template>
  <div class="overlay-box">
    <h1 v-if="headline">{{ headline }}</h1>
    <div class="spinner" v-if="spinner"></div>
    <h4 class="line1" v-html="line1" v-if="line1"></h4>
    <h4 class="line2" v-html="line2" v-if="line2"></h4>
  </div>
</template>

<script>
export default {
  name: 'ImageHighlight',
  props: [
    'headline',
    'line1',
    'line2',
    'spinner'
  ]
}
</script>

<style lang="sass" scoped>
.spinner
  width: 100px
  height: 100px
  margin: 20px
  background: url('../assets/spinner.gif') center center no-repeat
  background-size: contain
</style>
