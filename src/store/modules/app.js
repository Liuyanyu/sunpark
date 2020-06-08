import * as types from '../mutation-types'

const state = {
  device: {
    isMobile: false
  },
  menu: {
    opened: false,
    hidden: false
  },
  isEnglish: false,
  pageName: ''
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    Object.assign(state.device, device)
  },

  [types.TOGGLE_MENU] (state, opened) {
    if (state.device.isMobile) {
      state.menu.opened = opened
    } else {
      state.menu.opened = true
    }
  },

  [types.SET_ENGLISH] (state, isEnglish) {
    state.isEnglish = isEnglish
  },
}

export default {
  state,
  mutations
}
