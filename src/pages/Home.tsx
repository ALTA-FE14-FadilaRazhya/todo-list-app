import { useState } from "react";
import { Pivot, PivotItem, Stack } from "@fluentui/react";
import { PivotKeysEnum } from "../components/Type";
import List from "./List";

import { initializeIcons } from "@fluentui/font-icons-mdl2";
import ToDoProvider from "../components/ToDoProvider";
import FormTask from "./FormTask";
import CompletedTaskList from "./CompletedTaskList";
initializeIcons();

const Home = () => {
  const [selectedKey, setSelectedKey] = useState<string>(PivotKeysEnum.Tasks);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const editTask = (id: string) => {
    setEditTaskId(id);
    setSelectedKey(PivotKeysEnum.TaskForm);
  };

  return (
    <Stack
      className="container-center absolute w-[46%] h-[80%] translate-y-[-50%] 
    translate-x-[-50%] border shadow-lg rounded-md shadow-slate-500/50 mt-5"
    >
      <ToDoProvider>
        <header className="relative bg-emerald-300 w-full h-[80px]">
          <h2 className="p-5 text-2xl text-bold text-center text-white">
            ToDo List
          </h2>
        </header>
        <Stack>
          <Pivot
            aria-label="Override Selected Item Pivot Example"
            selectedKey={String(selectedKey)}
            styles={{ root: { display: "flex", justifyContent: "center" } }}
            onLinkClick={(item?: PivotItem) => {
              if (item?.props.itemKey !== PivotKeysEnum.TaskForm) {
              }
              setSelectedKey(item?.props.itemKey || PivotKeysEnum.Task);
            }}
          >
            <PivotItem headerText="Task" itemKey={PivotKeysEnum.Tasks}>
              <List setEditTask={editTask} />
            </PivotItem>
            <PivotItem headerText="Task Form" itemKey={PivotKeysEnum.TaskForm}>
              <FormTask editTaskId={editTaskId} />
            </PivotItem>
            <PivotItem headerText="Complete" itemKey={PivotKeysEnum.Completed}>
              <CompletedTaskList />
            </PivotItem>
          </Pivot>
        </Stack>
      </ToDoProvider>
    </Stack>
  );
};

export default Home;
