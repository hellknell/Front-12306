import {createStore} from 'vuex'

export default createStore({

    modules: {
        a: {
            state: {
                member: {
                    id: "",
                    mobile: "",
                    token: ""
                }
            },
            getters: {},
            mutations: {
                setMember(state, _member) {
                    state.member = _member;
                    localStorage.setItem("member", JSON.stringify(state.member));
                }

            },
            actions: {},
        }
    }
})
