import { Row, Col, Card, Typography, Button, Upload, Modal, message, Checkbox, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import api from '../../../api';
import Cookies from "js-cookie";


const { Text } = Typography;

const ModalDoc = ({ isModalVisible, handleOk, handleCancel, pdfUrl, odooRmaTicket }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagesSub, setImagesSub] = useState([]);
  // const [isApproved, setIsApproved] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const uploadImages = async (Images) => {
    try {
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      const formData = new FormData();
      Images.forEach((image) => {
        formData.append('photos', image);
      });
      const response = await api.post('/api/customer/upload-images-evidence-invoice', formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading images:', error);
      return [];
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    const isLt2M = file.size / 1024 / 1024 < 2;

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
      if (images.length >= 3) {
        message.error('You can only upload up to 3 images');
        onError(new Error('You can only upload up to 3 images'));
        return;
      }

      if (!beforeUpload(file)) {
        handleImageChange({ fileList: [{ ...file, status: 'error' }] });
        onError(new Error('Invalid file'));
        return;
      }

      const response = await uploadImages([file]);
      if (response) {
        setImagesSub((prevImages) => [...prevImages, { ...response, uid: file.uid }]);
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
    }
  };

  const handleImageChange = ({ fileList }) => {
    setImages(fileList.map((file) => file.response || file));
  };

  const handleRemoveImage = async (file) => {
    if (file.status === 'error') {
      const newImages = imagesSub.filter((image) => image.uid !== file.uid);
      setImagesSub(newImages);
      message.success('Invalid image removed successfully');
      return;
    }

    const bearerToken = Cookies.get("access_token"); 
    if (!bearerToken) {
      throw new Error('Bearer token not found.');
    }

    try {
      const index = imagesSub.find((image) => image.uid === file.uid).hashname;
      console.log("cdcs",index)
      const response = await api.delete(`/api/customer/remove-image?hashname=${index}`, {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            "ngrok-skip-browser-warning": "69420"
        }
    });
      if (response.status === 200) {
        const newImages = imagesSub.filter((image) => image.hashname !== index);
        setImagesSub(newImages);
        message.success('Image removed successfully');
      } else {
        message.error('Failed to remove image');
      }
    } catch (error) {
      console.error('Error removing image:', error);
      message.error('Failed to remove image');
    }
  };

  // console.log(pdfUrl)
  const handleApprove = async () => {
    try {
      setLoading(true)
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      const Image = {
        photos: imagesSub
      }
      console.log(Image)
      const response = await api.post(`/api/customer/approval-penawaran?status_approval=approved&odoo_rma_ticket_id=${odooRmaTicket}`, Image, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "ngrok-skip-browser-warning": "69420"
        },
      });
      console.log(response)
      if (response.status === 200) {
        message.success('Approval successful');
        handleOk();
      } else {
        message.error('Approval failed');
      }
    } catch (error) {
      console.error('Error approving:', error);
      message.error('Approval failed');
    } finally {
      setLoading(false)
    }
  };
  const handleReject = async () => {
    try {
      setLoading(true)
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      const response = await api.post(`/api/customer/approval-penawaran?status_approval=rejected&odoo_rma_ticket_id=${odooRmaTicket}`, null, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "ngrok-skip-browser-warning": "69420"
        },
      });
      if (response.status === 200) {
        message.success('Reject successful');
        handleOk();
      } else {
        message.error('Reject failed');
      }
    } catch (error) {
      console.error('Error approving:', error);
      message.error('Reject failed');
    } finally {
      setLoading(false)
    }
  };

  const handleCheckboxChange = (e) => {
    setCheckboxChecked(e.target.checked);
  };

  useEffect(() => {
    if (!isModalVisible) {
      setImages([]);
      setImagesSub([]);
      setCheckboxChecked(false);
    }
  }, [isModalVisible]);

  return (
    <div style={{ padding: '20px' }}>
      <Spin spinning={loading} size="large">
      <Modal
        title="Surat Penawaran"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1500}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
          <Card>
            {pdfUrl && (
                <div style={{ overflow: 'hidden', paddingTop: '56.25%', position: 'relative' }}>
                  <iframe
                    src={pdfUrl}
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  ></iframe>
                </div>
            )}
          </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="PAYMENT OFFER">
              <Text>
                We would like to inform you that your device has passed the testing stage. If you wish to proceed with the repair, please follow these steps:
              </Text>
              <ol>
                <li>Review the costs listed in the offer letter.</li>
                <li>Make a payment to the account number provided.</li>
                <li>Upload the payment proof on this page.</li>
                <li>Click the Approve button.</li>
              </ol>
              <Text>This offer will then be approved.</Text>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Text>Upload Payment Proof: </Text>
                <Upload
                  customRequest={customRequest}
                  beforeUpload={beforeUpload}
                  onRemove={handleRemoveImage}
                  onChange={handleImageChange}
                  listType="picture"
                >
                  {images.length >= 1 ? null : (
                    <Button>
                      <UploadOutlined /> Upload
                    </Button>
                  )}
                </Upload>
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'start' }}>
                  <Button
                    type="primary"
                    style={{ marginRight: '10px' }}
                    onClick={handleApprove}
                    disabled={imagesSub.length === 0}
                    loading={loading}
                  >
                    Approve
                  </Button>
                </div>
                  <Checkbox
                    checked={checkboxChecked}
                    onChange={handleCheckboxChange}
                    style={{ marginTop: '20px' }}
                  >
                    If you do not agree with the offer provided, you can click and reject it in the button below.
                  </Checkbox>
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'start' }}>
                  <Button
                    type="default" 
                    style={{ marginRight: '10px' }}
                    disabled={!checkboxChecked} 
                    onClick={handleReject}
                    loading={loading}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Modal>
      </Spin>
    </div>
  );
};

export default ModalDoc;
