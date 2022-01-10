import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
const Print = (props) => {
  const dispatch = useDispatch();
  const { filesInfo = [], excelData = [] } = useSelector((state) => ({
    locData: state.location.locData,
    excelData: state.excel,
    filesInfo: state.nameTag,
  }));

  useEffect(() => {
    console.log("Print.js");
    console.log(excelData);
  }, [excelData]);

  const excel = filesInfo.findIndex((e) => e.id === "list");
  const front = filesInfo.findIndex((e) => e.id === "front");
  const back = filesInfo.findIndex((e) => e.id === "back");

  if (front.length === -1 || back.length === -1 || excel.length === -1) {
    console.log("데이터가 없습니다.");
  }

  console.log(excelData);

  console.log("excel : " + excel + " front " + front + " back : " + back);

  if (excel >= 0) {
    console.log(filesInfo[excel]["data"]);
  }

  return (
    <Container id={props.id} open={props.open}>
      {props.open}
      {excelData.hasOwnProperty("result") &&
        excelData["result"].map((item, idx) => {
          return (
            <>
              {item.map((it, ins) => {
                return (
                  <Group>
                    {filesInfo.findIndex((e) => e.id === "front") >= 0 ? (
                      <Image
                        src={URL.createObjectURL(
                          filesInfo[
                            filesInfo.findIndex((e) => e.id === "front")
                          ]?.data
                        )}
                      />
                    ) : (
                      <div>앞면이 없습니다. </div>
                    )}
                    {filesInfo.findIndex((e) => e.id === "back") >= 0 ? (
                      <Image
                        src={URL.createObjectURL(
                          filesInfo[filesInfo.findIndex((e) => e.id === "back")]
                            ?.data
                        )}
                      />
                    ) : (
                      <div>뒷면이 없습니다.</div>
                    )}
                  </Group>
                );
              })}
            </>
          );
        })}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: pink;
  z-index: 3;
  top: 0;
  position: fixed;
  bottom: 0;
  display: ${(props) => (props.open ? " block" : " none")};
`;

const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  width: 30%;
  height: 30%;
  margin: 10px;
`;

const Item = styled.div`
  position: absolute;
  z-index: 3;
  font-size: 30pt;
`;
export default Print;
