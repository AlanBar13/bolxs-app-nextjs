import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { FastReactiveForm } from '../../../atomic/FastReactiveForm';
import { GeneralInput } from '../../../atomic/GeneralInput';
import { AddonsInput } from '../../../atomic/AddonsInput';
import { TagsInput } from '../../../atomic/TagsInput';
import { NewTicketDialog } from './NewTicketDialog';
import { MinusIcon } from '../../../../assets/MinusIcon';

const schema = yup
  .object({
    ticketName: yup.string().required('Nombre es requerido'),
    ticketPrice: yup.string().required('Precio es requerido'),
    ticketQuantity: yup.string().required('Cantidad es requerida'),
  })
  .required();

export const TicketForm = ({ onSubmit }) => {
  const formRef = useRef();
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const [ticketFormData, setTicketFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const closeDialog = () => setOpenDialog(false);

  const handleSubmit = data => {
    setOpenDialog(true);
    setTicketFormData(oldValue => {
      return [...oldValue, { ...data }];
    });
  };

  const finishedSubmit = () => {
    setOpenDialog(false);
    const newData = { ticketData: { tickets: ticketFormData, tags } };
    onSubmit(newData);
  };

  const handleRemoveTicket = ticketToRemove => {
    const newTickets = ticketFormData.filter(
      value => value.ticketName !== ticketToRemove
    );
    setTicketFormData(newTickets);
  };

  return (
    <Flex flexDir='column' gap='1.5rem' w='100%' flexShrink='0'>
      <Heading fontSize='clamp(2rem, 6vw, 2.5rem)'>
        datos generales del boleto
      </Heading>
      <Text color='textSecondary' fontStyle='italic'>
        Puedes agregar más de un boleto para segmentar los lugares, por ejemplo
        General, Preferencial, VIP.
      </Text>
      <Text color='textSecondary' fontStyle='italic'>
        Sólo llena el formulario y se te pregunatrá si quieres agregar otro
        boleto al terminar.
      </Text>
      <Flex flexDir='column' gap='0.1rem'>
        <Text color='textSecondary' fontStyle='italic'>
          Tickets:
        </Text>
        {ticketFormData.map(
          ({ ticketName, ticketPrice, ticketQuantity }, i) => (
            <Flex
              key={i}
              as='span'
              bg='theme.200'
              px='0.5rem'
              py='0.2rem'
              w='fit-content'
              rounded='0.35rem'
              cursor='pointer'
              gap='0.2rem'
              alignItems='center'
              onClick={() => handleRemoveTicket(ticketName)}>
              <MinusIcon color='white' size='1rem' />
              <Text fontStyle='italic'>
                {`${ticketName} - $${ticketPrice} - ${ticketQuantity} Boletos`}
              </Text>
            </Flex>
          )
        )}
      </Flex>
      <FastReactiveForm schema={schema} onSubmit={handleSubmit} needReset>
        <GeneralInput
          name='ticketName'
          placeholder='Nombre del Boleto'
          type='text'
        />
        <AddonsInput
          name='ticketPrice'
          placeholder='Precio del Boleto'
          type='number'
          leftAddon='$'
        />
        <AddonsInput
          name='ticketQuantity'
          placeholder='Cantidad de Boletos'
          type='number'
          rightAddon='Boletos'
        />
        <TagsInput tag={tag} setTag={setTag} tags={tags} setTags={setTags} />
        <Button ref={formRef} type='submit' display='none'>
          Submit
        </Button>
      </FastReactiveForm>
      <Button
        w='full'
        h='fit-content'
        mt='1rem'
        variant='unstyled'
        fontFamily='heading'
        color='white'
        rounded='lg'
        fontSize='2xl'
        pt='0.6rem'
        pb='0.3rem'
        bg='theme.200'
        onClick={() => formRef.current && formRef.current.click()}
        _hover={{ filter: 'brightness(1.2)' }}
        _active={{ filter: 'brightness(0.9)' }}>
        Siguiente
      </Button>
      <NewTicketDialog
        isOpen={openDialog}
        onAccepted={finishedSubmit}
        onClose={closeDialog}
      />
    </Flex>
  );
};
