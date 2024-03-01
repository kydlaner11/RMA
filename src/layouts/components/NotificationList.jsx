import { Avatar, Badge, Divider, Empty, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const NotificationList = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {type === "general" ? (
        <Empty />
      ) : (
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            // padding: "0 16px",
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            loader={
              <Skeleton
                avatar
                paragraph={{
                  rows: 1,
                }}
                active
              />
            }
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.email}
                  onClick={() => console.log("email", item.email)}
                  style={{
                    cursor: "pointer",
                    padding: "6px 8px",
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge dotb offset={[-2, 2]}>
                        <Avatar src={item.picture.large} shape="square" />
                      </Badge>
                    }
                    title={<span>{item.name.last}</span>}
                    description={item.email}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
