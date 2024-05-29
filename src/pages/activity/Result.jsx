import {  Card, Typography,  Divider, Tag, Image, message, } from 'antd';
// import { CheckCircleOutlined,  ExclamationCircleOutlined } from '@ant-design/icons';
import React, {useState, useEffect} from "react";
import { BASE_URL_BE } from '../../constant/url';
import Cookies from "js-cookie";
import Api from '../../api';

const {Paragraph} = Typography;

const Result = ({infoTicketId, apiTable}) => {
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
        if (error.response && error.response.status === 400) {
            message.error('Failed to get info ticket');
          } else if (error.response && error.response.status === 401) {
            message.error('Failed to get info ticket');
          } else {
            message.error('Failed to get info ticket');
          }
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


  return (
    <Card>
      <div style={{ padding: 22 }}>
          {/* <Paragraph style={{ marginBottom: 0 }}>
              Mac Address:    
          </Paragraph> */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Paragraph style={{fontSize: 16, marginBottom: 5 }}><strong>Fullfilment Status</strong></Paragraph>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div className='text-end' style={{ width: 150, textAlign: 'end'}}>
                      <Tag style={{ marginRight: 0}}
                      color='success'
                      >
                        {dataResult?.ticket_status.fulfillment_status}
                      </Tag>
                  </div>
              </div>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Paragraph className='text-start' style={{fontSize: 16}}><strong>Repair Item</strong></Paragraph> 
          </div>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Paragraph className='text-start'><strong>Warranty :</strong></Paragraph>
              <div className='text-end' style={{ width: 275, textAlign: 'end' }}>
              <Tag style={{ marginRight: 0}}
                  icon={isExpired ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />}
                  color={isExpired ? "red" : "green"}
              >
                  Makanan
              </Tag>
              </div>
          </div> */}
          {dataResult?.solutions.map((solution, index) => (
            <Card key={index} style={{ marginBottom: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paragraph className='text-start' style={{ width: 275 }}>{solution.solution}</Paragraph>
                <div className='text-end' style={{ width: 275, textAlign: 'start' }}>
                  {solution.sparepart_name}
                </div>
              </div>
            </Card>
          ))}
         <div style={{ marginTop: 30 }}>
            <Paragraph className='text-start' style={{fontSize: 16}}><strong>Photos</strong></Paragraph>
            <div className="">
                {imageView.map((image, index) => (
                    <Image key={index} src={`${BASE_URL_BE}/api/get-images?filename=${image}&ngrok-skip-browser-warning=69420`} style={{ width: 100, height: 100, margin: 5 }} />
                ))}

            </div>
          </div>
          <Divider />
          
         <div style={{ marginTop: 30 }}>
            <Paragraph className='text-start' style={{fontSize: 16}}><strong>Proof of Delivery</strong></Paragraph>
            <div className="">
                {imageView.map((image, index) => (
                    <Image key={index} src={`${BASE_URL_BE}/api/get-images?filename=${image}&ngrok-skip-browser-warning=69420`} style={{ width: 100, height: 100, margin: 5 }} />
                ))}

            </div>
          </div>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Paragraph className='text-start'><strong>Contact :</strong></Paragraph> 
              <div className='text-end'style={{ width: 275, textAlign: 'end' }}>Makanan</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Paragraph className='text-start'><strong>Phone :</strong></Paragraph> 
              <div className='text-end'style={{ width: 275, textAlign: 'end' }}>Makanan</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Paragraph className='text-start'><strong>Cargo :</strong></Paragraph> 
              <div className='text-end'style={{ width: 275, textAlign: 'end' }}>Makanan</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Paragraph className='text-start'><strong>Resi :</strong></Paragraph> 
              <div className='text-end'style={{ width: 275, textAlign: 'end' }}>Makanan</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Paragraph className='text-start'><strong>Address :</strong></Paragraph> 
              <div className='text-end'style={{ width: 275, textAlign: 'end' }}>Makanan</div>
          </div> */}
      </div>
  </Card>
  )
}

export default Result
