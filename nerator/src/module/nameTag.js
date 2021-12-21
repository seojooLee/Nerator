//액션 타입 선언
const ADD_LIST = "contents/ADD_LIST";
const ADD_NAMETAG = "contents/ADD_NAMETAG";

//액션 생성 함수
export const addList = (data) => ({ type: ADD_LIST, data });
export const addNameTag = (data, id) => ({ type: ADD_NAMETAG, data, id });
//초기상태
const initialState = [];
//리듀서
export default function nameTag(state = initialState, action) {
  var id = action.id;
  switch (action.type) {
    case ADD_LIST:
      return {
        excelData: action.data,
      };
    case ADD_NAMETAG:
      // console.log(
      //   state.findIndex((e) =>
      //     console.log("findIndex : " + e.id + "action.id : " + action.id)
      //   )
      // );
      console.log("=========");
      console.log(state);
      return state.findIndex((e) => e.id === action.id) >= 0
        ? { ...state, [action.id]: action.data }
        : state.concat({ [action.id]: action.data, id: action.id });

    default:
      return state;
  }
}
