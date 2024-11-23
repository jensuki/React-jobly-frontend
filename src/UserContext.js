import { createContext } from 'react';

// Create the context
const UserContext = createContext();

// Export the UserProvider and UserConsumer
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;
