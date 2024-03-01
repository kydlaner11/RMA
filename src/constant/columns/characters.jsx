import {
  ArrowUpOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Button, Tag } from "antd";
import { accountAbility } from "../../utils/ability";
import { getColumnSearchProps } from "../../utils/column";

const statusOptions = [
  {
    text: "Alive",
    value: "Alive",
  },
  {
    text: "Dead",
    value: "Dead",
  },
  {
    text: "unknown",
    value: "unknown",
  },
];

const speciesOptions = [
  {
    text: "Human",
    value: "Human",
  },
  {
    text: "Alien",
    value: "Alien",
  },
];

const genderOptions = [
  {
    text: "Male",
    value: "Male",
  },
  {
    text: "Female",
    value: "Female",
  },
  {
    text: "unknown",
    value: "unknown",
  },
];

export const charactersColumn = ({ searchProps }) =>
  [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "14px",
    },
    {
      title: "Name",
      key: "name",
      ...getColumnSearchProps("name", searchProps),
      sorter: (a, b) => a.name.localeCompare(b.name),
      // render: (_, record) => (
      //   <div>
      //     <Avatar
      //       src={record.image}
      //       alt={record.name}
      //       style={{ marginRight: "8px" }}
      //     />{" "}
      //     {record.name}
      //   </div>
      // ),
    },
    {
      title: "Species",
      dataIndex: "species",
      key: "species",
      filters: speciesOptions,
      onFilter: (value, record) => record.species.indexOf(value) === 0,
    },
    {
      title: "Gender",
      key: "gender",
      filters: genderOptions,
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
      render: (_, record) => (
        <Tag
          icon={
            record.gender === "Male" ? (
              <ArrowUpOutlined rotate={45} />
            ) : record.gender === "Female" ? (
              <PlusOutlined />
            ) : (
              <QuestionOutlined />
            )
          }
          color={
            record.gender === "Male"
              ? "blue"
              : record.gender === "Female"
              ? "pink"
              : "orange"
          }
        >
          {record.gender}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      filters: statusOptions,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (_, record) => (
        <Tag
          color={
            record.status === "Alive"
              ? "green"
              : record.status === "Dead"
              ? "red"
              : "orange"
          }
        >
          {record.status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <>
          <Button type="text" size="large" icon={<InfoCircleOutlined />} />
        </>
      ),
      hidden: accountAbility().can("update", "dashboard") ? false : true,
    },
  ].filter((item) => !item.hidden);
