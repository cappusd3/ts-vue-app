<template>
  <exception-page type="404" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ExceptionPage } from '@/components'

@Component({
  components: {
    ExceptionPage,
  },
})
export default class Page404 extends Vue {
}
</script>

<style scoped>

</style>
