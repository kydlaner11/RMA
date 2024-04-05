import { Modal, Button } from 'antd';


const CancelTicket = ({ openModal, handleCancel }) => {
 

  return (
    <Modal
      title="Cancel Ticket"
      open={openModal}
      onCancel={() => handleCancel(false)} // Tutup modal saat tombol Cancel ditekan
      footer={[
        <Button key="cancel" onClick={() => handleCancel(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" danger onClick={() => handleCancel(true)}>
          Confirm
        </Button>,
      ]}
    >
      <p>Are you sure you want to cancel this ticket?</p>
    </Modal>
  );
};
export default CancelTicket;
