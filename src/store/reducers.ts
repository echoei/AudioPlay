import { actionsTypes } from "./action";
import { combineReducers } from "redux";

const initialState: any = {
  number: 0
}

const favoriteState: any = {
  list:[],
}

const audioListSate: any = {
  list: [],
}

const incrementRuducer = (state: any = initialState, action: any)=>{
  let nextState: any;
  switch(action.type) {
    case 'INCREMENT':
      state.number += 1;
      nextState = {...state};
      break;
    default:
      nextState = state;
      break;
  }
  return nextState;
}

const favoriteReducer = (state: any = favoriteState, action: any)=>{
  /**这里模拟与后端通信的话，增加删除一定都是读取后端返回的值，所以这里可以不进行自己的处理 */
  switch(action.type) {
    case actionsTypes.ADD_AUDIO:
      state.list = state.list.concat(action.list)
      return {...state};
    case actionsTypes.DELETE_AUDIO:
      action.list.forEach((item: any) => {
        let index: number = state.list.findIndex((_item: any)=>{
          return _item.name === item.name;
        });
        state.list.splice(index, 1);
      });
      return {...state};
    default:
      return state;

  }
}

const audioListReducer = (state: any = audioListSate, action: any) => {
  switch(action.type) {
    case actionsTypes.UPDATE:
      return {...state, ...{list: action.list}};
    default: 
      return state;
  }
}

const reducers = combineReducers({
  favoriteReducer,
  audioListReducer
})
export default reducers