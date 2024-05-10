import { Button, Drawer, Tabs, Steps, Rate,  Card, Typography, Input, message, Spin, Divider, Tag, Image, theme } from 'antd';
import { AlertOutlined, CheckCircleOutlined, FileSearchOutlined, StarOutlined,FileOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from '../../../api';
import { BASE_URL_BE } from '../../../constant/url';


const { TabPane } = Tabs;
const { useToken } = theme;
const {Title, Paragraph} = Typography;

const UserDrawer = ({ openDrawer, setOpenDrawer, infoTicketId, apiTable, modalSession }) => {
    const [loading, setLoading] = useState(false);
    const [ticketData, setTicketData] = useState(null);
    const [expiredTime, setExpiredTime] = useState(null);
    const [imageView, setImageView] = useState([]);
    const { token } = useToken();

    
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

    const fetchLog = async () => {
        try {
            setLoading(true);
            const response = await Api.get(`api/endpoint/log-status/?ticket_id=${infoTicketId}`);
            console.log(response.data)

        } catch (error) {
            console.error('Error fetching ticket data:', error);
            if (error.response && error.response.status === 400) {
                message.error('Failed to get info ticket');
              } else if (error.response && error.response.status === 401) {
                modalSession();
              } else {
                message.error('Failed to get info ticket');
              }
        } finally {
            setLoading(false);
        }
    };
    

      const isExpired = isOutOfWarranty(ticketData?.warranty, ticketData?.created_at);

      useEffect(() => {
        if (ticketData?.status_ticket === "Waiting Approval") {
            const expiredDateTime = new Date(ticketData.expired_ticket).getTime();
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = expiredDateTime - now;
                if (distance <= 0) {
                    clearInterval(interval);
                    setExpiredTime("Expired");
                } else {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    setExpiredTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [ticketData]);
 

// how to get data from infoTicketId
    const fetchTicketData = async () => {
        try {
            setLoading(true);
            const bearerToken = Cookies.get("access_token"); 
            if (!bearerToken) {
                throw new Error('Bearer token not found.');
            }
            await apiTable();
            const response = await Api.get(`api/customer/get-ticket-details/${infoTicketId}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                    "ngrok-skip-browser-warning": "69420"
                }
            });
            if (response.status === 200) {
                setTicketData(response.data);
                console.log('Ticket Data:', response.data)
            } else {
                message.error(response.data.message || 'Failed to fetch ticket data');
            }
        } catch (error) {
            console.error('Error fetching ticket data:', error);
            if (error.response && error.response.status === 400) {
                message.error('Failed to get info ticket');
              } else if (error.response && error.response.status === 401) {
                modalSession();
              } else {
                message.error('Failed to get info ticket');
              }
        } finally {
            setLoading(false);
        }
    }

    const fetchImages = async () => {
        try {
          const bearerToken = Cookies.get("access_token");
          if (!bearerToken) {
            throw new Error('Bearer token not found.');
          }
          const response = await Api.get(`api/images?ticket_id=${infoTicketId}`, {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
                "ngrok-skip-browser-warning": "69420"
            },
          });
          console.log(response.data)
          setImageView(response.data);
        } catch (error) {
          console.error('Error fetching image data:', error);
        }
      }


    useEffect(() => {
        if (infoTicketId) {
            fetchTicketData();
            fetchImages();
            fetchLog();
        }
    }, [infoTicketId]);

 
    const onClose = () => {
    setOpenDrawer(false);
  };
  if (loading) {
    return <Spin />;
  }
  return (
    <Drawer
      title={ticketData ? `Ticket Details: ${ticketData.no_tickets}` : 'RMA Ticket Details'}
      className="user-drawer"
      placement={"right"}
      width={600}
      open={openDrawer}
      onClose={onClose}
    >
      <Tabs defaultActiveKey="1" type="card" centered>
        <TabPane tab={<span><FileSearchOutlined />Details</span>} key="1">
            <div className="" style={{width: 500, marginTop: 16, marginLeft: 25}}>
                <Card>
                    <div style={{ padding: 22 }}>
                        <Paragraph style={{ marginBottom: 0 }}>
                            Mac Address:    
                        </Paragraph>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph style={{ fontSize: 30, marginBottom: 15 }}><strong>{ticketData?.mac_address}</strong></Paragraph>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div className='text-end' style={{ width: 150, textAlign: 'end'}}>
                                    <Tag style={{ marginRight: 0 }}
                                    color={
                                        ticketData?.status_ticket === "Waiting Approval" ? "processing"
                                        : ticketData?.status_ticket === "Approved" ? "green"
                                        : ticketData?.status_ticket === "Received" ? "orange"
                                        : ticketData?.status_ticket === "Testing and Processing" ? "purple"
                                        : ticketData?.status_ticket === "Fullfilment" ? "success"
                                        : ticketData?.status_ticket === "Finished" ? "geekblue"
                                        : ticketData?.status_ticket === "Rejected" ? "error"
                                        : "default"
                                    }
                                    >
                                        {ticketData?.status_ticket}
                                    </Tag>
                                    {ticketData?.status_ticket === "Waiting Approval" && expiredTime && (
                                        <span style={{  display: 'block', marginTop: 3 }}>{expiredTime}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>No Ticket :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.no_tickets}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Warranty :</strong></Paragraph>
                            <div className='text-end' style={{ width: 275, textAlign: 'end' }}>
                            <Tag style={{ marginRight: 0}}
                                icon={isExpired ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />}
                                color={isExpired ? "red" : "green"}
                            >
                                {ticketData?.warranty}
                            </Tag>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Seller :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.customer_2}</div>
                        </div> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Distributor :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.distributor}</div>
                        </div> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Device :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.product_name}</div>
                        </div> 
                        <Divider />
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Contact :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.name}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Phone :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.phone}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Cargo :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.cargo?.cargo_name}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Resi :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.tracking_number}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Address :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.address}</div>
                        </div>
                    </div>
                    <Divider />
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Problem :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.problem}</div>
                        </div>
                        <div>
                            <Paragraph className='text-start'><strong>Photos :</strong></Paragraph> 
                            <div className="">
                                {imageView.map((image, index) => (
                                    <Image key={index} src={`${BASE_URL_BE}/api/get-images?filename=${image}`} style={{ width: 100, height: 100, margin: 5 }} />
                                ))}

                            </div>
                        </div>
                    </Card>
                    <Divider />
                    <div style={{ backgroundColor: token.colorBgBase }}>
                        <Paragraph>
                            <strong>Shipping Address</strong>
                        </Paragraph>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'>Surabaya ( Pusat ) :</Paragraph> 
                            <div className='text-end'style={{ width: 300, textAlign: 'end', marginBottom: 10 }}>Ciputra World Office Tower 30th Floor Unit 3009
Jl. Mayjen Sungkono, Surabaya - INDONESIA 60224</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'>Jakarta :</Paragraph> 
                            <div className='text-end'style={{ width: 300, textAlign: 'end' }}>Kompleks Harco Elektonik - Mangga Dua Blok H-6
Jalan Mangga Dua Raya - Jakarta Pusat 10730</div>
                        </div>
                    </div>
                </Card>
            </div>     
        </TabPane>
        <TabPane tab={<span><AlertOutlined />Status</span>} key="2">
            <div className="" style={{width: 330, padding: 15}}>
            <Steps
                current={3}
                direction="vertical"
                items={[
                {
                    title: 'Submitted',
                    subTitle: '12:00 12 Jan 2021',
                    status:'finish',
                },
                {
                    title: 'Received',
                    description: "test",
                    status:'process',
                },
                {
                    title: 'Received',
                    description: "test",
                    status:'error',
                },
                {
                    title: 'Testing and Processing',
                    description: "test",
                    status:'wait',
                },
                {
                    title: 'Fulfillment',
                    description: "test",
                    status:'wait',
                },
                {
                    title: 'Product Shipped',
                    description: "test",
                    status:'wait',
                },
                {
                    title: 'Completed',
                    description: "test",
                    status:'wait',
                },
                ]}
            />
            </div>     
        </TabPane>
        <TabPane tab={<span><CheckCircleOutlined />Log</span>} key="3" style={{width: 330, marginTop: 16,}}>
            
        </TabPane>
        <TabPane tab={<span><StarOutlined />Rate</span>}  key="4">
            <div style={{ maxWidth: 400, margin: 'auto' }}>
                <Title level={3}>Rate Our Service</Title>
                <Paragraph>
                    We value your feedback. Please rate our service and leave a comment below.
                </Paragraph>
                <div style={{ marginBottom: 16 }}>
                    <Rate  />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Input.TextArea
                    placeholder="Leave a comment..."
                    rows={4}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" >
                    Submit
                    </Button>
                </div>
            </div>
        </TabPane>
        <TabPane tab={<span><FileOutlined />Document</span>} key="5">
            <div className="" style={{width: 330, marginTop: 16,}}>
                <Card>

                </Card>
            </div>     
        </TabPane>
    </Tabs>
    </Drawer>
  );
};
export default UserDrawer;
