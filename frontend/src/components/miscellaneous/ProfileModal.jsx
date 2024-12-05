import { IconButton, useDisclosure, Button, Image, Text } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
       {children ? ( <span onClick={onOpen}>{children}</span> ) : (
            <IconButton 
                display={{base: 'flex'}}
                icon={<ViewIcon />}
                onClick={onOpen}
            />
         )}

    <Modal size='lg'  isOpen={isOpen} onClose={onClose} isCentered={true} >
        <ModalOverlay />
        <ModalContent h={410}>
        <ModalHeader
            fontSize='40px'
            fontFamily='Work sans'
            display='flex'
            justifyContent='center'
        >
            {user.name}
        </ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' justifyContent='center' alignItems='center' flexDirection='column' p={5}>
            <Image 
                borderRadius='full'
                boxSize='150px'
                src={user.pic}
                alt={user.name}
            />
            <Text fontSize='25px' fontWeight='medium' mt={5}>
                {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        
    </>
  )
}

export default ProfileModal