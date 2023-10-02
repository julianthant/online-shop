import { useState } from 'react';

const initialNewEmailAddress = '';

export function useNewEmailAddress() {
  const [newEmailAddress, setNewEmailAddress] = useState(
    initialNewEmailAddress
  );

  return [newEmailAddress, setNewEmailAddress];
}
