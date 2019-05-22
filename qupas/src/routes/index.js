import { mount, route } from 'navi'

export default mount({
  '/': route({
    title: "Home",
    getView: () => import('./home.js')
  }),
})