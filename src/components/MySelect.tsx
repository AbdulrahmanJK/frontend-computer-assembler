import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface MySelectProps {
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MySelect: React.FC<MySelectProps> = ({ options, onChange }) => {
  return (
    <select onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
