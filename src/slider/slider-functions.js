export const numberOfSlidesToDisplay = (width, cardwidth) => {
  if (cardwidth === 100) {
    if (width >= 1600) {
      return 10;
    } else if (width >= 1360) {
      return 8;
    } else if (width >= 1024) {
      return 6;
    } else if (width >= 768) {
      return 4;
    } else if (width >= 640) {
      return 3;
    }
    return 2;
  } else {
    if (width >= 1600) {
      return 5;
    } else if (width >= 1360) {
      return 4;
    } else if (width >= 1024) {
      return 3;
    } else if (width >= 768) {
      return 2;
    }

    return 1;
  }
};
