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
  switch (action.type) {
    case ADD_LIST:
      return {
        excelData: action.data,
      };
    case ADD_NAMETAG:
      return state.findIndex((e) => e.id === action.id) >= 0
        ? state.map((item) =>
            item.id === action.id
              ? { ...item, data: action.data[action.id] }
              : item
          )
        : state.concat({ data: action.data[action.id], id: action.id });

    default:
      return state;
  }
}
