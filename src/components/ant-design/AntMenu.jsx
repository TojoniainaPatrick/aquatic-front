import React from 'react';
import { EditFilled, MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';

const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
    icon: <EditFilled />
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
    icon: <EditFilled />
  },
  {
    label: '3rd menu item',
    key: '3',
    icon: <EditFilled />
  },
];

const AntMenu = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a onClick={(e) => e.preventDefault()}>
        <Button
          type="text"
          icon={<MenuOutlined />}
        />
    </a>
  </Dropdown>
);
export default AntMenu;