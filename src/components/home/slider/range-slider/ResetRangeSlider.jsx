import MultiRangeSlider from "./MultiRangeSlider";
import { useDispatch } from "react-redux";
import { rangeSliderHandler } from "../../../../redux/actions/rangeSliderHandler";
import { currentButtonReset } from "../.././../../redux/actions/currentButtonReset";
import { debounce } from "lodash";

const ResetRangeSlider = () => {
  const dispatch = useDispatch();

  // onchange event for min value
  const handleChange = debounce((val) => {
    const { min, max } = val;
    dispatch(currentButtonReset(1));
    dispatch(
      rangeSliderHandler({
        rangeFilter: { minValue: min, maxValue: max },
      })
    );
  }, 2000);

  return (
    <div className="">
      <div className=" font-semibold text-gray-900 text-lg">FEE PER YEAR</div>
      <div className="flex w-72 justify-center">
        <MultiRangeSlider
          min={0}
          max={200000}
          // onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ResetRangeSlider;
