import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

export default function Alerts({ type, title, description }) {
    return (
        <Alert status={type}>
            <AlertIcon />
            <AlertTitle>{title}</AlertTitle>
            {description && <AlertDescription>{description}</AlertDescription>}
        </Alert>
    )
}