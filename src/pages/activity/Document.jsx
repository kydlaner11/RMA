import React, { useEffect, useState } from 'react';
import { Card, Button, Typography } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import ModalDoc from './components/modalDoc';
import Api from '../../api';
import Cookies from "js-cookie";


const { Title } = Typography;

const Document = ({ odooRmaTicket }) => {
  const [documents, setDocuments] = useState({
    invoice: null,
    pemberitahuan: null,
    penawaran: null,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const getDoc = async () => {
    try {
      const bearerToken = Cookies.get("access_token");
      if (!bearerToken) {
        throw new Error('Bearer token not found.');
      }
      const response = await Api.get(`api/customer/get-documents/?odoo_rma_ticket_id=${odooRmaTicket}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "ngrok-skip-browser-warning": "69420"
        },
      });
      console.log(response.data);
      setDocuments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoc();
  }, []);

  const showModal = (url) => {
    setPdfUrl(url);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setPdfUrl('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPdfUrl('');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: 570 }}>
        <Title level={3} style={{ marginTop: 10, marginBottom: 30 }}>Here’s All Your Document</Title>
        {documents.penawaran && (
          <Button
            style={{
              width: "100%",
              height: "60px",
              marginBottom: 15,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            icon={<FileTextOutlined style={{ fontSize: 24, marginRight: 10 }} />}
            onClick={() => window.open(documents.penawaran, '_blank')}
          >
            Surat Penawaran
          </Button>
        )}
        {documents.pemberitahuan && (
          <Button
            style={{
              width: "100%",
              height: "60px",
              marginBottom: 15,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            icon={<FileTextOutlined style={{ fontSize: 24, marginRight: 10 }} />}
            onClick={() => showModal(documents.pemberitahuan)}
          >
            Surat Pemberitahuan
          </Button>
        )}
        {documents.invoice && (
          <Button
            style={{
              width: "100%",
              height: "60px",
              marginBottom: 15,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            icon={<FileTextOutlined style={{ fontSize: 24, marginRight: 10 }} />}
            onClick={() => window.open(documents.invoice, '_blank')}
          >
            Invoice
          </Button>
        )}
      </Card>
      <ModalDoc isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} pdfUrl={pdfUrl} />
      
    </div>
  );
}

export default Document;
