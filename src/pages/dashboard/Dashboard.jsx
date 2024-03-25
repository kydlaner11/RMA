import {PlusOutlined,} from "@ant-design/icons";
import { effect, signal } from "@preact/signals-react";
import { Alert, Button, Col,  Form, Input,  Modal, Row, Spin, Table, Typography, Upload, message } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StickyHeader from "../../layouts/StickyHeader";
import useSearchColumn from "../../hooks/useSearchColumn";
import { charactersColumn } from "../../constant/columns/ticket";
import api from "../../api";

const loading = signal(false);
const {Title, Paragraph} = Typography;
const {Item} = Form;
const {Search, TextArea} = Input;


const Dashboard = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const searchProps = useSearchColumn();
  const [open, setOpen] = useState(false);
  const [problem, setProblem] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  // const [remainingDays, setRemainingDays] = useState(null);


  effect(() => {
    if (Cookies.get("redirect_uri")) {
      const uri = Cookies.get("redirect_uri");
      Cookies.remove("redirect_uri");
      navigate(uri);
    }
  });


  const handleSearch = async (value) => {
    try {
      const response = await api.get(`api/customer/search?mac_address=${value}`);
      setDetailData(response.data);
      console.log(detailData)
      form.setFieldsValue(response.data);
      setOpenForm(true);
      setOpen(false)
      setErrorAlert(null); 

      
      // // Hitung jumlah hari tersisa dari tanggal warranty
      // const warrantyDate = response.data?.warranty; // Misalkan format tanggal 'YYYY-MM-DD'
      // const daysLeft = calculateRemainingDays(warrantyDate);
      // setRemainingDays(daysLeft);
      // // Tampilkan alert sesuai kondisi warranty
      // if (daysLeft <= 0) {
      //   setErrorAlert('Your device is out of warranty, you will be charged an additional fee if you proceed.');
      // } else if (daysLeft <= 30) {
      //   setErrorAlert(`Your device warranty will expire in ${daysLeft} day(s).`);
      // } else {
      //   setErrorAlert(null); // Bersihkan alert jika warranty masih lama
      // }
    } catch (error) {
      console.log(error);
      setDetailData(null);
      form.resetFields();
      setErrorAlert('MAC address not found. Please contact your admin');
    }
  }
  const handleCloseModal = () => {
    setOpen(false);
    form.resetFields(); 
    setErrorAlert(null);
  };

  // const calculateRemainingDays = (warrantyDate) => {
  //   const now = new Date();
  //   const expirationDate = new Date(warrantyDate);
  //   const differenceInTime = expirationDate.getTime() - now.getTime();
  //   const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Menghitung selisih hari
  //   return differenceInDays;
  // };

  const handleAddData = () => {
    const newTicket = {
      ...detailData,
      problem: problem,
    };
    
    setData([...data, newTicket]);

    form.resetFields();

    message.success('Data added successfully');
  }

  return (
    <div>
      <Spin spinning={loading.value} size="large">
        <StickyHeader>
        <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpen(true)}
          >
            Create Ticket
          </Button>
        </StickyHeader>
        <Modal
        title="RMA REQUEST"
        centered
        open={open}
        onCancel={handleCloseModal}
        footer={null}
      >
        <div >
          <Title level={5}>What you returning?</Title>
            <Paragraph>Enter your devices MAC Address. Your device MAC Address is necessary for data retrieval purposes.</Paragraph>  
            <Form layout='vertical' form={form} >
                <Item
                  label="Input your device MAC Address"
                  name="name"
                  rules={[{ required: true, 
                    // message: 'Please input your name!' 
                  }]}
                  >
                  <Search
                    placeholder="Search MAC Address"
                    allowClear
                    size="middle"
                    onSearch={handleSearch}
                    style={{
                      display:'flex',
                      alignItems: 'flex-end', 
                      }}
                  />
                  {errorAlert && (
                  <Alert
                    message={errorAlert}
                    type="error"
                    showIcon
                    style={{ marginTop: '10px' }}
                  />
                )}
                </Item>
                <div className="" style={{ marginTop:60 }}></div>
            </Form>
        </div>
      </Modal>
      <Modal
        title="Detail Data"
        centered
        open={openForm}
        onCancel={() => setOpenForm(false)}
        onOk={handleAddData}
        width={'90vw'}
      >
      <Form form={form} initialValues={detailData}  labelCol={{span: 4,}} wrapperCol={{span: 18,}} layout="horizontal" style={{ marginTop:36 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item label="Contact" name="contact">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Phone" name="phone">
                <Input variant="filled" />
              </Form.Item>
              <Form.Item label="Address" name="address">
                <TextArea variant="filled" />
              </Form.Item>
              <Form.Item label="Product" name="device">
                <Input disabled />
              </Form.Item>
              <Form.Item label="MAC Address" name="mac_address">
                <Input disabled />
              </Form.Item>
              <Item label="Warranty" name="warranty">
              <Input disabled />
            </Item>
            {/* {remainingDays !== null && (
              <Alert
                message={
                  remainingDays <= 0
                    ? 'Your device is out of warranty, you will be charged an additional fee if you proceed.'
                    : `Your device warranty will expire in ${remainingDays} day(s).`
                }
                type={remainingDays <= 0 ? 'error' : 'warning'}
                showIcon
                style={{ marginTop: '10px' }}
              />
            )} */}
            </Col>
            {/* <Col span={2}></Col> */}
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item label="Problem" name="problem">
                <TextArea rows={4} value={problem} onChange={(e) => setProblem(e.target.value)}  />
              </Form.Item>
              <Form.Item label="Notes" name="notes">
                <TextArea rows={4} value={problem} onChange={(e) => setProblem(e.target.value)} />
              </Form.Item>
              <Form.Item label="Cargo" name="cargo">
                <Input  />
              </Form.Item>
              <Form.Item label="Resi" name="tracking_number">
                <Input  />
              </Form.Item>
              <Form.Item label="Upload" name="upload">
              <Upload action="/upload.do" listType="picture-card">
                <button style={{ border: 0, background: 'none' }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
              </Form.Item>

            </Col>
          </Row>
      </Form>
      </Modal>

        <div style={{ padding: 32 }}>
          <Table
            // loading={loading}
            columns={charactersColumn({ searchProps })}
            // dataSource={data === undefined ? [] : data.characters.results}
            // TODO: Fix bug undefined
            scroll={{ x: 1000 }}
          />
        </div>
      </Spin>
    </div>
  );
};

export default Dashboard;