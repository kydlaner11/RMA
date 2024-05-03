import {
  ExclamationCircleOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  EditOutlined,
  // CloseOutlined
} from "@ant-design/icons";
import {  Button, Tag, Space, Rate } from "antd";
import { accountAbility } from "../../utils/ability";
import { getColumnSearchProps } from "../../utils/column";



const isOutOfWarranty = (warranty, created_at) => {
  const endDate = new Date(warranty);
  const creationDate = new Date(created_at);

  // Jika tanggal pembuatan lebih besar dari tanggal berakhirnya garansi, maka sudah berakhir
  if (creationDate > endDate) {
    return true;
  } else {
    return false;
  }
};

const statusOptions = [
  {
    text: "Waiting Approval",
    value: "waiting",
  },
  {
    text: "Approved",
    value: "approved",
  },
  {
    text: "Received",
    value: "received",
  },
  {
    text: "Testing and Processing",
    value: "testing",
  },
  {
    text: "Fullfilment",
    value: "fullfilment",
  },
  {
    text: "Finished",
    value: "finished",
  },
  {
    text: "Cancelled",
    value: "cancelled",
  },
  {
    text: "Rejected",
    value: "rejected",
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

export const ticketsColumn = ({ searchProps, handleInfoClick, handleEditClick, handleCancelClick}) =>
  [
    {
      title: "Ticket RMA",
      dataIndex: "no_tickets",
      key: "no_tickets",
      ...getColumnSearchProps("no_tickets", searchProps),
      render: (_, record) => (
        <div>
          {record.no_tickets}
        </div>
      ),
    },
    {
      title: "Seller",
      dataIndex: "customer_2",
      key: "customer_2",
      ...getColumnSearchProps("customer_2", searchProps),
      render: (_, record) => (
        <div>
          {record.customer_2}
        </div>
      ),
    },
    {
      title: "Device",
      dataIndex: "product_name",
      key: "product_name",
      ...getColumnSearchProps("product_name", searchProps), 
      render: (_, record) => (
        <div>
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
      onFilter: (value, record) => {
        if (value === "Wp") {
          return !isOutOfWarranty(record.warranty, record.created_at);
        } else if (value === "Oow") {
          return isOutOfWarranty(record.warranty, record.created_at);
        }
        return false;
      },
      render: (_, record) => {
        const isExpired = isOutOfWarranty(record.warranty, record.created_at);
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
    {
      title: "Status",
      dataIndex: "status_ticket",
      key: "status_ticket",
      filters: statusOptions,
      onFilter: (value, record) => {
        const statusOption = statusOptions.find(option => option.text === record.status_ticket);
        return statusOption && statusOption.value === value;
      },
      render: (_, record) => (
        <Tag
          color={
            record.status_ticket === "Waiting Approval"
              ? "processing"
              : record.status_ticket === "Approved"
              ? "green"
              : record.status_ticket === "Received"
              ? "orange"
              : record.status_ticket === "Testing and Processing"
              ? "purple"
              : record.status_ticket === "Fullfilment"
              ? "success"
              : record.status_ticket === "Finished"
              ? "geekblue"
              : record.status_ticket === "Rejected"
              ? "error"
              : "default"
          }
        >
          {record.status_ticket}
        </Tag>
      ),
    },
    //buat rate di ticket column 
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (_, record) => (
        <Rate disabled defaultValue={record.rate} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.status_ticket === "Waiting Approval" && (
            <>
              <Button icon={<SearchOutlined />} onClick={() => handleInfoClick(record.id)} >Info</Button>
              <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditClick(record.id)} >Edit</Button>
              <Button danger onClick={() => handleCancelClick(record.id)}>Cancel</Button>
            </>
          )}
          {record.status_ticket !== "Waiting Approval" && (
            <Button icon={<SearchOutlined />} onClick={() => handleInfoClick(record.id)} >Info</Button>
          )}
          {record.rate === "Finished" && (
            <>
              <Button type="link" onClick={() => handleInfoClick(record.id)}  >Rate Now!</Button>
            </>
          )}
        </Space>
      ),
      hidden: accountAbility().can("update", "dashboard") ? false : true,
    },
  ].filter((item) => !item.hidden);
