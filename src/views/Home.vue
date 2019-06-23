<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <Helloi18n-component></Helloi18n-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import Helloi18nComponent from '@/components/HelloI18n.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
    Helloi18nComponent,
  },
})
export default class Home extends Vue {}
</script>
