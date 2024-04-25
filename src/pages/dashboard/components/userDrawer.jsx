import { Button, Drawer, Tabs, Steps, Rate,  Card, Typography, Input, message, Spin, Divider, Tag, Image, theme } from 'antd';
import { AlertOutlined, CheckCircleOutlined, FileSearchOutlined, StarOutlined,FileOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from '../../../api';


const { TabPane } = Tabs;
const { useToken } = theme;
const {Title, Paragraph} = Typography;

const UserDrawer = ({ openDrawer, setOpenDrawer, infoTicketId }) => {
    const [loading, setLoading] = useState(false);
    const [ticketData, setTicketData] = useState(null);
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

      const isExpired = isOutOfWarranty(ticketData?.warranty, ticketData?.created_at);

// how to get data from infoTicketId
    const fetchTicketData = async () => {
        try {
            setLoading(true);
            const response = await Api.get(`api/admin/get-ticket-details/${infoTicketId}`);
            if (response.status === 200) {
                setTicketData(response.data[0]);
                console.log('Ticket Data:', response.data[0])
            } else {
                message.error(response.data.message || 'Failed to fetch ticket data');
            }
        } catch (error) {
            console.error('Error fetching ticket data:', error);
            message.error('Failed to fetch ticket data');
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
          setImageView(response.data);
        } catch (error) {
          console.error('Error fetching image data:', error);
        }
      }


    useEffect(() => {
        if (infoTicketId) {
            fetchTicketData();
            fetchImages();
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
                        <Paragraph style={{ fontSize: 30, marginBottom: 15 }}><strong>{ticketData?.mac_address}</strong></Paragraph>
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
                            <Paragraph className='text-start'><strong>Bussines Unit :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.unit}</div>
                        </div> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Device :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.product_name}</div>
                        </div> 
                        <Divider />
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Contact :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.nama}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Phone :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.phone}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'><strong>Cargo :</strong></Paragraph> 
                            <div className='text-end'style={{ width: 275, textAlign: 'end' }}>{ticketData?.cargo}</div>
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
                                    <Image key={index} src={`https://rational-wealthy-panther.ngrok-free.app/api/get-images?filename=${image}`} style={{ width: 100, height: 100, margin: 5 }} />
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
                    description: "test",
                    status:'finish',
                },
                {
                    title: 'Aprroved',
                    description: "test",
                    status:'finish',
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
