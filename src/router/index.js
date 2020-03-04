import Router from 'vue-router';

var login = function login () {
  return import('../page/index.vue');
};

var router = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '中通IT'
    }
  }]
});
router.beforeEach(function (to, from, next) {
  document.title = to.meta.title;
  next();
});
export default router;
