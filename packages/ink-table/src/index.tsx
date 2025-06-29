import React from "react";
import { Box, Text } from "ink";
import { sha1 } from "object-hash";

/* Types */

type Scalar = string | number | boolean | null | undefined;
type ScalarDict = { [key: string]: Scalar };

export type CellProps = React.PropsWithChildren<{ column: number }>;

export type TableProps<T extends ScalarDict> = {
  data: T[];
  padding?: number;
  columns?: (keyof T)[];
  cell?: (props: CellProps) => React.JSX.Element;
  header?: (props: React.PropsWithChildren<{}>) => React.JSX.Element;
  skeleton?: (props: React.PropsWithChildren<{}>) => React.JSX.Element;
};

/* Components */

export function Table<T extends ScalarDict>({
  data,
  columns,
  padding = 1,
  cell = Cell,
  header = Header,
  skeleton = Skeleton,
}: TableProps<T>) {
  const allColumns: (keyof T)[] =
    columns ||
    (Array.from(
      new Set(data.flatMap((row) => Object.keys(row))),
    ) as (keyof T)[]);

  const columnMeta = allColumns.map((key) => {
    const maxContentWidth = Math.max(
      String(key).length,
      ...data.map((row) => String(row[key] ?? "").length),
    );

    return {
      column: key,
      key: String(key),
      width: maxContentWidth + padding * 2,
    };
  });

  const headings = Object.fromEntries(
    allColumns.map((col) => [col, col]),
  ) as Partial<T>;

  const RowHeader = row<T>({
    padding,
    cell: skeleton,
    skeleton: {
      line: "─",
      left: "┌",
      right: "┐",
      cross: "┬",
      component: skeleton,
    },
  });

  const RowHeading = row<T>({
    padding,
    cell: header,
    skeleton: {
      line: " ",
      left: "│",
      right: "│",
      cross: "│",
      component: skeleton,
    },
  });

  const RowSeparator = row<T>({
    padding,
    cell: skeleton,
    skeleton: {
      line: "─",
      left: "├",
      right: "┤",
      cross: "┼",
      component: skeleton,
    },
  });

  const RowData = row<T>({
    cell,
    padding,
    skeleton: {
      line: " ",
      left: "│",
      right: "│",
      cross: "│",
      component: skeleton,
    },
  });

  const RowFooter = row<T>({
    padding,
    cell: skeleton,
    skeleton: {
      line: "─",
      left: "└",
      right: "┘",
      cross: "┴",
      component: skeleton,
    },
  });

  return (
    <Box flexDirection="column">
      {RowHeader({ data: {}, key: "header", columns: columnMeta })}
      {RowHeading({ data: headings, key: "heading", columns: columnMeta })}
      {data.map((row, index) => {
        const key = `row-${sha1(row)}-${index}`;

        return (
          <Box flexDirection="column" key={key}>
            {RowSeparator({ data: {}, key: `sep-${key}`, columns: columnMeta })}
            {RowData({ data: row, key: `data-${key}`, columns: columnMeta })}
          </Box>
        );
      })}
      {RowFooter({ data: {}, key: "footer", columns: columnMeta })}
    </Box>
  );
}

/* Helper components */

export function Header(props: React.PropsWithChildren<{}>) {
  return (
    <Text bold color="blue">
      {props.children}
    </Text>
  );
}

export function Cell(props: CellProps) {
  return <Text>{props.children}</Text>;
}

export function Skeleton(props: React.PropsWithChildren<{}>) {
  return <Text bold>{props.children}</Text>;
}

/* Row factory */

type RowConfig = {
  padding: number;
  cell: (props: CellProps) => React.JSX.Element;
  skeleton: {
    left: string;
    line: string;
    right: string;
    cross: string;
    component: (props: React.PropsWithChildren<{}>) => React.JSX.Element;
  };
};

type RowProps<T extends ScalarDict> = {
  key: string;
  data: Partial<T>;
  columns: Column<T>[];
};

type Column<T> = {
  key: string;
  width: number;
  column: keyof T;
};

function row<T extends ScalarDict>(
  config: RowConfig,
): (props: RowProps<T>) => React.JSX.Element {
  const skeleton = config.skeleton;

  return ({ key, data, columns }) => (
    <Box flexDirection="row" key={key}>
      <skeleton.component>{skeleton.left}</skeleton.component>
      {...intersperse(
        (i) => (
          <skeleton.component key={`${key}-sep-${i}`}>
            {skeleton.cross}
          </skeleton.component>
        ),
        columns.map((column, i) => {
          const value = data[column.column];
          const content = value == null ? "" : String(value);
          const leftPad = config.padding;
          const rightPad = column.width - content.length - leftPad;

          return (
            <config.cell key={`${key}-col-${column.key}`} column={i}>
              {`${skeleton.line.repeat(leftPad)}${content}${skeleton.line.repeat(rightPad)}`}
            </config.cell>
          );
        }),
      )}
      <skeleton.component>{skeleton.right}</skeleton.component>
    </Box>
  );
}

/* Util */

function intersperse<T, I>(
  intersperser: (index: number) => I,
  elements: T[],
): (T | I)[] {
  return elements.reduce<(T | I)[]>((acc, el, idx) => {
    if (idx === 0) {
      return [el];
    }

    return [...acc, intersperser(idx), el];
  }, []);
}
