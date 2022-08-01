import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView';
import VuexCounter from '@/components/vuex/VuexCounter';
import VuexEmployees from '@/components/vuex/VuexEmployees';
import VuexUserList from '@/components/vuex/VuexUserList';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/counter',
    name: 'CounterComponent',
    component: VuexCounter
  },
  {
    path: '/employees',
    name: 'EmployeesComponent',
    component: VuexEmployees
  },
  {
    path: '/users',
    name: 'UserList',
    component: VuexUserList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
