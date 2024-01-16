import { useEffect, useMemo, useState } from "react";
import { User } from "../../interfaces/User";

export const useChips = (chipOptions: User[]) => {
const [selectedChips, setSelectedChips] = useState<Record<number, boolean>>({});
const [selectedChipsOptions, setSelectedChipsOptions] = useState<User[]>([]);
const [dropdownHidden, setDropdownHidden] = useState(true);
const [searchInput, setSearchInput] = useState("");
const [isMouseOverDropdown, setIsMouseOverDropdown] = useState(false);
const [backSpaceCount, setBackSpaceCount] = useState(0);
const [selectedOption, setSelectedOption] = useState(0);

const filteredOptions = useMemo(() => {
  return chipOptions.filter(
    ({userId, name}) => !selectedChips[userId] && name.startsWith(searchInput)
  );
}, [selectedChips, searchInput]);

const onSelectChip = (user: User) => {
  setSearchInput("");
  setSelectedChipsOptions((curr) => [...curr, user]);
  setSelectedChips((currentSelectedChip) => ({
    ...currentSelectedChip,
    [user.userId]: true,
  }));
  setBackSpaceCount(0);
  setSelectedOption(0);
};

const onDeselectChip = (user: User) => {
  setSearchInput("");
  setSelectedChipsOptions((curr) => curr.filter((curr) => curr.userId != user.userId));
  setSelectedChips((currentSelectChips) => {
    const { [user.userId]: _, ...rest } = currentSelectChips;
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