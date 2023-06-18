import React, { createContext, useReducer } from "react";
import {
  ActionTypeEnum,
  AddActionProps,
  DeleteActProps,
  ReducerActProps,
  TaskProps,
  TodoContextProps,
  TodoStateProps,
} from "./Type";
import { clone } from "./utility";

export const TodoContext = createContext<TodoContextProps>({
  activeTask: [],
  dispatch: () => {},
});

type Props = {
  children: React.ReactNode;
};

const addTaskAction = (state: TodoStateProps, action: AddActionProps) => {
  const { data } = action;
  data.id = new Date().toJSON();
  return [action.data, ...state.activeTask];
};

const deleteTaskAction = (state: TodoStateProps, action: DeleteActProps) => {
  const activeTask: TaskProps[] = JSON.parse(JSON.stringify(state.activeTask));
  const filteredData = activeTask.filter((task) => task.id !== action.data.id);
  return filteredData;
};

const reducer = (state: TodoStateProps, action: ReducerActProps) => {
  switch (action.type) {
    case ActionTypeEnum.Add:
      return { ...state, activeTask: addTaskAction(state, action) };
    case ActionTypeEnum.Delete:
      const activeTask: TaskProps[] = clone(state.activeTask);
      const filteredData = activeTask.filter(
        (task) => task.id !== action.data.id
      );
      return { ...state, activeTask: deleteTaskAction(state, action) };
  }
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
