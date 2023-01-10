// 1. Define route components. These can be imported from other files
import AppHeader    from './vue/components/header.js'
import AppFooter    from './vue/components/footer.js'

import AppHome      from './vue/components/home.js'
import AppLink01    from './vue/components/link01.js'
import AppLink02    from './vue/components/link02.js'
import AppLink03    from './vue/components/link03.js'


// 2. Define some routes
const routes = [
    { path: '/',         component: AppHome },
    { path: '/link01',   component: AppLink01 },
    { path: '/link02',   component: AppLink02 },
    { path: '/link03',   component: AppLink03 },

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
        AppHeader,
        AppFooter
    },

    data(){
        return{
            device:{
                throttled: false,
                type: 'none',
            },
            mouse:{
                throttled: false,
                updatePos: true,
                useTrailer: true,
                pos:{
                    X: 0,
                    Y: 0
                },
                isLeftButtonPressed: false,
                trailer:{
                    isActive: false,
                    element: null,
                    isFirstCall: true,
                    isExpanded: false
                }
            }
        }
    },

    computed:{
        trailerClassObject(){
            const trailerIsActive = this.mouse.trailer.isActive
            const deviceIsLaptop = this.device.type == 'laptop'
            const mouseLeftClick = this.mouse.isLeftButtonPressed
            return{
                'fade-in': trailerIsActive || !deviceIsLaptop && mouseLeftClick,
                'fade-out': !trailerIsActive || !deviceIsLaptop && !mouseLeftClick,
                'd-none': this.mouse.trailer.isFirstCall,
                'expanded': this.mouse.trailer.isExpanded || !deviceIsLaptop
            }
        }
    },

    methods:{
        getDeviceType(){
            const deviceWidth = window.innerWidth
            return deviceWidth < 576 ? 'mobile' : deviceWidth > 768 ? 'laptop' : 'tablet'
        },
        whenWindowResize(){
            if (!this.device.throttled){
                this.device.type = this.getDeviceType()
                this.device.throttled = true
                setTimeout(() => {
                    this.device.throttled = false
                }, 80)
            }
        },
        updateMouseTrailer(){
            const trailer = this.mouse.trailer.element
            var trailerScale = this.mouse.trailer.isExpanded ? 3 : 1.4
            if (!this.mouse.isLeftButtonPressed){
                trailerScale = this.mouse.trailer.isExpanded ? 2.4 : 1
                if (this.device.type != 'laptop'){
                    trailerScale = 0.7
                }
            }
            const updatePos = `translate(
                ${this.mouse.pos.X - (trailer.offsetWidth / 2)}px,
                ${this.mouse.pos.Y - (trailer.offsetHeight / 2)}px
            )`
            const updateScale = `scale(${trailerScale}, ${trailerScale})`
            const keyframes = {
                transform: `${updatePos} ${updateScale}`
            }
            var kfsDuration = this.mouse.trailer.isExpanded ? 140 : 90
            if (!this.mouse.isLeftButtonPressed){
                kfsDuration = 340
            }
            if (this.device.type != 'laptop'){
                kfsDuration = 700
            }
            trailer.animate(keyframes, {
                duration: kfsDuration,
                fill: 'forwards'
            })
        },
        whenMouseMove(event){
            if (this.mouse.updatePos && !this.mouse.throttled){
                this.mouse.pos.X = event.clientX
                this.mouse.pos.Y = event.clientY
                if (this.mouse.useTrailer && this.mouse.trailer.isActive){
                    this.updateMouseTrailer()
                }
                this.mouse.throttled = true
                setTimeout(() => {
                    this.mouse.throttled = false
                }, 20)
            }
        },
        whenMouseDown(event){
            if (event.button == 0){
                this.mouse.isLeftButtonPressed = true
                this.updateMouseTrailer()
            }
        },
        whenMouseUp(event){
            if (event.button == 0){
                this.mouse.isLeftButtonPressed = false
                this.updateMouseTrailer()
            }
        },
        whenMouseEnterScreen(){
            if (this.mouse.useTrailer){
                if (this.mouse.trailer.isFirstCall){
                    this.mouse.trailer.isFirstCall = false
                }
                this.mouse.trailer.isActive = true
                this.mouse.trailer.isExpanded = false
                if (this.device.type != 'laptop'){
                    this.mouse.trailer.isExpanded = true
                }
            }
        },
        whenMouseLeaveScreen(){
            if (this.mouse.useTrailer){
                this.mouse.trailer.isActive = false
            }
        }
    },

    watch:{

    },

    // LifeCycle Hooks
    beforeMount(){
        this.device.type = this.getDeviceType()
        window.addEventListener('resize', this.whenWindowResize)
        window.addEventListener('mousemove', this.whenMouseMove)
    },
    mounted(){
        this.mouse.trailer.element = document.querySelector('#mouse-trailer')
        const htmlBody = document.querySelector('body')
        htmlBody.addEventListener('mousedown', this.whenMouseDown)
        htmlBody.addEventListener('mouseup', this.whenMouseUp)
        htmlBody.addEventListener('mouseenter', this.whenMouseEnterScreen)
        htmlBody.addEventListener('mouseleave', this.whenMouseLeaveScreen)
    },
    unmounted(){
        window.removeEventListener('resize', this.whenWindowResize)
        window.removeEventListener('mousemove', this.whenMouseMove)
        const htmlBody = document.querySelector('body')
        htmlBody.removeEventListener('mousedown', this.whenMouseDown)
        htmlBody.removeEventListener('mouseup', this.whenMouseUp)
        htmlBody.removeEventListener('mouseenter', this.whenMouseEnterScreen)
        htmlBody.removeEventListener('mouseleave', this.whenMouseLeaveScreen)
    }
})


// Make sure to _use_ the router instance to make the whole app router-aware.
app.use(router)

app.mount('#app')
