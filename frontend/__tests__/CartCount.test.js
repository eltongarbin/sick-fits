import { render, screen } from "@testing-library/react";

import CartCount from "../components/CartCount";

describe("<CartCount />", () => {
  it("renders", () => {
    render(<CartCount count={10} />);
  });

  it("matches snapshot", () => {
    const { container } = render(<CartCount count={11} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("updates via props", () => {
    const { container, rerender } = render(<CartCount count={11} />);
    expect(screen.getByText("11")).toBeInTheDocument();

    rerender(<CartCount count={12} />);
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
