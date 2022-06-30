import { Text, Image, Box, Stack, Heading } from "@chakra-ui/react";
import { formatDate, formatPriceFixed } from "../../../lib/utils";

export default function UserEvent({ event }) {
    return (
        <Stack p={{ base: "0 2rem" }}>
            <Image objectFit="cover" h="300px" src={event.banner} alt={event.name} />
            <Text color="teal.600" textTransform="uppercase">
            Creado: {formatDate(event.CreatedAt)}
            </Text>
            <Text color="teal.600" textTransform="uppercase">
            Fecha: {formatDate(event.start_date)}
            </Text>

            <Heading color="teal.300" size="md" textTransform="capitalize">
            {event.name}
            </Heading>
            <Box>
                {event.ticket_types ? event.ticket_types.map((ticket) => {
                    return(
                        <Box key={ticket.ID}>
                            {formatPriceFixed(ticket.price)}
                            <Box as="span" color="gray.600" fontSize="sm">
                                / {ticket.name}
                            </Box>
                        </Box>
                    )
                }): <Text>No hay tickets</Text>}
            </Box>
        </Stack>
    )
}