import React from 'react';
import { Button, message, Popconfirm } from 'antd';

// const confirm = (e) => {
//   console.log(e);
//   message.success('Click on Yes');
// };

// const cancel = (e) => {
//   console.log(e);
//   message.error('Click on No');
// };

const PopupConfirm = ({ title, description, confirm, cancel, buttonTitle}) => (

  <Popconfirm
    title = { title }
    description = { description }
    onConfirm = { confirm }
    onCancel = { cancel }
    okText = "Oui"
    cancelText = "Non"
  >
    <Button danger> { buttonTitle } </Button>
  </Popconfirm>

);

export default PopupConfirm;