const checkTokenDate = (tokenDate) => {
    let currentDate = new Date();
    currentDate = currentDate.getTime();
    tokenDate = new Date(tokenDate).getTime();
    const isCurrentDateGreater = currentDate > tokenDate;
    return isCurrentDateGreater;
  };

  export { checkTokenDate };
