import React, { createContext, useReducer } from "react";
import {
  ActionTypeEnum,
  AddActionProps,
  AddUpdateProps,
  CompleteActionProps,
  DeleteActProps,
  ReducerActProps,
  TaskProps,
  TodoContextProps,
  TodoStateProps,
} from "./Type";
import { clone } from "./utility";

export const TodoContext = createContext<TodoContextProps>({
  activeTask: [],
  completeTask: [],
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
  const activeTask: TaskProps[] = clone(state.activeTask);
  const filteredData = activeTask.filter((task) => task.id !== action.data.id);
  return filteredData;
};

const deleteCompletedTaskAction = (state: TodoStateProps, action: DeleteActProps) => {
  const completeTask: TaskProps[] = clone(state.completeTask);
  const filteredData = completeTask.filter((task) => task.id !== action.data.id);
  return filteredData;
};

const updateTaskAction = (state: TodoStateProps, action: AddUpdateProps) => {
  // Task index
  // Update new data
  // return new state

  const cloneActiveTask: TaskProps[] = clone(state.activeTask);
  const index = cloneActiveTask.findIndex((x) => x.id === action.data.id);
  if (index >= 0) {
    cloneActiveTask[index] = action.data;
  }
  return cloneActiveTask;
};

const completedTaskAction = (
  state: TodoStateProps,
  action: CompleteActionProps
) => {
  const activeTask: TaskProps[] = clone(state.activeTask);
  const completedTaskData = activeTask.find(
    (task) => task.id === action.data.id
  );
  const filteredData = activeTask.filter((task) => task.id !== action.data.id);

  const completeTask = completedTaskData
    ? [completedTaskData, ...state.completeTask]
    : [...state.completeTask];
  return {
    activeTask: filteredData,
    completeTask,
  };
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
    case ActionTypeEnum.DeleteCompletedTask:
      return { ...state, completedTaskAction: deleteCompletedTaskAction(state, action) };
    case ActionTypeEnum.Update:
      return { ...state, activeTask: updateTaskAction(state, action) };
    case ActionTypeEnum.Completed:
      const data = completedTaskAction(state, action);
      return {
        ...state,
        activeTask: data.activeTask,
        completeTask: data.completeTask,
      };
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

  const data: TodoStateProps = { activeTask: tasklist, completeTask: [] };
  const [state, dispatch] = useReducer(reducer, data);

  return (
    <TodoContext.Provider
      value={{
        activeTask: state.activeTask,
        completeTask: state.completeTask,
        dispatch,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default ToDoProvider;
