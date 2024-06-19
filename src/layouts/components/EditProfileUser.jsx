import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import Cookies from "js-cookie";
import Api from "../../api"; // Adjust the import path accordingly

const EditProfile = ({ isModalVisible, handleModalClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      fetchProfileData();
    }
  }, [isModalVisible]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      const response = await Api.post(`/api/customer/me/?token=${bearerToken}`);
      if (response.status === 200) {
        form.setFieldsValue(response.data); // Set initial form values with the profile data
      } else {
        message.error(response.data.message || 'Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      message.error('Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (formData) => {
    try {
      setLoading(true);
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }

      const response = await Api.post(`/api/customer/edit-profil`, formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      if (response.status === 200) {
        message.success('Profile updated successfully');
        handleModalClose();
      } else {
        message.error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Profile"
      open={isModalVisible}
      onCancel={handleModalClose}
      footer={null}
    >
      <div style={{ padding: 4 }}>
        <Form form={form} name="editProfileForm" onFinish={onFinish} layout='vertical'>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your address!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditProfile;
