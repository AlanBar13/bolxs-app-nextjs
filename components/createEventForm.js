import { 
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Checkbox,
    Text,
    Stack,
    Flex,
    Heading,
    Button,
    Spinner
} from '@chakra-ui/react'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import Dropzone from './fileDropzone';
import CustomCalendar from './calendar';
import { api } from '../lib/api';
import { useAuth } from "../context/AuthUserContext";

export default function EventForm(){
    const [files, setFiles] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [sellDate, setSellDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [maxTickets, setMaxTickets] = useState(10);
    const [banner, setBanner] = useState('');
    const {authUser} = useAuth();

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            location_name: '',
            location_address: '',
            private: false,
        }, 
        onSubmit: async (values) => {
            try {
                setPageLoading(true);
                const res = await fetch(`${api}/events`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authUser.token}`
                    },
                    body: JSON.stringify({...values, start_date: startDate, end_date: endDate, start_sell: sellDate, maximun_tickets: Number(maxTickets), banner})
                })
                const data = await res.json();
                console.log(data);
                setPageLoading(false);
            } catch (error) {
                setPageLoading(false);
                console.log(error);
            }
        },
        validationSchema: yup.object({
            name: yup.string().trim().required('El nombre es requerido'),
            description: yup.string().trim().required('La descripción es requerida'),
            location_name: yup.string().trim().required('El nombre del lugar es requerido'),
            location_address: yup.string().trim().required('La dirección del lugar es requerida'),
            private: yup.boolean().required('El evento es privado o no'),
        })
    });

    const handleFiles = async (file) => {
        setLoading(true);
        setFiles(null)
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`${api}/upload`, {
            method: 'POST',
            body: formData,
        })
        const data = await res.json();
        setBanner(data.url);
        setFiles(file);
        setLoading(false);
    }
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex h={'100%'} p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading>Crear Evento:</Heading>
                    <form onSubmit={formik.handleSubmit}>
                    <FormControl isInvalid={(formik.errors.name && formik.touched.name) || (formik.errors.description && formik.touched.description) || (formik.errors.location_name && formik.touched.location_name) || (formik.errors.location_address && formik.touched.location_address)}>
                        <FormLabel htmlFor="name">Nombre</FormLabel>
                        <Input id="name" type="text" placeholder="Nombre del evento" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                        <FormLabel htmlFor="description">Descripción</FormLabel>
                        <Input id="description" name='description' type="text" placeholder="Descripción del evento" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                        <FormLabel htmlFor="start-date">Fecha de inicio</FormLabel>
                        <CustomCalendar id="start-date" selectedDate={startDate} onChange={(d) => {
                            setStartDate(d);
                            setEndDate(d);
                        }} />
                        <FormLabel htmlFor="end-date">Fecha de finalización</FormLabel>
                        <CustomCalendar id="end-date" selectedDate={endDate} onChange={(d) => setEndDate(d)} />
                        <FormLabel htmlFor="start-sell">Inicio venta de boletos</FormLabel>
                        <CustomCalendar id="start-sell" selectedDate={sellDate} onChange={(d) => setSellDate(d)} />
                        <FormLabel htmlFor="maximun_tickets">Numero maximo de Boletos</FormLabel>
                        <NumberInput id="maximun_tickets" name='maximun_tickets' value={maxTickets} onChange={(e) => setMaxTickets(e)} onBlur={formik.handleBlur} defaultValue={10} min={10} >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>Minimo 10 boletos</FormHelperText>
                        <FormLabel htmlFor="location_name">Nombre del lugar del evento</FormLabel>
                        <Input id="location_name" name="location_name" type="text" placeholder="Nombre del lugar del evento" value={formik.values.location_name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <FormErrorMessage>{formik.errors.location_name}</FormErrorMessage>
                        <FormLabel htmlFor="location_address">Dirección del Lugar</FormLabel>
                        <Input id="location_address" name="location_address" type="text" placeholder="Dirección del lugar del evento" value={formik.values.location_address} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <FormErrorMessage>{formik.errors.location_address}</FormErrorMessage>
                        <FormLabel htmlFor="private">Es evento privado?</FormLabel>
                        <Checkbox id="private" value={formik.values.private} onChange={formik.handleChange} onBlur={formik.handleBlur}></Checkbox>
                        <Button
                            colorScheme='teal'
                            isLoading={pageLoading}
                            width={'full'}
                            type='submit'
                        >
                            Crear
                        </Button>
                    </FormControl>
                    </form>
                </Stack>
            </Flex>
            <Flex p={8} flex={1} align='center' justify='center'>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading>Cartel del evento</Heading>
                    <Dropzone id="banner" onFileAccepted={(file) => handleFiles(file)} />
                    {loading && <Spinner size={'xl'} />}
                    {files && <img src={files.preview} alt="preview" />}
                    <Text>{files ? files.name : 'No hay archivo seleccionado'}</Text>
                </Stack>
            </Flex>
        </Stack>
    )
}