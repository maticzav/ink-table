export declare type Scalar = string | number | boolean | null | undefined;
export declare type ScalarDict = {
    [key: string]: Scalar;
};
export declare type Column<T> = {
    key: string;
    column: keyof T;
    width: number;
};
//# sourceMappingURL=types.d.ts.map