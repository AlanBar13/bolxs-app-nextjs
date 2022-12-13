import React from 'react';
import Layout from '../../components/Layouts/layout';
import { api } from '../../lib/api';
import {
  Flex,
  Heading,
  useMediaQuery,
} from '@chakra-ui/react';
import { LargeEntranceAnimation } from '../../components/Views/Events/singleEvent/LargeEntranceAnimation';
import { SmallEntranceAnimation } from '../../components/Views/Events/singleEvent/SmallEntranceAnimation';
import { Banner } from '../../components/Views/Events/singleEvent/Banner';
import { CurrencyIcon, SaveIcon } from '../../assets';
import { MainSection } from '../../components/Views/Events/singleEvent/MainSection';
import { Ticket } from '../../components/Views/Events/singleEvent/Ticket';

export async function getStaticPaths() {
  if (process.env.NEXT_PUBLIC_SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
  return {
    paths: [],
    fallback: 'blocking',
  };
  // const res = await fetch(`${api}/events`);
  // const events = await res.json();

  // const paths = events.map(event => ({
  //   params: { id: event.longUrl },
  // }));
  // return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const id = context.params.id.split('$$');
  const res = await fetch(`${api}/events/${id[1]}`);
  const data = await res.json();
  return {
    props: { data: data },
    revalidate: 5,
  };
}

const Event = ({ data }) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 1200px)');
  let eventData = {
    amount_raised: data.amount_raised || 0,
    banner: data.banner || '',
    category: data.category || '',
    closed: data.closed || false,
    createdAt: data.createdAt || '',
    deleted: data.deleted || true,
    description: data.description || '',
    end_date: data.end_date || '',
    hype: data.hype || 0,
    longUrl: data.longUrl || '',
    maximum_tickets: data.maximum_tickets || 0,
    name: data.name || '',
    new: data.new || false,
    orginizer_id: data.orginizer_id || '',
    payed: data.payed || false,
    private: data.private || false,
    profit: data.profit || 0,
    shortUrl: data.shortUrl || '',
    start_date: data.start_date || '',
    start_sell: data.start_sell || '',
    tags: data.tags || [''],
    ticket_selled: data.ticket_selled || 0,
    ticket_types: data.ticket_types || [
      {
        amount: data.amount || 0,
        available: data.available || 0,
        name: data.name || '',
        price: data.price || 0,
        _id: data._id || '',
      },
    ],
    updatedAt: data.updatedAt || '',
    __v: data.__v || 0,
    _id: data._id || '',
  };
  return (
    <>
      <Layout>
        {isLargerThan800 ? (
          <LargeEntranceAnimation />
        ) : (
          <SmallEntranceAnimation />
        )}
        <Flex
          flexDir={{ base: 'column', xl: 'row' }}
          gap={{ lg: '1rem' }}
          as='section'>
          <Banner bannerSrc={eventData.banner} hype={eventData.hype} />
          <Flex flexDir='column' gap='1.7rem' maxW={{ xl: '40vw' }}>
            <MainSection
              eventName={eventData.name}
              status='preventa'
              desc={eventData.description}
              startDate={eventData.start_date}
            />

            <Flex flexDir='column' gap='1rem'>
              <Heading fontSize='clamp(3rem, 8vw, 4rem)'>entradas</Heading>
              {eventData.ticket_types.map(ticket => (
                <Ticket
                  key={ticket._id}
                  start_date={eventData.start_date}
                  price={ticket.price}
                  type={ticket.name}
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default Event;
