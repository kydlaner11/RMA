import {PlusOutlined,} from "@ant-design/icons";
import { effect, signal } from "@preact/signals-react";
import { Alert, Button, Col,  Form, Input,  Modal, Row, Select, Spin, Table, Typography, Upload, message } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StickyHeader from "../../layouts/StickyHeader";
import useSearchColumn from "../../hooks/useSearchColumn";
import { charactersColumn } from "../../constant/columns/ticket";
import api from "../../api";

const {Item} = Form;
const {Option} = Select;
const loading = signal(false);
const {Search, TextArea} = Input;
const {Title, Paragraph} = Typography;


const Dashboard = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [note, setNote] = useState('');
  const searchProps = useSearchColumn();
  const [open, setOpen] = useState(false);
  const [dataTable, setDataTable] = useState(false);
  const [problem, setProblem] = useState('');
  const [loadings, setLoadings] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [cargoOptions, setCargoOptions] = useState([]);
  const [remainingDays, setRemainingDays] = useState(null);


  effect(() => {
    if (Cookies.get("redirect_uri")) {
      const uri = Cookies.get("redirect_uri");
      Cookies.remove("redirect_uri");
      navigate(uri);
    }
  });


  const handleSearch = async (value) => {
    try {
      const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
  
      const response = await api.get(`api/customer/search?mac_address=${value}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      setDetailData(response.data);
      console.log(detailData)
      form.setFieldsValue(response.data);
      setOpenForm(true);
      setOpen(false)
      setErrorAlert(null); 

      
      // Hitung jumlah hari tersisa dari tanggal warranty
      const warrantyDate = response.data?.warranty; // Misalkan format tanggal 'YYYY-MM-DD'
      const daysLeft = calculateRemainingDays(warrantyDate);
      setRemainingDays(daysLeft);
      // Tampilkan alert sesuai kondisi warranty
      if (daysLeft <= 0) {
        setErrorAlert('Your device is out of warranty, you will be charged an additional fee if you proceed.');
      } else if (daysLeft <= 30) {
        setErrorAlert(`Your device warranty will expire in ${daysLeft} day(s).`);
      } else {
        setErrorAlert(null); // Bersihkan alert jika warranty masih lama
      }
    } catch (error) {
      console.log(error);
      setDetailData(null);
      form.resetFields();
      setErrorAlert('MAC Address or Serial Number not found. Please contact your admin');
    }
  }
  const handleCloseModal = () => {
    setOpen(false);
    form.resetFields(); 
    setErrorAlert(null);
  };

  const calculateRemainingDays = (warrantyDate) => {
    const now = new Date();
    const expirationDate = new Date(warrantyDate);
    const differenceInTime = expirationDate.getTime() - now.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Menghitung selisih hari
    return differenceInDays;
  };

  const apiTable = async () => {
    try {
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      const response = await api.get('/api/customer/view-ticket-customerid', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      setDataTable(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddData = async () => {
    try {
      setLoadings(true); 
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
  
      // Ambil data pengguna saat ini dari API
      const userResponse = await api.post('/api/customer/me', {}, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      // Pastikan respon pengguna berhasil dan memiliki ID
      if (userResponse.status === 200 && userResponse.data && userResponse.data.id) {
        // Simpan data pengguna
        const { id: customerId, name, odoo_contact_id: odooId, address } = userResponse.data;
  
        // Buat nilai catatan yang mencakup informasi pengguna
        const userNote = `Customer Name: ${name}\nOdoo ID: ${odooId}\nAddress: ${address}`;        
        const combinedNote = `${userNote}\nNotes: ${note}`;  
        const newTicket = {
          ...detailData,
          address: form.getFieldValue('address'),
          phone: form.getFieldValue('phone'),
          problem: problem,
          note: combinedNote, 
          cargo_id: form.getFieldValue('cargo'), 
          tracking_number: form.getFieldValue('tracking_number'),
          customer_id: customerId,
          // photos: form.getFieldValue('photos') || [], 
        };
  
        console.log(newTicket);
  
        // Kirim permintaan POST untuk menambahkan tiket
        const response = await api.post('/api/customer/ticket', newTicket, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
  
        if (response.status === 200) {
          setData([...data, newTicket]); 
          setNote(''); 
          setProblem('');
          setOpenForm(false) 
          message.success('Ticket added successfully');
        } else {
          message.error(response.data.message || 'Failed to add ticket');
        }
      } else {
        throw new Error('Failed to fetch user data or user ID not found.');
      }
    } catch (error) {
      console.error('Error adding ticket:', error);
      message.error('An error occurred while adding ticket');
    } finally {
      setLoadings(false);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
  };

  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  

  const fetchCargoOptions = async () => {
    try {
      const response = await api.get('/api/endpoint/kurir');
      setCargoOptions(response.data);
    } catch (error) {
      console.error('Error fetching cargo options:', error);
    }
  };

  
 
  
  useEffect(() => {
    // Ambil opsi dari API saat komponen dimuat
    apiTable();
    fetchCargoOptions();
  }, []);
  return (
    <div>
      <Spin spinning={loading.value} size="large">
        <StickyHeader title={'RMA Ticket'}>
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
        <div style={{ padding: '0 32px'}}>
          <Title level={5}>What you returning?</Title>
            <Paragraph>Enter your MAC Address or Serial Number of your device. This information is essential for completing the return process </Paragraph>
            <div style={{ padding: '6px 0'}}></div>
            {/* <Title level={5}>Input your MAC or Serial Number Here!</Title> */}
            <Form layout='vertical' form={form} >
                <Item
                  // label="Input your device MAC Address"
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
            </Form>
        </div>
      </Modal>
      
        <Modal
          title="Detail Data"
          centered
          open={openForm}
          onCancel={() => setOpenForm(false)}
          onOk={handleAddData}
          okText="Submit"
          width={'90vw'}
        >
        <div style={{ padding: '0 32px'}}>
          <Spin spinning={loadings} size="large">
            <Form form={form} initialValues={detailData}  labelCol={{span: 4,}} wrapperCol={{span: 18,}} layout="horizontal" style={{ marginTop:36 }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Contact" name="name">
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
                    <Form.Item label="Product" name="product_name">
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label="MAC Address" name="mac_address">
                      <Input disabled />
                    </Form.Item>
                    <div style={{ display:'none' }} >
                      <Form.Item name="company_id">
                        <Input  />
                      </Form.Item>
                      <Form.Item name="partner_id">
                        <Input  />
                      </Form.Item>
                      <Form.Item name="product_id">
                        <Input  />
                      </Form.Item>
                      <Form.Item name="lot_id">
                        <Input  />
                      </Form.Item>
                    </div>
                    <div className="">
                    <Item label="Warranty" name="warranty">
                      <Input disabled />
                    </Item>
                    <div style={{ maxWidth: '92%' }}>
                    {remainingDays !== null && (
                      <Alert
                        message={
                          remainingDays <= 0
                            ? 'Your device is out of warranty, you will be charged an additional fee if you proceed.'
                            : `Your device warranty will expire in ${remainingDays} day(s).`
                        }
                        type={remainingDays <= 0 ? 'error' : 'warning'}
                        showIcon
                        style={{ marginTop: '10px',  }}
                      />
                    )}
                    </div>
                    </div>
                  </Col>
                  {/* <Col span={2}></Col> */}
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Problem" name="problem">
                      <TextArea placeholder="Masukan Permasalahan Barang Anda!" rows={4} value={problem} onChange={(e) => setProblem(e.target.value)}  />
                    </Form.Item>
                    <Form.Item label="Notes" name="note">
                      <TextArea placeholder="" rows={4} value={note} onChange={(e) => setNote(e.target.value) } />
                    </Form.Item>
                    <Form.Item label="Cargo" name="cargo">
                      <Select placeholder="Pilih Jasa Pengiriman">
                        {cargoOptions.map(option => (
                          <Option key={option.id} value={option.id}>{option.cargo_name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Resi" name="tracking_number">
                      <Input  placeholder="Masukan Nomer Resi"/>
                    </Form.Item>
                    <Form.Item label="Upload" name="photos">
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={true}
                        beforeUpload={beforeUpload}
                        customRequest={customRequest}
                      >
                        <button style={{ border: 0, background: 'none' }} type="button">
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
            </Form>
          </Spin>
        </div>
        </Modal>

        <div style={{ padding: 32 }}>
          <Table
            // loading={loading}
            columns={charactersColumn({ searchProps })}
            dataSource={dataTable}
            // TODO: Fix bug undefined
            scroll={{ x: 1000 }}
          />
        </div>
      </Spin>
    </div>
  );
};

export default Dashboard;