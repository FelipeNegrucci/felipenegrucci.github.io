export default {
    props:{

    },
    methods:{
        
    },
    template: /*html*/`
    <header class="text-bg-primary px-xl-2 px-xxl-0">
        <div class="container-xxl px-0 px-md-2 px-xl-4 px-xxl-0">
            <div class="row row-cols-auto gx-0 justify-content-between">
                <div class="col d-flex text-uppercase">
                    <router-link class="h3 fw-bold my-auto text-decoration-none link-light px-3 py-2" to="/">brand name</router-link>
                </div>
                <div class="col">
                    <div class="nav h-100 fw-bold text-capitalize">
                        <router-link class="nav-link link-light px-3 d-flex align-items-center" to="/link01">navlink</router-link>
                        <router-link class="nav-link link-light px-3 d-flex align-items-center" to="/link02">navlink</router-link>
                        <router-link class="nav-link link-light px-3 d-flex align-items-center" to="/link03">navlink</router-link>
                    </div>
                </div>
            </div>
        </div>
    </header>
    `
}
