import React, { FC } from "react";
import { render, screen, act } from "@testing-library/react";
import useWindowSize from "../../hooks/useWindowSize";

// A test component that uses the hook
const TestComponent: FC = () => {
  const { width, height, isSupported, error } = useWindowSize();

  if (error) {
    return <div data-testid="error">{error.message}</div>;
  }

  return (
    <div>
      <div data-testid="size">
        Width: {width || "undefined"}, Height: {height || "undefined"}
      </div>
      <div data-testid="supported">
        {isSupported ? "supported" : "not supported"}
      </div>
    </div>
  );
};

describe("useWindowSize", () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;
  const originalAddEventListener = window.addEventListener;
  const originalRemoveEventListener = window.removeEventListener;

  // Reset window properties after each test
  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;

    // Ensure any mocks are restored
    jest.restoreAllMocks();
  });

  test("should return current window dimensions", () => {
    // Set specific window dimensions for testing
    window.innerWidth = 1024;
    window.innerHeight = 768;

    render(<TestComponent />);

    expect(screen.getByTestId("size").textContent).toBe(
      "Width: 1024, Height: 768"
    );
  });

  test("should update when window is resized", () => {
    // Set initial dimensions
    window.innerWidth = 1024;
    window.innerHeight = 768;

    render(<TestComponent />);

    expect(screen.getByTestId("size").textContent).toBe(
      "Width: 1024, Height: 768"
    );

    // Simulate resize event
    act(() => {
      window.innerWidth = 800;
      window.innerHeight = 600;
      window.dispatchEvent(new Event("resize"));
    });

    expect(screen.getByTestId("size").textContent).toBe(
      "Width: 800, Height: 600"
    );
  });

  test("should add and remove event listener correctly", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<TestComponent />);

    // Check event listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    // Unmount component
    unmount();

    // Check event listener was removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    // Clean up spies
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  test("should call resize handler immediately on mount", () => {
    // Mock window.innerWidth and innerHeight
    window.innerWidth = 500;
    window.innerHeight = 300;

    render(<TestComponent />);

    // Should have already called the resize handler once
    expect(screen.getByTestId("size").textContent).toBe(
      "Width: 500, Height: 300"
    );
  });

  test("should indicate browser environment is supported", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("supported").textContent).toBe("supported");
  });

  test("should handle error when addEventListener throws", () => {
    // Mock addEventListener to throw an error
    jest.spyOn(window, "addEventListener").mockImplementation(() => {
      throw new Error("Failed to add event listener");
    });

    render(<TestComponent />);

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByTestId("error").textContent).toBe(
      "Failed to add event listener"
    );
  });
});
