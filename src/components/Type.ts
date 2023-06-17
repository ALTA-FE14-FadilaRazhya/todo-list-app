import { Dispatch } from "react";

export enum PivotKeysEnum {
    Tasks = "Tasks",
    TaskForm = "TaskForm",
    Completed = "CompletedTasks",
}

export interface TaskProps {
    id: string;
    title: string;
}

export interface TodoContextProps {
    activeTask: TaskProps[]
    dispatch : Dispatch<any>
  }

export interface TodoStateProps {
    activeTask: TaskProps[];
  }