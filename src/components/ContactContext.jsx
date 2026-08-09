import { createContext, useContext, useState } from "react";

const INITIAL_CONTACT = {
  address: "123 Metro Street, Phnom Penh, Cambodia",
  phone: "+855 12 345 678",
  email: "support@metromall.com",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250151.17122181285!2d104.75010078873096!3d11.579666904675567!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc78007e7%3A0x2a66a208c0282115!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh",
};

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contactData, setContactData] = useState(INITIAL_CONTACT);

  const updateContactData = (newData) => {
    setContactData(newData);
  };

  return (
    <ContactContext.Provider value={{ contactData, updateContactData, INITIAL_CONTACT }}>
      {children}
    </ContactContext.Provider>
  );
};

// Make sure 'export' is written before 'const useContact'
export const useContact = () => useContext(ContactContext);