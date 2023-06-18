import { Dispatch } from "react";

export enum PivotKeysEnum {
  Tasks = "Tasks",
  TaskForm = "TaskForm",
  Completed = "CompletedTasks",
  FormTask = "FormTask",
  Task = "Task",
}

export interface TaskProps {
  id: string;
  title: string;
  description?: string;
}

export interface TodoContextProps {
  activeTask: TaskProps[];
  completeTask: TaskProps[];
  dispatch: Dispatch<any>;
}

export interface TodoStateProps {
  activeTask: TaskProps[];
  completeTask: TaskProps[];
}

export enum ActionTypeEnum {
  Add,
  Delete,
  Update,
  Completed,
  DeleteCompletedTask
}

export type ReducerActProps =
  | AddActionProps
  | DeleteActProps
  | AddUpdateProps
  | CompleteActionProps;

export interface AddActionProps {
  type: ActionTypeEnum.Add;
  data: TaskProps;
}

export interface DeleteActProps {
  type: ActionTypeEnum.Delete | ActionTypeEnum.DeleteCompletedTask;
  data: { id: string };
}

export interface AddUpdateProps {
  type: ActionTypeEnum.Update;
  data: TaskProps;
}

export interface CompleteActionProps {
  type: ActionTypeEnum.Completed;
  data: { id: string };
}
