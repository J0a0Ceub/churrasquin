import dayjs from "dayjs";
import { ChangeEventHandler, FC } from "react";

export type SelectDatePickerProps = {
  title: string;
  list: number[] | string[];
  value: number | string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

export const getDayArrayFromMonth = (month: number) => {
  let result = [];
  for (let i = 1; i <= dayjs().month(month).daysInMonth(); i++) {
    result.push(i);
  }
  return result;
};

export const generateArray = (range: number) => {
  let array: number[] = [];
  for (let i = 0; i < range; i++) {
    array.push(i);
  }
  return array;
};

export const getMonthIndexByName = (month: string) =>
  monthStrArray.findIndex((v) => v === month);

export const monthArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const monthStrArray = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];
export const yearArray = [2022, 2021, 2020, 2019, 2018, 2017];

const SelectDatePicker: FC<SelectDatePickerProps> = ({
  title,
  list,
  value,
  onChange,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-xs ">{title}</span>
      </label>
      <select
        value={value}
        onChange={onChange}
        className="select select-bordered select-sm mx-1"
      >
        {list.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDatePicker;
