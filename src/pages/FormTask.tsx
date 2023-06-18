import {
  MessageBar,
  MessageBarType,
  DefaultButton,
  Stack,
  TextField,
} from "@fluentui/react";
import React, { useContext, useEffect, useState } from "react";
import useInput from "../components/useInput";
import { TodoContext } from "../components/ToDoProvider";
import { ActionTypeEnum, TaskProps } from "../components/Type";

type Props = {
  editTaskId: string | null;
};
const FormTask = ({ editTaskId }: Props) => {
  const { activeTask, dispatch } = useContext(TodoContext);

  const title = useInput("");
  const description = useInput("");

  useEffect(() => {
    if (editTaskId) {
      const taskData = activeTask.find((task) => task.id === editTaskId);

      title.set(taskData?.title || "");
      description.set(taskData?.description || "");
    }
  }, [editTaskId]);

  const [showMessage, setShowMessage] = useState<{
    type: MessageBarType;
    message: string;
  }>({ type: MessageBarType.success, message: "" });

  useEffect(() => {
    if (showMessage.message) {
      setTimeout(() => {
        setShowMessage({ type: MessageBarType.success, message: "" });
      }, 1000);
    }
  }, [showMessage.message]);

  const addTaskAction = () => {
    const data: TaskProps = {
      id: "",
      title: title.value,
      description: description.value,
    };
    dispatch({ type: ActionTypeEnum.Add, data });
    setShowMessage({
      type: MessageBarType.success,
      message: "Task succesfully added!",
    });
    title.set("");
    description.set("");
  };

  const updateTaskAction = () => {
    const data: TaskProps = {
      id: editTaskId || "",
      title: title.value,
      description: description.value,
    };
  }

  const onFormSubmit = () => {
    const taskData = activeTask.find((task) => task.id === editTaskId);
    if (taskData) {
      const data: TaskProps = {
        id: taskData.id,
        title: title.value,
        description: description.value,
      };

      dispatch({ type: ActionTypeEnum.Update, data });
      setShowMessage({
        type: MessageBarType.success,
        message: "Task succesfully updated!",
      });
    } else {
      setShowMessage({
        type: MessageBarType.error,
        message: "Error while updating data",
      });
    }
  };

  const onSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    editTaskId ? updateTaskAction() : addTaskAction();

  };

  return (
    <form className="m-10 p-3" onSubmit={onSubmitForm}>
      <TextField label="Title " required {...title} />
      <TextField label="Description" multiline rows={3} {...description} />
      <Stack horizontal tokens={{ childrenGap: 20 }} className="mt-10">
        <Stack style={{ width: "80%" }}>
          {showMessage.message && (
            <MessageBar messageBarType={MessageBarType.success}>
              {showMessage.message}
            </MessageBar>
          )}
        </Stack>

        <Stack style={{ width: "20%" }}>
          <DefaultButton type="submit" text="Add Task" />
        </Stack>
      </Stack>
    </form>
  );
};

export default FormTask;
