import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        totalSlots: '',
        totalCars:'',
        lastVacantSlot:0,
        carData:[],
        initialInp:true
    },
    getters:{
        totalSlots:(state)=>{
            return state.totalSlots
        },
        totalCars:(state)=>{
            return state.totalCars
        },
        lastVacantSlot:(state)=>{
            return state.lastVacantSlot
        },
        carData:(state)=>{
            return state.carData
        },
        initialInp:(state)=>{
            return state.initialInp
        }

    }
    ,
    mutations: {
      updateTotalSlots: (state,payload)=> {
        state.totalSlots=payload
      },
      updateTotalCars:(state,payload)=>{
          state.totalCars=payload
      },
      updateStates:(state,payload)=>{
        state.totalSlots+=payload
        state.totalCars-=payload
      },
      updateLastVacantSlot:(state,payload)=>{
          state.lastVacantSlot=payload
      },
      updateCarData:(state,payload)=>{
        state.carData=[...payload]
    },
    updateInitialInp:(state,payload)=>{
        state.initialInp=payload
    },
    addCar:(state,payload)=>{
        console.log(payload)
        state.carData.splice(payload.index,0,payload.car)
    },
    deleteCar:(state,payload)=>{
        state.carData=state.carData.filter(car=>car.slot!==payload)
    }

    },
    actions:{
        updateTotalSlots:({commit},payload)=>{
            commit('updateTotalSlots',payload)
        },
        updateTotalCars:({commit},payload)=>{
            commit('updateTotalCars',payload)
        },
        updateStates:({commit},payload)=>{
            commit('updateStates',payload)
        },
        updateLastVacantSlot:({commit},payload)=>{
            commit('updateLastVacantSlot',payload)
        },
        updateCarData:({commit},payload)=>{
            commit('updateCarData',payload)
        },
        deleteCar:({commit},payload)=>{
            commit('deleteCar',payload)
        },
        addCar:({commit},payload)=>{
            commit('addCar',payload)
        },
        updateInitialInp:({commit},payload)=>{
            commit('updateInitialInp',payload)
        }
    }
  })