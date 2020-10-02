import React from "react";
import { render, cleanup, wait } from "react-testing-library";
import userEvent from "user-event";
import Autocomplete from "./Autocomplete";

describe("<Autocomplete />", () => {
  afterEach(cleanup);

  it("it should display the suggestions", async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<Autocomplete />);
    const inputNode = getByPlaceholderText("Type a name");
    expect(inputNode).not.toBeNull();
    await userEvent.type(inputNode, "peter");
    expect(inputNode.value).toBe("peter");
    await wait(() => {
      expect(getByRole('listitem', { name: /PeterPan/i })).not.toBeNull();
      // expect(getByText("PeterPan")).not.toBeNull();
    });
  }, 10000);
});
