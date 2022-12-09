import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';

export const FinishedDialog = ({ isOpen, onClose, onAccepted }) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent
          bg='theme.400'
          style={{ boxShadow: '0 0 10px transparent' }}>
          <AlertDialogHeader>Crear Evento</AlertDialogHeader>
          <AlertDialogBody color='textSecondary'>
            Está seguro de haber llenado los campos con la información que
            deseas?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              bg='rgba(244,63,94,0.1)'
              color='#f43f5e'
              _hover={{ filter: 'brightness(1.2)' }}
              _active={{ filter: 'brightness(0.9)' }}
              onClick={onClose}>
              Cancelar
            </Button>
            <Button
              bg='rgba(16,185,129,0.2)'
              color='#10b981'
              _hover={{ filter: 'brightness(1.2)' }}
              _active={{ filter: 'brightness(0.9)' }}
              onClick={onAccepted}
              ml={3}>
              Crear
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
