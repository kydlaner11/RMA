// import {
//   PlusOutlined,
// } from "@ant-design/icons";
import api from '../../api';
import React, { useState } from "react";
import StickyHeader from "../../layouts/StickyHeader";
import { signal } from "@preact/signals-react";
import { Button, Col, Form, Input, Modal, Row, Spin, message,  } from "antd";
// import { useNavigate } from 'react-router-dom';
const {Search} = Input;
const loading = signal(false);
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function DetailDashboard() {
  const [form] = Form.useForm();
  const [detailData, setDetailData] = useState(null);
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const [problem, setProblem] = useState('');
  const [open, setOpen] = useState(false);


  const handleSearch = async (value) => {
    try {
      const response = await api.get(`api/customer/search?mac_address=${value}`);
      setDetailData(response.data);
      console.log(response.data)
      form.setFieldsValue(response.data);
    } catch (error) {
      console.log(error);
      setDetailData(null);
      form.resetFields();
      message.error('Data not found');
    }
  }
  const handleAddData = () => {
    // Membuat tiket baru
    const newTicket = {
      ...detailData,
      problem: problem,
      date: date,
    };
    
    // Menambahkan tiket baru ke data
    setData([...data, newTicket]);

    // Reset form fields
    form.resetFields();

    message.success('Data added successfully');
  }

  return (
    <div>
      <Spin spinning={loading.value} size="large">
        <StickyHeader title={"RMA Request"}>
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
          <Button type="primary" onClick={() => setOpen(true)}>
              RMA Request
          </Button>
        </StickyHeader>
        <Modal
        title="RMA REQUEST"
        centered
        open={open}
        onOk={() =>{ 
          handleAddData;
          setOpen(false);
        }}
        okText={'Add Data'}
        onCancel={() => setOpen(false)}
        width={1000}
      >
      <div style={{ padding: 32 }}>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col span={8}>
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
            </Col>
          </Row>
          <Form form={form}  initialValues={detailData} size='small' layout={layout}>
                <Form.Item label="Device" name="device">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="MAC Address" name="mac_address">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Date" name="date">
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </Form.Item>
                <Form.Item label="Warranty" name="warranty">
                  <Input disabled />
                </Form.Item>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Form.Item label="Business Unit" name="company">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="Problem" name="problem">
                  <Input rows={4} value={problem} onChange={(e) => setProblem(e.target.value)} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Business Unit" name="company">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="Problem" name="problem">
                  <Input rows={4} value={problem} onChange={(e) => setProblem(e.target.value)} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      </Spin>
    </div>
  )
}
