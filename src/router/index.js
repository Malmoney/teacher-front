import Vue from 'vue'
import Router from 'vue-router'
import FileRecord from "@/views/filesRecord"
import Welcome from "@/views/welcome"

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'FileRecord',
//       component: FileRecord
//     },
//     {
//       path: '/files',
//       name: 'FileRecord',
//       component: FileRecord
//     },
//     {
//       path: '/teacher',
//       name: 'teacher',
//       children: [{
//         path: 'login',
//         component: TeacherLogin
//       }]
//     }
//   ]
// })

const routes = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    component: Welcome
  },
  {
    path: '/files',
    component: FileRecord
  }
]

const router = new Router({
  base:'/student/',
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path == '/') {
//     next('/files')
//   }
// })

export default router