import React from "react";
import { useChips } from "./useChips";
import { SelectedChips } from "../SelectedChips";
import { ChipsDropdown } from "../ChipsDropdown";
import { ChipInput } from "../ChipInput";
import { User } from "../../interfaces/User";

interface ChipsComponentProps {
  options: User[];
}

export const ChipsComponent = ({ options }: ChipsComponentProps) => {
  const {
    backSpaceCount,
    selectedChipsOptions,
    setIsMouseOverDropdown,
    filteredOptions,
    onSelectChip,
    onDeselectChip,
    onInputFocus,
    onInputBlur,
    onKeyPress,
    selectedOption,
    dropdownHidden,
    setSearchInput,
    searchInput,
  } = useChips(options);

  return (
    <div className="chips-container">
      <div className="chips">
        <SelectedChips
          selectedChipsOptions={selectedChipsOptions}
          onDeselectChip={onDeselectChip}
          backspaceCount={backSpaceCount}
        />
        <ChipsDropdown
          dropdownHidden={dropdownHidden}
          filteredOptions={filteredOptions}
          onSelectChip={onSelectChip}
          selectedOption={selectedOption}
          setIsMouseOverDropdown={setIsMouseOverDropdown}
        />

        <ChipInput
          setSearchInput={setSearchInput}
          searchInput={searchInput}
          onInputFocus={onInputFocus}
          onInputBlur={onInputBlur}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
};
