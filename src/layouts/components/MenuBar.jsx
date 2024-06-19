import { Menu, Grid} from 'antd';
import React, { } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";


const { useBreakpoint } = Grid;

// const items = [
//   {
//     label: 'Dashboard',
//     key: 'mail',

//   },
//   {
//     label: 'History',
//     key: 'history',

//   },
// ]

const MenuBar = () => {
  const screens = useBreakpoint();
  const location = useLocation();
  const divWidth = screens.xs ? 100 : 400;
  const { app } = useSelector((state) => state);


  // const [current, setCurrent] = useState('mail');
  // const onClick = (e) => {
  //   console.log('click ', e);
  //   setCurrent(e.key);
  // };


  return (
    <div style={{ width:divWidth }}>
      <Menu
        mode="horizontal"
        breakpoint="md" // Mengatur breakpoint di mana menu beralih ke mode vertikal
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        selectedKeys={location.pathname.split("/")[1]}
        items={!app.loading && app.page.list}
      />
    </div>
  );
};

export default MenuBar;
