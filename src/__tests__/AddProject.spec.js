import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { AddProject } from "../components/AddProject";
import { useSelectedProjectValue } from "../context";

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: "🍟 Food",
        projectId: "1",
        userId: "bffa9620120b43a99289e742c8dbff71",
        docId: "french-fries"
      },
      {
        name: "⚽️ Football",
        projectId: "2",
        userId: "bffa9620120b43a99289e742c8dbff71",
        docId: "football-sport"
      },
      {
        name: "💰 Finances",
        projectId: "3",
        userId: "bffa9620120b43a99289e742c8dbff71",
        docId: "money-bag"
      },
    ],
    setProjects: jest.fn()
  })),
}));

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve("I am resolved.")),
      })),
    })),
  },
}));

beforeEach(cleanup);

describe("<AddProject />", () => {
  describe("Success", () => {
    it("renders <AddProject />", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
    });

    it("renders <AddProject /> and adds a project using click", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();

      fireEvent.change(queryByTestId("project-name"), { 
        target: { value: "Test project name" } 
      });
      expect(queryByTestId("project-name").value).toBe("Test project name");
      fireEvent.click(queryByTestId("add-project-submit"));
    });
    
    it("renders <AddProject /> and adds a project using keyDown", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();

      fireEvent.change(queryByTestId("project-name"), { 
        target: { value: "Test project name" } 
      });
      expect(queryByTestId("project-name").value).toBe("Test project name");
      fireEvent.keyDown(queryByTestId("add-project-submit"));
    });
    
    it("hides <AddProject /> when cancelled using click", () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();
      fireEvent.click(getByText("Cancel"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });
    
    it("hides <AddProject /> when cancelled using keyDown", () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();
      fireEvent.keyDown(getByText("Cancel"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });

    it("hides <AddProject /> using click singular and reverse action", () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();
      
      fireEvent.click(queryByTestId("add-project-action"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });
    
    it("hides <AddProject /> using keyDown singular and reverse action", () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();
      
      fireEvent.keyDown(queryByTestId("add-project-action"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });
  });
  
});
