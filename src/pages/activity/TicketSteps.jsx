import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import Api from '../../api';
import {
  FieldTimeOutlined,
  LoadingOutlined,
  ContainerOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileDoneOutlined
} from '@ant-design/icons';
import Cookies from "js-cookie";



function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleDateString('en-EN', options);
}
const TicketSteps = ({infoTicketId}) => {
  const [ticketSteps, setTicketSteps] = useState([]);

  useEffect(() => {
    const fetchTicketSteps = async () => {
      const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }// Tutup modal konfirmasi
      try {
        const response = await Api.get(`/api/customer/log-status?ticket_id=${infoTicketId}`, {
          headers: {
              Authorization: `Bearer ${bearerToken}`,
              "ngrok-skip-browser-warning": "69420"
          }
      });
        if (response.status === 200) {
          setTicketSteps(response.data);
          // console.log("dd",response.data)
          
        } else {
          console.error('Failed to fetch ticket steps:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching ticket steps:', error);
      }
    };
    fetchTicketSteps();
  }, [infoTicketId]); 

  
  const steps = [
    {
      title:'Submitted',
      subTitle:  ticketSteps.find(step => step.status_ticket.status_name === 'Waiting Approval') ? formatDate(ticketSteps.find(step => step.status_ticket.status_name === 'Waiting Approval').created_at): '',
      description: 'The RMA ticket has been submitted by the customer. Information and details about the faulty item have been included in the request.',
      status: ticketSteps.find(step => step.status_ticket.status_name === 'Received') ? 'finish' : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled')? 'finish' : ticketSteps.find(step => step.status_ticket.status_name !== 'Received')? 'process':'finish',
      icon: <FieldTimeOutlined />
    },
    {
      title: 'Received',
      subTitle: ticketSteps.find(step => step.status_ticket.status_name === 'Received') ? formatDate(ticketSteps.find(step => step.status_ticket.status_name === 'Received').updated_at) : '',
      description: 'The returned item has been received by the RMA department. This reception process involves physical verification of the item.',
      status:  ticketSteps.find(step => step.status_ticket.status_name === 'Testing and Processing') ? 'finish' : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled')? 'wait' : ticketSteps.find(step => step.status_ticket.status_name === 'Received') ? 'process' : 'wait',
      icon: <ContainerOutlined /> 
    },
    {
      title: 'Testing and Processing',
      subTitle: ticketSteps.find(step => step.status_ticket.status_name === 'Testing and Processing') ? formatDate(ticketSteps.find(step => step.status_ticket.status_name === 'Testing and Processing').updated_at) : '',
      description: 'The received item is undergoing testing and processing. The technical team will conduct a thorough evaluation to identify the issue.',
      status:  ticketSteps.find(step => step.status_ticket.status_name === 'Fulfillment') ? 'finish' : ticketSteps.find(step => step.status_ticket.status_name === 'Offering') ? 'finish' : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled')? 'wait' :  ticketSteps.find(step => step.status_ticket.status_name === 'Testing and Processing') ? 'process' : 'wait',
      icon: ticketSteps.find(step => step.status_ticket.status_name === 'Fulfillment') ? <ToolOutlined /> : ticketSteps.find(step => step.status_ticket.status_name === 'Offering') ? <ToolOutlined /> : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled' ) ? <ToolOutlined /> : ticketSteps.find(step => step.status_ticket.status_name === 'Testing and Processing' ) ? <LoadingOutlined /> : <ToolOutlined />,
      
    },
    {
      title:'Fulfillment',
      subTitle: ticketSteps.find(step => step.status_ticket.status_name === 'Fulfillment') ? formatDate(ticketSteps.find(step => step.status_ticket.status_name === 'Fulfillment').updated_at) : '',
      description: 'After the item successfully passes the testing and processing stage, steps for repair or replacement will be carried out.',
      status:  ticketSteps.find(step => step.status_ticket.status_name === 'Finished') ? 'finish' :  ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled')? 'wait' :  ticketSteps.find(step => step.status_ticket.status_name === 'Fulfillment') ? 'process' :  ticketSteps.find(step => step.status_ticket.status_name === 'Offering') ? 'process' :'wait',
      icon: ticketSteps.find(step => step.status_ticket.status_name === 'Finished') ? <FileDoneOutlined/> : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled' ) ? <FileDoneOutlined/>   : ticketSteps.find(step => step.status_ticket.status_name === 'Fulfillment' ) ? <LoadingOutlined /> : ticketSteps.find(step => step.status_ticket.status_name === 'Offering' ) ? <LoadingOutlined /> : <FileDoneOutlined/>,
    },
    {
      title:'Finished',
      subTitle: ticketSteps.find(step => step.status_ticket.status_name === 'Finished') ? formatDate(ticketSteps.find(step => step.status_ticket.status_name === 'Finished').updated_at) : '',
      description: 'The RMA process is complete, and the repaired or replaced item is ready to be shipped back to the customer.',
      status:  ticketSteps.find(step => step.status_ticket.status_name === 'Finished') ? 'finish' : 'wait',
      icon: <CheckCircleOutlined />,
    },
  ];

  const stepsCancelled = [
    {
      title:'Submitted',
      subTitle:  ticketSteps.find(step => step.status_ticket.status_name === 'Waiting Approval') ? formatDate(ticketSteps.find(step => step.status_ticket.status_name === 'Waiting Approval').created_at): '',
      description: 'The RMA ticket has been submitted by the customer. Information and details about the faulty item have been included in the request.',
      status: ticketSteps.find(step => step.status_ticket.status_name === 'Received') ? 'finish' : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled')? 'finish' : ticketSteps.find(step => step.status_ticket.status_name !== 'Received')? 'process':'finish',
      icon: ticketSteps.find(step => step.status_ticket.status_name === 'Received') ? <FieldTimeOutlined /> : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled' ) ? <FieldTimeOutlined /> : ticketSteps.find(step => step.status_ticket.status_name !== 'Received' )?<LoadingOutlined />:  <FieldTimeOutlined />,
    },
    {
      title: ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled') ? 'Cancelled' : 'Cancelled',
      subTitle: ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled') ? formatDate(ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled').updated_at) : '',
      description: 'The RMA request has been canceled',
      status: ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled') ? 'error' : 'wait',
      icon: <CloseCircleOutlined  />
    },
  ];

  //saya tidak bisa menampilkan stepsCancelled, saya ingin menampilkan stepsCancelled jika status ticket cancelled
  if (ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled')) {
    return <Steps current={stepsCancelled.length - 1}  size="default" direction="vertical" items={stepsCancelled} />;
  }
  return <Steps current={steps.length - 1}  size="default" direction="vertical" items={steps} />;
};

export default TicketSteps;