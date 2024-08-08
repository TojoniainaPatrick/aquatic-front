import { useState } from "react"
import aqslogo from '../../assets/images/aqslogo.jpeg'
import { message } from 'antd'
import { Flex, Input, Typography } from 'antd';
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

export default function OtpChecking(){

    const [ messageApi, contextHolder ] = message.useMessage();
    const navigate = useNavigate()

    const success = ( message ) => {
        messageApi.open({
        type: 'success',
        content: message,
        });
    };

    const error = ( message ) => {
        messageApi.open({
        type: 'error',
        content: message,
        });
    };

    const warning = ( message ) => {
        messageApi.open({
        type: 'warning',
        content: message,
        });
    };

    const register_user = JSON.parse(localStorage.getItem('user')) || {}

    const handleCheck = async value => {
        if(localStorage.getItem('action') == 'registration'){
            if( value == register_user.user_otp ){
                await axios.post('/user/create', register_user)
                .then( response => {
                    success('Votre compte a été créé avec succès! Vous devez attendre l\'approbation avant de pouvoir vous connecter')
                    navigate('/')
                })
                .catch ( errorData => {
                    if( errorData.response.data.message ) error( errorData.response.data.message )
                    else error( errorData.message )
                })
            }
            else( error('Code incorrect!') )
        }
        else navigate('/newpassword')
    }

    return(
        <>
            { contextHolder }

            <div className="authentication-page">
                <div className="authentication-container">

                    <div className="logo-container">
                        <img src = { aqslogo } alt = 'Aquatic service logo' width = { 150 } height = { 80 }/>
                    </div>

                    <Flex gap="middle" align="flex-start" vertical>

                        <p>Un code à six chiffres a été envoyé à l'adresse mail { register_user?.user_email } </p>

                        <Title level={5}>Vérification du code à 6 chiffres</Title>
                        <Input.OTP
                            length = { 6 }
                            onChange = { value => handleCheck(value)} />
                    </Flex>

                </div>
            </div>
        </>
    )
}