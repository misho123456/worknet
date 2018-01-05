import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import profile from '../components/profile'
import vacancies from '../components/vacancy/vacancies'
import vacancyView from '../components/vacancy/vacancy-view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/vacancies',
      name: 'vacancies',
      component: vacancies
    },
    {
      path: '/vacancies/:id/view',
      name: 'vacancy-view',
      component: vacancyView,
      props: true
    }
  ]
})
