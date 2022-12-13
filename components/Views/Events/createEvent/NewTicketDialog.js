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

export const NewTicketDialog = ({ isOpen, onClose, onAccepted }) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent
          bg='theme.400'
          style={{ boxShadow: '0 0 10px transparent' }}>
          <AlertDialogHeader>Boleto generado</AlertDialogHeader>
          <AlertDialogBody color='textSecondary'>
            ¿Desea generar otro boleto o pasar al siguiente apartado?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              bg='rgba(59,130,246,0.1)'
              color='#3b82f6'
              _hover={{ filter: 'brightness(1.2)' }}
              _active={{ filter: 'brightness(0.9)' }}
              onClick={onClose}>
              Generar otro
            </Button>
            <Button
              bg='rgba(16,185,129,0.2)'
              color='#10b981'
              _hover={{ filter: 'brightness(1.2)' }}
              _active={{ filter: 'brightness(0.9)' }}
              onClick={onAccepted}
              ml={3}>
              Siguente apartado
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
