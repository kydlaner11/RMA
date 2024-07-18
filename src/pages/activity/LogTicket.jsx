import React, { useEffect, useState } from 'react';
import { List, Typography } from 'antd';
import Api from '../../api';
import { RightOutlined } from '@ant-design/icons';
import Cookies from "js-cookie";

const { Text } = Typography;

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleDateString('en-EN', options);
}

const LogTicket = ({ infoTicketId }) => {
  const [logTicket, setLogTicket] = useState([]);

  useEffect(() => {
    const fetchTicketSteps = async () => {
      const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }// Tutup modal konfirmasi
      try {
        const response = await Api.get(`/api/customer/log-ticket?ticket_id=${infoTicketId}`, {
          headers: {
              Authorization: `Bearer ${bearerToken}`,
              "ngrok-skip-browser-warning": "69420"
          }
      });
        if (response.status === 200) {
          setLogTicket(response.data);
          console.log(logTicket)
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
    <div style={{ padding: '10px' }}>
      <List
        itemLayout="vertical"
        dataSource={logTicket}
        renderItem={(item) => (
          <List.Item style={{
            borderBottom: '1px solid #f0f0f0',
            padding: '10px 0',
          }}>
            <Text style={{ fontWeight: 'bold' }}>RMA <span style={{ fontWeight: 'normal' }}>[{item.field_name}]</span></Text>
            <Text style={{ color: '#888' }}> - {formatDate(item.created_at)}</Text>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '5px'
            }}>
               {item.description && (
                <Text style={{ color: '#000', marginTop: '2px' }}>{item.description}</Text>
              )}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '5px'
            }}>
              <Text>{item.old_value}</Text>
              <RightOutlined style={{ margin: '0 10px', color: '#373A40' }} />
              <Text style={{ color:  '#2A629A' }}>{item.new_value}</Text>
            </div>
            {item.new_value.startsWith('Error') && (
              <Text type="danger" style={{ marginTop: '5px' }}>
                {item.new_value}
              </Text>
            )}
          </List.Item>
        )}
      />
    </div>
  );
};

export default LogTicket;
