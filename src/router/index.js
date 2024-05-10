import { createRouter, createWebHistory } from 'vue-router'
import BoardView from '@/views/BoardView.vue'
import BoardList from '@/components/board/BoardList.vue'
import MainView from '@/views/MainView.vue'
import BoardArticle from '@/components/board/BoardArticle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView,
      redirect: { name: 'boardlist' },
      children: [
        {
          path: 'list',
          name: 'boardlist',
          component: BoardList
        },
        {
          path: 'view/:articleno',
          name: 'boardarticle',
          component: BoardArticle
        }
      ]
    }
  ]
})

export default router
