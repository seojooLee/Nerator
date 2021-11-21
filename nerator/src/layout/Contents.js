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

        let row;
        let rowNum;
        let colNum;
        let range = XLSX.utils.decode_range(worksheet["!ref"]);
        for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          row = [];
          for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
            var nextCell =
              worksheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];
            if (typeof nextCell === "undefined") {
              row.push(void 0);
            } else row.push(nextCell.w);
          }
          result.push(row);
        }
        setExcelData({ ...excelData, result: result });
      };
      reader.readAsBinaryString(files);
    }
  }; 

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
              console.log("test");
              console.log(item);
              return (
                <TR>
                  {item.map((it, ins) => {
                    return <TD>{it}</TD>;
                  })}
                </TR>
              );
            })}

          {/* {excelData.map((item, idx) => {
            console.log("test ");
            console.log(item);
            return (
              <TR>
                <TD>{item}</TD>
              </TR>
            );
          })} */}
        </TABLE>
      </>
    );
  }, [excelData, filesInfo]);

  const handleOpenListUpload = useCallback(() => {
    setOpen(true);
  }, [open]);

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

  const handleOpenListView = useCallback(() => {
    setOpen(true);
  }, [open]);

  return (
    <Container>
      <HeaderContainer>
        <Button text={"명단 업로드"} onClick={(e) => handleOpenListUpload(e)} />
        <Button text={"명단 조회"} onClick={(e) => handleOpenListView(e)} />
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
        title={"직원 명단 업로드"}
        close={(e) => handleCloseListUpload(e)}
        ok={(e) => handleOkListUpload(e)}
        contents={uploadContents()}
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
