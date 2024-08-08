import { Flex, message } from "antd";
import CustomTable from "../../components/datadisplay/CustomTable";
import useCustomContext from "../../context/useCustomContext";
import { useEffect, useState } from "react";
import PopupConfirm from "../../components/popup_confirm/PopupConfirm";
import PopupMenu from "../../components/popup_menu/PopupMenu";
import { CheckCircleFilled, CloseCircleOutlined, DeleteOutlined, DropboxSquareFilled, SafetyCertificateOutlined } from "@ant-design/icons";
import axios from "../../api/axios";

export default function User(){

    const {
        users,
        getUsers,
        setCurrentUser,
        currentUser
    } = useCustomContext()

    const [ pagination, setPagination ] = useState(10)

    useEffect( () => {
        getUsers()
    }, [])

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'user_name',
            width: 150
        },
        {
            title: 'Mail',
            dataIndex: 'user_email',
            width: 160
        },
        {
            title: 'Rôle',
            dataIndex: 'user_role',
            width: 150
        },
        {
            title: 'Date d\'ajout',
            dataIndex: 'user_created_at',
            width: 150
        },
        {
            title: 'Status',
            dataIndex: 'user_status',
            width: 150
        },
        {
            title: '',
            dataIndex: 'user_actions',
            width: 30
        }
    ]

    const handleDelete = async () => {
        await axios.delete(`/user/delete/${currentUser.user_id}`)
        .then( async _=> {
            await getUsers()
            message.success('Opération effectuée avec succès')
        })
        .catch( errordata => {
            if(errordata.response.data.message) message.error(errordata.response.data.message)
            else message.error(errordata.message)
        })
    }

    const handleApprove = async () => {
        await axios.put(`/user/update/${currentUser.user_id}`, { user_account_status: 'enabled' })
        .then( async _=> {
            await getUsers()
            message.success('Opération effectuée avec succès')
        })
        .catch( errordata => {
            if(errordata.response.data.message) message.error(errordata.response.data.message)
            else message.error(errordata.message)
        })
    }

    const handleReject = async () => {
        await axios.put(`/user/update/${currentUser.user_id}`, { user_account_status: 'rejected' })
        .then( async _=> {
            await getUsers()
            message.success('Opération effectuée avec succès')
        })
        .catch( errordata => {
            if(errordata.response.data.message) message.error(errordata.response.data.message)
            else message.error(errordata.message)
        })
    }

    const handleEnable = async () => {
        await axios.put(`/user/update/${currentUser.user_id}`, { user_account_status: 'enabled' })
        .then( async _=> {
            await getUsers()
            message.success('Opération effectuée avec succès')
        })
        .catch( errordata => {
            if(errordata.response.data.message) message.error(errordata.response.data.message)
            else message.error(errordata.message)
        })
    }

    const handleDesable = async () => {
        await axios.put(`/user/update/${currentUser.user_id}`, { user_account_status: 'desabled' })
        .then( async _=> {
            await getUsers()
            message.success('Opération effectuée avec succès')
        })
        .catch( errordata => {
            if(errordata.response.data.message) message.error(errordata.response.data.message)
            else message.error(errordata.message)
        })
    }

    // list of actions on user
    const popup_menu_items = user_status => {
        const menu = [
            {
                label: <PopupConfirm
                    title = "Suppression d'utilisateur"
                    description = 'Voulez-vous continuer la suppression?'
                    confirm = { handleDelete }
                    cancel = { () => {} }
                    buttonTitle = 'Supprimer'
                />,
                icon: <DeleteOutlined  color = 'lightgray'/>,
                key: '1'
            },
            (user_status == 'waiting' || user_status == 'rejected') && {
                label: <PopupConfirm
                    title = 'Approbation'
                    description = 'Voulez-vous continuer?'
                    confirm = { handleApprove }
                    cancel = { () => {} }
                    buttonTitle = 'Approuver'
                />,
                icon: <CheckCircleFilled  color = 'lightgray'/>,
                key: '2'
            },
            user_status == 'waiting' && {
                label: <PopupConfirm
                    title = 'Approbation'
                    description = 'Voulez-vous continuer?'
                    confirm = { handleReject }
                    cancel = { () => {} }
                    buttonTitle = 'Rejeter'
                />,
                icon: <DropboxSquareFilled  color = 'lightgray'/>,
                key: '3'
            },
            user_status == 'enabled' && {
                label: <PopupConfirm
                    title = 'Désactivation'
                    description = 'Voulez-vous continuer?'
                    confirm = { handleDesable }
                    cancel = { () => {} }
                    buttonTitle = 'Désactiver'
                />,
                icon: <CloseCircleOutlined  color = 'lightgray'/>,
                key: '4'
            },
            user_status == 'desabled' && {
                label: <PopupConfirm
                    title = 'Activation'
                    description = 'Voulez-vous continuer?'
                    confirm = { handleEnable }
                    cancel = { () => {} }
                    buttonTitle = 'Activer'
                />,
                icon: <SafetyCertificateOutlined  color = 'lightgray'/>,
                key: '5'
            },
        ]

        return menu
    }

    const data = users.map( user => {
        return{
            user_name: user.user_name,
            user_email: user.user_email,
            user_role: user.user_role == 'approving' ? 'Approbateur' : 'Réalisateur',
            user_created_at: new Intl.DateTimeFormat( 'fr-FR', { dateStyle: 'long' }).format(new Date(user.createdAt)),
            user_status: user.user_account_status,
            user_actions: <PopupMenu items = { popup_menu_items(user.user_account_status) } click = { () => setCurrentUser(user) }/>
        }
    })

    return(
        <>
            <Flex></Flex>
            <CustomTable
                title = 'Liste des utilisateurs'
                columns = { columns }
                data = { data }
                pagination = { pagination }
                height = { 'calc(100vh - 200px)' }
            />
        </>
    )
}