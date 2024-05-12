import { createRouter, createWebHistory } from 'vue-router'
import BoardView from '@/views/BoardView.vue'
import BoardList from '@/components/board/BoardList.vue'
import MainView from '@/views/MainView.vue'
import BoardArticle from '@/components/board/BoardArticle.vue'
import BoardWrite from '@/components/board/BoardWrite.vue'
import BoardModify from '@/components/board/BoardModify.vue'
import QnaBoardList from '@/components/qnaboard/QnaBoardList.vue'
import QnaBoardArticle from '@/components/qnaboard/QnaBoardArticle.vue'
import QnaBoardWrite from '@/components/qnaboard/QnaBoardWrite.vue'
import QnaBoardModify from '@/components/qnaboard/QnaBoardModify.vue'
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
        },
        {
          path: 'write',
          name: 'boardwrite',
          component: BoardWrite
        },
        {
          path: 'modify/:articleno',
          name: 'boardmodify',
          component: BoardModify
        }
      ]
    },
    {
      path: '/qnaboard',
      name: 'qnaboard',
      component: BoardView,
      redirect: { name: 'qnaboardlist' },
      children: [
        {
          path: 'list',
          name: 'qnaboardlist',
          component: QnaBoardList
        },
        {
          path: 'view/:articleno',
          name: 'qnaboardarticle',
          component: QnaBoardArticle
        },
        {
          path: 'write',
          name: 'qnaboardwrite',
          component: QnaBoardWrite
        },
        {
          path: 'modify/:articleno',
          name: 'qnaboardmodify',
          component: QnaBoardModify
        }
      ]
    },
    {
      path: '/trip',
      name: 'trip',
      component: () => import('@/components/trip/TouristSpot.vue')
    }
  ]
})

export default router
