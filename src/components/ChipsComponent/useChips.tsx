import { useEffect, useMemo, useState } from "react";

export const useChips = (chipOptions: string[]) => {
const [selectedChips, setSelectedChips] = useState<Record<string, boolean>>({});
const [selectedChipsOptions, setSelectedChipsOptions] = useState<string[]>([]);
const [dropdownHidden, setDropdownHidden] = useState(true);
const [searchInput, setSearchInput] = useState("");
const [isMouseOverDropdown, setIsMouseOverDropdown] = useState(false);
const [backSpaceCount, setBackSpaceCount] = useState(0);
const [selectedOption, setSelectedOption] = useState(0);

const filteredOptions = useMemo(() => {
  return chipOptions.filter(
    (chip) => !selectedChips[chip] && chip.startsWith(searchInput)
  );
}, [selectedChips, searchInput]);

const onSelectChip = (chip: string) => {
  setSearchInput("");
  setSelectedChipsOptions((curr) => [...curr, chip]);
  setSelectedChips((currentSelectedChip) => ({
    ...currentSelectedChip,
    [chip]: true,
  }));
  setBackSpaceCount(0);
  setSelectedOption(0);
};

const onDeselectChip = (chip: string) => {
  setSearchInput("");
  setSelectedChipsOptions((curr) => curr.filter((ch) => ch != chip));
  setSelectedChips((currentSelectChips) => {
    const { [chip]: _, ...rest } = currentSelectChips;
    return rest;
  });

  setBackSpaceCount((_) => 0);
  setSelectedOption(0);
};

const updateSelectedOption = (by: number) => {
  if (filteredOptions.length > 0)
    setSelectedOption(
      (currentOption) =>
        (currentOption + by + filteredOptions.length) % filteredOptions.length
    );
};

const onInputBlur = () => {
  setTimeout(() => {
    if (!isMouseOverDropdown) {
      setDropdownHidden(true);
    }
  }, 0);
};

const onInputFocus = () => {
  setDropdownHidden(false);
};

const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event)
  if (!searchInput && event.keyCode == 8) {
    // Backspace
    setBackSpaceCount((count) => count + 1);
  } else if (event.keyCode == 13 && filteredOptions.length > 0) {
    // OnEnter
    onSelectChip(filteredOptions[selectedOption]);
  } else if (event.keyCode === 40) {
    // scrollUp
    updateSelectedOption(1);
  } else if (event.keyCode == 38) {
    // scrollDown
    updateSelectedOption(-1);
  } else {
    setBackSpaceCount(0);
  }
};

useEffect(() => {
  if (backSpaceCount === 2) {
    if (selectedChipsOptions.length > 0) {
      onDeselectChip(selectedChipsOptions[selectedChipsOptions.length - 1]);
    }
  }
}, [backSpaceCount]);

return {
    selectedChipsOptions,
    setIsMouseOverDropdown,
    filteredOptions,
    backSpaceCount,
    onSelectChip,
    onDeselectChip,
    onInputFocus,
    onInputBlur,
    onKeyPress,
    selectedOption,
    dropdownHidden,
    setSearchInput,
    searchInput,
}
}