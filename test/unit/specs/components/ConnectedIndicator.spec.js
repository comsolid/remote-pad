
import ConnectedIndicator from 'src/components/ConnectedIndicator'
import avoriaz, { mount } from 'avoriaz'
import { expect } from 'chai'
import Vuex from 'vuex'
import { initialState as state } from 'src/store/state'

avoriaz.use(Vuex)

describe(`ConnectedIndicator component`, () => {
    let store
    let propsData = {
        isConnected: false
    }
    beforeEach(() => {
        store = new Vuex.Store({
            state
        })
    })

    it(`should be disconnected by default`, () => {
        const wrapper = mount(ConnectedIndicator, { store, propsData })
        expect(wrapper.vm.text).to.equal('D')
        expect(wrapper.vm.color).to.equal('is-danger')
        expect(wrapper.vm.player).to.equal('alice')
    })

    it(`should change when is connected`, () => {
        propsData.isConnected = true
        const wrapper = mount(ConnectedIndicator, { store, propsData })
        expect(wrapper.vm.text).to.equal('C')
        expect(wrapper.vm.color).to.equal('is-success')
    })
})
