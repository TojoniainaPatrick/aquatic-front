import { BellIcon } from "@chakra-ui/icons"
import { Card, CardBody, CardFooter, CardHeader, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Input, useDisclosure } from "@chakra-ui/react"
import React, { useEffect } from "react"
import useCustomContext from '../../context/useCustomContext'
import { Space } from "antd"

function NotificationPanel() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const {
      getNotifications,
      currentUserNotifications
    } = useCustomContext()

    useEffect( () => {
      getNotifications()
    }, [])
  
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
                  <Card key = { key } style={{ marginBottom: 5}} size = 'sm'>

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