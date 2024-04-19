import { Modal, Button } from 'antd';


const CancelTicket = ({ openModal, handleCancel, handleClose }) => {
 

  return (
    <Modal
      title="Cancel Ticket"
      open={openModal}
      onCancel={() => handleClose(true)} // Tutup modal saat tombol Cancel ditekan
      footer={[
        <Button key="cancel" onClick={() => handleClose(true)}>
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
