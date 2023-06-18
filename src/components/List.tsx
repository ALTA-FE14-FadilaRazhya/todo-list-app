import React, { useContext } from "react";
import { Stack } from "@fluentui/react";
import ListStyleSet from "./ListStyle.set";
import { FontIcon } from "@fluentui/react";

import { ActionTypeEnum, TaskProps } from "./Type";
import { TodoContext } from "./ToDoProvider";
import ToDoString from "./String.json";

const List = () => {
  const { activeTask, dispatch } = useContext(TodoContext);

  const onTaskDelete = (id: string) => {
    if (window.confirm(ToDoString.deleteConfirm)) {
      dispatch({ type: ActionTypeEnum.Delete, data: { id } });
    }
  };

  const onRenderCell = (task: TaskProps) => {
    return (
      <Stack horizontal key={task.id} className={ListStyleSet.listItem}>
        <Stack horizontal className="w-[85%]">
          <input type="checkbox" className="checkbox mr-2" />
          {task.title}
        </Stack>
        <Stack horizontal className="w-[15%]">
          <FontIcon iconName="Info" className={ListStyleSet.iconStyle} />
          <FontIcon iconName="EditNote" className={ListStyleSet.iconStyle} />
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
