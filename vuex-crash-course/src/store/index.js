import Vue from 'vue'
import Vuex from 'vuex'
import counterModule from '@/store/modules/counter.module'
import employeeModule from '@/store/modules/employee.module'
import usersModule from '@/store/modules/users.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counterState: counterModule.state,
    employeeState: employeeModule.state,
    usersState: usersModule.state
  },
  getters: {
    getCounterState: function (state) {
      return state.counterState.counter
    },
    getEmployeeState: function (state) {
      return state.employeeState.employeeList
    },
    getUserState: function (state) {
      return state.usersState.userList
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    counterModule,
    employeeModule,
    usersModule
  }
})
