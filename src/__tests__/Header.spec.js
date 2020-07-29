import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Header } from "../components/layout/Header";

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: "1" })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

beforeEach(cleanup);

describe("<Header />", () => {
  describe("Success", () => {
    it("renders <Header />", () => {
      const { queryByTestId } = render(<Header />);
      expect(queryByTestId("header")).toBeTruthy();
    });

    it("renders <Header /> and activates dark mode using click", () => {
      const darkMode = false;
      const setDarkMode = jest.fn(() => !darkMode);

      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      );
      expect(queryByTestId("header")).toBeTruthy();
      
      fireEvent.click(queryByTestId("dark-mode-action"));
      expect(setDarkMode).toHaveReturnedWith(true);
    });
    
    it("renders <Header /> and activates dark mode using keyDown", () => {
      const darkMode = false;
      const setDarkMode = jest.fn(() => !darkMode);

      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      );
      expect(queryByTestId("header")).toBeTruthy();
      
      fireEvent.keyDown(queryByTestId("dark-mode-action"));
      expect(setDarkMode).toHaveReturnedWith(true);
    });

    it("renders <Header /> and sets quick add task to true using click", () => {
      const darkMode = false;

      const { queryByTestId } = render(
        <Header darkMode={darkMode} />
      );
      expect(queryByTestId("header")).toBeTruthy();
    
      fireEvent.click(queryByTestId("quick-add-task-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });

    it("renders <Header /> and sets quick add task to true using keyDown", () => {
      const darkMode = false;

      const { queryByTestId } = render(
        <Header darkMode={darkMode} />
      );
      expect(queryByTestId("header")).toBeTruthy();
    
      fireEvent.keyDown(queryByTestId("quick-add-task-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
    });

    it("renders <Header /> and sets quick add task to true and then false using click", () => {
      const darkMode = false;

      const { queryByTestId } = render(
        <Header darkMode={darkMode} />
      );
      expect(queryByTestId("header")).toBeTruthy();
    
      fireEvent.click(queryByTestId("quick-add-task-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
      
      fireEvent.click(queryByTestId("add-task-quick-cancel"));
      expect(queryByTestId("add-task-main")).toBeFalsy();
    });
    
    it("renders <Header /> and sets quick add task to true and then false using keyDown", () => {
      const darkMode = false;

      const { queryByTestId } = render(
        <Header darkMode={darkMode} />
      );
      expect(queryByTestId("header")).toBeTruthy();
    
      fireEvent.keyDown(queryByTestId("quick-add-task-action"));
      expect(queryByTestId("add-task-main")).toBeTruthy();
      
      fireEvent.keyDown(queryByTestId("add-task-quick-cancel"));
      expect(queryByTestId("add-task-main")).toBeFalsy();
    });
  });
  
});
