import React, { forwardRef, } from "react";
import { Row, Col, Form, FormGroup, InputGroup, InputGroupText, Label, Input, } from "reactstrap";
import { ButtonX, } from "@/core/ui";
import { eEstado } from "@/core/models";
import { faEdit, faSliders, faTrash, } from "@fortawesome/free-solid-svg-icons";

export const PanelFiltros : React.FC = () => {
  return (
    <Row className="p-3 mx-0 mb-3 shadow-sm rounded bg-body-secondary">
      <Col md={4} sm={12}>
        <Input type="text" />
      </Col>
      <Col md={4} sm={12}>
        <Input type="text" />
      </Col>
      <Col md={4} sm={12}>
        <Input type="text" />
      </Col>
    </Row>
  );
};