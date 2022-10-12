import React from "react";
import Select from "react-select";

interface InputSelectProps {
  value: any;
  setValue: any;
  options: any[];
}

const InputSelect = (props: InputSelectProps) => {
  return (
    <Select
      classNamePrefix="input--select"
      isSearchable={true}
      defaultValue={props.value}
      onChange={props.setValue}
      options={props.options}
    />
  );
};

export default InputSelect;
