import React from "react";
import { Button, ButtonProps, Spinner } from "reactstrap";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps extends ButtonProps {
  visible?: boolean;
  loading?: boolean;
  icon?: IconProp;
  text?: string;
};

export const ButtonX : React.FC<IProps> = ({
  visible = true,
  loading = false,
  icon = null,
  text = null,
  ...rest
}) => {
  if (visible === false)
    return null;

  const hasText = (text !== null);
  return (
    <Button {...rest}>
      {loading === true ? (
        <>
          <Spinner className={`${ (hasText) ? "me-1" : "" }`} size="sm" color="light" />
          {text}
        </>
      ) : icon != null || icon != undefined ? (
        <>
          <FontAwesomeIcon icon={icon} className={`${ (hasText) ? "me-1" : "" }`} />
          {text}
        </>
      ) : (
        text
      )}
    </Button>
  );
};