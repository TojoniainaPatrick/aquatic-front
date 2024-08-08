import { HamburgerIcon } from "@chakra-ui/icons"
import { AbsoluteCenter, Box, Card, CardBody, CardFooter, CardHeader, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Image, Input, useDisclosure } from "@chakra-ui/react"
import React from "react"
import aqslogo from '../../assets/images/aqslogo.jpeg'
import { NavLink } from "react-router-dom"

function ToggleMenu() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const user = JSON.parse(localStorage.getItem('user')) || {}
  
    return (
      <div className = "toggle-menu">
        <IconButton ref = {btnRef} color = 'grey' fontSize = '25px' py = '15px' size = 'sm' onClick={onOpen} mx = '10px'>
          <HamburgerIcon/>
        </IconButton>

        <Drawer
          isOpen={isOpen}
          placement='top'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />

          <DrawerContent>

            <DrawerCloseButton />

            <DrawerHeader display = 'flex' justifyContent = 'center' alignItems = 'center'>
                <Image src = { aqslogo } boxSize = '60px' />
            </DrawerHeader>

            <Box position='relative' padding='10'>
                <Divider />
                <AbsoluteCenter bg='white' px='1'>
                    Menu
                </AbsoluteCenter>
            </Box>
  
            <DrawerBody>
                <ul className = 'toggle-menu-ul'>
                    <li className = 'toggle-menu-item'>
                        <NavLink to = "/aqs/dashboard" ><span> Dashboard </span> </NavLink>
                    </li>
                    <li className = 'toggle-menu-item'>
                        <NavLink to = "/aqs/task" ><span> Tâche </span> </NavLink>
                    </li>
                    {
                      user.user_role?.toString().toLowerCase() == 'approving' &&
                        <li className = 'toggle-menu-item'>
                            <NavLink to = "/aqs/user" > <i></i> <span> Utilisateur </span> </NavLink>
                        </li>
                    }
                    <li className = 'toggle-menu-item'>
                        <NavLink to = "/aqs/profile" ><span> Profil </span> </NavLink>
                    </li>
                </ul>
            </DrawerBody>

          </DrawerContent>

        </Drawer>
      </div>
    )
  }

  export default ToggleMenu