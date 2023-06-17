import React, { createContext, useState } from "react";
import { Label, Pivot, PivotItem, Stack } from "@fluentui/react";
import { PivotKeysEnum, TaskProps } from "../components/Type";
import List from "../components/List";

import { initializeIcons } from "@fluentui/font-icons-mdl2";
import ToDoProvider from "../components/ToDoProvider";
import FormTask from "./FormTask";
initializeIcons();

const Home = () => {
  const [selectedKey, setSelectedKey] = useState<string>(PivotKeysEnum.Tasks);

  return (
    <Stack
      className="container-center absolute w-[60%] h-[80%] translate-y-[-50%] 
    translate-x-[-50%] border shadow-lg rounded-md shadow-slate-500/50 m-10"
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
              setSelectedKey(item?.props.itemKey || PivotKeysEnum.Tasks);
            }}
          >
            <PivotItem headerText="Task" itemKey={PivotKeysEnum.Tasks}>
              <List />
            </PivotItem>
            <PivotItem headerText="Task Form" itemKey={PivotKeysEnum.TaskForm}>
              <FormTask />
            </PivotItem>
            <PivotItem headerText="Complete" itemKey={PivotKeysEnum.Completed}>
              <Label className="m-10">Pivot #3</Label>
            </PivotItem>
          </Pivot>
        </Stack>
      </ToDoProvider>
    </Stack>
  );
};

export default Home;
