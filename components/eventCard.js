import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';

function Rating({ rating, numReviews }) {
    return (
        <Box d="flex" alignItems="center">
            {Array(5).map((_, i) => {
                const roudedRating = Math.floor(rating * 2) /2;
                if (roudedRating - i >= 1) {
                    return (
                        <BsStarFill 
                            key={i}
                            style={{ marginLeft: '1' }}
                            color={i < rating ? 'teal.500' : 'gray.300'}
                        />
                    )
                }
                if (roundedRating - i === 0.5) {
                    return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
                  }
                  return <BsStar key={i} style={{ marginLeft: '1' }} />;
            })}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {numReviews} opinion{numReviews > 1 && 'es'}
            </Box>
        </Box>
    )
}

export default function EventCard({ event }) {
    return (
        <Flex p={50} w="full" alignItems="center" justifyContent="center">
            <Box 
                bg={useColorModeValue('white', 'gray.800')}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative">
                {event.isNew && (
                    <Circle
                        size="10px"
                        position="absolute"
                        top={2}
                        right={2}
                        bg="red.500"
                    />
                )}
                <Image 
                    src={event.banner}
                    alt={`banner ${event.name}`}
                    roundedTop="lg"
                />
                <Box p="6">
                    <Box d="flex" alignItems="baseline">
                        {event.isNew && (
                        <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                            New
                        </Badge>
                        )}
                    </Box>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated>
                            {event.name}
                        </Box>
                        <Tooltip
                            label="Add to cart"
                            bg="white"
                            placement={'top'}
                            color={'gray.800'}
                            fontSize={'1.2em'}>
                            <chakra.a href={'#'} display={'flex'}>
                                <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                            </chakra.a>
                        </Tooltip>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                        <Rating rating={event.rating} numReviews={event.numReviews} />
                        {event.ticket_types.length > 0 ? event.ticket_types.map((ticket, i) => (
                            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                                <Box as="span" color={'gray.600'} fontSize="lg">
                                    $
                                </Box>
                                {ticket.price.toFixed(2)}
                            </Box>
                        )): (
                            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                                Evento gratuito
                            </Box>) }
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}