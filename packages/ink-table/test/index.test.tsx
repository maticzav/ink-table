import React from "react";
import { Text } from "ink";
import stripAnsi from "strip-ansi";
import { test, expect } from "vitest";
import { render } from "ink-testing-library";

import { Table } from "../src/index.js";

const Custom = ({ children }: React.PropsWithChildren<{}>) => (
  <Text italic color="red">
    {children}
  </Text>
);

// Tests ---------------------------------------------------------------------

test("Renders table.", () => {
  const data = [{ name: "Foo" }];

  const { lastFrame: actual } = render(<Table data={data} />);

  expect(stripAnsi("\n" + actual())).toMatchSnapshot();
});

test("Renders table with numbers.", () => {
  const data = [{ age: 12, name: "Foo" }];
  const { lastFrame: actual } = render(<Table data={data} />);

  expect(stripAnsi("\n" + actual())).toMatchSnapshot();
});

test("Renders table with multiple rows.", () => {
  const data = [
    { age: 12, name: "Foo" },
    { age: 0, name: "Bar" },
  ];
  const { lastFrame: actual } = render(<Table data={data} />);

  expect(stripAnsi("\n" + actual())).toMatchSnapshot();
});

test("Renders table with undefined value.", () => {
  const data = [{ name: "Foo" }, { age: 15, name: "Bar" }];
  const { lastFrame: actual } = render(<Table data={data} />);

  expect(stripAnsi("\n" + actual())).toMatchSnapshot();
});

test("Renders table with custom padding.", () => {
  const data = [
    { age: 12, name: "Foo" },
    { age: 15, name: "Bar" },
  ];
  const { lastFrame: actual } = render(<Table data={data} padding={3} />);

  expect(stripAnsi("\n" + actual())).toMatchSnapshot();
});

test("Renders table with custom header.", () => {
  const data = [
    { age: 12, name: "Foo" },
    { age: 15, name: "Bar" },
  ];
  const { lastFrame: actual } = render(<Table data={data} header={Custom} />);

  expect(stripAnsi("\n" + actual())).toMatchSnapshot();
});

test("Renders table with custom cell.", () => {
  const data = [
    { age: 12, name: "Foo" },
    { age: 15, name: "Bar" },
  ];
  const { lastFrame: actual } = render(<Table data={data} cell={Custom} />);

  expect(stripAnsi("\n" + actual())).toMatchSnapshot();
});

test("Renders table with custom skeleton.", () => {
  const data = [
    { age: 12, name: "Foo" },
    { age: 15, name: "Bar" },
  ];
  const { lastFrame: actual } = render(<Table data={data} skeleton={Custom} />);

  expect(stripAnsi("\n" + actual())).toMatchSnapshot();
});

// ---------------------------------------------------------------------------
