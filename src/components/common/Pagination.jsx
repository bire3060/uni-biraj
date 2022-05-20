import React, { useState, useEffect, useMemo } from "react";
const Pagination = ({
  page,
  setCurrentButton,
  currentButton,
  handleScrollPagination,
  // setMainLoader,
}) => {
  const noOfPages = page;
  const [currentPage, setCurrentPage] = useState(1);

  //const [numberOfPages, setNumberOfPages] = useState([]);
  //Set number of pages
  // Current active button number

  const numberOfPages = useMemo(() => {
    let numOfPages = [];
    for (let i = 1; i <= noOfPages; i++) {
      numOfPages.push(i);
    }
    return numOfPages;
    // eslint-disable-next-line
  }, [page]);

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    //Temp no of Pages
    let tempNumberOfPages = [...arrOfCurrButtons];

    //Set dots
    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numberOfPages.length < 6) {
      //num of pages < 6
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      //current button 1 to 3
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      //current button 4
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton); // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 2); // sliced2 (5, 5+2) -> [6,7]
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ]; // [1, '...', 4, 5, 6, 7,'...', 10]
    } else if (currentButton > numberOfPages.length - 3) {
      // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 4); // slice last 4 [7, 8, 9, 10]
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      // [1, "...", 5, 6, 7, 8, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 6 + 2 = 8
      setCurrentButton(arrOfCurrButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      // [1, "...", 5, 6, 7, 8, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 6 - 2 = 4
      setCurrentButton(arrOfCurrButtons[3] - 2);
    } else if (numberOfPages.length < currentButton) {
      setCurrentButton(1);
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentPage(currentButton);
    // eslint-disable-next-line
  }, [currentButton, numberOfPages, currentPage, numberOfPages.length]);

  //for prevuous button
  const handlePrevious = () => {
    // setMainLoader(true);
    setCurrentButton((prev) => (prev <= 1 ? prev : prev - 1));
    if (handleScrollPagination === true) {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  //for next
  const handleNext = () => {
    // setMainLoader(true);
    setCurrentButton((prev) =>
      prev >= numberOfPages.length ? prev : prev + 1
    );

    if (handleScrollPagination === true) {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  //const

  return (
    <>
      <div className="flex items-center mx-auto md:mx-0 justify-center">
        {/* Previous Button */}
        <div
          className={`pr-2 + ${
            currentButton === 1
              ? "opacity-40 cursor-default"
              : " cursor-pointer"
          }`}
          onClick={handlePrevious}
        >
          Previous
        </div>

        {/* Array of Current Buttons */}
        {arrOfCurrButtons.map((item, index) => {
          return (
            <div
              key={index}
              className={` py-0.5 px-2 cursor-pointer + ${
                currentButton === item ? "bg-pink4 text-white rounded-sm" : ""
              }`}
              onClick={() => {
                setCurrentButton(item);
                // setMainLoader(true);
                if (handleScrollPagination === true) {
                  window.scroll({
                    top: 0,
                    behavior: "smooth",
                  });
                }
              }}
            >
              {item}
            </div>
          );
        })}

        {/* Next Button */}
        <div
          className={`pl-2 + ${
            currentButton === numberOfPages.length
              ? "opacity-40 cursor-default"
              : numberOfPages.length === 0
              ? "opacity-40 cursor-default"
              : "cursor-pointer"
          }`}
          onClick={handleNext}
        >
          Next
        </div>
      </div>
    </>
  );
};

export default Pagination;
