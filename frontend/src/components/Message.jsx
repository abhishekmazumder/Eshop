import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant} style={{ marginTop: "200px", textAlign: "center" }}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
