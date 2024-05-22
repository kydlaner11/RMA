import React, {  useState, useEffect } from 'react';
import { Form, Card,  Rate, Button, Typography,} from 'antd';
import Api from '../../api';
import Cookies from "js-cookie";  



// const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const RateTicket = ({infoTicketId, apiTable, setOpenDrawer}) => {
  const [rating, setRating] = useState([]);

    const getRate = async () => {
      try {
        const bearerToken = Cookies.get("access_token");
        if (!bearerToken) {
          throw new Error('Bearer token not found.');
        }
        const response = await Api.get(`/api/customer/get-ticket-details/${infoTicketId}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "ngrok-skip-browser-warning": "69420"
          },
        });
        if (response.status === 200) {
          setRating(response.data.rate);
          console.log(rating)
        } else {
          console.error('Failed to fetch ticket steps:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching ticket steps:', error);
      }
    };
  
    const handleSubmit = async (values) => {
      console.log('Submitted values:', values);
      try {
      const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
      throw new Error('Bearer token not found.');
      }
    console.log("bearer",bearerToken)
      const response = await Api.post(`/api/customer/ticket-rate?ticket_id=${infoTicketId}&rate=${values.rate}`,null, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log(response)
      if (response.status === 200) {
        await apiTable();
        setOpenDrawer(false);
        setRating(values.rate);
      } else {
        console.error('Failed to fetch ticket steps:', response.data.message);
      }
    } catch (error) {
          console.error('Error fetching ticket steps:', error);
        }
    };

    useEffect(() => {
      getRate();
    }, [infoTicketId]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: 500, textAlign:"center" }}>
        <Title level={0} >Package has been delivered successfully</Title>
        <Paragraph>Rate our service</Paragraph>
        <Form layout="vertical" onFinish={handleSubmit}>
          {rating !== null && (
            <>
              <div style={{ textAlign: 'center' }}>
                <Rate value={rating} disabled style={{ fontSize: '40px' }} />
              </div>
              <Paragraph>Thank you for your rating</Paragraph>
            </>
          )}
          {rating === null && (
            <>
              <Form.Item name="rate" style={{ textAlign: 'center' }}>
                <Rate value={rating} style={{ fontSize: '40px' }} />
              </Form.Item>
              <Form.Item style={{ marginTop: '50px' }}>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Card>
    </div>
  );

}

export default RateTicket;