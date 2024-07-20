import { Alert, Button, } from "reactstrap";
import {
  faExclamationTriangle,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

interface IProps {
  reload?: boolean;
  title?: string;
  text?: string;
};

export const ErrorAlert : React.FC<IProps> = ({
  reload = false,
  title = "¡Algo salió mal!",
  text = "",
}) => {
  const detail =
    (text !== "") ?
      text
    : (reload) ?
      "Estamos trabajando para solucionarlo de inmediato, por favor intente actualizar esta página."
    :
      "Estamos trabajando para solucionarlo de inmediato.";

  return (
    <Alert className="mb-0" color="danger">
      <h4>
        <Icon className="me-1" icon={faExclamationTriangle} />{title}
      </h4>
      <p className={(reload) ? "" : "mb-0"}>{detail}</p>
      {
        (reload) &&
        <p className="mb-0">
          <Button color="danger" onClick={() => window.location.reload()}>
            <Icon className="me-1" icon={faSyncAlt} />
            Actualizar
          </Button>
        </p>
      }
    </Alert>
  );
};
