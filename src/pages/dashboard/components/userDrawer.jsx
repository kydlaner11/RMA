import {Space, Button, Drawer, Tabs, Steps, Rate,  Card, Typography, Input } from 'antd';
import { UserOutlined, CheckCircleOutlined} from '@ant-design/icons';
import React from "react";

const { TabPane } = Tabs;
const {Title, Paragraph} = Typography;

const UserDrawer = ({ openDrawer, setOpenDrawer }) => {
  const onClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Drawer
      title="Drawer with extra actions"
      className="user-drawer"
      placement={"right"}
      width={800}
      open={openDrawer}
      onClose={onClose}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Space>
      }
    >
      <Tabs defaultActiveKey="1" type="card" centered>
        <TabPane tab={<span><UserOutlined /> Details</span>} key="1">
            <div className="" style={{width: 330, marginTop: 16,}}>
                <Card>

                </Card>
            </div>     
        </TabPane>
        <TabPane tab={<span><CheckCircleOutlined /> Log</span>} key="2" style={{width: 330, marginTop: 16,}}>
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
        </TabPane>
        <TabPane tab='Rate'  key="3">
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
    </Tabs>
    </Drawer>
  );
};
export default UserDrawer;
