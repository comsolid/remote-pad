
import Direction from 'src/components/pad/Direction'
import { mount } from 'avoriaz'
import { expect } from 'chai'

describe(`Direction component`, () => {
    const propsData = {
        position: '',
        turning: false,
        bgColor: '#000',
        fgColor: '#fff'
    }

    it(`should render the right direction`, () => {
        propsData.position = 'right'
        const wrapper = mount(Direction, { propsData })
        expect(wrapper.data().val).to.equal('R')
    })

    it(`should render the left direction`, () => {
        propsData.position = 'left'
        const wrapper = mount(Direction, { propsData })
        expect(wrapper.data().val).to.equal('L')
    })

    it(`should change color while turning`, () => {
        propsData.position = 'left'
        propsData.turning = true
        const wrapper = mount(Direction, { propsData })
        expect(wrapper.hasClass('is-turning')).to.equal(true)
    })
})
