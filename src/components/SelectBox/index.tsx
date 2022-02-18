import React from 'react';

type Props = {
  selected: string;
  brands: string[];
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectBox: React.FC<Props> = ({ selected, brands, handleSelect }) => {
  return (
    <select onChange={handleSelect} value={selected}>
      <option value="">--브랜드를 선택해주세요--</option>
      {brands.map((name, index) => (
        <option value={name} key={index}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
