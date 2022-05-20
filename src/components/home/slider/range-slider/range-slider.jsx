import MultiRangeSlider from "./MultiRangeSlider";
import { useDispatch } from "react-redux";
import { currentButtonReset } from "../.././../../redux/actions/currentButtonReset";
import { debounce } from "lodash";
import { rangeSliderHandler } from "../../../../redux/actions/rangeSliderHandler";

const RangeSlider = () => {
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
    <div className="mb-12">
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

export default RangeSlider;
