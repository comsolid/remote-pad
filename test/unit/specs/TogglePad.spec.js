
import avoriaz, { mount } from 'avoriaz'
import TogglePad from 'src/components/TogglePad'
import Vuex from 'vuex'
avoriaz.use(Vuex)

describe('Toggle Pad', () => {
    // TODO: setup a store
    // ERROR: undefined is not an object (evaluating 'this.$store.state')
    let store

    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                pad: {
                    enabled: false
                }
            }
        })
    })

    it('should render toggle-pad component', () => {
        const wrapper = mount(TogglePad, {
            store
        })
        expect(wrapper.computed().text()).to.equal('Off')
    })
})
