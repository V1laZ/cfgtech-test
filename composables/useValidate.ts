export const useValidate = () => {
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^\d{9}$/;
    return re.test(phone);
  };

  const validateZip = (zip: string) => {
    const re = /^\d{5}$/;
    return re.test(zip);
  };

  const validateIdCard = (idCard: string) => {
    const re = /^\d{9}$/;
    return re.test(idCard);
  };

  return { validateEmail, validatePhone, validateZip, validateIdCard };
};
