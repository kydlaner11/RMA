import { Menu } from 'antd';
import React, { useState } from 'react';

const items = [
  {
    label: 'Dashboard',
    key: 'mail',

  },
  {
    label: 'History',
    key: 'history',

  },
]

const MenuBar = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div 
      style={{ 
        width: 600,
       }}
    >
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ display:'flex', justifyContent:'center' }}/> 
    </div>
  );
};

export default MenuBar;
