import {PlusOutlined, ExclamationCircleOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Alert, Button, Col,  Form, Input,  Modal, Pagination, Row, Select, Spin, Switch, Table, Typography, Upload, message, FloatButton } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState} from "react";
import StickyHeader from "../../layouts/StickyHeader";
import useSearchColumn from "../../hooks/useSearchColumn";
import { ticketsColumn } from "../../constant/columns/ticket";
import api from "../../api";
import UserDrawer from "./components/userDrawer";
import ModalEdit from "./components/modalEdit";
import CancelTicket from "./components/cancelTicket";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";

const {Item} = Form;
const {Option} = Select;
const {Search, TextArea} = Input;
const {Title, Paragraph} = Typography;


const Dashboard = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const [note, setNote] = useState('');
  const [open, setOpen] = useState(false);
  const [problem, setProblem] = useState('');
  const [images, setImages] = useState([]);
  const [imagesSub, setImagesSub] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [dataTable, setDataTable] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const searchProps = useSearchColumn(setFilterValues);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('1');
  const [cargoOptions, setCargoOptions] = useState([]);
  const [editTicketId, setEditTicketId] = useState(null);
  const [infoTicketId, setInfoTicketId] = useState(null);
  const [openFormEdit, setOpenFormEdit] = useState(false); 
  const [remainingDays, setRemainingDays] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cancelTicketId, setCancelTicketId] = useState(null);
  // const [editTicketData, setEditTicketData] = useState(null);
  const [filterCancelled, setFilterCancelled] = useState(false);
  const [isRateButtonClicked, setIsRateButtonClicked] = useState(false);
  const [isOfferClicked, setIsOfferClicked] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [products, setProducts] = useState([]);
// const [selectedProduct, setSelectedProduct] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);



  const calculateRemainingDays = (warrantyDate) => {
    const now = new Date();
    const expirationDate = new Date(warrantyDate);
    const differenceInTime = expirationDate.getTime() - now.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Menghitung selisih hari
    return differenceInDays;
  };

  const uploadImages = async (Images) => {
    const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
    try {
      const formData = new FormData();
      Images.forEach((image) => {
        formData.append('photos', image);
      });
      const response = await api.post('/api/customer/upload-image', formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "ngrok-skip-browser-warning": "69420",
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      console.log(images)
      console.log("rcfc",imagesSub)
      return response.data;
      
    } catch (error) {
      console.error('Error uploading images:', error);
      return [];
    }
  };
  
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    const isLt2M = file.size / 1024 / 1024 < 2;
    console.log("file", file);
  
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    } else if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
      file.status = 'error';
    }
    return isJpgOrPng && isLt2M;
  };
  
  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      setIsImageUploading(true);
      if (images.length > 3) {
        message.error('You can only upload up to 3 images');
        onError(new Error('You can only upload up to 3 images'));
        return;
      }

      if (!beforeUpload(file)) {
        handleImageChange({ fileList: [{ ...file, status: 'error' }] });
        onError(new Error('Invalid file'));
        setIsImageUploading(false);
        return;
      }
  
      // Mengunggah gambar jika valid
      const response = await uploadImages([file]);
      if (response) { // Pastikan respons valid
        setImagesSub(prevImages => [...prevImages, { ...response, uid: file.uid }]);
        onSuccess();
        message.success('Image uploaded successfully');
      } else {
        handleImageChange({ fileList: [{ ...file, status: 'error' }] });
        onError(new Error('Failed to upload image'));
        message.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      onError(error);
      message.error('Failed to upload image');
    } finally {
      setIsImageUploading(false);
    }
  };
  
  const handleImageChange = ({ fileList }) => {
    setImages(fileList.map(file => file.response || file));
  };
  
  const handleRemoveImage = async (file) => {
    if (file.status === 'error') {
      // Directly remove the image from the state without making an API call
      const newImages = imagesSub.filter(image => image.uid !== file.uid);
      setImagesSub(newImages);
      message.success('Invalid image removed successfully');
      return;
    }

    const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }

    try {
      const index = imagesSub.find(image => image.uid === file.uid).hashname;
      console.log("index", index);
      const response = await api.delete(`/api/customer/remove-image?hashname=${index}`, {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            "ngrok-skip-browser-warning": "69420"
        }
    });
      if (response.status === 200) {
        // newImage adalah state imagesSub yang di filter dengan menghapus image yang dihapus
        const newImages = imagesSub.filter(image => image.hashname !== index);
        setImagesSub(newImages);
        console.log("Updated imagesSub:", newImages);
        message.success('Image removed successfully');
      } else {
        message.error('Failed to remove image');
      }
    } catch (error) {
      console.error('Error removing image:', error);
      message.error('Failed to remove image');
    }
  };
  
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
// * buatkan useEffect untuk mengkosongkan state Images ketika openForm diubah menjadi false
  useEffect(() => {
    if (!openForm) {
      setImages([]);
      setImagesSub([]);
    }
  }, [openForm]);
  
  const fetchCargoOptions = async () => {
    const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
    try {
      const response = await api.get('/api/customer/cargo', {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            "ngrok-skip-browser-warning": "69420"
        }
    });
      setCargoOptions(response.data.data);
      console.log("weww",cargoOptions)
    } catch (error) {
      console.error('Error fetching cargo options:', error);
    }
  };

  const handleCargoChange = (value) => {
    setSelectedCargo(value);
    console.log("cargo",selectedCargo)
    if (value === 9) {
      // Menampilkan alert saat option.id adalah 9
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  };



  const modalSession = () => {
    Modal.info({
      title: 'Session Expired',
      content: <div>
        Your session has expired. Please log in again.
      </div>,
      onOk: () => {
        dispatch(logout());   
      }
    });
  };


  const handleSearch = async (value) => {
    try {
      setLoadings(true);
      // form.resetFields(); 
      const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      
      const response = await api.get(`/api/customer/search?mac_address=${value}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const totalProducts = response.data.total;
      console.log(response.data)

      if (totalProducts !== 1) {
          setProducts(response.data);
          setOpen(true);
      } else {
          const detailData = {
              ...response.data.items[0],
              address: response.data.address,
              email: response.data.email,
              mac_address: response.data.mac_address,
              name: response.data.name,
              phone: response.data.phone,
              total: response.data.total,
          };

          setDetailData(detailData);
          console.log(detailData)
          form.setFieldsValue(detailData);
          const warrantyDate = detailData?.warranty;
          const daysLeft = calculateRemainingDays(warrantyDate);
          setRemainingDays(daysLeft);
          // setSelectedProduct(null);
          setOpenForm(true);
          setErrorAlert(null);
      }



    } catch (error) {
      console.log(error);
      setDetailData(null);
      form.resetFields();
      let errorMessage;
      if (error.response && error.response.status === 401) {
        modalSession();
      } else if (error.response && error.response.status === 400) {
          errorMessage = (
            <span>
                Your product warranty is false. Please contact an administrator or 
                <Button
                  type="link"
                  onClick={() => window.open('https://wa.me/628155048711/?text=Terimakasih%20telah%20menghubungin%20admin.%20Untuk%20mempermudah%20proses%20penanganan%20keluhan%20atau permintaan.%20Mohon%20lengkapi%20data%20berikut:%0A1.%20Company:%20%0A2.%20Nama:%20%0A3.%20Perangkat:%20%0A4.%20Serial%20Number:%20%0A5.%20Keluhan:%20', '_blank')}
                  style={{ marginLeft: 4, paddingLeft: 0 }}
                >
                  Chat Here
                </Button>
            </span>
        );
      } else if (error.response && error.response.status === 404){
        errorMessage = (
          <span>
              MAC Address or Serial Number not found. Please contact an administrator or 
              <Button
                type="link"
                onClick={() => window.open('https://wa.me/628155048711/?text=Terimakasih%20telah%20menghubungin%20admin.%20Untuk%20mempermudah%20proses%20penanganan%20keluhan%20atau permintaan.%20Mohon%20lengkapi%20data%20berikut:%0A1.%20Company:%20%0A2.%20Nama:%20%0A3.%20Perangkat:%20%0A4.%20Serial%20Number:%20%0A5.%20Keluhan:%20', '_blank')}
                style={{ marginLeft: 4, paddingLeft: 0 }}
              >
                Chat Here
              </Button>
          </span>
      );
      } else {
        console.log(error.response)
      }
      setErrorAlert(errorMessage);
    }finally {
      setLoadings(false);
    }
  }

  const handleProductSelect = (value) => {
    const selected = products.items[value];
    const detailData = {
        ...selected,
        address: products.address,
        email: products.email,
        mac_address: products.mac_address,
        name: products.name,
        phone: products.phone,
        total: products.total,
    };

    setDetailData(detailData);
    form.setFieldsValue(detailData);
    const warrantyDate = detailData?.warranty;
    const daysLeft = calculateRemainingDays(warrantyDate);
    setRemainingDays(daysLeft);
    setOpenForm(true);
    setOpen(false);
    // setSelectedProduct(selected);
};

  const handleCloseModal = () => {
    setOpen(false);
    setProducts([]);
    setErrorAlert(null);
  };
  const handleCloseFormModal = () => {
    setOpenForm(false); 
    // setCargoOptions([]);
    setShowAlert(false);
    setOpen(false);
    setProducts([]);
    setErrorAlert(null);
    // setData([...data, newTicket]); 
    setNote(''); 
    setProblem('');
    form.resetFields();
  };
  const handleCancelFormModal = () => {
    setOpenForm(false);
    // setCargoOptions([]);
    setShowAlert(false);
    setOpen(true); 
    setProducts([]);
    setErrorAlert(null);
    // setData([...data, newTicket]); 
    setNote(''); 
    setProblem('');
    form.resetFields();
  };

  useEffect(() => {
    setIsSubmitDisabled(
      !problem || 
      images.some(image => image.status === 'error') || 
      isImageUploading
    );
  }, [problem, images, isImageUploading]);

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
          company_id: form.getFieldValue('company_id'),
          partner_id: form.getFieldValue('partner_id'),
          product_name:  form.getFieldValue('product_name'),
          lot_id:  form.getFieldValue('lot_id'),
          mac_address: form.getFieldValue('mac_address'),
          warranty:  form.getFieldValue('warranty'),
          name: form.getFieldValue('name'),
          customer_2: form.getFieldValue('customer_2'),
          product_id: form.getFieldValue('product_id'),
          // ...detailData,
          address: form.getFieldValue('address'),
          phone: form.getFieldValue('phone'),
          problem: problem,
          note: combinedNote, 
          cargo_id: form.getFieldValue('cargo'), 
          tracking_number: form.getFieldValue('tracking_number'),
          customer_id: customerId,
          //mengirim data photos ke API dengan menghilangkan variable angka 
          photos: imagesSub
        };
        
        console.log(newTicket)
  
        // Kirim permintaan POST untuk menambahkan tiket
        const response = await api.post('/api/customer/ticket', newTicket, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        console.log("response",response)
        if (response.status === 200) {
          setData([...data, newTicket]); 
          setNote(''); 
          setProblem('');
          form.resetFields();
          setOpenForm(false);
          setOpen(false);
          // message.success('Ticket added successfully');

          Modal.success({
            title: 'Ticket Added',
            content: <div>
              The ticket has been successfully created, <br /> <strong> please send the product to the address listed on the ticket info and fill in the tracking number</strong>
            </div>,
            onOk: () => {
              apiTable();   
            }
          });
        } else {
          message.error('Failed to add ticket');
        }
      } else {
        throw new Error('Failed to fetch user data or user ID not found.');
      }
    } catch (error) {
      console.error('Error adding ticket:', error);
      if (error.response && error.response.status === 400) {
        message.error(error.response.data.error || 'Failed to add ticket');
        handleCloseFormModal();
      } else if (error.response && error.response.status === 404) {
        message.error(error.response.data.error || 'Failed to add ticket');
        handleCloseFormModal();
      } else {
        message.error('Failed to add ticket');
        handleCloseFormModal();
      }
    } finally {
      setLoadings(false);
    }
  };

  const handleCancel = async () => {
    setIsModalVisible(false); 
    setLoadings(true); 
    const bearerToken = Cookies.get("access_token"); 
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }// Tutup modal konfirmasi
      // Lakukan embatalan tiket jika dikonfirmasi
      try {
        await api.put(`/api/customer/change-status-ticket2/?odoo_rma_ticket_id=${cancelTicketId}&action=${2}`,{
          headers: {
              Authorization: `Bearer ${bearerToken}`,
              "ngrok-skip-browser-warning": "69420"
          }
      }); 
        message.success('Ticket cancelled successfully');
        await apiTable();
      } catch (error) {
        console.log(error);
        await apiTable();
        if (error.response && error.response.status === 400) {
          message.error('Failed to cancel ticket');
        } else if (error.response && error.response.status === 401) {
          modalSession();
        } else {
          message.error('Failed to cancel ticket');
        }
      }finally {
        setLoadings(false);
      }
    
  };
  const handleCancelClose = async () => {
    setIsModalVisible(false)
  }

  const handleInfoClick = (id) => {
    setInfoTicketId(id);
    console.log("info",id)
    setOpenDrawer(true);
    document.getElementById('customTooltip').style.display = 'none';
  };
  const handleOfferClick = (id) => {
    setInfoTicketId(id);
    console.log("info",id)
    setOpenDrawer(true);
    setIsOfferClicked(true);
  };
  const handleEditClick = (id) => {
    setEditTicketId(id);
    console.log("ini",id) 
    setOpenFormEdit(true); // Open the modal for editing
  };
  const handleCancelClick = (id) => {
    setCancelTicketId(id);
    console.log("ini",id) // Set the ID of the ticket being edited
    setIsModalVisible(true); // Open the modal for editing
  };

  const handleTool = (id) => {
    setInfoTicketId(id);
    setOpenDrawer(true);
    setIsRateButtonClicked(true);
    document.getElementById('customTooltip').style.display = 'none';
  };

  const apiTable = async (cancelled) => {
    setLoadings(true);
    try {
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }

      const response = await api.get('/api/customer/view-ticket-customerid', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          filterCancelled: cancelled ? undefined : 'true',
          page: current,
          values: filterValues,
        },
      });
      setDataTable(response.data.data);
      setTotal(response.data.pagination.total);
      setCurrent(response.data.pagination.current);
      setPageSize(response.data.pagination.pageSize);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadings(false);
    }
  };

  const handleChange = async (checked) => {
    setFilterCancelled(checked);
    // setCurrent(1); // Reset to first page when filter changes
    await apiTable(checked);
  };

  useEffect(() => {
    apiTable();
    fetchCargoOptions();
  }, [current, filterValues]);

  const onChange = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
    console.log(`Page: ${page}, PageSize: ${pageSize}`);
  };
  


  return (
    <>
      <Spin spinning={loadings} size="large">
        <StickyHeader title={'RMA Ticket'}>
          <div style={{ marginRight: "10px" }}>
            <Switch checked={filterCancelled} onChange={handleChange} checkedChildren="All Ticket" unCheckedChildren="Active Ticket"/>
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
                    // name="name"
                    rules={[{ required: true, 
                      message: 'Please enter your Mac Address!' 
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

                  {products.total > 1 && (
                    <Item
                        label="Select Product"
                        name="selectedProduct"
                        rules={[{ required: true, message: 'Please select your product!' }]}
                    >
                        <Select
                            placeholder="Select your product"
                            onChange={handleProductSelect}
                        >
                            {Object.keys(products.items).map((key) => (
                                <Option key={key} value={key}>
                                    {products.items[key].product_name}
                                </Option>
                            ))}
                        </Select>
                    </Item>
                )}
            </Form>
          </Spin>
        </div>
        </Modal>
      
        <Modal
          title="Create Ticket"
          centered
          open={openForm}
          onCancel={handleCloseFormModal}
          footer={[
            <Button key="cancel" onClick={handleCancelFormModal} style={{ marginRight: '10px' }} disabled={loadings || isImageUploading}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loadings || isImageUploading}
              disabled={isImageUploading || isSubmitDisabled}
              onClick={handleAddData} // Submit form when button is clicked
            >
              Submit
            </Button>,
          ]}
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
                    <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please enter your Phone' }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Address" name="address" extra={[<ExclamationCircleOutlined key="exclamation" />," This address is the product return address"]} rules={[{ required: true, message: 'Please enter your Address' }]}>
                      <TextArea />
                    </Form.Item>
                    <Form.Item label="Product" name="product_name">
                      <Input disabled style={{ color:'black' }}/>
                    </Form.Item>
                    <Form.Item label="MAC Address" name="mac_address">
                      <Input disabled style={{ color:'black' }}/>
                    </Form.Item>
                    <div style={{ display:'none' }} >
                      <Form.Item name="company_id">
                        <Input placeholder="company_id" />
                      </Form.Item>
                      <Form.Item name="partner_id">
                        <Input  placeholder="partner_id"/>
                      </Form.Item>
                      <Form.Item name="product_id">
                        <Input placeholder="product_id" />
                      </Form.Item>
                      <Form.Item name="lot_id">
                        <Input placeholder="lot_id" />
                      </Form.Item>
                      <Form.Item name="customer_2">
                        <Input placeholder="customer_2" />
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
                            : (`Your device warranty will expire in ${remainingDays} day(s).`)
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
                    <Form.Item label="Problem" name="problem" style={{ marginBottom:30 }} rules={[{ required: true, message: 'Please enter your problem' }]}>
                      <TextArea placeholder="Deskripsikan masalah perangkat anda"  rows={4} value={problem} onChange={(e) => setProblem(e.target.value)}  />
                    </Form.Item>
                    <div style={{ display:'none' }}>
                    <Form.Item label="Notes" name="note">
                        <TextArea placeholder="" rows={4} value={note} onChange={(e) => setNote(e.target.value) } />
                    </Form.Item>  
                    </div>
                    <Form.Item label="Cargo" name="cargo" extra="Select your shipping cargo">
                      <Select placeholder="Pilih Jasa Pengiriman" allowClear onChange={handleCargoChange}>
                        {cargoOptions.map(option => (
                          <Option key={option.id} value={option.id}>
                            {option.cargo_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <div style={{ maxWidth: '75%', marginLeft: 'auto', marginRight: '45px' }}>
                    {showAlert && (
                        <Alert
                          message={
                            <span>
                              You have selected &quot;Other&quot; as your shipping cargo. Please enter the cargo name in the <b>Resi</b> field. <br/> &quot;Tracking Number (Cargo Name)&quot;
                            </span>
                          }
                          type="warning"
                          showIcon
                          style={{ marginBottom: '25px' }}
                        />
                      )}  
                    </div>
                    <Form.Item label="Resi" name="tracking_number" extra="Enter your shipping receipt">
                      <Input  placeholder="Masukan Nomer Resi"/>
                    </Form.Item>
  
                    <Form.Item label="Upload Image" name="photos" extra="Upload your device image. Images must be JPG or PNG format and smaller than 2MB.">
                    <Upload
                      customRequest={customRequest}
                      beforeUpload={beforeUpload}
                      onRemove={handleRemoveImage}
                      onChange={handleImageChange}
                      listType="picture-card"
                      // maxCount={3}
                    >
                      {images.length >= 3 ? null : uploadButton}
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
            columns={ticketsColumn({ searchProps, handleInfoClick, handleOfferClick, handleEditClick, handleCancelClick, handleTool})}
            dataSource={dataTable}
            // TODO: Fix bug undefined
            scroll={{ x: 1000 }}
            pagination={false}
          />
         <div style={{ display:"flex", justifyContent: "end", marginTop: 15}}>
          <Pagination
              showSizeChanger={false}
              current={current}
              onChange={onChange}
              total={total}
              pageSize={pageSize}
          />
         </div>
         <FloatButton
            icon={
              <span style={{ color: 'white' }}>
                <WhatsAppOutlined />
              </span>
            }
            type="prima"
            onClick={() => window.open('https://wa.me/628155048711/?text=Terimakasih%20telah%20menghubungin%20admin.%20Untuk%20mempermudah%20proses%20penanganan%20keluhan%20atau permintaan.%20Mohon%20lengkapi%20data%20berikut:%0A1.%20Company:%20%0A2.%20Nama:%20%0A3.%20Perangkat:%20%0A4.%20Serial%20Number:%20%0A5.%20Keluhan:%20', '_blank')}
            style={{
              width: 56, 
              height: 56,
              right: 24,
              backgroundColor: '#25D366',
            }}
          />
          <Spin spinning={loadings}>
          <CancelTicket openModal={isModalVisible}  handleCancel={handleCancel} handleClose={handleCancelClose} />
          </Spin>
        </div>
        <ModalEdit openFormEdit={openFormEdit} setOpenFormEdit={setOpenFormEdit}  editTicketId={editTicketId} cargoOptions={cargoOptions} apiTable={apiTable} modalSession={modalSession}/>
        <UserDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} infoTicketId={infoTicketId} apiTable={apiTable} modalSession={modalSession} activeTabKey={activeTabKey} setActiveTabKey={setActiveTabKey} isRateButtonClicked={isRateButtonClicked} setIsRateButtonClicked={setIsRateButtonClicked} isOfferClicked={isOfferClicked} setIsOfferClicked={setIsOfferClicked}/>
      </Spin>
    </>
  );
};


export default Dashboard;