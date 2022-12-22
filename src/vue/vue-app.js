// 1. Define route components. These can be imported from other files
import AppHome from './components/home.js'


// 2. Define some routes
const routes = [
    { name: 'home',   path: '/',  component: AppHome }
]


// 3. Create the router instance and pass the `routes` option
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use.
  history: VueRouter.createWebHashHistory(),
//   history: VueRouter.createWebHistory(),
  routes: routes
})


// 5. Create and mount the root instance.
const app = Vue.createApp({
    components:{

    },

    data(){
        return{
            device:{
                throttled: false,
                type: 'none',
            }
        }
    },

    computed:{

    },

    methods:{
        getDeviceType(){
            const width = window.innerWidth
            return width < 576 ? 'mobile' : width > 768 ? 'laptop' : 'tablet'
        },
        windowResize(){
            if (!this.device.throttled){
                this.device.type = this.getDeviceType()
                this.device.throttled = true
                setTimeout(() => {
                    this.device.throttled = false
                }, 100)
            }
        }
    },

    watch:{

    },

    // LifeCycle Hooks
    beforeMount(){
        this.device.type = this.getDeviceType()
        window.addEventListener('resize', this.windowResize);
    },
    unmounted(){
        window.removeEventListener('resize', this.windowResize);
    }
})


// Make sure to _use_ the router instance to make the whole app router-aware.
app.use(router)

app.mount('#app')
