import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
// import { PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Spin, message, Row, Col, Select } from 'antd';
import Api from '../../../api';

const {Option} = Select;
const { TextArea } = Input;

const ModalEdit = ({ openFormEdit, setOpenFormEdit, editTicketId, cargoOptions, apiTable, modalSession }) => {
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
      const response = await Api.get(`/api/customer/ticket/${editTicketId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "ngrok-skip-browser-warning": "69420"
        },
      });
      console.log("ticket",response.data)
      if (response.status === 200) {
        setTicketData(response.data.ticket);
        console.log("ticket", ticketData)
        form.setFieldsValue(response.data.ticket); // Set initial form values with the ticket data
      } else {
        message.error(response.data.message || 'Failed to fetch ticket data');
      }
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      if (error.response && error.response.status === 400) {
        message.error('Failed to edit ticket');
      } else if (error.response && error.response.status === 401) {
        modalSession();
      } else {
        message.error('Failed to edit ticket');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      let formData =  {
        problem: form.getFieldValue('problem'),
        address: form.getFieldValue('address'),
        phone: form.getFieldValue('phone'),
        cargo_id: form.getFieldValue('cargo_name'), 
        tracking_number: form.getFieldValue('tracking_number'),
      };

      // if (newCargo) { // If 'Lainnya' is selected
      //   const otherCargoName = form.getFieldValue('other_cargo');
      //   const addCargoResponse = await Api.post('/api/endpoint/AddCargo', { cargo_name: otherCargoName });
      //   if (addCargoResponse.status === 200) {
      //     message.success('Cargo added successfully');

      //     formData.cargo_id = addCargoResponse.data.id; // Update cargo_id with new cargo ID
      //   } else {
      //     throw new Error('Failed to add new cargo');
      //   }
      // }

      const response = await Api.post(`/api/customer/ticket/${editTicketId}`, formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      } );
      console.log(formData)
      if (response.status === 200) {
        message.success('Ticket updated successfully');
        setOpenFormEdit(false);
        await apiTable();
      } else {
        message.error(response.data.message || 'Failed to update ticket');
        await apiTable();
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      message.error('Failed to update ticket');
      await apiTable();
    } finally {
      setLoading(false);
    }
  };


  // const handleAddNewCargo = async () => {
  //   try {
  //     const bearerToken = Cookies.get("access_token");
  //     if (!bearerToken) {
  //       throw new Error('Bearer token not found.');
  //     }

  //     const addCargoResponse = await Api.post('/api/endpoint/AddCargo', { cargo_name: newCargo }, {
  //       headers: {
  //         Authorization: `Bearer ${bearerToken}`,
  //       },
  //     });

  //     if (addCargoResponse.status === 200) {
  //       message.success('Cargo added successfully');
  //       const newCargoOption = { id: addCargoResponse.data.id, cargo_name: newCargo };
  //       setCargoList([...cargoList, newCargoOption]);
  //       form.setFieldsValue({ cargo_id: newCargoOption.id });
  //       setNewCargo('');
  //     } else {
  //       message.error('Failed to add new cargo');
  //     }
  //   } catch (error) {
  //     console.error('Error adding new cargo:', error);
  //     message.error('Failed to add new cargo');
  //   }
  // };

  useEffect(() => {
    if (openFormEdit && editTicketId) {
      fetchTicketData();
    }
  }, [openFormEdit, editTicketId, form]);

  const handleCancel = () => {
    if (!loading) {
      setOpenFormEdit(false);
    }
  };

  if (loading) {
    return <Spin />;
  }


  return (
    <Modal
          title="Edit Ticket"
          centered
          open={openFormEdit}
          onCancel={handleCancel}
          onOk={handleOk}
          okText="Save"
          cancelButtonProps={{ disabled: loading }} // Disable Cancel button when loading
          okButtonProps={{ loading: loading }}
          width={'90vw'}  
        >
        <div style={{ padding: '0 32px'}}>
          <Spin spinning={loading} size="large">
            <Form form={form} initialValues={ticketData} labelCol={{span: 4,}} wrapperCol={{span: 18,}} layout="horizontal" style={{ marginTop:36 }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Phone" name="phone">
                      <Input disabled variant="filled" style={{ color:'black' }} />
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                      <TextArea disabled variant="filled" style={{ color:'black' }}/>
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
                      <TextArea placeholder="Deskripsikan masalah perangkat anda" rows={4}  disabled style={{ color:'black' }}/>
                    </Form.Item>
                    <div style={{ display:'none' }}>
                    <Form.Item label="Notes" name="note">
                      <TextArea placeholder="" rows={4} />
                    </Form.Item>  
                    </div>
                    <Form.Item label="Cargo" name="cargo_name">
                      <Select
                        placeholder="Pilih Jasa Pengiriman"
                      >
                        {cargoOptions.map(option => (
                          <Option key={option.id} value={option.id}>{option.cargo_name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Resi" name="tracking_number">
                      <Input  placeholder="Masukan Nomer Resi"/>
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
