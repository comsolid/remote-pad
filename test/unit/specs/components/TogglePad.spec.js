
import TogglePad from 'src/components/TogglePad'
import avoriaz, { mount } from 'avoriaz'
import { expect } from 'chai'
import Vuex from 'vuex'
import state from 'src/store/state'
import { mutations } from 'src/store/mutations'

avoriaz.use(Vuex)

describe(`TogglePad component`, () => {
    let store
    beforeEach(() => {
        store = new Vuex.Store({
            state,
            mutations
        })
    })

    it(`should render an Off button`, () => {
        const wrapper = mount(TogglePad, { store })
        expect(wrapper.vm.text).to.equal('Off')
        expect(wrapper.vm.color).to.equal('is-danger')
    })

    it(`should turn 'On' on click`, () => {
        const wrapper = mount(TogglePad, { store })
        wrapper.simulate('click')
        expect(wrapper.vm.text).to.equal('On')
        expect(wrapper.vm.color).to.equal('is-success')
    })

    it(`should turn 'Off' when click again`, () => {
        const wrapper = mount(TogglePad, { store })
        wrapper.simulate('click')
        expect(wrapper.vm.text).to.equal('Off')
        expect(wrapper.vm.color).to.equal('is-danger')
    })
})
