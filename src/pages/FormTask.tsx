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

const FormTask = () => {
  const { dispatch } = useContext(TodoContext);

  const [showMessage, setShowMessage] = useState<{
    type: MessageBarType;
    message: string;
  }>({ type: MessageBarType.success, message: "" });

  const title = useInput("");
  const description = useInput("");

  useEffect(() => {
    if (showMessage.message) {
      setTimeout(() => {
        setShowMessage({ type: MessageBarType.success, message: "" });
      }, 1000);
    }
  }, [showMessage.message]);

  const onSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

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
  };

  return (
    <form className="m-10 p-3" onSubmit={onSubmitForm}>
      <TextField label="Title " required {...title} />
      <TextField label="Description" multiline rows={3} {...description} />
      <Stack horizontal tokens={{ childrenGap: 20 }} className="mt-10">
        <Stack style={{ width: "80%" }}>
          {showMessage.message && (
            <MessageBar messageBarType={MessageBarType.success}>
              Task succesfully added!
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
