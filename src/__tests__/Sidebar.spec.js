import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Sidebar } from "../components/layout/Sidebar";

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

beforeEach(cleanup);

describe("<Sidebar />", () => {
  describe("Success", () => {
    it("renders <Sidebar />", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
    });

    /* Click
     =============================== */
    it("changes the active project to Inbox in collated tasks using click", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.click(queryByTestId("inbox-action"));
      expect(queryByTestId("inbox").classList.contains("active")).toBeTruthy();
      expect(queryByTestId("today").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("next_7").classList.contains("active")).toBeFalsy();
    });
    
    it("changes the active project to Today in collated tasks using click", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.click(queryByTestId("today-action"));
      expect(queryByTestId("inbox").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("today").classList.contains("active")).toBeTruthy();
      expect(queryByTestId("next_7").classList.contains("active")).toBeFalsy();
    });
    
    it("changes the active project to Next 7 in collated tasks using click", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.click(queryByTestId("next_7-action"));
      expect(queryByTestId("inbox").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("today").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("next_7").classList.contains("active")).toBeTruthy();
    });
    
    it("closes the projects sidebar using click", () => {
      const { queryByTestId, queryByText } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
      expect(queryByTestId("projects-chevron").classList.contains("hidden-projects")).toBeFalsy();

      fireEvent.click(queryByTestId("show-hide-projects"));
      expect(queryByTestId("projects-chevron").classList.contains("hidden-projects")).toBeTruthy();
      expect(queryByText("Add Project")).toBeFalsy();

      fireEvent.click(queryByTestId("show-hide-projects"));
      expect(queryByTestId("projects-chevron").classList.contains("hidden-projects")).toBeFalsy();
      expect(queryByText("Add Project")).toBeTruthy();
    });

    /* KeyDown
     =============================== */
     it("changes the active project to Inbox in collated tasks using keyDown", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("inbox-action"));
      expect(queryByTestId("inbox").classList.contains("active")).toBeTruthy();
      expect(queryByTestId("today").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("next_7").classList.contains("active")).toBeFalsy();
    });
    
    it("changes the active project to Today in collated tasks using keyDown", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("today-action"));
      expect(queryByTestId("inbox").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("today").classList.contains("active")).toBeTruthy();
      expect(queryByTestId("next_7").classList.contains("active")).toBeFalsy();
    });
    
    it("changes the active project to Next 7 in collated tasks using keyDown", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("next_7-action"));
      expect(queryByTestId("inbox").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("today").classList.contains("active")).toBeFalsy();
      expect(queryByTestId("next_7").classList.contains("active")).toBeTruthy();
    });

    it("hides and shows the projects sidebar using keyDown", () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId("sidebar")).toBeTruthy();
      expect(queryByTestId("projects-chevron").classList.contains("hidden-projects")).toBeFalsy();

      fireEvent.keyDown(queryByTestId("show-hide-projects"));
      expect(queryByTestId("projects-chevron").classList.contains("hidden-projects")).toBeTruthy();
      
      fireEvent.keyDown(queryByTestId("show-hide-projects"));
      expect(queryByTestId("projects-chevron").classList.contains("hidden-projects")).toBeFalsy();
    });
  });
});
