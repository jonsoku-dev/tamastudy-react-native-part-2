const getDate = () => {
  return Number(
    `${new Date().getFullYear()}${
      new Date().getMonth() + 1
    }${new Date().getDate()}`
  );
};

export default getDate;
