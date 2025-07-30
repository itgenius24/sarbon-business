import React from "react";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

/**
 * Error Boundary component to catch and handle React errors
 * Provides a fallback UI when component tree crashes
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Flex
          direction="column"
          align="center"
          justify="center"
          minHeight="400px"
          padding={8}
          textAlign="center"
        >
          <VStack spacing={4} maxWidth="500px">
            <Heading size="lg" color="red.500">
              Что-то пошло не так
            </Heading>
            
            <Text color="gray.600">
              Произошла неожиданная ошибка. Пожалуйста, попробуйте обновить страницу или обратитесь в службу поддержки.
            </Text>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <Box
                bg="red.50"
                border="1px solid"
                borderColor="red.200"
                borderRadius="md"
                padding={4}
                width="100%"
                textAlign="left"
              >
                <Text fontSize="sm" fontWeight="bold" color="red.700" mb={2}>
                  Детали ошибки (только в режиме разработки):
                </Text>
                <Text fontSize="xs" color="red.600" fontFamily="mono">
                  {this.state.error.toString()}
                </Text>
                {this.state.errorInfo.componentStack && (
                  <Text fontSize="xs" color="red.600" fontFamily="mono" mt={2}>
                    {this.state.errorInfo.componentStack}
                  </Text>
                )}
              </Box>
            )}

            <Flex gap={3}>
              <Button colorScheme="blue" onClick={this.handleRetry}>
                Попробовать снова
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Обновить страницу
              </Button>
            </Flex>
          </VStack>
        </Flex>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-based error boundary wrapper for functional components
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @param {React.ReactNode} props.fallback - Custom fallback UI
 * @param {Function} props.onError - Error callback function
 * @param {Function} props.onRetry - Retry callback function
 * @returns {JSX.Element} Error boundary wrapper
 */
export const ErrorBoundaryWrapper = ({ children, ...props }) => {
  return <ErrorBoundary {...props}>{children}</ErrorBoundary>;
};

export default ErrorBoundary;
