//액션 타입 선언
const ADD_LIST = "contents/ADD_LIST";
const ADD_NAMETAG = "contents/ADD_NAMETAG";

//액션 생성 함수
export const addList = (data) => ({ type: ADD_LIST, data });
export const addNameTag = (data, id) => ({ type: ADD_NAMETAG, data, id });
//초기상태
const initialState = {
  files: {
    list: {},
    back: {},
    front: {},
  },
};

//리듀서
export default function nameTag(state = initialState, action) {
  let param = action.data;
  console.log(state);
  switch (action.type) {
    case ADD_LIST:
      return {
        excelData: action.data,
      };
    case ADD_NAMETAG:
      console.log(state);
      return {
        ...state,
        // filesInfo: state.filesInfo.map((item, idx) =>
        //   item === action.id ? { ...item, text: action.data } : item
        // ),
        //   files: (state.files[action.id] = action.data),
        files: { ...state, [action.id]: action.data },
      };

    default:
      return state;
  }
}
