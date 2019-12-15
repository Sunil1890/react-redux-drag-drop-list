import React from "react";
import { connect } from "react-redux";
import { MdAddCircle } from "react-icons/md";
import Button from "react-bootstrap/Button";
import { addList, addCard } from "../actions";
import Form from "./Form";

class Create extends React.PureComponent {
  state = {
    formOpen: false,
    text: ""
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addList(text));
    }

    return;
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addCard(listID, text));
    }
  };

  renderOpenForm = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";

    return (
      <div className="form-btn" onClick={this.openForm}>
        <MdAddCircle>add</MdAddCircle>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </div>
    );
  };

  render() {
    const { text } = this.state;
    const { list } = this.props;
    return this.state.formOpen ? (
      <Form
        text={text}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
      >
        <ButtonComp onClick={list ? this.handleAddList : this.handleAddCard}>
          {list ? "Add List" : "Add Card"}
        </ButtonComp>
      </Form>
    ) : (
      <FormButton className="add-list-form" list={list} onClick={this.openForm}>
        {list ? <h6>Add another list</h6> : "Add another card"}
      </FormButton>
    );
  }
}

export default connect()(Create);

const FormButton = ({ list, children, onClick }) => {
  return (
    <div className="form-btn" onClick={onClick}>
      <MdAddCircle />
      <p className="child-text">{children}</p>
    </div>
  );
};

const ButtonComp = ({ children, onClick }) => {
  return (
    <Button onMouseDown={onClick} variant="info">
      {children}
    </Button>
  );
};
