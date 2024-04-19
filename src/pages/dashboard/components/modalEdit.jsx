import { useState, useEffect } from 'react';
import {PlusOutlined,} from "@ant-design/icons";
import Cookies from "js-cookie";
import { Modal, Form, Input, Spin, message, Row, Col, Select, Upload } from 'antd';
import Api from '../../../api';

const {Option} = Select;
const { TextArea } = Input;

const ModalEdit = ({ openFormEdit, setOpenFormEdit, editTicketId, cargoOptions }) => {
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [form] = Form.useForm();

  const fetchTicketData = async () => {
    try {
      setLoading(true);
      const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      const response = await Api.get(`api/customer/ticket/${editTicketId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      if (response.status === 200) {
        setTicketData(response.data.ticket);
        console.log(ticketData)
        form.setFieldsValue(response.data); // Set initial form values with the ticket data
      } else {
        message.error(response.data.message || 'Failed to fetch ticket data');
      }
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      message.error('Failed to fetch ticket data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (openFormEdit && editTicketId) {
      fetchTicketData();
    }
  }, [openFormEdit, editTicketId, form]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      const formData = await form.validateFields();
      const response = await Api.post(`api/customer/ticket/${editTicketId}`, formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      } );
      console.log(formData)
      if (response.status === 200) {
        message.success('Ticket updated successfully');
        setOpenFormEdit(false);
      } else {
        message.error(response.data.message || 'Failed to update ticket');
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      message.error('Failed to update ticket');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpenFormEdit(false);
  };

  if (loading) {
    return <Spin />;
  }

  const uploadImages = async (images) => {
    try {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`photos[${index}]`, image);
      });
      const response = await Api.post('/api/customer/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading images:', error);
      return [];
    }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
  };
  const customRequest = async ({ file, onSuccess }) => {
    try {
      // Call the uploadImages function with the file
      const response = await uploadImages([file]);
      // If upload is successful, call onSuccess with the response
      onSuccess(response.data);
      message.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Failed to upload image');
    }
  };

  return (
    <Modal
          title="Edit Ticket"
          centered
          open={openFormEdit}
          onCancel={handleCancel}
          onOk={handleOk}
          okText="Submit"
          width={'90vw'}  
        >
        <div style={{ padding: '0 32px'}}>
          <Spin spinning={loading} size="large">
            <Form form={form} initialValues={ticketData} labelCol={{span: 4,}} wrapperCol={{span: 18,}} layout="horizontal" style={{ marginTop:36 }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Phone" name="phone">
                      <Input variant="filled" />
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                      <TextArea variant="filled" />
                    </Form.Item>
                    <Form.Item label="Product" name="product_name">
                      <Input disabled style={{ color:'black' }}/>
                    </Form.Item>
                    <Form.Item label="MAC Address" name="mac_address">
                      <Input disabled style={{ color:'black' }}/>
                    </Form.Item>
                    <div style={{ display:'none' }} >
                      <Form.Item name="company_id">
                        <Input  />
                      </Form.Item>
                      <Form.Item name="unit">
                        <Input  />
                      </Form.Item>
                    </div>
                   
                  </Col>
                  {/* <Col span={2}></Col> */}
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Item label="Problem" name="problem">
                      <TextArea placeholder="Deskripsikan masalah perangkat anda" rows={4}  required />
                    </Form.Item>
                    <div style={{ display:'none' }}>
                    <Form.Item label="Notes" name="note">
                      <TextArea placeholder="" rows={4} />
                    </Form.Item>  
                    </div>
                    <Form.Item label="Cargo" name="cargo_id">
                      <Select placeholder="Pilih Jasa Pengiriman">
                        {cargoOptions.map(option => (
                          <Option key={option.id} value={option.id}>{option.cargo_name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Resi" name="tracking_number">
                      <Input  placeholder="Masukan Nomer Resi"/>
                    </Form.Item>
                    <Form.Item label="Upload Image" name="photos" extra="Upload your device image">
                      <Upload
                        customRequest={customRequest}
                        beforeUpload={beforeUpload}
                        listType="picture-card"
                        maxCount={3}
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
            </Form>
          </Spin>
        </div>
        </Modal>
  );
};
export default ModalEdit;
