import { CellProps } from '.';
import { Column, ScalarDict } from './types';
import React from 'react';
declare type RowConfig = {
    /**
     * Component used to render cells.
     */
    cell: (props: CellProps) => JSX.Element;
    /**
     * Tells the padding of each cell.
     */
    padding: number;
    /**
     * Component used to render skeleton in the row.
     */
    skeleton: {
        component: (props: React.PropsWithChildren<{}>) => JSX.Element;
        /**
         * Characters used in skeleton.
         *    |             |
         * (left)-(line)-(cross)-(line)-(right)
         *    |             |
         */
        left: string;
        right: string;
        cross: string;
        line: string;
    };
};
declare type RowProps<T extends ScalarDict> = {
    key: string;
    propKey?: string;
    data: Partial<T>;
    columns: Column<T>[];
};
/**
 * Constructs a Row element from the configuration.
 */
export declare function createRowComponent<T extends ScalarDict>(config: RowConfig): (props: RowProps<T>) => JSX.Element;
export {};
//# sourceMappingURL=createRowComponent.d.ts.map