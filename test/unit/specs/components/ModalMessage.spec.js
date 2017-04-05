
import ModalMessage from 'src/components/ModalMessage'
import avoriaz, { mount } from 'avoriaz'
import { expect } from 'chai'
import Vuex from 'vuex'
import state from 'src/store/state'
import { mutations } from 'src/store/mutations'

avoriaz.use(Vuex)

describe(`ModalMessage component`, () => {
    let store
    beforeEach(() => {
        store = new Vuex.Store({
            state,
            mutations
        })
    })

    it(`should be inactive by default`, () => {
        const wrapper = mount(ModalMessage, { store })
        expect(wrapper.vm.isActive).to.equal(false)
        expect(wrapper.vm.message).to.equal('')
    })

    it(`should be active when there's a message`, () => {
        const wrapper = mount(ModalMessage, { store })
        store.commit('showMessage', {
            text: 'hello world',
            type: 'info'
        })
        expect(wrapper.vm.isActive).to.equal(true)
        expect(wrapper.vm.message).to.equal('hello world')
    })

    it(`should be inactive when click on close button`, () => {
        const wrapper = mount(ModalMessage, { store })
        const callback = sinon.spy(wrapper.vm, 'close')
        const btnClose = wrapper.find('.modal-close')[0]
        btnClose.simulate('click')
        expect(callback.calledOnce).to.equal(true)
        expect(wrapper.vm.isActive).to.equal(false)
        expect(wrapper.vm.message).to.equal('')
    })
})
