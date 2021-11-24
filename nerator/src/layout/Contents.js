import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../component/Button";
import PopUp from "../component/Popup";
import FileUpload from "../component/FileUpload";
import * as XLSX from "xlsx";

const Contents = (props) => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [filesInfo, setFilesInfo] = useState([]);
  const [excelData, setExcelData] = useState(new Object());
  const [popType, setPopType] = useState("");

  const handleUploadFile = (e) => {
    // if (filesInfo.length > 0) {
    //   filesInfo.map((data, idx) =>
    //     data.id === e.target.id
    //       ? { ...filesInfo, [e.target.id]: e.target.files[0] }
    //       : { ...filesInfo, [e.target.id]: e.target.files[0] }
    //   );
    // } else {
    //   setFilesInfo({ [e.target.id]: e.target.files[0] });
    // }
    setExcelData([...[]]);
    setFilesInfo({
      ...filesInfo,
      [e.target.id]: e.target.files[0],
    });

    //    if (e.target.files[0]["name"].length <= 0) return false;
    //  setFileName(e.target.files[0].name);
  };

  const handleParsingFile = (e) => {
    // let extension = filesInfo["list"]["name"].split(".");
    // if (extension[0].length <= 0) return false;
    // else if (extension[1] !== "xls" || extension[1] !== "xlsx") {
    //   alert("지정된 확장자가 아닙니다.");
    //   return false;
    // }
    let result = new Array();
    if (filesInfo.hasOwnProperty("list")) {
      const reader = new FileReader();
      const files = filesInfo["list"];
      reader.onload = (e) => {
        let data = e.target.result;
        const wb = XLSX.read(data, { type: "binary" });
        const wsName = wb.SheetNames[0];

        let worksheet = wb.Sheets[wsName];
        // let headerSheet = wb.Sheets[wsName];
        // headerSheet["!ref"] = "A1:C1";
        // const data_1 = XLSX.utils.sheet_to_json(headerSheet, { header: 1 });
        // console.log(data_1);

        // if (data_1[0].length <= 0) {
        //   alert("올바른 형태가 아닙니다.");
        //   return false;
        // }

        //  console.dir(data_1, { depths: null, colors: true });

        let row;
        let rowNum;
        let colNum;
        let range = XLSX.utils.decode_range(worksheet["!ref"]);

        if (range.s.r !== 0) {
          alert("올바른 형태가 아닙니다.");
          return false;
        }

        for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          row = [];
          for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
            var nextCell =
              worksheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];
            console.log(rowNum);
            if (rowNum === 0) {
              console.log(nextCell);
            }
            if (typeof nextCell === "undefined") {
              row.push(void 0);
            } else row.push(nextCell.w);
          }
          result.push(row);
        }
        let _data = result[0].filter((e) => e === undefined);
        console.log(_data);
        if (_data.length > 0) {
          alert("header와 데이터가 올바른 형태가 아닙니다.");
          setExcelData([]);
          return false;
        } else {
          setExcelData({ ...excelData, result: result });
        }
      };
      reader.readAsBinaryString(files);
    }
  };

  const dataListView = useCallback(() => {
    return (
      <>
        <TABLE>
          {Object.keys(excelData).length > 0 ? (
            excelData["result"].map((item, idx) => {
              return (
                <TR>
                  {item.map((it, ins) => {
                    return <TD>{it}</TD>;
                  })}
                </TR>
              );
            })
          ) : (
            <SelectHeader>데이터가 없습니다.</SelectHeader>
          )}
        </TABLE>
      </>
    );
  }, [excelData]);

  const uploadContents = useCallback(() => {
    return (
      <>
        <FileUpload
          id={"list"}
          text={"파일 업로드"}
          extension={".xls,.xlsx"}
          handleFile={handleUploadFile}
        />
        {filesInfo.hasOwnProperty("list") ? (
          <Button
            onClick={(e) => handleParsingFile(e)}
            backgroundColor={"green"}
            text={"업로드"}
          />
        ) : (
          ""
        )}

        <TABLE>
          {Object.keys(excelData).length > 0 &&
            excelData["result"].map((item, idx) => {
              return (
                <TR>
                  {item.map((it, ins) => {
                    return <TD>{it}</TD>;
                  })}
                </TR>
              );
            })}
        </TABLE>
      </>
    );
  }, [excelData, filesInfo]);

  const handleCloseListUpload = useCallback(
    (e) => {
      setOpen(e);
    },
    [open]
  );

  const handleOkListUpload = useCallback(() => {
    console.log("확인 함수 실행");
    setOpen(false);
  }, [open]);

  const handleOpenListView = useCallback(
    (e) => {
      console.log(e.currentTarget.id);
      setPopType(e.currentTarget.id);

      setOpen(true);
    },
    [open, popType]
  );

  return (
    <Container>
      <HeaderContainer>
        <Button
          id="upload"
          text={"명단 업로드"}
          onClick={(e) => handleOpenListView(e)}
        />
        <Button
          id="view"
          text={"명단 조회"}
          onClick={(e) => handleOpenListView(e)}
        />
      </HeaderContainer>

      <ThumbNailContainer>
        <ThumbNail>
          {filesInfo.hasOwnProperty("front") ? (
            <Image src={URL.createObjectURL(filesInfo["front"])} />
          ) : (
            <React.Fragment />
          )}
        </ThumbNail>

        <FileUpload
          text={"앞면 업로드"}
          extension={".png,.jpeg,.jpg"}
          id={"front"}
          handleFile={(e) => handleUploadFile(e)}
        />

        <ThumbNail>
          {filesInfo.hasOwnProperty("back") ? (
            <Image src={URL.createObjectURL(filesInfo["back"])} />
          ) : (
            <React.Fragment />
          )}
        </ThumbNail>

        <FileUpload
          text={"뒷면 업로드"}
          extension={".png,.jpeg,.jpg"}
          id={"back"}
          handleFile={(e) => handleUploadFile(e)}
        />
      </ThumbNailContainer>

      <SelectContainer>
        <SelectHeader>변수 지정</SelectHeader>

        <SelctContents>
          {Object.keys(excelData).length > 0 &&
            excelData["result"][0].map((item, idx) => {
              console.log("test");
              console.log(item);
              return <Items>{item}</Items>;
            })}
        </SelctContents>
      </SelectContainer>

      <PopUp
        open={open}
        title={popType === "view" ? "직원 명단 조회" : "직원 명단 업로드"}
        close={(e) => handleCloseListUpload(e)}
        ok={(e) => handleOkListUpload(e)}
        contents={popType === "view" ? dataListView() : uploadContents()}
      />
    </Container>
  );
};

const Container = styled.div`
  flex-shrink: 1;
  overflow: auto;
  padding-bottom: 95px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid black;
  justify-content: flex-end;
  align-items: center;
  padding: 1.1rem;
`;

const ThumbNailContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ThumbNail = styled.div`
  width: 41.23rem;
  margin-top: 4rem;
  height: 17rem;
  border: 1px solid black;
  background-color: #e8e8e8;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const SelectContainer = styled.div`
  width: 41.23rem;
  height: 13rem;
  background: #e8e8e8;
  overflow: hidden;
  margin-top: 76px;
`;

const Items = styled.div`
  width: 6rem;
  height: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: pink;
  margin-left: 10px;
`;

const SelectHeader = styled.div`
  height: 29px;
  color: #288ec8;
  background-color: #ffee53;
  border-radius: 11px 11px 0px 0px;
  display: "flex";
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  font-weight: 900;
  padding-left: 12px;
`;

const SelctContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TABLE = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
`;

const TR = styled.tr`
  border: 1px solid black;
`;
const TD = styled.td`
  border: 1px solid black;
  text-align: center;
  width: 30px;
`;
export default Contents;
