import React, {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import Button from "../component/Button";
import PopUp from "../component/Popup";
import FileUpload from "../component/FileUpload";
import * as XLSX from "xlsx";

const Contents = ({ filesInfo = [], addNameTag, setLocation, locList }) => {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [popType, setPopType] = useState("");
  const el = useRef(null);
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    console.log(excelData.result);
  }, [excelData]);

  const handleUploadFile = (e) => {
    console.log(excelData);
    if (Object.keys(excelData).length > 0) {
      if (
        !window.confirm(
          "이미 불러온 파일이 있습니다. \n 지우고 현재 파일을 불러오시겠습니까?"
        )
      ) {
        setExcelData([]);
        return false;
      }
    }
    addNameTag(
      {
        ...filesInfo,
        [e.target.id]: e.target.files[0],
      },
      e.target.id
    );
  };

  const handleUploadNameTag = (e) => {
    addNameTag(
      {
        ...filesInfo,
        [e.target.id]: e.target.files[0],
      },
      e.target.id
    );
  };

  const handleParsingFile = (e) => {
    // let extension = filesInfo["list"]["name"].split(".");
    // if (extension[0].length <= 0) return false;
    // else if (extension[1] !== "xls" || extension[1] !== "xlsx") {
    //   alert("지정된 확장자가 아닙니다.");
    //   return false;
    // }
    let findIndex = filesInfo.findIndex((e) => e.id === "list");
    console.log("handlepARSING FILE");
    console.log(findIndex);
    let result = [];
    if (findIndex >= 0) {
      const reader = new FileReader();
      const files = filesInfo[findIndex].data;
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

  const resetData = () => {
    if (window.confirm("데이터를 비우시겠습니까?")) {
      setExcelData([]);
    }
  };

  const dataListView = useCallback(() => {
    return (
      <>
        <TABLE>
          {excelData.hasOwnProperty("result") ? (
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
            <>
              <SelectHeader>데이터가 없습니다.</SelectHeader>
              <Button text={"비우기"} onClick={resetData} />
            </>
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
        {filesInfo && filesInfo.findIndex((e) => e.id === "list") >= 0 ? (
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

  const onDragEnter = (e) => {
    console.log(e.target);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("id", e.target.getAttribute("data-item"));
    e.dataTransfer.setData("text/html", e.target);
    e.dataTransfer.setDragImage(e.target, 20, 20);
    e.target.classList.add("drag");

    setCurrentItem(e.target);
  };

  const [isDragOver1, setIsDragOver1] = useState(false);
  const [isDragOver2, setIsDragOver2] = useState(false);

  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);

  let clone = [];
  const onDragOver = (e) => {
    // console.log(e.target.classList);'
    e.preventDefault();
    if (e.target.getAttribute("data-key") === "1") {
      setIsDragOver1(true);
    } else {
      setIsDragOver2(true);
    }
  };

  const onDrop = (e) => {
    console.log("=================");

    console.log(currentItem);
    let obj = [];
    if (currentItem) {
      let move = e.target.getBoundingClientRect();
      let client_x = e.clientX - move.left;
      let client_y = e.clientY - move.top;

      console.log(client_x + " : " + client_y);
      setLocation({ id: currentItem, x: client_x, y: client_y });

      const elementAssign = Object.assign({}, currentItem);
      const reactHandlerKey = Object.keys(elementAssign).filter(
        (item) => item.indexOf("__reactProps") >= 0
      );
      const reactHandler = elementAssign[reactHandlerKey[0]];

      obj = {
        id: el.current,
        props: reactHandler,
        x: client_x,
        y: client_y,
      };
      //  setCurrentItem("");
    }

    if (e.target.getAttribute("data-key") === "1") {
      if (!filesInfo.findIndex((e) => e.id === "front") < 0) {
        alert("이미지가 존재하지 않습니다.");
        return false;
      } else {
        setIsDragOver1(false);
      }
      setItem1(item1.concat(obj));
    } else {
      if (!filesInfo.findIndex((e) => e.id === "back") < 0) {
        alert("이미지가 존재하지 않습니다.");
        return false;
      } else {
        setIsDragOver2(false);
      }
      setItem2(item2.concat(obj));
    }
  };

  return (
    <Container>
      {clone}
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
        <WrapItem>
          <ThumbNail
            isDragOver={isDragOver1}
            onDrop={onDrop}
            data-key="1"
            onDragOver={onDragOver}
          >
            {item1 &&
              item1.map((itm, idx) => {
                let prop = itm.props;

                return (
                  <Items
                    {...prop}
                    className={"drop"}
                    drop={true}
                    x={itm.x}
                    y={itm.y}
                  />
                );
              })}

            {filesInfo.findIndex((e) => e.id === "front") >= 0 ? (
              <Image
                src={URL.createObjectURL(
                  filesInfo[filesInfo.findIndex((e) => e.id === "front")].data
                )}
              />
            ) : (
              <React.Fragment>
                <SelectHeader>사진이 없습니다</SelectHeader>
              </React.Fragment>
            )}
          </ThumbNail>
          <FileUpload
            text={"앞면 업로드"}
            extension={".png,.jpeg,.jpg"}
            id={"front"}
            handleFile={(e) => handleUploadNameTag(e)}
          />
        </WrapItem>
        <WrapItem>
          <ThumbNail
            onDrop={onDrop}
            data-key="2"
            onDragOver={onDragOver}
            className={"droppable"}
            isDragOver={isDragOver2}
          >
            {item2 &&
              item2.map((itm, idx) => {
                let prop = itm.props;
                console.log(locList);
                return (
                  <Items
                    {...prop}
                    className={"drop"}
                    drop={true}
                    x={itm.x}
                    y={itm.y}
                  />
                );
              })}

            {filesInfo.findIndex((e) => e.id === "back") >= 0 ? (
              <Image
                src={URL.createObjectURL(
                  filesInfo[filesInfo.findIndex((e) => e.id === "back")].data
                )}
              />
            ) : (
              <React.Fragment>
                <SelectHeader>사진이 없습니다</SelectHeader>
              </React.Fragment>
            )}
          </ThumbNail>

          <FileUpload
            text={"뒷면 업로드"}
            extension={".png,.jpeg,.jpg"}
            id={"back"}
            handleFile={(e) => handleUploadNameTag(e)}
          />
        </WrapItem>
      </ThumbNailContainer>

      <SelectContainer>
        <SelectHeader>변수 지정</SelectHeader>
        <SelctContents>
          {Object.keys(excelData).length > 0 &&
            excelData["result"][0].map((item, idx) => (
              <Items
                ref={el}
                key={item + "-" + idx}
                data-item={idx}
                className={"droppable"}
                draggable={true}
                isDragging
                onDragStart={onDragEnter}
                onDragEnd={(e) => setIsDragOver1(false)}
                drop={false}
              >
                {item}
              </Items>
            ))}
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
const WrapItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ThumbNail = styled.div`
  width: 41.23rem;
  position: relative;
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  height: 17rem;
  border: 1px solid black;
  background-color: ${(props) => (props.isDragOver ? " #d6d4d4" : " #e8e8e8")};
  border: ${(props) => (props.isDragOver ? " 4px dashed black" : " none")};
  overflow: hidden;
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
  position: ${(props) => (props.drop ? "absolute" : "relative")};
  left: ${(props) => (props.x > 0 ? props.x : 0)}px;
  top: ${(props) => (props.y > 0 ? props.y : 0)}px;

  width: 6rem;
  height: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a8cff;
  margin-left: 10px;
  border-radius: 3px;
  user-select: none;
  cursor: ${(props) => (props.isDragging ? "grabbing" : "cursor")};

  &:hover {
    background-color: #0074e8;
    color: white;
  }
  &:active {
    background-color: #0683ff;
    cursor: grabbing;
    cursor: --moz-grabbing;
    cursor: -webkit-grabbing;
  }
`;

const SelectHeader = styled.div`
  //height: 29px;
  //position: relative;
  //height: 100%;
  width: 100%;
  margin: auto;
  text-align: center;
  color: #288ec8;
  border-radius: 11px 11px 0px 0px;
  user-select: none;
  font-weight: 900;
  font-size: large;

  display: flex;
  justify-content: center;
  align-items: center;
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
  border-spacing: 0;
  border: 0.5px solid black;
`;

const TR = styled.tr`
  border: 0.5px solid black;

  &:first-child {
    background-color: aliceblue;
  }
`;
const TD = styled.td`
  text-align: center;
  border: 0.5px solid black;
  width: 30px;
`;
export default Contents;
