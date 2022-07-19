import { Close, ExpandCircleDownOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import TodoItem from "../../../components/TodoItem";
import { selectCloseTodos, selectOrder } from "../todoSlice";
import { sortTodo } from "./sortTodo";
import "./TodoClosedWarning.css";

interface ClosedWarningProps {
  isMore: boolean;
  setIsMore: Function;
}

export default function TodoClosedWarning(props: ClosedWarningProps) {
  const closeTodos = useSelector(selectCloseTodos);
  const order = useSelector(selectOrder);
  const todos = sortTodo(closeTodos, order);

  function handleMoreBtn() {
    props.setIsMore(!props.isMore);
  }

  const closeWarning = (
    <div className="close-warning click" onClick={() => handleMoreBtn()}>
      <p>마감된 할 일이 있습니다!</p>
      <ExpandCircleDownOutlined className="expand-btn" fontSize="inherit" />
    </div>
  );

  const closeTodoItems = todos.map((item) => (
    <TodoItem todo={item} key={item.id} />
  ));

  const closeTodoList = (
    <div className="close-list">
      <div className="close-box">
        <p>마감된 할 일</p>
        <Close
          className="click close-btn"
          fontSize="inherit"
          onClick={() => handleMoreBtn()}
        />
      </div>
      {closeTodoItems}
    </div>
  );

  return (
    <div className="TodoClosedWarning">
      {props.isMore ? closeTodoList : closeWarning}
    </div>
  );
}
