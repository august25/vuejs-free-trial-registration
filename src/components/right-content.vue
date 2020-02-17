<template>
  <div class="page">
    <div class="page-image"></div>
    <div class="page-text">{{ blurb }}</div>
  </div>
</template>

<script>
export default {
  name: 'RightContent',
  props: [
    'blurb'
  ]
}
</script>
