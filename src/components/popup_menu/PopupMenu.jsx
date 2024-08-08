import React, { useState } from 'react';
import {  MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import PopupConfirm from '../popup_confirm/PopupConfirm'
import useCustomContext from '../../context/useCustomContext';

// const PopupMenu = ({ items, task }) => {
const PopupMenu = ({ items, click }) => {

  // const { setCurrentTask } = useCustomContext()

  const [open, setOpen] = useState(false);

  const handleMenuClick = (e) => {}

  // const handleMenuClick = (e) => {
  //   if (e.key === '3') {
  //     setOpen(false);
  //   }
  // };

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Button
          type = "text"
          icon = {<MenuOutlined />}
          onClick = { click }
          // onClick = { () => setCurrentTask(task) }
        />
      </a>
    </Dropdown>
  );

};
export default PopupMenu;