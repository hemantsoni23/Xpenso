const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <p className="text-red-500 text-sm animate-fade-in">
      {message}
    </p>
  );
};

export default ErrorMessage;
