//액션 타입 선언
const ADD_LIST = "ADD_LIST";
const ADD_NAMETAG = "ADD_NAMETAG";

//액션 생성 함수
export const addList = (data) => ({ type: ADD_LIST, data });
export const addNameTag = (data) => ({ type: ADD_NAMETAG, data });

//초기상태
const initialStae = [];

//리듀서
export default function nameTag(state = initialStae, action) {
  console.log("reducer");
  console.log(action);
  console.log(action.type);
  switch (action.type) {
    case ADD_LIST:
      return {
        excelData: action.data,
      };
    case ADD_NAMETAG:
      return {
        filesInfo: action.data,
      };
    default:
      return state;
  }
}
