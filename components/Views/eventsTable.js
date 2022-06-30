import { Flex, Spacer } from '@chakra-ui/react'
import EventCard from '../eventCard'

const CardContainer = ({ event }) => {
    return (
        <>
            <EventCard event={event} />
            <Spacer />
        </>
    )
}

export default function EventsTable({ events }) {
    return (
        <Flex m={5} flexDir={['column', 'row']} align="center" wrap="wrap">
            {events.map((event, i) => (
                <CardContainer key={i} event={event} />
            ))}
        </Flex>
    )
}