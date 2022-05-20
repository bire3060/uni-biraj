import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentButtonReset } from "../../redux/actions/currentButtonReset";
import { minMaxHandler } from "../../redux/actions/minMaxHandler";

const MinMaxInput = () => {
  const dispatch = useDispatch();
  const { minValue, maxValue } = useSelector((state) => state.minMaxValue);
  //   const [inputValue, setInputValue] = useState({
  //     min: "",
  //     max: "",
  //   });
  //   const { min, max } = inputValue;

  const [error, setError] = useState({});
  const [dataCheck, setDataCheck] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setError(validate());
    setDataCheck(true);
  };

  const validate = () => {
    let errors = {};
    if (!minValue) {
      errors.minError = "Required";
    }
    if (!maxValue) {
      errors.maxError = "Required";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && dataCheck) {
      dispatch(currentButtonReset(1));
      //   console.log(minValue, maxValue);
    }
  }, [error]);

  //   const changeHandler = (e) => {
  //     dispatch(
  //       minMaxHandler({
  //         minValue: e.target.value,
  //         maxValue: e.target.value,
  //       })
  //     );
  //   };

  return (
    <>
      <div className="mt-4 mb-2 font-semibold text-gray-900 text-lg">
        FEE PER YEAR
      </div>
      <div>
        <form
          onSubmit={submitHandler}
          className="flex justify-between w-full space-x-2"
        >
          <div className="flex justify-center space-x-1">
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="border-pink2 border w-24 focus:bg-pink-50 pl-5 focus:shadow-lg focus:outline-none py-1.5 p-2 rounded-md"
                  placeholder="Min"
                  name="min"
                  value={minValue}
                  onChange={(e) =>
                    dispatch(
                      minMaxHandler({
                        check: e.target.value,
                      })
                    )
                  }
                />
                <span className="absolute top-0.5 left-2 text-lg text-gray-600">
                  $
                </span>
              </div>
              {error.minError && (
                <span className="text-red-500 text-xs">{error.minError}</span>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="border-pink2 border w-24 focus:bg-pink-50 pl-5 focus:shadow-lg focus:outline-none py-1.5 p-2 rounded-md"
                  placeholder="Max"
                  name=""
                  value={maxValue}
                  onChange={(e) =>
                    dispatch(
                      minMaxHandler({
                        chekcing: e.target.value,
                      })
                    )
                  }
                  //   onChange={changeHandler}
                />
                <span className="absolute top-0.5 left-2 text-lg text-gray-600">
                  $
                </span>
              </div>
              {error.maxError && (
                <span className="text-red-500 text-xs">{error.maxError}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-white shadow-lg border border-gray-400 rounded-md text-sm uppercase h-full w-full py-1.5 px-3 font-semibold"
          >
            Go
          </button>
        </form>
      </div>
    </>
  );
};

export default MinMaxInput;
