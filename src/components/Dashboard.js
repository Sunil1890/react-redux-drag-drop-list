import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard } from "../actions";

const BoardThumbnail = ({ title }) => {
    return (
      <div className="board-title">
        <h3>{title}</h3>
      </div>
    );
  };
const Dashboard = ({ boards, boardOrder, dispatch }) => {
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
  };

  const renderBoards = () => {
    return boardOrder.map(boardID => {
      const board = boards[boardID];

      return (
        <Link
          key={boardID}
          to={`/${board.id}`}
          style={{ textDecoration: "none" }}
        >
          <BoardThumbnail {...board} />
        </Link>
      );
    });
  };

  const renderCreateBoard = () => {
    return (
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <h2>Create a new Board</h2>
        <input
          onChange={handleChange}
          value={newBoardTitle}
          placeholder="Your boards title..."
          type="text"
        />
      </form>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="thumbnail">{renderBoards()}</div>
      {renderCreateBoard()}
    </div>
  );
};

const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});

export default connect(mapStateToProps)(Dashboard);
