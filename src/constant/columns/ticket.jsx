import {
  ExclamationCircleOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  EditOutlined,
  ContainerOutlined,
  // CloseOutlined
} from "@ant-design/icons";
import {  Button, Tag, Space, Rate } from "antd";
import { accountAbility } from "../../utils/ability";
import { getColumnSearchProps } from "../../utils/column";
import "../../assets/css/ticket.css"; 



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



const CustomRateColumn = ({ value }) => {
  const renderRate = () => {
    if (value === 5) {
      return <Rate value={1} count={1} allowHalf disabled style={{ fontSize: "23px", color: '#ffb800'}}/>;
    } else if (value === 4) {
      return <Rate value={1} count={1} disabled style={{ fontSize: "23px", color: '#ffc634' }}/>;
    } else if (value === 3) {
      return <Rate value={1} count={1} disabled style={{ fontSize: "23px", color: '#ffd363' }}/>;
    } else if (value === 2){
      return <Rate value={1} count={1} disabled style={{ fontSize: "23px", color: '#ffdb7d' }}/>;
    } else if (value === 1) {
      return <Rate value={1} count={1} disabled style={{ fontSize: "23px", color: '#ffe39b' }}/>;
    } else {
      return <Rate value={0} count={1} disabled style={{ fontSize: "23px" }}/>;
    }
  };

  return renderRate();
};

const statusOptions = [
  {
    text: "Waiting Approval",
    value: "waiting",
  },
  {
    text: "Offering",
    value: "Offering",
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
    text: "Fulfillment",
    value: "fulfillment",
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

export const ticketsColumn = ({ searchProps, handleInfoClick, handleOfferClick, handleEditClick, handleCancelClick, handleTool}) => 
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
              : record.status_ticket === "Offering"
              ? "green"
              : record.status_ticket === "Received"
              ? "orange"
              : record.status_ticket === "Testing and Processing"
              ? "purple"
              : record.status_ticket === "Fulfillment"
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
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (_, record) => (
        <Space>
          {record.status_ticket === "Finished" && record.rate === null && (
             <div>
               <div>
                 <Button type="primary"  onClick={() => handleTool(record.id)}>
                   <span style={{ marginRight: "8px" }}>
                     {record.rate === null ? "Rate Now" : record.rate}
                   </span>
                   {/* <CustomRateColumn value={record.rate} /> */}
                 </Button>
               </div>
             </div>
          )}
          {record.status_ticket === "Finished" && record.rate !== null && (
            <div>
              <div>
                <Button type="link" onClick={() => handleTool(record.id)}>
                <span style={{ marginRight: "8px" }}>
                  {record.rate === null ? "0" : (record.rate)}
                </span>
                  <CustomRateColumn value={record.rate}/>
                </Button>
              </div>
            </div>
          )}
          {record.status_ticket !== "Finished" && (
            <div>
              <Button type="link" disabled>
                <span style={{ marginRight: "8px" }}>
                  {record.rate === null ? "0" : (record.rate)}
                </span>
                <CustomRateColumn value={record.rate}/>
              </Button>
            </div>
          )}
        </Space>
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
              <Button danger onClick={() => handleCancelClick(record.odoo_rma_ticket_id)}>Cancel</Button>
            </>
          )}
          {record.status_ticket !== "Waiting Approval" && (
            <Button icon={<SearchOutlined />} onClick={() => handleInfoClick(record.id)} >Info</Button>
          )}
          {record.status_ticket === "Offering" && (
            //buatkan tooltip antd untuk button offering letter dan berikan tampilan tooltip yang menarik
            // <Tooltip 
            //   title="Offering Letter" 
            //   color="#108ee9" 
            //   placement="topLeft" 
            //   overlayClassName="tooltip" 
            // >
            //   <Button icon={<ContainerOutlined />} danger  className="first_button"  onClick={() => handleOfferClick(record.id)} >We Need Your Response!</Button>
            // </Tooltip>
              <Button icon={<ContainerOutlined />} danger  className="first_button"  onClick={() => handleOfferClick(record.id)} >We Need Your Response!</Button>
          )}
        </Space>
      ),
      hidden: accountAbility().can("update", "dashboard") ? false : true,
    },
  ].filter((item) => !item.hidden);
