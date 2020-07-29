import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Tasks } from "../components/Tasks";
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
  })),
}));

jest.mock("../hooks", () => ({
  useTasks: jest.fn(() => ({
    tasks: [
      {
        id: "NYrFTmiqzpRluyT5rreW",
        archived: false,
        date: "02/08/2020",
        projectId: "1",
        task: "a task for next week",
        userId: "bffa9620120b43a99289e742c8dbff71"
      }
    ]
  }))
}));

beforeEach(cleanup);

describe("<Tasks />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Success", () => {
    it("renders <Tasks />", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        setSelectedProject: jest.fn(() => "INBOX"),
        selectedProject: "INBOX",
      }));
      const { queryByTestId } = render(<Tasks />);
      expect(queryByTestId("tasks")).toBeTruthy();
      expect(queryByTestId("project-name").textContent).toBe("Inbox");
    });
    
    it("renders <Tasks /> with a project title", () => {
      useSelectedProjectValue.mockImplementation(() => ({
        setSelectedProject: jest.fn(() => "1"),
        selectedProject: "1",
      }));
      const { queryByTestId } = render(<Tasks />);
      expect(queryByTestId("tasks")).toBeTruthy();
      expect(queryByTestId("project-name").textContent).toBe("🍟 Food");
    });
  });
  
})
