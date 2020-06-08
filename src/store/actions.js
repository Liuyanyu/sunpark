import * as types from './mutation-types'

export const toggleMenu = ({ commit }, opened) => commit(types.TOGGLE_MENU, opened)

export const toggleDevice = ({ commit }, device) => commit(types.TOGGLE_DEVICE, device)

export const changePage = ({ commit }) => commit(types.CHANGE_PAGE)

export const setEnglish = ({commit, isEnglish}) => commit(types.SET_ENGLISH, isEnglish)

