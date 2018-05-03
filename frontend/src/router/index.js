import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignUp from '@/pages/SignUp'
import Hamster from '@/pages/Hamster'
import Score from '@/pages/Score'
import User from '@/pages/User'
import UserInfoEdit from '@/pages/UserInfoEdit'

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
      beforeEnter: (to, from, next) => {
        fetch('/hamster/auth', {
          credentials: 'include',
        })
          .then(response => response.json())
          .then(data => {
            if (data.error === '未登录') {
              return next('/signup')
            }

            next()
          })
      },
    },
    {
      path: '/score',
      name: 'Score',
      component: Score,
      beforeEnter: (to, from, next) => {
        fetch('/hamster/auth', {
          credentials: 'include',
        })
          .then(response => response.json())
          .then(data => {
            if (data.error === '未登录') {
              return next('/signup')
            }

            next()
          })
      },
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      beforeEnter: (to, from, next) => {
        fetch('/hamster/admin-auth', {
          credentials: 'include',
        })
          .then(response => response.json())
          .then(data => {
            if (data.error === '未登录') {
              return next('/signup')
            }

            if (data.error === '非管理员') {
              return next('/hamster')
            }

            next()
          })
      },
    },
    {
      path: '/user/:name',
      name: 'UserInfoEdit',
      component: UserInfoEdit,
      beforeEnter: (to, from, next) => {
        fetch('/hamster/admin-auth', {
          credentials: 'include',
        })
          .then(response => response.json())
          .then(data => {
            if (data.error === '未登录') {
              return next('/signup')
            }

            if (data.error === '非管理员') {
              return next('/hamster')
            }

            next()
          })
      },
    },
  ],
})
