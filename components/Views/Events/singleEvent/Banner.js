import { Box, Image, Text, useMediaQuery } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export const Banner = ({ bannerSrc, hype }) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 1200px)');
  return (
    <AnimatePresence>
      {isLargerThan800 ? (
        <Box position='relative'>
          <Box
            as='span'
            position='absolute'
            top='1rem'
            right='1rem'
            bg='theme.200'
            px='1rem'
            py='0.2rem'
            rounded='0.2rem'
            zIndex='89'>
            <Text
              fontWeight='bold'
              fontSize='1.25rem'
              textTransform='uppercase'
              color='white'>
              {`+${hype} Hype`}
            </Text>
          </Box>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              height: 'calc(100vh - 3rem)',
              width: 'calc(60vw - 2rem)',
              overflow: 'scroll',
            }}>
            <Image
              w='100%'
              rounded='0.25rem'
              objectFit='cover'
              objectPosition='center'
              src={bannerSrc}
            />
          </motion.div>
        </Box>
      ) : (
        <>
          <Box
            as='span'
            position='absolute'
            top='1rem'
            right='1rem'
            bg='theme.200'
            px='1rem'
            py='0.2rem'
            rounded='0.2rem'
            zIndex='89'>
            <Text
              fontWeight='bold'
              fontSize='calc(1rem, 8vw, 1.25rem)'
              textTransform='uppercase'
              color='white'>
              {`+${hype} Hype`}
            </Text>
          </Box>
          <Box w='100%' h='40vh' />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100vw',
              height: '40vh',
            }}>
            <Box id='event-detail-sm-banner' w='100%' h='100%'>
              <Box
                w='100%'
                h='100%'
                bgPosition='top'
                bgRepeat='no-repeat'
                bgSize='cover'
                bgImage={bannerSrc}
              />
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
