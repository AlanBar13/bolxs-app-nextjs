import { Flex, Spacer } from '@chakra-ui/react'
import EventCard from './eventCard'

const CardContainer = ({ event, count, length }) => {
    return (
        <>
            <EventCard event={event} />
            {length !== count ? <Spacer /> : <></>}
        </>
    )
}

export default function EventsTable({ events }) {
    return (
        <Flex p={5} flexDir={['column', 'row']} align="center" wrap="wrap">
            {events.map((event, i) => (
                <CardContainer key={i} event={event} count={i} length={events.length - 1} />
            ))}
        </Flex>
    )
}