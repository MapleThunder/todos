import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { IndividualProject } from "../components/IndividualProject";

beforeEach(cleanup);

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() => Promise.resolve("Don't mock firebase"))
        })),
      })),
    })),
  },
}));

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => "INBOX"),
  })),
  useProjectsValue: jest.fn(() => ({
    setProjects: jest.fn(),
    projects: [
      {
        name: "🍟 Food",
        projectId: "1",
        userId: "bffa9620120b43a99289e742c8dbff71",
        docId: "french-fries"
      }
    ]
  })),
}));

describe("<IndividualProject />", () => {
  const project = {
    name: "🍟 Food",
    projectId: "1",
    userId: "bffa9620120b43a99289e742c8dbff71",
    docId: "french-fries"
  };

  describe("Success", () => {
    it("renders the project", () => {
      const { getByText } = render(<IndividualProject project={project} />);
      expect(getByText("🍟 Food")).toBeTruthy();
    });

    it("renders the delete overlay and then deletes a project using click", () => {
      const { queryByTestId, getByText } = render(<IndividualProject project={project} />);

      fireEvent.click(queryByTestId("delete-project"));
      expect(getByText("Are you sure you want to delete this project ?")).toBeTruthy();

      fireEvent.click(getByText("Delete"));
    });
    
    it("renders the delete overlay and then deletes a project using keyDown", () => {
      const { queryByTestId, getByText } = render(<IndividualProject project={project} />);

      fireEvent.keyDown(queryByTestId("delete-project"));
      expect(getByText("Are you sure you want to delete this project ?")).toBeTruthy();

      fireEvent.keyDown(getByText("Delete"));
    });
    
    it("renders the delete overlay and then cancels using click", () => {
      const { queryByTestId, getByText } = render(<IndividualProject project={project} />);

      fireEvent.click(queryByTestId("delete-project"));
      expect(getByText("Are you sure you want to delete this project ?")).toBeTruthy();

      fireEvent.click(getByText("Cancel"));
    });
    
    it("renders the delete overlay and then cancels using keyDown", () => {
      const { queryByTestId, getByText } = render(<IndividualProject project={project} />);

      fireEvent.keyDown(queryByTestId("delete-project"));
      expect(getByText("Are you sure you want to delete this project ?")).toBeTruthy();

      fireEvent.keyDown(getByText("Cancel"));
    });
  })
  
});