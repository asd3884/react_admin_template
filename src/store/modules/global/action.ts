import * as types from '@/store/mutation-types'

// * setLanguage
export const setLanguage = (language: string) => ({
  type: types.SET_LANGUAGE,
  language,
})

// * setToken
export const setToken = (token: string) => ({
  type: types.SET_TOKEN,
  token,
})

export const setMenuList = (menuList: []) => ({
  type: types.SET_MENULIST,
  menuList,
})

// * updateCollapse
export const updateCollapse = (isCollapse: boolean) => ({
  type: types.UPDATE_COLLAPSE,
  isCollapse,
})
