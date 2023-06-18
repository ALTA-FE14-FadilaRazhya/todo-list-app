import { Dispatch } from "react";

export enum PivotKeysEnum {
  Tasks = "Tasks",
  TaskForm = "TaskForm",
  Completed = "CompletedTasks",
}

export interface TaskProps {
  id: string;
  title: string;
  description?: string;
}

export interface TodoContextProps {
  activeTask: TaskProps[];
  dispatch: Dispatch<any>;
}

export interface TodoStateProps {
  activeTask: TaskProps[];
}

export enum ActionTypeEnum {
  Add,
  Delete,
}

export type ReducerActProps = AddActionProps | DeleteActProps

export interface AddActionProps {
  type: ActionTypeEnum.Add;
  data: TaskProps;
}

export interface DeleteActProps {
  type: ActionTypeEnum.Delete;
  data: { id: string };
}
