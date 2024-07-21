import React, { forwardRef, } from "react";
import { Row, Col, Form, FormGroup, InputGroup, InputGroupText, Label, Input, } from "reactstrap";
import { ButtonX, } from "@/core/ui";
import { eEstado } from "@/core/models";
import { faEdit, faSliders, faTrash, } from "@fortawesome/free-solid-svg-icons";

export const PanelBusqueda : React.FC = () => {
  return (
    <Row className="mb-3">
      <Col md={4} sm={12}>
        <Input type="text" />
      </Col>
    </Row>
  );
};