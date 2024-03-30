const checkTokenDate = (tokenDate) => {
    const currentDate = new Date();
    const tokenDateNumber = Date.parse(tokenDate);
    const difference = Math.abs(currentDate - tokenDateNumber);
    return difference >= 23 * 60 * 60 * 1000;
  };

  export { checkTokenDate };
