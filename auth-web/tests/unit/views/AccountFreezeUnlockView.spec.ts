import { createLocalVue, mount } from '@vue/test-utils'
import AccountFreezeUnlockView from '@/views/auth/account-freeze/AccountFreezeUnlockView.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

Vue.use(Vuetify)
Vue.use(VueRouter)
const router = new VueRouter()
const vuetify = new Vuetify({})

// Prevent the warning "[Vuetify] Unable to locate target [data-app]"
document.body.setAttribute('data-app', 'true')

const mockSession = {
  'NRO_URL': 'Mock NRO URL',
  'NAME_REQUEST_URL': 'Mock Name Request URL'
}

describe('AccountFreezeUnlockView.vue', () => {
  let wrapper: any
  let userModule: any

  beforeEach(() => {
    sessionStorage.__STORE__['AUTH_API_CONFIG'] = JSON.stringify(mockSession)
    const localVue = createLocalVue()
    localVue.use(Vuex)

    userModule = {
      namespaced: true,
      state: {
        userProfile: {}
      },
      actions: {
        getUserProfile: jest.fn()
      }
    }

    const orgModule = {
      namespaced: true,
      state: {
        currentOrganization: {}
      }
    }

    const store = new Vuex.Store({
      state: {},
      strict: false,
      modules: {
        user: userModule,
        org: orgModule
      }
    })

    wrapper = mount(AccountFreezeUnlockView, {
      store,
      localVue,
      router,
      vuetify,
      mocks: {
        $t: (mock) => mock
      }
    })
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render page title', () => {
    expect(wrapper.find('h1').text()).toBe('Your account is Temporarily Suspended')
  })

  it('should render page title icon', () => {
    expect(wrapper.find('h1').find('.v-icon').exists()).toBe(true)
  })

  it('should render stepper', () => {
    expect(wrapper.find('stepper')).toBeTruthy()
  })

  it('should have error dialog', () => {
    expect(wrapper.find({ ref: 'errorDialog' })).toBeTruthy()
  })
})
