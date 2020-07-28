import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { ProjectOverlay } from "../components/ProjectOverlay";
import { useProjectsValue } from "../context";  

beforeEach(cleanup);

jest.mock("../context", () => ({
  useProjectsValue: jest.fn(() => ({
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

describe("<ProjectOverlay />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("renders <ProjectOverlay /> and calls setShowProjectOverlay using click", () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const { queryByTestId } = render(
        <ProjectOverlay 
          showProjectOverlay 
          setShowProjectOverlay={setShowProjectOverlay} 
          setProject={setProject} 
        />
      );

      expect(queryByTestId("project-overlay")).toBeTruthy();
      fireEvent.click(queryByTestId("project-overlay-action"));
      expect(setProject).toHaveBeenCalled();
    });

    it("renders <ProjectOverlay /> and calls setShowProjectOverlay using keyDown", () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const { queryByTestId } = render(
        <ProjectOverlay 
          showProjectOverlay 
          setShowProjectOverlay={setShowProjectOverlay} 
          setProject={setProject} 
        />
      );

      expect(queryByTestId("project-overlay")).toBeTruthy();
      fireEvent.keyDown(queryByTestId("project-overlay-action"));
      expect(setProject).toHaveBeenCalled();
    });
  });

  describe("Failure", () => {
    it("does not render the project overlay with any project", () => {
      useProjectsValue.mockImplementation(() => ({
        projects: []
      }));

      const { queryByTestId } = render(<ProjectOverlay showProjectOverlay />);

      expect(queryByTestId("project-overlay")).toBeTruthy();
      expect(queryByTestId("project-overlay-action")).toBeFalsy();
    });
  });
});