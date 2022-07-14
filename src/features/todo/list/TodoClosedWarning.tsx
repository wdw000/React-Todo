import { useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "../../../components/TodoItem";
import { selectCloseTodos, selectOrder } from "../todoSlice";
import { sortTodo } from "./sortTodo";

export default function TodoClosedWarning() {
  const [isMore, setIsMore] = useState(false);
  const closeTodos = useSelector(selectCloseTodos);
  const order = useSelector(selectOrder);
  const todos = sortTodo(closeTodos, order);

  function handleMoreBtn() {
    setIsMore(!isMore);
  }

  const closeWarning = (
    <div>
      <p>마감된 할 일이 있습니다!</p>
      <button onClick={() => handleMoreBtn()}>더보기</button>
    </div>
  );

  const closeTodoItems = todos.map((item) => (
    <TodoItem todo={item} key={item.id} />
  ));

  const closeTodoList = (
    <div>
      <button onClick={() => handleMoreBtn()}>close</button>
      {closeTodoItems}
    </div>
  );

  return (
    <div className="TodoClosedWarning">
      {isMore ? closeTodoList : closeWarning}{" "}
    </div>
  );
}
