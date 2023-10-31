import { AnyAction } from 'redux'
import produce from 'immer'
import * as types from '@/store/mutation-types'

/* MenuState */
export interface GlobalState {
  language: string
  token: string
  menuList: Array
  isCollapse: boolean
}

const globalState: GlobalState = {
  language: 'zh',
  token: '',
  menuList: [],
  isCollapse: false,
}

// menu reducer
const global = (state: GlobalState = globalState, action: AnyAction) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case types.SET_LANGUAGE:
        draftState.language = action.language
        break
      case types.SET_TOKEN:
        draftState.token = action.token
        break
      case types.SET_MENULIST:
        draftState.menuList = action.menuList
        break
      case types.UPDATE_COLLAPSE:
        draftState.isCollapse = action.isCollapse
        break
      default:
        return draftState
    }
  })

export default global
