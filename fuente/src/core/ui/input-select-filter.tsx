import React, { useState, ChangeEvent } from 'react';
import { 
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./input-select-filter.css";

interface IProps {
  keyFieldName: string;
  textFieldName: string;
  value?: string;
  setValue: (value: string) => void;
  lst: any[];
  title: string;
}

export const InputSelectFilter: React.FC<IProps> = ({
  keyFieldName = "key",
  textFieldName = "text",
  value = "",
  setValue,
  lst = [],
  title, 
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [selectedKey, setSelectedKey] = useState<string>(value);

  const handleSelect = (item: string) => {
    setSelectedKey(item);
    setValue(item);
    setOpen(false);
  };

  const selectNameByKey = (key: string) => {
    const filteredLst = lst.filter(obj => obj[keyFieldName] == key);
    if (filteredLst.length === 0) {
      return "";
    }
    return filteredLst[0][textFieldName];
  }

  const filteredLst = lst.filter((obj) =>
    (JSON.stringify(obj).toLowerCase().indexOf(filter) !== -1)
  );

  return (
    <Dropdown isOpen={open} toggle={() => setOpen(!open)} className="w-100">
      <DropdownToggle caret className="custom-dropdown-toggle w-100">
        <span className="dropdown-text">{selectNameByKey(selectedKey)}</span>
      </DropdownToggle>
      <DropdownMenu className="w-100 dropdown-menu-custom">
        <div className="fixed-header">
          <div className="dropdown-title">{title}</div>
          <div className="px-3 py-2">
            <Input
              autoFocus
              placeholder="Filtrar..."
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
          </div>
        </div>
        <div className="dropdown-items">
          {filteredLst.map((obj, index) => (
            <DropdownItem
              key={index}
              onClick={() => handleSelect(obj[keyFieldName])}
            >
              {obj[textFieldName]}
            </DropdownItem>
          ))}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};