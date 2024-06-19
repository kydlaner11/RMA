import { Card, Typography, Divider, Tag, Image, message } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import { BASE_URL_BE } from '../../constant/url';
import Cookies from "js-cookie";
import Api from '../../api';

const { Paragraph } = Typography;

const Result = ({ infoTicketId, apiTable, ticketData }) => {
  const [imageView, setImageView] = useState([]);
  const [dataResult, setDataResult] = useState(null);

  const fetchTicketData = async () => {
    try {
      const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      await apiTable();
      const response = await Api.get(`/api/customer/GetDataResult/?ticket_id=${infoTicketId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "ngrok-skip-browser-warning": "69420"
        }
      });
      console.log('Result:', response.data)
      if (response.status === 200) {
        setDataResult(response.data);
      } else {
        message.error(response.data.message || 'Failed to fetch ticket data');
      }
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      message.error('Failed to get info ticket');
    }
  }

  const fetchImages = async () => {
    try {
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      const response = await Api.get(`/api/images?ticket_id=${infoTicketId}`, {
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
      fetchImages();
      fetchTicketData();
    }
  }, [infoTicketId]);

  const getStatusTag = (status) => {
    if (status === 'ok') {
      return <Tag color="green">OK</Tag>;
    } else if (status === 'unrepair') {
      return <Tag color="red">UNREPAIR</Tag>;
    } else if (status === 'replace') {
      return <Tag color="warning">REPLACE</Tag>;
    } else {
      return <Tag color="default">UNDEFINED</Tag>;
    }
  };

  return (
    <Card style={{ padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Paragraph style={{ fontSize: 16, marginBottom: 0 }}><strong>Fulfillment Status</strong></Paragraph>
        <div style={{ width: 150, textAlign: 'end' }}>
          {dataResult?.ticket_status[0] && getStatusTag(dataResult.ticket_status[0].fulfillment_status)}
        </div>
      </div>
      <Paragraph style={{ color: "#8c8c8c" }}>Your MAC address has been successfully changed to a new one.</Paragraph>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <Paragraph style={{ fontSize: 30, margin: 0 }}><strong>{ticketData?.mac_address}</strong></Paragraph>
        <RightOutlined style={{ fontSize: 24, margin: '0 10px' }} />
        <Paragraph style={{ fontSize: 30, margin: 0 }}><strong>{dataResult.ticket_status[0].sn}</strong></Paragraph>
      </div>
      <Divider />
      <div style={{ marginBottom: 20 }}>
        <Paragraph style={{ fontSize: 16 }}><strong>Repair Item</strong></Paragraph> 
        {dataResult?.solutions.map((solution, index) => (
          <Card key={index} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Paragraph style={{ margin: 0 }}>{solution.solution}</Paragraph>
              <Paragraph style={{ margin: 0 }}>{solution.sparepart_name}</Paragraph>
            </div>
          </Card>
        ))}
      </div>
      {imageView.length > 0 && (
        <>
          <Divider />
          <div style={{ marginBottom: 20 }}>
            <Paragraph style={{ fontSize: 16 }}><strong>Photos</strong></Paragraph>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {imageView.map((image, index) => (
                <Image key={index} src={`${BASE_URL_BE}/api/get-images?filename=${image}&ngrok-skip-browser-warning=69420`} style={{ width: 100, height: 100, margin: 5 }} />
              ))}
            </div>
          </div>
        </>
      )}
      {dataResult?.evidences.length > 0 && (
        <>
          <Divider />
          <div>
            <Paragraph style={{ fontSize: 16 }}><strong>Evidences</strong></Paragraph>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {dataResult?.evidences.map((evidence, index) => (
                <Image key={index} src={`${BASE_URL_BE}/api/get-images?filename=${evidence.encrypted_filename}&ngrok-skip-browser-warning=69420`} style={{ width: 100, height: 100, margin: 5 }} />
              ))}
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

export default Result;
