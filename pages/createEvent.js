import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import Layout from '../components/Layouts/layout';
import Head from 'next/head';
import { EventForm } from '../components/Views/Events/createEvent/EventForm';
import { Button, Center, Flex, Spinner } from '@chakra-ui/react';
import { TicketForm } from '../components/Views/Events/createEvent/TicketForm';
import { PosterForm } from '../components/Views/Events/createEvent/PosterForm';
import { FinishedDialog } from '../components/Views/Events/createEvent/FinishedDialog';
import { api } from '../lib/api';
import { async } from '@firebase/util';

export default function CreateEvent() {
  const router = useRouter();
  const { authUser, isLoading } = useAuth();

  const formsContainer = useRef();
  const [eventFormData, setEventFormData] = useState({});

  const [menuProgress, setMenuProgress] = useState(0);
  const [alertDisplayed, setAlertDisplayed] = useState(false);
  const [isSendingData, setIsSendingData] = useState(false);
  const [banneUrl, setBanneUrl] = useState('');

  const closeAlert = () => setAlertDisplayed(false);

  // TODO: METHOD TO UPLOAD DATA
  const sendInfo = async () => {
    setAlertDisplayed(false);
    setIsSendingData(true);

    await uploadBanner();
    await createEvent();

    console.log('>>> Forms data');
    console.log(eventFormData);
    setIsSendingData(false);
  };

  const uploadBanner = async () => {
    const formData = new FormData();
    formData.append('file', eventFormData.poster);
    const res = await fetch(`${api}/utils/upload`, {
      method: 'POST',
      body: { banner: formData },
    })
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          console.log('>>> error while updating image');
          console.log('Bad response from server');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
    // const data = await res.json();
    // setBanneUrl(data.url);
  };

  const createEvent = async () => {
    const ticket_types = [];
    const maximun_tickets = eventFormData.ticketData.tickets.reduce(
      (add, value) => add + Number(value.ticketQuantity),
      0
    );
    ticket_types.push(
      ...eventFormData.ticketData.tickets.map(ticket => ({
        name: ticket.ticketName,
        price: Number(ticket.ticketPrice),
        amount: Number(ticket.ticketQuantity),
        available: Number(ticket.ticketQuantity),
      }))
    );
    const eventObj = {
      banner: banneUrl,
      category: 'event',
      description: eventFormData.description,
      end_date: eventFormData.endDate,
      location: {
        address: eventFormData.placeDirection,
        long: 1,
        lat: 1,
        name: eventFormData.placeName,
      },
      maximun_tickets,
      name: eventFormData.name,
      private: eventFormData.isPrivate,
      start_date: eventFormData.initDate,
      start_sell: eventFormData.ticketSell,
      tags: eventFormData.ticketData.tags,
      ticket_types,
    };
    console.log('>>> Request Obj');
    console.log(eventObj);
    const res = await fetch(`${api}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authUser.token}`,
      },
      body: JSON.stringify(eventObj),
    })
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          console.log('>>> error while updating data');
          console.log('Bad response from server');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
  };

  const formsContainerScroll = (toRight, times = 1) => {
    const containerWidth = formsContainer.current.offsetWidth + 16;
    toRight
      ? (formsContainer.current.scrollLeft += containerWidth * times)
      : (formsContainer.current.scrollLeft -= containerWidth * times);
  };

  const handleNavMenu = to => {
    const times = menuProgress - to;
    switch (menuProgress) {
      case (menuProgress = 2):
        setMenuProgress(to);
        formsContainerScroll(false, times);
        break;
      case (menuProgress = 1):
        setMenuProgress(to);
        formsContainerScroll(false, times);
        break;
      case (menuProgress = 0):
        setMenuProgress(to);
        formsContainerScroll(false, times);
        break;

      default:
        break;
    }
  };

  const onSubmit = data => {
    setEventFormData(oldValue => {
      return { ...oldValue, ...data };
    });
    switch (menuProgress) {
      case 0:
        setMenuProgress(1);
        formsContainerScroll(true);
        break;
      case 1:
        setMenuProgress(2);
        formsContainerScroll(true);
        break;
      case 2:
        setAlertDisplayed(true);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (!isLoading) {
      !authUser && router.push('/login');
    }
  }, [authUser, isLoading]);
  return (
    <>
      <Head>
        <title>Crear Evento</title>
      </Head>
      <Layout>
        {isSendingData && (
          <Flex
            position='fixed'
            top='0'
            left='0'
            w='100vw'
            minH='100vh'
            justifyContent='center'
            alignItems='center'
            bg='rgba(0,0,0,0.4)'
            zIndex='99'>
            <Spinner
              color='primary.500'
              thickness='4px'
              speed='0.65s'
              size='xl'
            />
          </Flex>
        )}
        <Center>
          <Flex
            w='100vw'
            maxW='28rem'
            minH='100vh'
            px='1rem'
            pt={{ base: '4.3rem', lg: '5.5rem' }}
            pb='8rem'
            flexDir='column'
            gap='2.5rem'
            alignItems='center'>
            <Flex w='100%' bg='inputBg' p='2px' gap='2px'>
              <Button
                w='full'
                bg={menuProgress === 0 ? 'textMuted' : 'transparent'}
                color={menuProgress === 0 ? 'white' : 'textSecondary'}
                fontWeight='normal'
                _hover={{ filter: 'brightness(1.2)' }}
                _active={{ filter: 'brightness(0.9)' }}
                onClick={() => menuProgress > 0 && handleNavMenu(0)}>
                Evento
              </Button>
              <Button
                w='full'
                bg={menuProgress === 1 ? 'textMuted' : 'transparent'}
                color={menuProgress === 1 ? 'white' : 'textSecondary'}
                fontWeight='normal'
                _hover={{ filter: 'brightness(1.2)' }}
                _active={{ filter: 'brightness(0.9)' }}
                onClick={() => menuProgress > 1 && handleNavMenu(1)}>
                Boleto
              </Button>
              <Button
                w='full'
                bg={menuProgress === 2 ? 'textMuted' : 'transparent'}
                color={menuProgress === 2 ? 'white' : 'textSecondary'}
                fontWeight='normal'
                _hover={{ filter: 'brightness(1.2)' }}
                _active={{ filter: 'brightness(0.9)' }}
                onClick={() => menuProgress > 2 && handleNavMenu(2)}>
                Cartel
              </Button>
            </Flex>
            <Flex
              ref={formsContainer}
              w='100%'
              flexWrap='nowrap'
              gap='1em'
              overflowX='hidden'
              scrollBehavior='smooth'>
              <EventForm onSubmit={onSubmit} />
              <TicketForm onSubmit={onSubmit} />
              <PosterForm onSubmit={onSubmit} />
            </Flex>
            <FinishedDialog
              isOpen={alertDisplayed}
              onAccepted={sendInfo}
              onClose={closeAlert}
            />
          </Flex>
        </Center>
      </Layout>
    </>
  );
}
