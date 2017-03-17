
import avoriaz, { mount } from 'avoriaz'
import HomePage from 'src/pages/Home'
import FullscreenButton from 'src/components/FullscreenButton'
import VueRouter from 'vue-router'
avoriaz.use(VueRouter)

import router from 'src/router'

describe('Home Page', () => {
    it('should render correct contents', () => {
        const wrapper = mount(HomePage, {
            router
        })
        expect(wrapper.name()).to.equal('HomePage')
        expect(wrapper.contains(FullscreenButton)).to.equal(true)
        expect(wrapper.contains('.hero-body a[href$="/config"]')).to.equal(true)
        expect(wrapper.contains('.hero-foot a[href$="/about"]')).to.equal(true)

        const title = wrapper.find('h1.title')[0]
        expect(title.text().trim()).to.equal('Welcome to Remote Pad')
    })
})
