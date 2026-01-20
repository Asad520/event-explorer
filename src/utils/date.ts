export const formatEventDate = (isoString: string): string => {
  const date = new Date(isoString);

  // Check for invalid dates
  if (isNaN(date.getTime())) {
    return 'Date TBD';
  }

  // Format: "Thu, Sep 5 • 09:00 AM"
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
