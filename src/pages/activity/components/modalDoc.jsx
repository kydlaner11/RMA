import { Row, Col, Card, Typography, Button, Upload, Modal  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const { Text } = Typography;
const ModalDoc = ({ isModalVisible, handleOk, handleCancel, pdfUrl, handleUpload, showModal }) => {
 

  return (
    <div style={{ padding: '20px' }}>
    <Modal
      title="PDF Viewer"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1500}
      footer={null}
    >
      <Row gutter={[16, 16]}>
      <Col  xs={24} md={16}>
        <Card>
          <div style={{ textAlign: 'left' }}>
            <a onClick={showModal} style={{ fontSize: 16 }}>
              View PDF: <Text type="link">Click Here</Text>
            </a>
          </div>
          {pdfUrl && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <div style={{ height: '500px' }}>
                {/* <Viewer fileUrl={pdfUrl} /> */}
                <iframe src="https://jaguar-ready-naturally.ngrok-free.app/api/show-documents?path=public%2Fpemberitahuan%2Fpemberitahuan_290.pdf" width="900" height="500"></iframe>
              </div>
            </Worker>
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
              listType="picture"
              maxCount={1}
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'start' }}>
              <Button type="primary" style={{ marginRight: '10px' }}>
                Approve
              </Button>
              <Button type="default">
                Reject
              </Button>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    </Modal>
  </div>
  )
};
export default ModalDoc;
