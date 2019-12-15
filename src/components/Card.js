import React, { useState } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdDelete, MdEdit } from "react-icons/md";

import { editCard, deleteCard } from "../actions";
import Form from "./Form";

const ButtonComp = ({ children, onClick }) => {
  return (
    <Button variant="success" onMouseDown={onClick}>
      {children}
    </Button>
  );
};
const CardComp = React.memo(({ text, id, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);

  const closeForm = e => {
    setIsEditing(false);
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  const saveCard = e => {
    e.preventDefault();

    dispatch(editCard(id, listID, cardText));
    setIsEditing(false);
  };

  const handleDeleteCard = e => {
    console.log(listID);
    dispatch(deleteCard(id, listID));
  };

  const renderEditForm = () => {
    return (
      <Form text={cardText} onChange={handleChange} closeForm={closeForm}>
        <ButtonComp onClick={saveCard}>Save</ButtonComp>
      </Form>
    );
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {provided => (
          <Card
            border="primary"
            className="card-container"
            style={{ width: "40;" }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            <Card.Body>
              <Row>
                <Col xs md lg ={6}>
                  {/* <Card.Title>{text}</Card.Title> */}
                  <Card.Subtitle >{text}</Card.Subtitle>
                </Col>
                <Col className="flex-right">
                  <MdEdit onMouseDown={() => setIsEditing(true)}></MdEdit>
                  &nbsp;
                  <MdDelete onMouseDown={handleDeleteCard}></MdDelete>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Draggable>
    );
  };

  return isEditing ? renderEditForm() : renderCard();
});

export default connect()(CardComp);
