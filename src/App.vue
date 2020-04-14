<template>
  <div id="app">
    <ion-app>

      <ion-vue-router/>
    </ion-app>
  </div>
</template>

<script>
import { Plugins } from '@capacitor/core'

export default {
  name: 'App',
  components: {
    
  },
  created(){
      Plugins.App.addListener('backButton', function() { 
         if(confirm("Exit Application?"))
                Plugins.App.exitApp()                        
      });
  }
}
</script>

<style>

</style>
