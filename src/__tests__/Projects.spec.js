import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Projects } from "../components/Projects";

beforeEach(cleanup);

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => "INBOX")
  })),
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

describe("<Projects />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("renders <Projects />", () => {
      const { queryByTestId } = render(<Projects />);
      expect(queryByTestId("project-action")).toBeTruthy();
    });

    it("renders <Projects /> and selects an active project using click", () => {
      const { queryByTestId } = render(<Projects activeValue={1} />);
      expect(queryByTestId("project-action")).toBeTruthy();

      fireEvent.click(queryByTestId("project-action"));
      expect(queryByTestId("project-action-parent").classList.contains("active")).toBeTruthy();
    });

    it("renders <Projects /> and selects an active project using keyDown", () => {
      const { queryByTestId } = render(<Projects activeValue={1} />);
      expect(queryByTestId("project-action")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("project-action"));
      expect(queryByTestId("project-action-parent").classList.contains("active")).toBeTruthy();
    });
  });

  describe("Failure", () => {
    
  });
});