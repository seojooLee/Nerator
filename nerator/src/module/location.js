//액션 타입 선언
const UPDATE_LOCATION = "location/UPDATE_LOCATION";

//액션 타입  생성
export const updateLocation = (data) => ({ type: UPDATE_LOCATION, data });

const initialStae = { locData: [] };

export default function location(state = initialStae, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        ...state["locData"],
        locData: state["locData"].concat(action.data),
        // locData: state.map((loc, i) =>
        //   loc.id === action.id ? { ...state, state: action["data"] } : state
        // ),
      };

    default:
      return state;
  }
}
