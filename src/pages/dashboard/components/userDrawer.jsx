import { Button, Drawer, Tabs, Steps, Rate,  Card, Typography, Input, message, Spin } from 'antd';
import { AlertOutlined, CheckCircleOutlined, FileSearchOutlined, StarOutlined,FileOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from '../../../api';


const { TabPane } = Tabs;
const {Title, Paragraph} = Typography;

const UserDrawer = ({ openDrawer, setOpenDrawer, infoTicketId }) => {
    const [loading, setLoading] = useState(false);
    const [ticketData, setTicketData] = useState(null);

    

// how to get data from infoTicketId
    const fetchTicketData = async () => {
        try {
            setLoading(true);
            const bearerToken = Cookies.get("access_token"); 
            if (!bearerToken) {
                throw new Error('Bearer token not found.');
            }
            const response = await Api.get(`api/customer/ticket/${infoTicketId}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            });
            console.log(response.data.ticket)
            if (response.status === 200) {
                setTicketData(response.data.ticket);
                console.log(ticketData)
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

    useEffect(() => {
        if (infoTicketId) {
            fetchTicketData();
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
      width={625}
      open={openDrawer}
      onClose={onClose}
    >
      <Tabs defaultActiveKey="1" type="card" centered>
        <TabPane tab={<span><FileSearchOutlined />Details</span>} key="1">
            <div className="" style={{width: 330, marginTop: 16,}}>
                <Card>
                    <div>
                        <Title level={4}>Ticket Details</Title>
                        <Paragraph>
                            <strong>Ticket Number:</strong> {ticketData?.no_tickets}
                        </Paragraph>
                        <Paragraph>
                            <strong>Address:</strong> {ticketData?.address}
                        </Paragraph>
                        <Paragraph>
                            <strong>Description:</strong> {ticketData?.description}
                        </Paragraph>
                        {/* Add more ticket details here */}
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
