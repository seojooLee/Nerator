import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "../component/Button";
import PopUp from "../component/Popup";
import FileUpload from "../component/FileUpload";
const Contents = (props) => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleUploadFile = (e) => {
    console.log(e.name);
    if (e["name"].length <= 0) return false;
    setFileName(e.name);
  };

  const handleParsingFile = (e) => {
    console.log("handleParsing File");
    if (e["name"].length <= 0) return false;
  };

  const uploadContents = () => {
    return (
      <div>
        <FileUpload handleFile={handleUploadFile} />
        {fileName.length > 0 ? (
          <Button
            onClick={(e) => handleParsingFile(e)}
            backgroundColor={"green"}
            text={"업로드"}
          />
        ) : (
          ""
        )}
        {fileName}
      </div>
    );
  };

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
        <ThumbNail />
        <Button text={"앞면 업로드"} />

        <ThumbNail />
        <Button text={"뒷면 업로드"} />
      </ThumbNailContainer>

      <SelectContainer>
        <SelectHeader>변수 지정</SelectHeader>
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

const SelectContainer = styled.div`
  width: 41.23rem;
  height: 13rem;
  background: #e8e8e8;
  overflow: hidden;
  margin-top: 76px;
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

export default Contents;
