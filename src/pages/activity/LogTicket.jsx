import React, { useEffect, useState } from 'react';
// import { Steps } from 'antd';
import Api from '../../api';
// import {
//   FieldTimeOutlined,
//   LoadingOutlined,
//   ContainerOutlined,
//   ToolOutlined,
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   FileDoneOutlined
// } from '@ant-design/icons';



// function formatDate(isoDate) {
//   const date = new Date(isoDate);
//   const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
//   return date.toLocaleDateString('en-EN', options);
// }
const LogTicket = ({infoTicketId}) => {
  const [logTicket, setLogTicket] = useState([]);

  useEffect(() => {
    //get api api/endpoint/log-status
    const fetchTicketSteps = async () => {
      try {
        const response = await Api.get(`api/endpoint/log-ticket?ticket_id=${infoTicketId}`);
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
    <>
      <div>
        {logTicket.map((step, index) => (
          <div key={index}>
            <p>{step.status_ticket.status_name}</p>
            <p>{step.created_at}</p>
          </div>
        ))}
      </div>
    </>
  )
};

export default LogTicket;