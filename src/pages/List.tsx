import React, { useContext } from "react";
import { Stack } from "@fluentui/react";
import ListStyleSet from "../components/ListStyle.set";
import { FontIcon } from "@fluentui/react";

import { ActionTypeEnum, TaskProps } from "../components/Type";
import { TodoContext } from "../components/ToDoProvider";
import ToDoString from "../components/String.json";
import Description from "../components/Description";

type Props = {
  setEditTask: (taskId: string) => void;
};

const List = ({ setEditTask }: Props) => {
  const { activeTask, dispatch } = useContext(TodoContext);

  const onTaskDelete = (id: string) => {
    if (window.confirm(ToDoString.deleteConfirm)) {
      dispatch({ type: ActionTypeEnum.Delete, data: { id } });
    }
  };

  const checkboxClickedHdl = (id: string) =>{
    dispatch ({ type: ActionTypeEnum.Completed, data: { id }});
  }
  const onRenderCell = (task: TaskProps) => {
    return (
      <Stack horizontal key={task.id} className={ListStyleSet.listItem}>
        <Stack horizontal className="w-[85%]">
          <input type="checkbox" className="checkbox mr-2" onChange={() => {
            checkboxClickedHdl(task.id)
          }} />
          {task.title}
        </Stack>
        <Stack horizontal className="w-[15%]">
          <Description task={task} />
          <FontIcon
            iconName="EditNote"
            className={ListStyleSet.iconStyle}
            onClick={() => {
              setEditTask(task.id);
            }}
          />
          <FontIcon
            iconName="Delete"
            className={ListStyleSet.iconStyle}
            onClick={() => onTaskDelete(task.id)}
          />
        </Stack>
      </Stack>
    );
  };

  return <div className="m-10">{activeTask.map(onRenderCell)}</div>;
};

export default List;
