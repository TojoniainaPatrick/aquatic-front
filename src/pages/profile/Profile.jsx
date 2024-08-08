import { useState } from "react";
import axios from "../../api/axios";
import useCustomContext from "../../context/useCustomContext";
import { Button, Checkbox, Flex, Form, Input, message, Popconfirm, Radio, Select, Space, Switch } from "antd";
import { EditOutlined, LockFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Profile(){

  const [image, setImage] = useState('')

  const user = JSON.parse(localStorage.getItem('user')) || {}

  const {
    loggedUser,
    setLoggedUser
  } = useCustomContext()

  const imageHandler = (e) => {

    const reader = new FileReader();

    reader.onload = () => {
        setImage(reader.result)
    }

    reader.readAsDataURL(e.target.files[0]);

    uploadImage(e.target.files[0]);
  }

  const uploadImage = (image) => {
    let formData = new FormData();

    formData.append("image", image);

    fetch(`http://localhost:3001/upload/${user.user_id}`, {
        method: "post",
        body: formData,
    })
    .then( response => response.json())
    .then(resBody => {
        setLoggedUser({ ...loggedUser, user_image_url: resBody.user_image_url})
        localStorage.setItem('user', JSON.stringify({ ...user, user_image_url: resBody.user_image_url}))
    });

  }
  
  const [ enableEdit, setEnableEdit ] = useState(false);
  const [ update, setUpdate ] = useState(JSON.parse(localStorage.getItem('user')))
  const navigate = useNavigate()

  const handleUpdate = async _=> {
    await axios.put(`/user/update/${update.user_id}`, update)
    .then( response => {
        setLoggedUser(response.data.data)
        localStorage.setItem('user', JSON.stringify(response.data.data))
        message.success(response.data.message)
        setEnableEdit(false)
    })
    .catch( error => {
      if(error.response.data.message) message.error(error.response.data.message)
      else message.error(error.message)
    })
  }

    return(
      <Flex style={{ background: 'white'}} vertical = { true } align = "center" justify = "space-between">

        <Flex flex={1}>
          <div className="photo-container">
            <div className="photo">
                <img src={ loggedUser.user_image_url || user.user_image_url } alt="" />
            </div>
            <input type="file" placeholder='Photo' className="custom-file-input" onChange={imageHandler}/>
          </div>
        </Flex>

        <Flex vertical = {true}>
          <Space style={{ margin: '15px auto', width: '100%', justifyContent: 'center'}}>
            <Switch checked = { enableEdit } onChange = { value => setEnableEdit(value)}/>
            <span>Mettre à jour</span> <i> <EditOutlined /> </i>
          </Space>
          <Form
            layout = "vertical"
            disabled = { ! enableEdit }
            style={{
              minWidth: 250,
            }}
          >
            <Form.Item>
              <Button danger block onClick = { _=> navigate('/aqs/profile/changePass') }> <i><LockFilled /></i> Changer mot de passe </Button>
            </Form.Item>
            <Form.Item label="Nom d'utilisateur">
              <Input value={ update.user_name } onChange = { e => setUpdate({...update, user_name: e.target.value})}/>
            </Form.Item>
            <Form.Item label="Adresse mail">
              <Input value={ update.user_email }  onChange = { e => setUpdate({...update, user_email: e.target.value})}/>
            </Form.Item>
          </Form>

          {
            enableEdit && 
            <Space style={{justifyContent: 'end'}}>
              <Popconfirm
                title="Suppression"
                description = "Voulez-vous continuer?"
                onConfirm = { handleUpdate }
                okText="Oui"
                cancelText="Non"
              >
                                
                <Button> <i><EditOutlined /></i> Modifier </Button>
              </Popconfirm>
            </Space>
          }
        </Flex>
      </Flex>
    )
}