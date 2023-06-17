import React, { createContext, useReducer } from "react";
import { TaskProps, TodoContextProps, TodoStateProps } from "./Type";

export const TodoContext = createContext<TodoContextProps>({
  activeTask: [],
  dispatch: () => {}
});

type Props = {
  children: React.ReactNode;
};

const reducer = (state: TodoStateProps, action: any) => {
  return { ...state };
};


const ToDoProvider = (props: Props) => {
  const tasklist: TaskProps[] = [
    {
      id: "1",
      title: "Task 1",
    },
    {
      id: "2",
      title: "Task 2",
    },
    {
      id: "3",
      title: "Task 3",
    },
  ];

  const data = { activeTask: tasklist };
  const [state, dispatch] = useReducer(reducer, data);

  return (
    <TodoContext.Provider value={{ activeTask: state.activeTask, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default ToDoProvider;
