import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { FaArrowCircleLeft} from "react-icons/fa";
import Create from "./Create";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort, setActiveBoard } from "../actions";
import { Link } from "react-router-dom";
import List from "./List";


class Home extends PureComponent {
  componentDidMount() {
    const { boardID } = this.props.match.params;
    this.props.dispatch(setActiveBoard(boardID));
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists, cards, match, boards } = this.props;
    const { boardID } = match.params;
    const board = boards[boardID];
    if (!board) {
      return <p>Board not found</p>;
    }
    const listOrder = board.lists;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Link to="/"><FaArrowCircleLeft /></Link>
        <h2>{board.title}</h2>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listOrder.map((listID, index) => {
                const list = lists[listID];
                if (list) {
                  const listCards = list.cards.map(cardID => cards[cardID]);

                  return (
                    <List
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                    />
                  );
                }
              })}
              {provided.placeholder}
              <Create list />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards
});

export default connect(mapStateToProps)(Home);
