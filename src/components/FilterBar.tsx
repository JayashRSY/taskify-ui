import * as Icon from "react-feather";
import FilterDropdown from "./FilterDropDown";

const FilterBar = () => {
  return (
    <div>
      <div className="flex justify-between bg-gray-100 p-5 mx-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="flex items-center border-b-2 border-gray-300 py-2 bg-white rounded-full px-3 shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-[300px]">
          <Icon.Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search Project"
            className="bg-transparent w-full outline-none text-gray-700"
          />
        </div>
        <FilterDropdown />
      </div>
    </div>
  );
};
export default FilterBar;
