const getDate = () => {
  return Number(
    `${new Date().getFullYear()}${
      new Date().getMonth() + 1
    }${new Date().getDate()}`
  );
};

// return 20210109

export default getDate;
