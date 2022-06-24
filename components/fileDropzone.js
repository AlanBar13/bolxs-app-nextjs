import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, useColorModeValue, Icon } from '@chakra-ui/react';
import { AiFillFileAdd } from 'react-icons/ai';

export default function Dropzone({ onFileAccepted }) {
  const onDrop = useCallback((acceptedFiles) => {
    onFileAccepted(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: {
        'image/png': ['.png'], 
        'image/jpeg': ['.jpg', '.jpeg'] 
      }, maxFiles: 1, multiple: false,
  });

  const dropText = isDragActive ? 'Pon el cartel aqui' : 'Arrastra el cartel del evento, o da click para seleccionarlo';

  const activeBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue(
    isDragActive ? 'teal.300' : 'gray.300',
    isDragActive ? 'teal.500' : 'gray.500',
  );

  return (
    <Center
      p={10}
      cursor="pointer"
      bg={isDragActive ? activeBg : 'transparent'}
      _hover={{ bg: activeBg }}
      transition="background-color 0.2s ease"
      borderRadius={4}
      border="3px dashed"
      borderColor={borderColor}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon as={AiFillFileAdd} mr={2} />
      <p>{dropText}</p>
    </Center>
  );
}