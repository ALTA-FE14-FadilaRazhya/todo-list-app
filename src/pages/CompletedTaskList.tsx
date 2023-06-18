import { Stack, FontIcon, MessageBar } from "@fluentui/react";
import { useContext } from "react";
import Description from "../components/Description";
import ListStyleSet from "../components/ListStyle.set";
import { ActionTypeEnum, TaskProps } from "../components/Type";
import { TodoContext } from "../components/ToDoProvider";
import TodoString from "../components/String.json";

const CompletedTaskList = () => {
  const { completeTask, dispatch } = useContext(TodoContext);

  const onTaskDelete = (id: string) => {
    if (window.confirm(TodoString.deleteConfirm)) {
      dispatch({ type: ActionTypeEnum.DeleteCompletedTask, data: { id } });
    }
  };

  const onRenderCell = (task: TaskProps) => {
    return (
      <Stack horizontal key={task.id} className={ListStyleSet.listItem}>
        <Stack
          horizontal
          className={ListStyleSet.disabled}
          style={{ width: "85%" }}
        >
          <input type="checkbox" disabled />
          <span>{task.title}</span>
        </Stack>

        <Stack horizontal className="w-[15%]">
          <Description task={task} />
          <FontIcon
            style={{ marginRight: "2px" }}
            iconName="Delete"
            className={ListStyleSet.iconStyle}
            // onClick={() => onTaskDelete(task.id)}
          />
        </Stack>
      </Stack>
    );
  };
  return (
    <div className="m-10">
      {completeTask.length ? (
        completeTask.map(onRenderCell)
      ) : (
        <MessageBar>No tasks to show</MessageBar>
      )}
    </div>
  );
};

export default CompletedTaskList;
