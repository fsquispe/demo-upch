import React, { Ref, CSSProperties, } from "react";
import {
  InputGroup,
  InputGroupText,
  Input,
  InputProps,
} from "reactstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

interface IProps extends InputProps {
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  value?: string;
  disabled?: boolean;
  setValue: (value: string) => void;
  innerRef?: Ref<HTMLInputElement | HTMLTextAreaElement>;
  style?: CSSProperties;
};

export const InputBuscar : React.FC<IProps> = ({
  placeholder = "Buscar",
  autoComplete = "nope",
  maxLength = 40,
  value = "",
  disabled = false,
  setValue,
  innerRef,
  style,
}) => {
  return (
    <InputGroup>
      <Input
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        innerRef={innerRef}
        style={style}
      />
      <InputGroupText>
        <Icon icon={faSearch} />
      </InputGroupText>
    </InputGroup>
  );
};