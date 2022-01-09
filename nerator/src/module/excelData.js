const UPLOAD_EXCEL = "excel/upload";

export const uploadExcelData = (excelData) => ({
  type: UPLOAD_EXCEL,
  data: excelData.result,
});

const initialStae = [];

export default function excel(state = initialStae, action) {
  console.log("excelData");
  console.log(action);
  switch (action.type) {
    case UPLOAD_EXCEL:
      return {
        result: action.data,
      };
    default:
      return state;
  }
}
