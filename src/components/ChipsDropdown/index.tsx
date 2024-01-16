import React from "react";

interface ChipsDropdownProps {
  dropdownHidden: boolean;
  filteredOptions: string[];
  onSelectChip: (chip: string) => void;
  selectedOption: number;
  setIsMouseOverDropdown: (is: boolean) => void;
}

export const ChipsDropdown: React.FC<ChipsDropdownProps> = ({
  dropdownHidden,
  filteredOptions,
  onSelectChip,
  selectedOption,
  setIsMouseOverDropdown
}) => {
  return (
    <div
      hidden={dropdownHidden}
      onMouseDown={() => setIsMouseOverDropdown(true)}
      onMouseLeave={() => setIsMouseOverDropdown(false)}
      className="chips-dropdown-container"
    >
      <div className="chips-dropdown">
        {filteredOptions.map((chip, index) => (
          <p
            key={chip}
            className="chip-option"
            data-selected={selectedOption === index}
            onClick={() => onSelectChip(chip)}
          >
            {chip}
          </p>
        ))}

        {filteredOptions.length === 0 && (
          <p key="no-options" className="no-options">
            No more options to select
          </p>
        )}
      </div>
    </div>
  );
};
