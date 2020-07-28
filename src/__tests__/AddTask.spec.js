import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { AddTask } from "../components/AddTask";
import { useSelectedProjectValue } from "../context";
import { firebase } from "../firebase";

beforeEach(cleanup);

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: "1" })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
})); 

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve("Never mock firebase")),
      })),
    })),
  },
}));

describe("<AddTask />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    /* Render
     =============================== */
    it("renders the <AddTask />", () => {
      const { queryByTestId } = render(<AddTask />);
      expect(queryByTestId("add-task-comp")).toBeTruthy();
    });
    
    it("renders the <AddTask /> quick overlay", () => {
      const setShowQuickAddTask = jest.fn();
      const { queryByTestId } = render(
        <AddTask 
          showAddTaskMain
          shouldShowMain={false}
          showQuickAddTask
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );

      expect(queryByTestId("quick-add-task")).toBeTruthy();
    });

    /* Click
     =============================== */
    it("renders the <AddTask /> main showable when clicked", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);
  
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });

    it("renders the <AddTask /> project overlay on click", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);
  
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
  
      fireEvent.click(queryByTestId("show-project-overlay"));
      expect(queryByTestId("project-overlay")).toBeTruthy();
    });

    it("renders the <AddTask /> date overlay when clicked", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);
  
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
  
      fireEvent.click(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();
    });

    it("hides the <AddTask /> main when cancel is clicked", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);
  
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
  
      fireEvent.click(queryByTestId("add-task-main-cancel"));
      expect(queryByTestId("add-task-main")).toBeFalsy();
    });

    it("renders the <AddTask /> for quick add task and then clicks cancel", () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
  
      const { queryByTestId } = render(
        <AddTask 
            showQuickAddTask
            setShowQuickAddTask={setShowQuickAddTask}
          />
      );
  
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
  
      fireEvent.click(queryByTestId("add-task-quick-cancel"));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it("renders <AddTask /> and quick adds a task to the INBOX and clears state on click", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "INBOX"
      }));
  
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      );
  
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "Bite my shiney metal ass !" }
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "Bite my shiney metal ass !"
      );
  
      fireEvent.click(queryByTestId("add-task"));
      // expect(queryByTestId("add-task-main")).toBeFalsy();
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });
    
    it("renders <AddTask /> and quick adds a task to the TODAY and clears state on click", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "TODAY"
      }));
  
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      );
  
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "Bite my shiney metal ass !" }
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "Bite my shiney metal ass !"
      );
  
      fireEvent.click(queryByTestId("add-task"));
      // expect(queryByTestId("add-task-main")).toBeFalsy();
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });
    
    it("renders <AddTask /> and quick adds a task to the NEXT_7 and clears state on click", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "NEXT_7"
      }));
  
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      );
  
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "Bite my shiney metal ass !" }
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "Bite my shiney metal ass !"
      );
  
      fireEvent.click(queryByTestId("add-task"));
      // expect(queryByTestId("add-task-main")).toBeFalsy();
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it("renders <AddTask /> and adds a task to the INBOX and clears state on click", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "INBOX"
      }));
      const { queryByTestId } = render(<AddTask showAddTaskMain />);
  
      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "Bite my shiney metal ass !" }
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "Bite my shiney metal ass !"
      );
  
      fireEvent.click(queryByTestId("add-task"));
    });

    it("renders <AddTask /> and adds a task with a task date on click", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "1"
      }));

      const { queryByTestId } = render(<AddTask showMain />);

      fireEvent.click(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "Testing task value." }
      });
      expect(queryByTestId("add-task-content").value).toBe("Testing task value.");

      fireEvent.click(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();
      
      fireEvent.click(queryByTestId("task-date-today"));
      expect(queryByTestId("task-date-overlay")).toBeFalsy();

      fireEvent.click(queryByTestId("add-task"));
    });

    /* KeyDown
     =============================== */
    it("renders the <AddTask /> main showable when keyDown", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);
  
      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });
    
    it("renders the <AddTask /> project overlay on keyDown", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);
  
      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
  
      fireEvent.keyDown(queryByTestId("show-project-overlay"));
      expect(queryByTestId("project-overlay")).toBeTruthy();
    });
  
    it("renders the <AddTask /> date overlay when keyDown", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);
  
      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
  
      fireEvent.keyDown(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();
    });
  
    it("hides the <AddTask /> main when cancel is keyDown", () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);
  
      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
  
      fireEvent.keyDown(queryByTestId("add-task-main-cancel"));
      expect(queryByTestId("add-task-main")).toBeFalsy();
    });
  
    it("renders the <AddTask /> for quick add task and then keyDowns cancel", () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
  
      const { queryByTestId } = render(
        <AddTask 
            showQuickAddTask
            setShowQuickAddTask={setShowQuickAddTask}
          />
      );
  
      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
  
      fireEvent.keyDown(queryByTestId("add-task-quick-cancel"));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });
  
    it("renders <AddTask /> and adds a task to the INBOX and clears state on keyDown", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "INBOX"
      }));
  
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      );
  
      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "Bite my shiney metal ass !" }
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "Bite my shiney metal ass !"
      );
  
      fireEvent.keyDown(queryByTestId("add-task"));
      // expect(queryByTestId("add-task-main")).toBeFalsy();
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });
    
    it("renders <AddTask /> and adds a task to the TODAY and clears state on keyDown", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "TODAY"
      }));
  
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      );
  
      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "Bite my shiney metal ass !" }
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "Bite my shiney metal ass !"
      );
  
      fireEvent.keyDown(queryByTestId("add-task"));
      // expect(queryByTestId("add-task-main")).toBeFalsy();
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });
    
    it("renders <AddTask /> and adds a task to the NEXT_7 and clears state on keyDown", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "NEXT_7"
      }));
  
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
      );
  
      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "Bite my shiney metal ass !" }
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "Bite my shiney metal ass !"
      );
  
      fireEvent.keyDown(queryByTestId("add-task"));
      // expect(queryByTestId("add-task-main")).toBeFalsy();
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it("renders <AddTask /> and adds a task to the INBOX and clears state on keyDown", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "INBOX"
      }));
      const { queryByTestId } = render(<AddTask showAddTaskMain />);
  
      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "Bite my shiney metal ass !" }
      });
      expect(queryByTestId("add-task-content").value).toBe(
        "Bite my shiney metal ass !"
      );
  
      fireEvent.keyDown(queryByTestId("add-task"));
    });

    it("renders <AddTask /> and adds a task with a task date on keyDown", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: "1"
      }));

      const { queryByTestId } = render(<AddTask showMain />);

      fireEvent.keyDown(queryByTestId("show-main-action"));
      expect(queryByTestId("add-task-content")).toBeTruthy();
      expect(queryByTestId("add-task-main")).toBeTruthy();

      fireEvent.change(queryByTestId("add-task-content"), {
        target: { value: "Testing task value." }
      });
      expect(queryByTestId("add-task-content").value).toBe("Testing task value.");

      fireEvent.keyDown(queryByTestId("show-task-date-overlay"));
      expect(queryByTestId("task-date-overlay")).toBeTruthy();
      
      fireEvent.keyDown(queryByTestId("task-date-today"));
      expect(queryByTestId("task-date-overlay")).toBeFalsy();

      fireEvent.keyDown(queryByTestId("add-task"));
    });
  });
});