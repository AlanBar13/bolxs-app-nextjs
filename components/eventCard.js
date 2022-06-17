import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    Tooltip,
    Stack,
    Skeleton
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

export default function EventCard({ event }) {

    const renderEvent = () => {
        if (event) {
            return (
            <Box 
                bg={useColorModeValue('white', 'gray.800')}
                marginBottom={5}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                as="a"
                href={event.long_url}
                cursor="pointer"
                position="relative">
                {event.is_new && (
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
                            >
                            {event.name}
                        </Box>
                        <Tooltip
                            label="Add to cart"
                            bg="white"
                            placement={'top'}
                            color={'gray.800'}
                            fontSize={'1.2em'}>
                                <span>
                                    <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                                </span>
                        </Tooltip>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                        <Hype hype={event.hype} />
                        {event.ticket_types.length > 0 ? event.ticket_types.map((ticket) => (
                            <Box key={ticket.ID} fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                                <Box as="span" color={'gray.600'} fontSize="lg">
                                   {ticket.name} $
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
)
        }else{
            return (
                <Stack>
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                </Stack>
            )
        }
    }

    return renderEvent()
}

function Hype({ hype }) {
    return (
        <Box d="flex" alignItems="center">
            <Badge variant='solid' colorScheme='green'>
                +{hype} hype
            </Badge>
        </Box>
    )
}