import React, { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable as BeautifulDraggable,
  Droppable,
} from "react-beautiful-dnd";
import Draggable from "react-draggable";

import styled from "styled-components";
import FileUpload from "./FileUpload";

const Editor = ({ isOpen }) => {
  const upperTab = [
    { name: "size", value: "크기" },
    { name: "val", value: "변수" },
  ];
  const [currentTab, setCurrentTab] = useState("size");
  const varList = ["이름", "연락처", "이메일"];
  const [editorItems, setEditorItems] = useState([]);
  const [filesInfo, setFilesInfo] = useState({});
  const [editorView, setEditorView] = useState("front");

  const [form, setForm] = useState({
    image: {
      w: 800,
      h: 400,
      front: {},
      back: {},
      frontItems: [],
      backItems: [],
    },
  });

  const handleDragEnd = useCallback(
    (param) => {
      console.log("handleDragEnd", param);
      let array =
        editorView === "front"
          ? [...form.image.frontItems]
          : [...form.image.backItems];
      array.push(param);
      if (editorView === "front") {
        setForm({ ...form, image: { ...form.image, frontItems: array } });
      } else {
        setForm({ ...form, image: { ...form.image, backItems: array } });
      }
    },
    [form, editorView]
  );

  const handleChangeView = useCallback((param) => {
    console.log("param", param);
    setEditorView(param);
  }, []);

  useEffect(() => {
    console.log(filesInfo);
  }, [filesInfo]);

  const handleUploadNameTag = (e) => {
    const item = { id: e.target.id, data: e.target.files[0] };
    setForm({ ...form, image: { ...form.image, [e.target.id]: item } });
  };

  const handleChangeForm = useCallback(
    (parent, e) => {
      const { name, value } = e.target;

      setForm({
        ...form,
        [parent]: {
          ...form[parent],
          [name]: value,
        },
      });
    },
    [form]
  );

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <Container open={true}>
      <Modal>
        <Header>
          <HR />
        </Header>
        <Contents>
          <div id="editor-area">
            {/* <DragDropContext onDragEnd={handleDragEditorItem}> */}
            {/* <Droppable droppableId="droppable"> */}
            {/* {(provided, snapshot) => ( */}
            <Card size={form.image}>
              <Image
                data-key="1"
                src={
                  form.image[editorView]?.data &&
                  URL.createObjectURL(form.image[editorView]?.data)
                }
                draggable={false}
              />
              {/* <div {...provided.droppableProps} ref={provided.innerRef}> */}
              {form.image[
                editorView === "front" ? "frontItems" : "backItems"
              ]?.map((item, index) => {
                return (
                  <Draggable
                    index={index}
                    key={"test-" + index}
                    draggableId={String("test-" + index)}
                  >
                    {/* {(provided, snapshot) => ( */}
                    <div
                    // ref={provided.innerRef}
                    // {...provided.draggableProps}
                    // {...provided.dragHandleProps}
                    >
                      <CardTagItem>{item?.draggableId}</CardTagItem>
                    </div>
                    {/* )} */}
                  </Draggable>
                );
              })}
              {/* </div> */}
            </Card>
            {/* )} */}
            {/* </Droppable> */}
            {/* </DragDropContext> */}
            {editorView === "front" ? (
              <button onClick={() => handleChangeView("back")}>뒷면</button>
            ) : (
              <button onClick={() => handleChangeView("front")}>앞면</button>
            )}
          </div>

          <div id="tool-area">
            <div id="upperTab">
              {upperTab.map((item, index) => {
                return (
                  <div
                    className={currentTab === item.name && "active"}
                    onClick={() => setCurrentTab(item.name)}
                  >
                    {item.value}
                  </div>
                );
              })}
            </div>
            <div id="editor_opt">
              {currentTab === "size" && (
                <div>
                  <FormRow>
                    <div className="opt_title title">명함 크기</div>
                    <div className="sub_row">
                      <div className="child">
                        <div className="name">w:</div>
                        <div className="value">
                          <input
                            type={"number"}
                            name="w"
                            value={form.image.w}
                            onChange={(e) => handleChangeForm("image", e)}
                          />
                        </div>
                      </div>

                      <div className="child">
                        <div className="name">h:</div>
                        <div className="value">
                          <input
                            type={"number"}
                            name="h"
                            value={form.image.h}
                            onChange={(e) => handleChangeForm("image", e)}
                          />
                        </div>
                      </div>
                    </div>
                  </FormRow>
                  <FormRow>
                    <div className="opt_title title">이미지 업로드</div>
                    <div className="sub_row inline">
                      <div className="child">
                        <div className="name">앞면</div>
                        <div className="value">
                          <input
                            value={form.image.front}
                            type={"file"}
                            id={"front"}
                            onChange={handleUploadNameTag}
                          />
                        </div>
                      </div>

                      <div className="child">
                        <div className="name">뒷면</div>
                        <div className="value">
                          <input
                            value={form.image.back}
                            type={"file"}
                            id={"back"}
                            onChange={handleUploadNameTag}
                          />
                        </div>
                      </div>
                    </div>
                  </FormRow>
                </div>
              )}

              {currentTab === "val" && (
                <div id="nametag-vars-list">
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {varList.map((item, index) => {
                            return (
                              <BeautifulDraggable
                                index={index}
                                key={"test-" + item}
                                draggableId={String("test-" + index)}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TagItem>{item}</TagItem>
                                  </div>
                                )}
                              </BeautifulDraggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              )}
            </div>
          </div>
        </Contents>
        <Footer>
          <button>닫기</button>
          <button>저장</button>
        </Footer>
      </Modal>
    </Container>
  );
};

Editor.defaultProps = {
  open: false,
  width: "100%",
  height: "18rem",
  contents: "test",
  title: "",
};

const FormRow = styled.div`
  .title {
    font-weight: 600;
    color: blue;
  }
  .sub_row {
    display: flex;
    /* border: 1px solid red; */

    .child {
      flex: 1;
      display: flex;
      /* border: 1px solid pink; */
    }
  }
  .inline {
    display: flex;
    flex-direction: column;
  }

  .name {
    width: 40px;
    font-weight: 500;
  }
  .value {
    display: flex;
    width: 100%;
    input[type="number"] {
      width: 50px;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  user-select: none;
`;

const Card = styled.div`
  width: ${({ size }) => size.w}px;
  height: ${({ size }) => size.h}px;
  background: white;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  position: fixed;
  background-color: rgba(21, 20, 20, 0.38);
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  display: ${(props) => (props.open ? `inherit` : `none`)};
  transition: 3s all;
`;

const Modal = styled.div`
  padding: 18px;
  width: 100%;
  padding: 3rem;
  height: 100%;
  /* width: ${(props) => props.width}; */
  /* height: ${(props) => props.height}; */
  z-index: 1;
  background-color: white;
  margin: auto;
  box-shadow: 6px 0px 9px 3px rgb(173 169 169 / 38%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const Contents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid gray;

  #editor-area {
    height: 100%;
    width: 100%;
    flex: 5;
    background-color: #a7a7a7;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #tool-area {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-basis: 200px;

    #upperTab {
      display: flex;

      .active {
        background: skyblue;
        font-weight: bolder;
      }

      div {
        border: 1px solid red;
        flex: 1;
        text-align: center;
        cursor: pointer;
        user-select: none;
      }
    }

    #editor_opt {
      padding: 10px;
    }

    #nametag-vars-list {
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }
  }
`;

const CardTagItem = styled.div`
  width: 150px;
  background: white;
  border: 1px solid gray;
`;

const TagItem = styled.div`
  width: 100%;
  text-align: center;
  padding: 3px;
  cursor: pointer;
  z-index: 2;
  background: white;
  border: 1px solid gray;
`;

const HR = styled.hr`
  width: 60%;
  border: 1px solid #f4f4f4;
`;

const Header = styled.div`
  text-align: center;
  width: 100%;
  font-weight: bolder;
  font-size: 1.2em;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 8px;
  padding-bottom: 8px;
`;

export default Editor;
