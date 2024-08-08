import { BellIcon } from "@chakra-ui/icons"
import { Card, CardBody, CardFooter, CardHeader, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Input, useDisclosure } from "@chakra-ui/react"
import React, { useEffect } from "react"
import useCustomContext from '../../context/useCustomContext'
import { Space } from "antd"
import axios from "../../api/axios"
import { useNavigate } from 'react-router-dom'

function NotificationPanel() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const navigate = useNavigate()

    const {
      getNotifications,
      currentUserNotifications
    } = useCustomContext()

    useEffect( () => {
      getNotifications()
    }, [])

    const handleClick = async notification => {
      await axios.put(`/notification/update/${notification.notification_id}`)
      .then( _=> {
        if(notification.notification_object?.toString().toLowerCase().includes('compte')) navigate('/aqs/user')
        else navigate('/aqs/task')
        onClose()
        getNotifications()
      })
      .catch( error => {
        console.log(error);
      })
    }
  
    return (
      <>
        <IconButton ref={btnRef} isRound = { true } color = 'grey' fontSize = '20px' size = 'sm' onClick={onOpen} me = '2px'>
          <BellIcon/>
        </IconButton>

        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />

          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader> Notifications </DrawerHeader>
  
            <DrawerBody>

              {
                currentUserNotifications.map( ( notification, key ) =>
                  <Card hover key = { key } style={{ marginBottom: 5, cursor: 'pointer', background: notification.notification_status == 'new' ? '#F2F2F2' : 'white'}} size = 'sm' onClick = { ()=> handleClick(notification) }>

                    <CardHeader style={{fontWeight: 'bold', color: 'GrayText'}}> { notification.notification_object || '' } </CardHeader>
                    <CardBody> { notification.notification_content || '' } </CardBody>
                    <CardFooter>
                      <Space align="end" style={{fontStyle: 'italic', width: '100%', justifyContent: "end"}}>
                        { new Intl.DateTimeFormat( 'fr-FR', { dateStyle: 'long' }).format(new Date(notification.notification_created_at)) }
                      </Space>
                    </CardFooter>

                  </Card>
                )
              }

            </DrawerBody>

            <DrawerFooter></DrawerFooter>

          </DrawerContent>

        </Drawer>
      </>
    )
  }

  export default NotificationPanel