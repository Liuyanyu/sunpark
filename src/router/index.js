import Vue from 'vue'
import Router from 'vue-router'
import { loadView } from '@/utils/lazyLoading'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
	console.log(savedPosition)
	if (savedPosition) {
		return savedPosition
	} else {
		const position = {
			x: 0,
			y: 0
		}
		if (to.hash) {
			position.selector = to.hash
		}
		return position
	}
}

export default new Router({
	linkActiveClass: 'active',
	// mode: 'history',
	// scrollBehavior,
	routes: [
		{
			path: '/',
			component: loadView('Home', true)
		},
		{
			path: '/home',
			component: loadView('Home', true)
		},
		{
			path: '/raiders',
			component: loadView('Raiders', true),
			redirect: '/raiders/openTime',
			children: [{
				path: 'openTime',
				component: loadView('Raiders/OpenTime')
			}, {
				path: 'recommend',
				component: loadView('Raiders/Recommend')
			}, {
				path: 'attractions',
				component: loadView('Raiders/Attractions')
			}, {
				path: 'traffic',
				component: loadView('Raiders/Traffic')
			}, {
				path: 'stalls',
				component: loadView('Raiders/Stalls')
			}]
		}, {
			path: '/booking',
			component: loadView('Booking', true),
			redirect: '/booking/Amusement#btns',
			children: [{
				path: 'amusement',
				component: loadView('Booking/Amusement')
			}, {
				path: 'site',
				component: loadView('Booking/Site')
			},{
				path: 'other',
				component: loadView('Booking/Other')
			}]
		}, {
			path: '/activity',
			component: loadView('Activity', true),
			redirect: '/activity/news',
			children: [{
				path: 'news',
				component: loadView('Activity/News')
			}, {
				path: 'projects',
				component: loadView('Activity/Projects')
			}, {
				path: ':type/:id',
				component: loadView('Activity/News.details')
			}]
		}, {
			path: '/service',
			component: loadView('Service', true),
			redirect: '/service/location',
			children: [{
				path: 'location',
				component: loadView('Service/Location')
			}, {
				path: 'ticket',
				component: loadView('Service/Ticket')
			}, {
				path: 'notice',
				component: loadView('Service/Notice')
			}, {
				path: 'monthly',
				component: loadView('Service/Monthly')
			}, {
				path: 'doorArea',
				component: loadView('Service/DoorArea')
			}, {
				path: 'tel',
				component: loadView('Service/Tel')
			}, {
				path: 'parking',
				component: loadView('Service/Parking')
			}, {
				path: 'help',
				component: loadView('Service/Help')
			}, {
				path: 'toilet',
				component: loadView('Service/Toilet')
			}, {
				path: 'centre',
				component: loadView('Service/Centre')
			}, {
				path: 'advice',
				component: loadView('Service/Advice')
			}, {
				path: 'lost',
				component: loadView('Service/Lost')
			}, {
				path: 'periphery',
				component: loadView('Service/Periphery')
			}, {
				path: 'infirmary',
				component: loadView('Service/Infirmary')
			}, {
				path: 'user',
				component: loadView('Service/User')
			}]
		}, {
			path: '/ours',
			component: loadView('Ours', true),
			redirect: '/ours/introduction',
			children: [{
				path: 'introduction',
				component: loadView('Ours/Introduction')
			}, {
				path: 'news',
				component: loadView('Ours/News')
			}, {
				path: 'news/:id',
				component: loadView('Ours/News.details')
			}, {
				path: 'jobs',
				component: loadView('Ours/Jobs')
			}, {
				path: 'cooperation',
				component: loadView('Ours/Cooperation')
			}, {
				path: 'share',
				component: loadView('Ours/Share')
			}, {
				path: 'friends',
				component: loadView('Ours/Friends')
			}, {
				path: 'contact',
				component: loadView('Ours/Contact')
			}]
		}, {
			path: '/project/:id',
			component: loadView('Project', true),
			children: [{
				path: 'news/:id',
				component: loadView('Project/News.details')
			}]
		},
		{
			path: '/project/news/:id',
			component: loadView('Project/News.details')
		},
		{
			path: '/en',
			component: loadView('En', true),
			redirect: '/en/index',
			children: [{
				name: 'home',
				path: 'index',
				component: loadView('En/Home', true)
			}, {
				path: 'raiders',
				component: loadView('En/Raiders', true),
				redirect: 'raiders/openTime',
				children: [{
					path: 'openTime',
					component: loadView('En/Raiders/OpenTime')
				}, {
					path: 'recommend',
					component: loadView('En/Raiders/Recommend')
				}, {
					path: 'attractions',
					component: loadView('En/Raiders/Attractions')
				}, {
					path: 'traffic',
					component: loadView('En/Raiders/Traffic')
				}, {
					path: 'stalls',
					component: loadView('En/Raiders/Stalls')
				}]
			}, {
				path: 'ours',
				component: loadView('En/Ours', true),
				redirect: 'ours/introduction',
				children: [{
					path: 'introduction',
					component: loadView('En/Ours/Introduction')
				}, {
					path: 'news',
					component: loadView('En/Ours/News')
				}, {
					path: 'news/:id',
					component: loadView('En/Ours/News.details')
				}, {
					path: 'jobs',
					component: loadView('En/Ours/Jobs')
				}, {
					path: 'cooperation',
					component: loadView('En/Ours/Cooperation')
				}, {
					path: 'share',
					component: loadView('En/Ours/Share')
				}, {
					path: 'friends',
					component: loadView('En/Ours/Friends')
				}, {
					path: 'contact',
					component: loadView('En/Ours/Contact')
				}]
			},
			{
				path: 'service',
				component: loadView('En/Service', true),
				redirect: 'service/location',
				children: [{
					path: 'location',
					component: loadView('En/Service/Location')
				}, {
					path: 'notice',
					component: loadView('En/Service/Notice')
				}, {
					path: 'monthly',
					component: loadView('En/Service/Monthly')
				}, {
					path: 'doorArea',
					component: loadView('En/Service/DoorArea')
				}, {
					path: 'tel',
					component: loadView('En/Service/Tel')
				}, {
					path: 'parking',
					component: loadView('En/Service/Parking')
				}, {
					path: 'periphery',
					component: loadView('En/Service/Periphery')
				}, {
					path: 'infirmary',
					component: loadView('En/Service/Infirmary')
				}, {
					path: 'user',
					component: loadView('En/Service/User')
				}]
			}]
		}
	]
})
