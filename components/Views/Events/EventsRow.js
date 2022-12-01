import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Badge,
  Flex,
  IconButton,
  Image,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from '../../../assets';
import { formatDate, formatPriceFixed } from '../../../lib/utils';

// TODO: REFACTOR INTO SMALL COMPONENTS

const FallbackRectangle = () => (
  <Skeleton
    w='192px'
    h='288px'
    rounded='8px'
    startColor='theme.100'
    endColor='theme.300'
  />
);

export const EventsRow = ({ events, label }) => {
  const containerRef = useRef();

  const scrollRight = () => {
    const windowSize = window.innerWidth - 16 * 2 - 8;
    const containerSize = 192 * events.length + 11.2 * (events.length - 1);
    if (containerRef.current.scrollLeft >= containerSize - windowSize) {
      containerRef.current.scrollLeft = 0;
    } else {
      containerRef.current.scrollLeft += windowSize;
      // containerRef.current.scrollLeft += 203.2;
    }
  };
  const scrollLeft = () => {
    const windowSize = window.innerWidth - 16 * 2 - 8;
    const containerSize = 192 * events.length + (11.2 + (events.length + 8));
    if (containerRef.current.scrollLeft === 0) {
      containerRef.current.scrollLeft = containerSize;
    } else {
      containerRef.current.scrollLeft -= windowSize;
      // containerRef.current.scrollLeft -= 203.2;
    }
  };
  return (
    <Flex position='relative' flexDir='column'>
      <Text color='textSecondary' fontStyle='oblique' fontSize='xl'>
        {label}
      </Text>
      <motion.span
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          zIndex: 80,
          top: '50%',
          left: 0,
          transform: 'translate(0%, -50%)',
        }}>
        <IconButton
          colorScheme='primary'
          variant='ghost'
          aria-label='scroll-left'
          icon={<ChevronLeft color='#a01bf8' />}
          onClick={scrollLeft}
        />
      </motion.span>
      <motion.span
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          zIndex: 80,
          top: '50%',
          right: 0,
          transform: 'translate(0%, -50%)',
        }}>
        <IconButton
          colorScheme='primary'
          variant='ghost'
          aria-label='scroll-left'
          icon={<ChevronRight color='#a01bf8' />}
          onClick={scrollRight}
        />
      </motion.span>
      <Flex
        ref={containerRef}
        gap='0.7rem'
        flexWrap='nowrap'
        overflowY='visible'
        overflowX='scroll'
        px='0.25rem'
        py='0.7rem'
        scrollBehavior='smooth'
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}>
        {events.map(e => (
          <motion.div
            key={e._id}
            style={{ flexShrink: 0, overflow: 'visible', cursor: 'pointer' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Image
              src={`${e.banner}`}
              alt='event-banner'
              rounded='0.2rem'
              fallback={<FallbackRectangle />}
              objectFit='cover'
              w='192px'
              h='288px'
              transition='ease-out'
              transitionDuration='300ms'
              style={{ aspectRatio: 2 / 3 }}
            />
            <Flex flexDir='column' pt='1'>
              <Text fontStyle='oblique'>{e.name}</Text>
              <Text fontStyle='oblique' color='textSecondary' fontSize='sm'>
                {formatDate(e.start_date)}
              </Text>
              <Flex justifyContent='space-between' alignItems='center'>
                <Text fontStyle='oblique' color='textSecondary' fontSize='sm'>
                  {formatPriceFixed(
                    Math.min(...e.ticket_type.map(ticket => ticket.price))
                  )}
                </Text>
                <Badge
                  colorScheme='primary'
                  variant='solid'>{`+${e.hype} hype`}</Badge>
              </Flex>
            </Flex>
          </motion.div>
        ))}
        <motion.div
          style={{ flexShrink: 0, overflow: 'visible', cursor: 'pointer' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <Image
            src={`nop`}
            alt='event-banner'
            rounded='0.2rem'
            fallback={<FallbackRectangle />}
            objectFit='cover'
            w='192px'
            h='288px'
            transition='ease-out'
            transitionDuration='300ms'
            style={{ aspectRatio: 2 / 3 }}
          />
          <Flex flexDir='column' pt='1'>
            <Text fontStyle='oblique'>name</Text>
            <Text fontStyle='oblique' color='textSecondary' fontSize='sm'>
              0/0/0
            </Text>
            <Flex justifyContent='space-between' alignItems='center'>
              <Text fontStyle='oblique' color='textSecondary' fontSize='sm'>
                $ 0.00
              </Text>
              <Badge colorScheme='primary' variant='solid'>{`+0 hype`}</Badge>
            </Flex>
          </Flex>
        </motion.div>
      </Flex>
    </Flex>
  );
};
