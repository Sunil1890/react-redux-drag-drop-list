import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Form = React.memo(
  ({ list, text = "", onChange, closeForm, children }) => {
    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";

    return (
      <div>
        <Card>
          <textarea
            className="list-textarea"
            placeholder={placeholder}
            autoFocus
            value={text}
            onChange={e => onChange(e)}
            onBlur={closeForm}
          />
        </Card>
        <div className="close-btn">
          {children}
          &nbsp;<Button variant="primary" onMouseDown={closeForm}>&nbsp;Close</Button>
        </div>
      </div>
    );
  }
);

export default Form;
