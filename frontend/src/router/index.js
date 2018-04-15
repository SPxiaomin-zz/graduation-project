import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignUp from '@/pages/SignUp'
import Hamster from '@/pages/Hamster'
import Score from '@/pages/Score'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: (to, from, next) => {
        fetch('/hamster/auth', {
          credentials: 'include',
        })
          .then(response => response.json())
          .then(data => {
            if (data.error === '未登录') {
              return next()
            }

            next('/hamster')
          })
      },
    },
    {
      path: '/hamster',
      name: 'Hamster',
      component: Hamster,
    },
    {
      path: '/score',
      name: 'Score',
      component: Score,
    },
  ],
})
