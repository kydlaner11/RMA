import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, List, Modal, Result } from "antd";
import Fuse from "fuse.js";
import Lottie from "lottie-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noResultAnimation from "../../assets/lottie/no-result.json";
import typingAnimation from "../../assets/lottie/typing.json";
import { generateAuthRoute } from "../../utils/pages";

const SearchField = () => {
  const navigate = useNavigate();
  const fusePage = new Fuse(generateAuthRoute(), {
    keys: ["path", "label.props.children"],
  });

  const inputRef = useRef(null);
  const [searchModal, setSearchModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [pageResult, setPageResult] = useState([]);

  const handleOpenModal = () => {
    setSearchModal(true);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);

    const resPage = fusePage.search(e.target.value);
    setPageResult(resPage);
  };

  const handleClickPage = (path) => {
    navigate(path);
    handleClose();
  };

  const handleClose = () => {
    setSearchModal(false);
    setKeyword("");
    setPageResult([]);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      {/* Seach Field on Top Bar */}
      <Button
        size="middle"
        type="default"
        icon={
          <SearchOutlined
            style={{ marginRight: "4px" }}
            onClick={handleOpenModal}
          />
        }
        onClick={handleOpenModal}
        style={{
          marginRight: "16px",
          paddingRight: "52px",
          cursor: "pointer",
        }}
      >
        Search...
      </Button>

      {/* Search Modal */}
      <Modal
        open={searchModal}
        onCancel={handleClose}
        closable={false}
        destroyOnClose
        title={
          <Input
            ref={inputRef}
            autoFocus
            size="large"
            placeholder="Search..."
            prefix={<SearchOutlined style={{ marginRight: "8px" }} />}
            style={{ marginRight: "16px", cursor: "pointer" }}
            onChange={handleSearch}
            value={keyword}
          />
        }
        footer={null}
        style={{
          padding: "10px 0",
          height: "60vh",
          overflowY: "scroll",
        }}
        centered
        id="search-modal"
      >
        {keyword === "" ? (
          <Result
            icon={
              <Lottie
                animationData={typingAnimation}
                loop={true}
                style={{ height: "160px" }}
              />
            }
            subTitle="Type something to search"
          />
        ) : pageResult.length === 0 ? (
          <Result
            icon={
              <Lottie
                animationData={noResultAnimation}
                loop={true}
                style={{ height: "160px" }}
              />
            }
            subTitle="No result found"
          />
        ) : (
          <>
            <h4 style={{ lineHeight: "0", fontWeight: "600", opacity: 0.75 }}>
              Pages
            </h4>
            {pageResult.map((item) => (
              <>{console.log("item", item)}</>
            ))}
            <List
              dataSource={pageResult}
              renderItem={(page) => (
                <List.Item
                  key={page.refIndex}
                  onClick={() => handleClickPage(page.item.label.props.to)}
                  style={{ cursor: "pointer" }}
                >
                  <List.Item.Meta
                    avatar={page.item.icon}
                    title={page.item.label.props.children}
                    description={page.item.description}
                  />
                </List.Item>
              )}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default SearchField;
