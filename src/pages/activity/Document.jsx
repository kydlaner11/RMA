import React from 'react';
//  {  useState, useEffect } 
import { Card, Button, Typography,} from 'antd';
// import Api from '../../api';
// import Cookies from "js-cookie";  



// const { TextArea } = Input;
const { Title } = Typography;

const Document = () => {

//   const getDoc = async () => {
//     try {
//         const bearerToken = Cookies.get("access_token"); 
//         if (!bearerToken) {
//             throw new Error('Bearer token not found.');
//         }
//         await apiTable();
//         const response = await Api.get(`api/customer/get-documents/?odoo_rma_ticket_id=${infoTicketId}`, {
//             headers: {
//                 Authorization: `Bearer ${bearerToken}`,
//                 "ngrok-skip-browser-warning": "69420"
//             }
//         });
//         console.log('Result:', response.data)
//         if (response.status === 200) {
//             setDataResult(response.data);
//         } else {
//             message.error(response.data.message || 'Failed to fetch ticket data');
//         }
//     } catch (error) {
//         console.error('Error fetching ticket data:', error);
//         if (error.response && error.response.status === 400) {
//             message.error('Failed to get info ticket');
//           } else if (error.response && error.response.status === 401) {
//             message.error('Failed to get info ticket');
//           } else {
//             message.error('Failed to get info ticket');
//           }
//     } 
// }

// useEffect(() => {
//   if (infoTicketId) {
//       getDoc();
//   }
// }, [infoTicketId]);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: 570}}>
        <Title level={3} style={{ marginTop: 10, marginBottom: 30 }} >Here’s All Your Document</Title>
        <Button style={{ width: "100%", height: "60px", marginBottom: 15 }}>
          duar
        </Button>
        <Button style={{ width: "100%", height: "60px", marginBottom: 15 }}>
          duar
        </Button>
        <Button style={{ width: "100%", height: "60px", marginBottom: 15 }}>
          duar
        </Button>
      </Card>
    </div>
  );

}

export default Document;