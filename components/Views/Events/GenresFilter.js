import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Flex, IconButton, Image, Skeleton } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from '../../../assets';

// TODO: REFACTOR INTO SMALL COMPONENTS & FILTER METHOD

const filters = [
  'all',
  'heavy',
];

const FallbackRectangle = () => (
  <Skeleton w='125px' h='56px' rounded='8px' startColor='theme.100' endColor='theme.300' />
)

export const GenresFilter = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useRef();

  const scrollRight = () => {
    const windowSize = window.innerWidth - 16 * 2 - 8;
    const containerSize = 125 * filters.length + 11.2 * (filters.length - 1);
    if (containerRef.current.scrollLeft >= containerSize - windowSize) {
      containerRef.current.scrollLeft = 0;
    } else {
      containerRef.current.scrollLeft += windowSize;
      // containerRef.current.scrollLeft += 136.2;
    }
  };
  const scrollLeft = () => {
    const windowSize = window.innerWidth - 16 * 2 - 8;
    const containerSize = 125 * filters.length + 11.2 * (filters.length - 1);
    if (containerRef.current.scrollLeft === 0) {
      containerRef.current.scrollLeft = containerSize;
    } else {
      containerRef.current.scrollLeft -= windowSize;
      // containerRef.current.scrollLeft -= 136.2;
    }
  };
  return (
    <Flex position='relative'>
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
        overflowX='scroll'
        px='0.25rem'
        py='0.1rem'
        scrollBehavior='smooth'
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}>
        {filters.map((filter, i) => (
          <motion.span
            key={i}
            style={{ flexShrink: 0, cursor: 'pointer' }}
            onClick={() => setActiveFilter(filter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{duration: 0.1}}>
            <Image
              src={`/generesImg/${filter}.svg`}
              alt='all-genre'
              fallback={<FallbackRectangle />}
              w='125px'
              h='56px'
              filter={`saturate(${
                filter === activeFilter ? 100 : 0
              }%) opacity(${filter === activeFilter ? 100 : 50}%)`}
              transition='ease-out'
              transitionDuration='300ms'
            />
          </motion.span>
        ))}
      </Flex>
    </Flex>
  );
};
