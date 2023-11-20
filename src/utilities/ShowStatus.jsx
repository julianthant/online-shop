export const showStatus = (message, setStatus, durationMs = 3000) => {
  setStatus(message);

  setTimeout(() => {
    setStatus('');
  }, durationMs);
};
