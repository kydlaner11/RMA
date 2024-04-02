import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { Avatar, Button, Tag } from "antd";
import { accountAbility } from "../../utils/ability";
import { getColumnSearchProps } from "../../utils/column";
import moment from "moment";


// Fungsi untuk menentukan apakah suatu tanggal sudah melewati periode garansi
const isOutOfWarranty = (warrantyEndDate) => {
  // Misalnya, kita asumsikan tanggal sekarang adalah hari ini
  const currentDate = moment();
  const warrantyEnd = moment(warrantyEndDate);
  
  return currentDate.isAfter(warrantyEnd); // Mengembalikan true jika sudah melewati periode garansi
};

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

const warrantyOptions = [
  {
    text: "Out of Warranty",
    value: "Oow",
  },
  {
    text: "Warranty Period",
    value: "Wp",
  },
];

export const charactersColumn = ({ searchProps }) =>
  [
    {
      title: "Ticket RMA",
      dataIndex: "no_tickets",
      key: "no_tickets",
      ...getColumnSearchProps("no_tickets", searchProps),
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <div>
          {record.no_tickets}
        </div>
      ),
    },
    {
      title: "Device",
      dataIndex: "product_name",
      key: "product_name",
      ...getColumnSearchProps("product_name", searchProps),
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <div>
          <Avatar
            src={record.image}
            alt={record.name}
            style={{ marginRight: "8px" }}
          />{" "}
          {record.product_name}
        </div>
      ),
    },
    {
      title: "MAC Address",
      dataIndex: "mac_address",
      key: "mac_address",
      filters: speciesOptions,
      ...getColumnSearchProps("mac_address", searchProps),
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <div>
          {record.mac_address}
        </div>
      ),
    },
    {
      title: "Warranty",
      dataIndex: "warranty",
      key: "warranty",
      filters: warrantyOptions,
      onFilter: (value, record) => record.warranty === value,
      render: (_, record) => {
        const isExpired = isOutOfWarranty(record.warrantyEndDate);
        return (
          <Tag
            icon={isExpired ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />}
            color={isExpired ? "red" : "green"}
          >
            {isExpired ? record.warranty : record.warranty}
          </Tag>
        );
      },
    },
    // {
    //   title: "Warranty",
    //   dataIndex: "warranty",
    //   key: "warranty",
    //   filters: warrantyOptions,
    //   onFilter: (value, record) => record.gender.indexOf(value) === 0,
    //   render: (_, record) => (
    //     <Tag
    //       icon={
    //         record.warranty === "Male" ? (
    //           <ArrowUpOutlined rotate={45} />
    //         ) : record.warranty === "Female" ? (
    //           <PlusOutlined />
    //         ) : (
    //           <QuestionOutlined />
    //         )
    //       }
    //       color={
    //         record.warranty === "Male"
    //           ? "blue"
    //           : record.warranty === "Female"
    //           ? "pink"
    //           : "orange"
    //       }
    //     >
    //       {record.warranty}
    //     </Tag>
    //   ),
    // },
    {
      title: "Status",
      dataIndex: "status_ticket",
      key: "status_ticket",
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
