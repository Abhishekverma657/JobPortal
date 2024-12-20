import { setSearchedQuery } from '@/redux/jobSlice';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Pune", "Mumbai"],
  },
  {
    filterType: "Position",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer ",
      "Data Scientist",
      "DevOps Engineer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-20 LPA", "20+ LPA"],
  },
];

const FilterCard = () => {
   const [selectedValue, setselectedValue] = useState('')
    const dispatch=useDispatch()
   const ChangeHandler=(value)=>{
    setselectedValue(value)
   }
    useEffect(()=>{
      //  console.log(selectedValue)
      dispatch(setSearchedQuery(selectedValue))

    },[selectedValue])
  return (
    <div className="p-4 bg-white shadow-md rounded-md max-w-md mx-auto h-[90vh] flex flex-col pb-10">
      <h1 className="text-2xl font-bold mb-4">Filter Jobs</h1>
      <hr className="mb-4" />

      {/* Scrollable Container */}
      <div className="overflow-y-auto flex-1 space-y-6 pr-3 pl-1">
        <RadioGroup
        value={selectedValue}
         onValueChange={ChangeHandler}
         className="space-y-6">
          
          {filterData.map((data, index) => (
            <div key={index} className="space-y-2">
              <h2 className="text-lg font-semibold">{data.filterType}</h2>
              <div className="flex flex-col gap-2">
                {data.array.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <RadioGroupItem
                      id={`${data.filterType}-${item}`}
                      value={item}
                      className="h-4 w-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`${data.filterType}-${item}`}
                      className="text-sm text-gray-700"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
