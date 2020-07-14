<template>
  <div id="app">
    <el-container>
      <el-header><strong>Parking Lot App</strong></el-header>
      <el-main>
        <InitialInput v-if="$store.getters.initialInp"></InitialInput>
        <CarDetails v-else></CarDetails>
      </el-main>
    </el-container>
    
  </div>
</template>

<script>
// import HellowWorld from './components/HelloWorld.vue'
import InitialInput from './components/InitialInput.vue'
import CarDetails from './components/CarDetails.vue'
export default {
  name: 'App',
  components: {
    InitialInput,
    CarDetails
    // ,'hello-wrld':HellowWorld
  }
}
</script>

<style>
.el-header{
    background-color: #ecc518;
    color: #333;
    text-align: center;
    line-height: 60px;
    font-size:40px;
  }

</style>
