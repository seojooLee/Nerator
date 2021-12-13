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

const Contents = ({
  excelData = [],
  addList,
  filesInfo = [],
  addNameTag,
  setLocation,
  locList,
}) => {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [fileName, setFileName] = useState("");
  const [popType, setPopType] = useState("");
  const el = useRef(null);
  const [page2, setPage2] = useState([]);

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
    console.log(excelData);
    if (Object.keys(excelData).length > 0) {
      if (
        !window.confirm(
          "이미 불러온 파일이 있습니다. \n 지우고 현재 파일을 불러오시겠습니까?"
        )
      ) {
        addList([]);
        return false;
      }
    }

    addNameTag({
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
          addList([]);
          return false;
        } else {
          addList({ ...excelData, result: result });
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
            excelData.map((item, idx) => {
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
            excelData.map((item, idx) => {
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
    console.log(currentItem.length);
    let obj = [];
    if (currentItem) {
      let move = e.target.getBoundingClientRect();
      let client_x = e.clientX - move.left;
      let client_y = e.clientY - move.top;
      setLocation({ id: currentItem, x: client_x, y: client_y });

      const elementAssign = Object.assign({}, currentItem);
      const reactHandlerKey = Object.keys(elementAssign).filter(
        (item) => item.indexOf("__reactProps") >= 0
      );
      const reactHandler = elementAssign[reactHandlerKey[0]];

      obj = {
        id: el.current,
        props: reactHandler,
      };
      //  setCurrentItem("");
    }

    if (e.target.getAttribute("data-key") === "1") {
      setIsDragOver1(false);
      setItem1(item1.concat(obj));
    } else {
      setIsDragOver2(false);
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
        <ThumbNail
          isDragOver={isDragOver1}
          onDrop={onDrop}
          data-key="1"
          onDragOver={onDragOver}
        >
          {item1 &&
            item1.map((itm, idx) => {
              let prop = itm.props;

              return <Items {...prop} />;
            })}

          {filesInfo.hasOwnProperty("front") ? (
            <Image src={URL.createObjectURL(filesInfo["front"])} />
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
          handleFile={(e) => handleUploadFile(e)}
        />

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

              return <Items {...prop} />;
            })}
          {filesInfo.hasOwnProperty("back") ? (
            <Image src={URL.createObjectURL(filesInfo["back"])} />
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
          handleFile={(e) => handleUploadFile(e)}
        />
      </ThumbNailContainer>

      <SelectContainer>
        <SelectHeader>변수 지정</SelectHeader>
        <SelctContents>
          {Object.keys(excelData).length > 0 &&
            excelData[0].map((item, idx) => (
              <Items
                ref={el}
                key={item + "-" + idx}
                data-item={idx}
                className={"droppable"}
                draggable={true}
                isDragging
                onDragStart={onDragEnter}
                onDragEnd={(e) => setIsDragOver1(false)}
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
  background-color: ${(props) => (props.isDragOver ? " #d6d4d4" : " #e8e8e8")};
  border: ${(props) => (props.isDragOver ? " 4px dashed black" : " none")};
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
