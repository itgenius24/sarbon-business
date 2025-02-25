import { Box, Center, Spinner } from '@chakra-ui/react';

const SimpleLoader = ({ ...props }) => {
	return (
		<Box display={`flex`} alignItems={`self-start`} justifyContent={`center`} background={`white`} borderRadius={`20px`} left={0} position={`absolute`}  width={`100%`} height={`200vh`} zIndex={2348743278} {...props}>
			<Spinner color="primary.main" size="lg" />
		</Box>
	);
};

export default SimpleLoader;
