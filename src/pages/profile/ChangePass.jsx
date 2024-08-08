import { Button, Divider, Flex, message, Popconfirm } from "antd";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { LockFilled } from "@ant-design/icons";
import { useState } from "react";
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import useCustomContext from "../../context/useCustomContext";

export default function ChangePass(){

    const {
        load,
        unload
    } = useCustomContext()

    const [ user_old_password, setUserOldPassord ] = useState('')
    const [ user_new_password, setUserNewPassword ] = useState('')
    const [ confirmPass, setConfirmPass ] = useState('')

    const user = JSON.parse( localStorage.getItem('user')) || {}

    const navigate = useNavigate()

    const handleChange = async _ => {
        if( !user_old_password || !user_new_password || !confirmPass ){
            message.warning('Merci de bien vouloir compléter tous les champs!')
        }
        else if( user_new_password != confirmPass ){
            message.warning('Confirmation de mot de passe incorrecte!Veuillez bien verifier')
        }
        else{

            load()

            await axios.put('/user/changepass', { user_email: user.user_email, user_old_password, user_new_password })
            .then( response => {
                message.success(response.data.message)
                navigate('/aqs/profile')
            })
            .catch( error =>{
                if(error.response.data.message) message.error((error.response.data.message))
                else message.error((error.message))
            })
            .finally( _=> unload())
        }
    }

    return(
        <Flex vertical = { true } style={{ width: 'max-content', margin: 'auto'}}>

            <Divider>Mot de passe</Divider>

            <PasswordInput
                placeholder = 'Mot de passe actuel'
                password = { user_old_password }
                setPassword = { setUserOldPassord }
            />

            <PasswordInput
                placeholder = 'Nouveau mot de passe'
                password = { user_new_password }
                setPassword = { setUserNewPassword }
            />

            <PasswordInput
                placeholder = 'Confirmation de mot de passe'
                password = { confirmPass }
                setPassword = { setConfirmPass }
            />

            <Popconfirm
                title="Sécurité"
                description="Voulez-vous continuer?"
                onConfirm={ handleChange }
                okText="Oui"
                cancelText="Non"
            >
                <Button danger type="default" style={{marginTop: 10}}>  <i><LockFilled /></i> Changer </Button>
            </Popconfirm>

        </Flex>
    )
}