import { Drawer, Tabs, Card, Typography, message, Spin, Divider, Tag, Image, theme } from 'antd';
import { AlertOutlined, CheckCircleOutlined, FileSearchOutlined, StarOutlined, FileOutlined, ExclamationCircleOutlined, FileDoneOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from '../../../api';
import TicketSteps from '../../activity/TicketSteps';
import RateTicket from '../../activity/RateTicket';
import LogTicket from '../../activity/LogTicket';
import { BASE_URL_BE } from '../../../constant/url';
import Result from '../../activity/Result';
import Document from '../../activity/Document';
import './css/responsive.css';

const { TabPane } = Tabs;
const { useToken } = theme;
const { Paragraph } = Typography;

const UserDrawer = ({ openDrawer, setOpenDrawer, infoTicketId, apiTable, modalSession, activeTabKey, setActiveTabKey, isRateButtonClicked, setIsRateButtonClicked, isOfferClicked, setIsOfferClicked}) => {
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [expiredTime, setExpiredTime] = useState(null);
  const [imageView, setImageView] = useState([]);
  const [odooRmaTicket, setOdooRmaTicket] = useState(null);

  const { token } = useToken();

  const isOutOfWarranty = (warranty, created_at) => {
    const endDate = new Date(warranty);
    const creationDate = new Date(created_at);
    if (creationDate > endDate) {
        return true;
      } else {
        return false;
      }
  };

  const fetchLog = async () => {
    try {
      setLoading(true);
      const response = await Api.get(`/api/endpoint/log-status/?ticket_id=${infoTicketId}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      if (error.response && error.response.status === 400) {
        message.error('Failed to get info ticket');
      } else if (error.response && error.response.status === 401) {
        modalSession();
      } else {
        message.error('Failed to get info ticket');
      }
    } finally {
      setLoading(false);
    }
  };

  const isExpired = isOutOfWarranty(ticketData?.warranty, ticketData?.created_at);

  useEffect(() => {
    if (ticketData?.status_ticket === "Waiting Approval") {
      const expiredDateTime = new Date(ticketData.expired_ticket).getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = expiredDateTime - now;
        if (distance <= 0) {
          clearInterval(interval);
          setExpiredTime("Expired");
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setExpiredTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [ticketData]);

  const fetchTicketData = async () => {
    try {
      setLoading(true);
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      const response = await Api.get(`/api/customer/get-ticket-details/${infoTicketId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "ngrok-skip-browser-warning": "69420"
        }
      });
      if (response.status === 200) {
        setTicketData(response.data);
        setOdooRmaTicket(response.data.odoo_rma_ticket_id)
        console.log('Ticket Data:', response.data);
      } else {
        message.error(response.data.message || 'Failed to fetch ticket data');
      }
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      if (error.response && error.response.status === 400) {
        message.error('Failed to get info ticket');
      } else if (error.response && error.response.status === 401) {
        modalSession();
      } else {
        message.error('Failed to get info ticket');
      }
    } finally {
      setLoading(false);
    }
  };

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
      console.log(response.data);
      setImageView(response.data);
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

  useEffect(() => {
    if (infoTicketId) {
      fetchTicketData();
      fetchImages();
      fetchLog();
    }
  }, [infoTicketId, activeTabKey]);

  useEffect(() => {
    console.log(activeTabKey);
    if (isRateButtonClicked && ticketData?.status_ticket === 'Finished') {
        setActiveTabKey('5');
    } else if (isOfferClicked && ticketData?.status_ticket === 'Offering') {
        setActiveTabKey('6');
    } else if (ticketData?.status_ticket === 'Finished') {
        setActiveTabKey('1');
    } else if (ticketData?.status_ticket !== 'Finished') {
        setActiveTabKey('2');
    }
}, [ticketData, setActiveTabKey, activeTabKey, isRateButtonClicked, isOfferClicked]);

  const onClose = () => {
    setOpenDrawer(false);
    setIsRateButtonClicked(false);
    setIsOfferClicked(false);
    document.getElementById('customTooltip').style.display = 'block';
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Drawer
      title={ticketData ? `Ticket Details: ${ticketData.no_tickets}` : 'RMA Ticket Details'}
      className="user-drawer"
      placement={"right"}
      width={window.innerWidth > 600 ? 670 : '100%'}
      open={openDrawer}
      onClose={onClose}
      bodyStyle={{ padding: 0 }}
    >
      <Tabs
        defaultActiveKey={activeTabKey}
        // activeKey={activeTabKey}
        // onChange={key => setActiveTabKey(key)}
        type="card"
        centered
      >
        {ticketData?.status_ticket === "Finished" && (
          <TabPane tab={<span><FileDoneOutlined />Result</span>} key="1">
            <div className="tab-content">
              <Result infoTicketId={infoTicketId} apiTable={apiTable} ticketData={ticketData}/>
            </div>
          </TabPane>
        )}
        <TabPane tab={<span><FileSearchOutlined />Details</span>} key="2">
          <div className="tab-content">
            <Card>
              <div style={{ padding: 22 }}>
                <Paragraph>Mac Address:</Paragraph>
                <div className="details-row">
                  <Paragraph style={{ fontSize: 30 }}><strong>{ticketData?.mac_address}</strong></Paragraph>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='text-end'>
                      <Tag
                        color={
                          ticketData?.status_ticket === "Waiting Approval" ? "processing"
                            : ticketData?.status_ticket === "Offering" ? "green"
                              : ticketData?.status_ticket === "Received" ? "orange"
                                : ticketData?.status_ticket === "Testing and Processing" ? "purple"
                                  : ticketData?.status_ticket === "Fulfillment" ? "success"
                                    : ticketData?.status_ticket === "Finished" ? "geekblue"
                                      : ticketData?.status_ticket === "Cancelled" ? "error"
                                        : "default"
                        }
                      >
                        {ticketData?.status_ticket}
                      </Tag>
                      {ticketData?.status_ticket === "Waiting Approval" && expiredTime && (
                        <span>{expiredTime}</span>
                      )}
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="details-row">
                  <Paragraph><strong>No Ticket :</strong></Paragraph>
                  <div className='text-end'>{ticketData?.no_tickets}</div>
                </div>
                <div className="details-row">
                  <Paragraph><strong>Warranty :</strong></Paragraph>
                  <div className='text-end'>
                    <Tag
                      icon={isExpired ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />}
                      color={isExpired ? "red" : "green"}
                    >
                      {ticketData?.warranty}
                    </Tag>
                  </div>
                </div>
                <div className="details-row">
                  <Paragraph><strong>Seller :</strong></Paragraph>
                  <div className='text-end'>{ticketData?.customer_2}</div>
                </div>
                <div className="details-row">
                  <Paragraph><strong>Distributor :</strong></Paragraph>
                  <div className='text-end'>{ticketData?.distributor}</div>
                </div>
                <div className="details-row">
                  <Paragraph><strong>Device :</strong></Paragraph>
                  <div className='text-end'>{ticketData?.product_name}</div>
                </div>
                <Divider />
                <div className="details-row">
                  <Paragraph><strong>Contact :</strong></Paragraph>
                  <div className='text-end'>{ticketData?.name}</div>
                </div>
                <div className="details-row">
                  <Paragraph><strong>Phone :</strong></Paragraph>
                  <div className='text-end'>{ticketData?.phone}</div>
                </div>
                <div className="details-row">
                  <Paragraph><strong>Cargo :</strong></Paragraph>
                  <div className='text-end'>{ticketData?.cargo?.cargo_name}</div>
                </div>
                <div className="details-row">
                  <Paragraph><strong>Resi :</strong></Paragraph>
                  <div className='text-end'>{ticketData?.tracking_number}</div>
                </div>
                <div className="details-row">
                  <Paragraph><strong>Address :</strong></Paragraph>
                  <div className='text-end'>{ticketData?.address}</div>
                </div>
              </div>
              <Divider />
              <Card>
                <div className="details-row">
                  <Paragraph><strong>Problem :</strong></Paragraph>
                  <div className='text-end'>{ticketData?.problem}</div>
                </div>
                <div>
                  <Paragraph><strong>Photos :</strong></Paragraph>
                  <div className="image-container">
                    {imageView.map((image, index) => (
                      <Image key={index} src={`${BASE_URL_BE}/api/get-images?filename=${image}&ngrok-skip-browser-warning=69420`} style={{ width: 100, height: 100, margin: 5 }} />
                    ))}
                  </div>
                </div>
              </Card>
              <Divider />
              <div style={{ backgroundColor: token.colorBgBase }}>
                        <Paragraph>
                            <strong>Shipping Address</strong>
                        </Paragraph>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'>Surabaya ( Pusat ) :</Paragraph> 
                            <div className='text-end'style={{ width: 300, textAlign: 'end', marginBottom: 10 }}>Ciputra World Office Tower 30th Floor Unit 3009
Jl. Mayjen Sungkono, Surabaya - INDONESIA 60224</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Paragraph className='text-start'>Jakarta :</Paragraph> 
                            <div className='text-end'style={{ width: 300, textAlign: 'end' }}>Kompleks Harco Elektonik - Mangga Dua Blok H-6
Jalan Mangga Dua Raya - Jakarta Pusat 10730</div>
                        </div>
                    </div>
                </Card>
            </div>     
        </TabPane>
        <TabPane tab={<span><AlertOutlined />Status</span>} key="3">
          <div className="tab-content">
            <TicketSteps infoTicketId={infoTicketId} />
          </div>
        </TabPane>
        <TabPane tab={<span><CheckCircleOutlined />Log</span>} key="4">
          <div className="tab-content">
            <LogTicket infoTicketId={infoTicketId} />
          </div>
        </TabPane>
        {ticketData?.status_ticket === "Finished" && (
          <TabPane tab={<span><StarOutlined />Rate</span>} key="5">
            <div className="tab-content">
              <RateTicket infoTicketId={infoTicketId} apiTable={apiTable} setOpenDrawer={setOpenDrawer} setIsRateButtonClicked={setIsRateButtonClicked} />
            </div>
          </TabPane>
        )}
        <TabPane tab={<span><FileOutlined />Document</span>} key="6">
          <div className="tab-content">
            <Document odooRmaTicket={odooRmaTicket} />
          </div>
        </TabPane>

      </Tabs>
    </Drawer>
  );
};

export default UserDrawer;
