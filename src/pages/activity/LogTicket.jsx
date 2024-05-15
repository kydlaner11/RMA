import React, { useEffect, useState } from 'react';
import { List, Typography } from 'antd';
import Api from '../../api';
// import {
//   ArrowRightOutlined,
// } from '@ant-design/icons';

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
        const response = await Api.get(`api/endpoint/log-ticket?ticket_id=${infoTicketId}`);
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

  return (
    <div >
      <List
        itemLayout="horizontal"
        dataSource={logTicket}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              // avatar={<Avatar icon={<i className="anticon anticon-app" />} />}
              title={<Text strong>{item.old_value}</Text>}
              description={<Text>{formatDate(item.created_at)}</Text>}
            />
            <div>
              <div>{item.new_value}</div>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
};

export default LogTicket;