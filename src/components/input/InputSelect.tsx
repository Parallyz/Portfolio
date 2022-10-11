import React from "react";
import Select from "react-select";

interface InputSelectProps {
  value: any;
  setValue: any;
  options: any[];
}

const customStyles = {
  option: (provided: any, state: any) => ({
    color: state.isSelected ? "#f7f8fc" : "#3e4049",
    padding: "7px 10px",
    backgroundColor: state.isSelected
      ? "#3e4049"
      : state.isFocused
      ? "#a4a6b3"
      : "#f7f8fc",
  }),
  control: () => ({
    backgroundColor: "#f7f8fc",
    display: "flex",
    border: "1px solid #a4a6b3",
    marginTop: 10,
    borderRadius: 5,
  }),
  menuList: () => ({
    padding: 0,
    borderRadius: 5,
    height: 100,
    overflow: "auto",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
  }),
  //  singleValue: (provided: any, state: any) => {
  //    const opacity = state.isDisabled ? 0.5 : 1;
  //    const transition = "opacity 300ms";

  //    return { ...provided, opacity, transition };
  //  },
};

const InputSelect = (props: InputSelectProps) => {
  return (
    <Select
      styles={customStyles}
      isSearchable={true}
      defaultValue={props.value}
      onChange={props.setValue}
      options={props.options}
    />
  );
};

export default InputSelect;
