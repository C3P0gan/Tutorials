export default {
    namespaced: true,
    state: {
        counter: {
            count: 0
        }
    },
    mutations: {
        INCR_COUNTER: function (state) {
            state.counter.count++
        },
        DECR_COUNTER: function (state) {
            state.counter.count--
        },
        INCR_COUNTER_BY: function (state, payload) {
            state.counter.count += payload
        }
    },
    actions: {
        incrementCounter: function ({ commit }) {
            return commit('INCR_COUNTER')
        },
        decrementCounter: function ({ commit }) {
            return commit('DECR_COUNTER')
        },
        incrementCounterBy: function ({ commit }, payload) {
            return commit('INCR_COUNTER_BY', payload)
        }
    }
}