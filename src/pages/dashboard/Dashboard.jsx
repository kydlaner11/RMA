import {PlusOutlined,} from "@ant-design/icons";
import { effect, signal } from "@preact/signals-react";
import { Alert, Button, Col,  Form, Input,  Modal, Row, Select, Spin, Switch, Table, Typography, Upload, message } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StickyHeader from "../../layouts/StickyHeader";
import useSearchColumn from "../../hooks/useSearchColumn";
import { charactersColumn } from "../../constant/columns/ticket";
import api from "../../api";
import UserDrawer from "./components/userDrawer";
import ModalEdit from "./components/modalEdit";
import CancelTicket from "./components/cancelTicket";

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
  const [problem, setProblem] = useState('');
  const [loadings, setLoadings] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [dataTable, setDataTable] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cargoOptions, setCargoOptions] = useState([]);
  const [editTicketId, setEditTicketId] = useState(null);
  const [openFormEdit, setOpenFormEdit] = useState(false); 
  const [remainingDays, setRemainingDays] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [editTicketData, setEditTicketData] = useState(null);
  const [filterCancelled, setFilterCancelled] = useState(false);


  effect(() => {
    if (Cookies.get("redirect_uri")) {
      const uri = Cookies.get("redirect_uri");
      Cookies.remove("redirect_uri");
      navigate(uri);
    }
  });
  
  const calculateRemainingDays = (warrantyDate) => {
    const now = new Date();
    const expirationDate = new Date(warrantyDate);
    const differenceInTime = expirationDate.getTime() - now.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Menghitung selisih hari
    return differenceInDays;
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


  const handleSearch = async (value) => {
    try {
      setLoadings(true); 
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
      console.log(response.data)
      form.setFieldsValue(response.data);
      setOpenForm(true);
      setOpen(false)
      setErrorAlert(null); 

      
      const warrantyDate = response.data?.warranty;
      const daysLeft = calculateRemainingDays(warrantyDate);
      setRemainingDays(daysLeft);
      // if (daysLeft <= 0) {
      //   setErrorAlert('Your device is out of warranty, you will be charged an additional fee if you proceed.');
      // } else if (daysLeft <= 30) {
      //   setErrorAlert(`Your device warranty will expire in ${daysLeft} day(s).`);
      // } else {
      //   setErrorAlert(null);
      // }
    } catch (error) {
      console.log(error);
      setDetailData(null);
      form.resetFields();
      setErrorAlert('MAC Address or Serial Number not found. Please contact your admin');
    }finally {
      setLoadings(false);
    }
  }

  const handleCloseModal = () => {
    setOpen(false);
    form.resetFields(); 
    setErrorAlert(null);
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
        const { id: customerId, name,name_origin:origin, odoo_contact_id: odooId, address } = userResponse.data;
  
        // Buat nilai catatan yang mencakup informasi pengguna
        const userNote = origin === name
          ? `Customer Name: ${name}\nOdoo ID: ${odooId}\nAddress: ${address}`
          : `Customer Name: ${origin} (${name})\nOdoo ID: ${odooId}\nAddress: ${address}`;      
        const combinedNote = `${userNote}`;  
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
  
        // console.log("detailData",detailData)
  
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
          message.error('Failed to add ticket');
        }
      } else {
        throw new Error('Failed to fetch user data or user ID not found.');
      }
    } catch (error) {
      console.error('Error adding ticket:', error);
      if (error.response && error.response.status === 400) {
        message.error('Mac Address already created RMA Ticket');
      } else if (error.response && error.response.status === 404) {
        message.error('Server down, Please try again later');
      } else {
        // Tangani status respons lainnya di sini
        message.error('Failed to add ticket');
      }
    } finally {
      setLoadings(false);
    }
  };

  const handleCancel = async () => {
    setIsModalVisible(false); 
    const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }// Tutup modal konfirmasi
      // Lakukan embatalan tiket jika dikonfirmasi
      try {
        await api.put(`api/customer/cancel-ticket?ticket_id=${editTicketId}`, null, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        message.success('Ticket cancelled successfully');
      } catch (error) {
        console.log(error);
        message.error('Failed to cancel ticket');
      }
    
  };

  const handleInfoClick = () => {
    setOpenDrawer(true);
  };
  const handleEditClick = (id) => {
    setEditTicketId(id);
    console.log("ini",id) // Set the ID of the ticket being edited
    setOpenFormEdit(true); // Open the modal for editing
  };
  const handleCancelClick = (id) => {
    setEditTicketId(id);
    console.log("ini",id) // Set the ID of the ticket being edited
    setIsModalVisible(true); // Open the modal for editing
  };
  
  const apiTable = async (cancelled) => {
    try {
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      
      const response = await api.get('/api/customer/view-ticket-customerid', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        params: {
          filterCancelled: cancelled ? undefined:'true',
        },
      });
      setDataTable(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleChange = async (checked) => {
    setFilterCancelled(checked);
    apiTable(checked);
  };
  useEffect(() => {
    apiTable();
    fetchCargoOptions();
  }, []);



  return (
    <div>
      <Spin spinning={loading.value} size="large">
        <StickyHeader title={'RMA Ticket'}>
          <div style={{ marginRight: "10px" }}>
            <Switch checked={filterCancelled} onChange={handleChange} checkedChildren="Active Ticket" unCheckedChildren="View All"/>
          </div>
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
        <Spin spinning={loadings}>
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
          </Spin>
        </div>
        </Modal>
      
        <Modal
          title="Create Ticket"
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
                      <Input disabled style={{ color:'black' }}/>
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input disabled style={{ color:'black' }} />
                    </Form.Item>
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
                      <Form.Item name="partner_id">
                        <Input  />
                      </Form.Item>
                      <Form.Item name="product_id">
                        <Input  />
                      </Form.Item>
                      <Form.Item name="lot_id">
                        <Input  />
                      </Form.Item>
                      <Form.Item name="unit">
                        <Input  />
                      </Form.Item>
                    </div>
                    <div className="">
                    <Item label="Warranty" name="warranty">
                      <Input disabled style={{ color:'black' }}/>
                    </Item>
                    <div style={{ maxWidth: '92%' }}>
                    {remainingDays !== null && (
                      <Alert
                        message={
                          remainingDays <= 0
                            ? (<span>
                              Your device is out of warranty, you will be charged an <b>additional fee</b> if you proceed.
                            </span>)
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
                      <TextArea placeholder="Deskripsikan masalah perangkat anda"  rows={4} value={problem} onChange={(e) => setProblem(e.target.value)} required />
                    </Form.Item>
                    <div style={{ display:'none' }}>
                    <Form.Item label="Notes" name="note">
                      <TextArea placeholder="" rows={4} value={note} onChange={(e) => setNote(e.target.value) } />
                    </Form.Item>  
                    </div>
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
            columns={charactersColumn({ searchProps, handleInfoClick, handleEditClick, handleCancelClick })}
            dataSource={dataTable}
            // TODO: Fix bug undefined
            scroll={{ x: 1000 }}
          />
        </div>
        <CancelTicket openModal={isModalVisible} handleCancel={handleCancel}/>
        <ModalEdit openFormEdit={openFormEdit} setOpenFormEdit={setOpenFormEdit}  editTicketId={editTicketId} cargoOptions={cargoOptions}/>
        <UserDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </Spin>
    </div>
  );
};

export default Dashboard;