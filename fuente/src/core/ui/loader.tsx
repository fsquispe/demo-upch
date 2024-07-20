import { Spinner } from "reactstrap";

interface IProps {
  type?: string;
  color?: string;
  full?: boolean;
  text?: string;
}

export const Loader : React.FC<IProps> = ({
  type = "border",
  color = "primary",
  full = false,
  text = "",
}) => {
  const hasText = (text !== "");
  return (
    <div className={"text-center"} style={ (full) ? { paddingTop: "100px", paddingBottom: "100px" } : {} }>
      <Spinner type={type} color={color} />
      {
        (hasText) &&
        <p>
          <small>{text}</small>
        </p>
      }
    </div>
  );
};