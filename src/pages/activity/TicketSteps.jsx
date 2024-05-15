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



function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleDateString('en-EN', options);
}
const TicketSteps = ({infoTicketId}) => {
  const [ticketSteps, setTicketSteps] = useState([]);

  useEffect(() => {
    //get api api/endpoint/log-status
    const fetchTicketSteps = async () => {
      try {
        const response = await Api.get(`api/endpoint/log-status?ticket_id=${infoTicketId}`);
        if (response.status === 200) {
          //how to get response.data in array
          setTicketSteps(response.data);
          
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
      icon: ticketSteps.find(step => step.status_ticket.status_name === 'Received') ? <FieldTimeOutlined /> : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled' ) ? <FieldTimeOutlined /> : ticketSteps.find(step => step.status_ticket.status_name !== 'Received' )?<LoadingOutlined />:  <FieldTimeOutlined />,
    },
    {
      title: 'Received',
      subTitle: ticketSteps.find(step => step.status_ticket.status_name === 'Received') ? formatDate(ticketSteps.find(step => step.status_ticket.status_name === 'Received').updated_at) : '',
      description: 'The returned item has been received by the RMA department. This reception process involves physical verification of the item.',
      status:  ticketSteps.find(step => step.status_ticket.status_name === 'Testing and Processing') ? 'finish' : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled')? 'wait' : ticketSteps.find(step => step.status_ticket.status_name === 'Received') ? 'process' : 'wait',
      icon: ticketSteps.find(step => step.status_ticket.status_name === 'Testing and Processing') ? <ContainerOutlined /> : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled' ) ? <ContainerOutlined /> : ticketSteps.find(step => step.status_ticket.status_name === 'Received' ) ? <LoadingOutlined />  : <ContainerOutlined />,
    },
    {
      title: 'Testing and Processing',
      subTitle: ticketSteps.find(step => step.status_ticket.status_name === 'Testing and Processing') ? formatDate(ticketSteps.find(step => step.status_ticket.status_name === 'Testing and Processing').updated_at) : '',
      description: 'The received item is undergoing testing and processing. The technical team will conduct a thorough evaluation to identify the issue.',
      status:  ticketSteps.find(step => step.status_ticket.status_name === 'Fullfilment') ? 'finish' :  ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled')? 'wait' :  ticketSteps.find(step => step.status_ticket.status_name === 'Testing and Processing') ? 'process' : 'wait',
      icon: ticketSteps.find(step => step.status_ticket.status_name === 'Fullfilment') ? <ToolOutlined /> : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled' ) ? <ToolOutlined /> : ticketSteps.find(step => step.status_ticket.status_name === 'Testing and Processing' ) ? <LoadingOutlined /> : <ToolOutlined />,
      
    },
    {
      title:'Fulfillment',
      subTitle: ticketSteps.find(step => step.status_ticket.status_name === 'Fullfilment') ? formatDate(ticketSteps.find(step => step.status_ticket.status_name === 'Fullfilment').updated_at) : '',
      description: 'After the item successfully passes the testing and processing stage, steps for repair or replacement will be carried out.',
      status:  ticketSteps.find(step => step.status_ticket.status_name === 'Finished') ? 'finish' :  ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled')? 'wait' :  ticketSteps.find(step => step.status_ticket.status_name === 'Fullfilment') ? 'process' : 'wait',
      icon: ticketSteps.find(step => step.status_ticket.status_name === 'Finished') ? <FileDoneOutlined/> : ticketSteps.find(step => step.status_ticket.status_name === 'Cancelled' ) ? <FileDoneOutlined/>   : ticketSteps.find(step => step.status_ticket.status_name === 'Fullfilment' ) ? <LoadingOutlined /> : <FileDoneOutlined/>,
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