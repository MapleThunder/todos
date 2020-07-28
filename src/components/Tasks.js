import React, { useState, useEffect } from "react";
import { Checkbox } from "./Checkbox";
import { useTasks } from "../hooks";
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { AddTask } from "./AddTask";

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  
  let project_name = "";

  if(collatedTasksExist(selectedProject) && selectedProject) {
    project_name = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  if (projects.length > 0 && selectedProject && !collatedTasksExist(selectedProject)) {
    project_name = getTitle(projects, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${project_name}: Todos`
  });

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{ project_name }</h2>

      <ul className="tasks__list">
        {tasks.map(task => (
          <li key={`${task.id}`}>
            <Checkbox id={ task.id } taskDesc={ task.task } />
            <span>{ task.task }</span>
          </li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
}