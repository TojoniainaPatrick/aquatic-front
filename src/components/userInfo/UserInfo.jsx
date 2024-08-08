import { Avatar, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text } from "@chakra-ui/react";
import { Button, Flex, Popconfirm } from "antd";
import userimage from '../../assets/images/user.png'
import { useNavigate } from "react-router-dom";
import useCustomContext from "../../context/useCustomContext";

export default function UserInfo(){

  const navigate = useNavigate()

  const {
    loggedUser
  } = useCustomContext()

  const user = JSON.parse(localStorage.getItem('user')) || {}

  const handleLogOut = _=>{
    localStorage.removeItem('user')
    navigate('/')
  }

    return(
        <Popover closeOnBlur >

          <PopoverTrigger>
              <Avatar size = 'sm' src = { loggedUser.user_image_url || user.user_image_url } />
          </PopoverTrigger>

          <Portal>

            <PopoverContent>

              <PopoverArrow />

              <PopoverHeader>{ loggedUser.user_name || user.user_name } </PopoverHeader>

              <PopoverCloseButton />

              <PopoverBody>

                <Flex vertical = { false } align = "center" justify = "space-between">
                  <Flex style={{ marginRight: 20 }}><Avatar size = 'lg' src = { loggedUser.user_image_url || user.user_image_url } /></Flex>
                  <Flex flex = {1}>
                    <Text>
                      <span style={{ display: 'block', color: 'grayText', fontSize: '1.05rem' }}> { loggedUser.user_email || user.user_email } </span>
                      {
                        loggedUser.user_role
                        ?
                          <span style={{ display: 'block', color: 'gray', fontSize: '.85rem' }}> { loggedUser.user_role == 'approving' ? 'Approbateur' : 'Réalisateur' } </span>
                        :
                        <span style={{ display: 'block', color: 'gray', fontSize: '.85rem' }}> { user.user_role == 'approving' ? 'Approbateur' : 'Réalisateur' } </span>
                      }
                    </Text>
                  </Flex>
                </Flex>

              </PopoverBody>

              <PopoverFooter>

                <Popconfirm
                  title = 'Déconnxion'
                  description = 'Souhaitez-vous vraiment vous déconnectez?'
                  onConfirm = { handleLogOut }
                  okText = "Oui"
                  cancelText = "Non"
                >  
                  <Button block>Se déconnecter</Button>
                </Popconfirm>
              </PopoverFooter>

            </PopoverContent>

          </Portal>
      </Popover>
    )
}