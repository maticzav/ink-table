import React, { FC } from 'react';
import { ScalarDict } from './types';
export declare type CellProps = React.PropsWithChildren<{
    column: number;
}>;
export declare type TableProps<T extends ScalarDict> = {
    /**
     * List of values (rows).
     */
    data: T[];
    /**
     * Columns that we should display in the table.
     */
    columns?: (keyof T)[];
    /**
     * Cell padding.
     */
    padding?: number;
    /**
     * Header component.
     */
    header?: (props: React.PropsWithChildren<{}>) => JSX.Element;
    /**
     * Component used to render a cell in the table.
     */
    cell?: (props: CellProps) => JSX.Element;
    /**
     * Component used to render the skeleton of the table.
     */
    skeleton?: (props: React.PropsWithChildren<{}>) => JSX.Element;
};
/**
 * Renders the header of a table.
 */
export declare function Header(props: React.PropsWithChildren<{}>): React.JSX.Element;
/**
 * Renders a cell in the table.
 */
export declare function Cell(props: CellProps): React.JSX.Element;
/**
 * Redners the scaffold of the table.
 */
export declare function Skeleton(props: React.PropsWithChildren<{}>): React.JSX.Element;
declare const Table: FC<{
    data: {
        [key: string]: any;
    }[];
    columns?: string[];
    padding?: number;
    header?: (props: React.PropsWithChildren<{}>) => JSX.Element;
    cell?: (props: CellProps) => JSX.Element;
    skeleton?: (props: React.PropsWithChildren<{}>) => JSX.Element;
}>;
export default Table;
//# sourceMappingURL=index.d.ts.map