import React from 'react';
import { Button, Input, Space } from 'antd';

export default function PasswordInput({ password, setPassword, placeholder }){

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <Space direction="vertical" style = {{ marginTop: '15px' }}>

      <Space direction="horizontal">

        <Input.Password
            onChange = { event => setPassword(event.target.value) }
            placeholder = { placeholder }
            value = { password || '' }
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            size = 'large'
        />

        <Button
            size = 'large'
            style={{
                width: 60,
                fontSize: '.8rem'
            }}
            onClick={() => setPasswordVisible((prevState) => !prevState)}
        >

        { passwordVisible ? 'Cacher' : 'Afficher' }

        </Button>

      </Space>

    </Space>
  );
};
