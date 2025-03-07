import React, {  useState, useEffect } from 'react';
import { Form, Card,  Rate, Button, Typography,} from 'antd';
import Api from '../../api';
import Cookies from "js-cookie";  

const { Title, Paragraph } = Typography;

const RateTicket = ({infoTicketId, apiTable, setOpenDrawer, setIsRateButtonClicked}) => {
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
          // console.log(rating)
        } else {
          console.error('Failed to fetch ticket steps:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching ticket steps:', error);
      }
    };
  
    const handleSubmit = async (values) => {
      try {
      const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
      throw new Error('Bearer token not found.');
      }
      const response = await Api.post(`/api/customer/ticket-rate?ticket_id=${infoTicketId}&rate=${values.rate}`,null, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      // console.log(response)
      if (response.status === 200) {
        await apiTable();
        setOpenDrawer(false);
        setIsRateButtonClicked(false)
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
      <Card style={{ width: 570, textAlign:"center" }}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'  }}>
        <Title level={0}  >Thank you for using our <br/> RMA service.</Title>
        <div style={{ marginBottom: 20, maxWidth: 487 }}>
        <Paragraph >Rate our service to help us improve the quality of our service, we kindly ask you to provide a rating regarding your experience. Your input is highly valuable to us</Paragraph>  
        </div>
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
        </div>
      </Card>
    </div>
  );

}

export default RateTicket;