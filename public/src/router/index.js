import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld'
import profile from '../components/profile/profile'
import vacancies from '../components/vacancy/vacancies'
import vacancyView from '../components/vacancy/vacancy-view'
import vacancyAdd from '../components/vacancy/vacancy-add'
import login from '../components/um/login'
import utils from '../utils'

Vue.use(Router)

let router = new Router({
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
    },
    {
      path: '/vacancies/new',
      name: 'vacancy-add',
      component: vacancyAdd
    },
    {
      path: '/login',
      component: login,
      name: 'login'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    return next()
  }

  if (!Cookies.get('token')) {
    router.push('/login')
    return
  }

  try {
    await axios.head('/um/authorization', {headers: utils.getHeaders()})

    next()
  } catch (error) {
    router.push('/login')
  }
})

export default router
