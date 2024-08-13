import * as Icon from "react-feather";
import FilterDropdown from "./FilterDropDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { setFilteredTasks } from "../features/filter/filterSlice";
import { ITask } from "../interfaces/ITask";

const FilterBar = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.board);
  const filterOptions = ["All", "High", "Medium", "Low"];
  const [selected, setSelected] = useState("All");
  const [searchText, setSearchText] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    dispatch(
      setFilteredTasks(
        tasks.filter((task: ITask) => {
          const matchesSearchText =
            !searchText ||
            task.title.toLowerCase().includes(searchText.toLowerCase());
          const matchesPriority =
            selected === filterOptions[0] ||
            task.priority.toLowerCase() === selected.toLowerCase();

          return matchesSearchText && matchesPriority;
        })
      )
    );
  }, [dispatch, tasks, searchText, selected]);

  return (
    <div>
      <div className="flex justify-between bg-gray-100 p-5 mx-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="flex items-center border-b-2 border-gray-300 py-2 bg-white rounded-full px-3 shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-[300px]">
          <Icon.Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search Project"
            className="bg-transparent w-full outline-none text-gray-700"
            onChange={handleSearch}
          />
        </div>
        <FilterDropdown
          options={filterOptions}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};
export default FilterBar;
