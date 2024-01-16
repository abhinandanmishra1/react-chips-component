import React from "react";
import { User } from "../../interfaces/User";

interface ChipsDropdownProps {
  dropdownHidden: boolean;
  filteredOptions: User[];
  onSelectChip: (chip: User) => void;
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
        {filteredOptions.map((user, index) => (
          <p
            key={user.userId}
            className="chip-option"
            data-selected={selectedOption === index}
            onClick={() => onSelectChip(user)}
          >
            <img src={user.profile} alt={user.name} className="chip-img" />
            <span>{user.name}</span>
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
