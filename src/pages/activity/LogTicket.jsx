import React, { useEffect, useState } from 'react';
import { List, Typography } from 'antd';
import Api from '../../api';
import {
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleDateString('en-EN', options);
}
const LogTicket = ({infoTicketId}) => {
  const [logTicket, setLogTicket] = useState([]);

  useEffect(() => {
    //get api api/endpoint/log-status
    const fetchTicketSteps = async () => {
      try {
        const response = await Api.get(`/api/endpoint/log-ticket?ticket_id=${infoTicketId}`);
        console.log(response)
        if (response.status === 200) {
          setLogTicket(response.data);
          console.log(response.data)
          
        } else {
          console.error('Failed to fetch ticket steps:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching ticket steps:', error);
      }
    };
    fetchTicketSteps();
  }, [infoTicketId]); 

  //saya mendapatkan respone api dari log-ticket yang berisi field_name, saya ingin merubah value dari field_name menjadi nama field yang lebih jelas
  const field_name = {
    'tracking_number': 'Ticket Number',
    'StatusTicket': 'Status Ticket',
    'cargo': 'Cargo',
  }


  return (
    <div >
      <List
        itemLayout="horizontal"
        dataSource={logTicket}
        renderItem={(item) => (
          <List.Item style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            // alignItems: 'center',
            // padding: '10px 20px',
            borderBottom: '1px solid #f0f0f0',
           }}>
            <List.Item.Meta
              // avatar={<Avatar icon={<i className="anticon anticon-app" />} />}
              title={<Text strong> 
                {field_name[item.field_name]}
              </Text>}
              description={<Text>{formatDate(item.created_at)}</Text>}
              style={{ flex: 1 }}
            />
            <div style={{ 
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'flex-end',
             }}>
              <Text>{item.old_value}</Text>
              <ArrowRightOutlined style={{ margin: '0 10px', color: '#1890ff', }} />
              <Text>{item.new_value}</Text>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
};

export default LogTicket;