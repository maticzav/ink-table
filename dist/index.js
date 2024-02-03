"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = exports.Cell = exports.Header = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const ink_1 = require("ink");
const object_hash_1 = require("object-hash");
const createRowComponent_1 = require("./createRowComponent");
const getDataKeys = (dataList) => {
    const keys = new Set();
    // Collect all the keys.
    for (const data of dataList) {
        for (const key in data) {
            keys.add(key);
        }
    }
    return Array.from(keys);
};
/* Helper components */
/**
 * Renders the header of a table.
 */
function Header(props) {
    return (react_1.default.createElement(ink_1.Text, { bold: true, color: "blue" }, props.children));
}
exports.Header = Header;
/**
 * Renders a cell in the table.
 */
function Cell(props) {
    return react_1.default.createElement(ink_1.Text, null, props.children);
}
exports.Cell = Cell;
/**
 * Redners the scaffold of the table.
 */
function Skeleton(props) {
    return react_1.default.createElement(ink_1.Text, { bold: true }, props.children);
}
exports.Skeleton = Skeleton;
const Table = ({ data, columns: columnNames = getDataKeys(data), padding = 1, header = Header, cell = Cell, skeleton = Skeleton, }) => {
    const headings = (0, react_1.useMemo)(() => columnNames.reduce((acc, column) => ({ ...acc, [column]: column }), {}), columnNames);
    const columnConfigs = (0, react_1.useMemo)(() => columnNames.map((key) => {
        const header = String(key).length;
        /* Get the width of each cell in the column */
        const dataValues = data.map((data) => {
            const value = data[key];
            if (value == undefined || value == null)
                return 0;
            return String(value).length;
        });
        const width = Math.max(...dataValues, header) + padding * 2;
        /* Construct a cell */
        return {
            column: key,
            width: width,
            key: String(key),
        };
    }), columnNames);
    // The top most line in the table.
    const Top = (0, react_1.useMemo)(() => (0, createRowComponent_1.createRowComponent)({
        cell: skeleton,
        padding: padding,
        skeleton: {
            component: skeleton,
            // chars
            line: '─',
            left: '┌',
            right: '┐',
            cross: '┬',
        },
    }), [header, skeleton, padding]);
    // The line with column names.
    const Heading = (0, react_1.useMemo)(() => (0, createRowComponent_1.createRowComponent)({
        cell: header,
        padding: padding,
        skeleton: {
            component: skeleton,
            // chars
            line: ' ',
            left: '│',
            right: '│',
            cross: '│',
        },
    }), [header, skeleton, padding]);
    // The line that separates rows.
    const Separator = (0, react_1.useMemo)(() => (0, createRowComponent_1.createRowComponent)({
        cell: skeleton,
        padding: padding,
        skeleton: {
            component: skeleton,
            // chars
            line: '─',
            left: '├',
            right: '┤',
            cross: '┼',
        },
    }), [header, skeleton, padding]);
    // The row with the data.
    const Data = (0, react_1.useMemo)(() => (0, createRowComponent_1.createRowComponent)({
        cell,
        padding,
        skeleton: {
            component: skeleton,
            // chars
            line: ' ',
            left: '│',
            right: '│',
            cross: '│',
        },
    }), [header, skeleton, padding]);
    // The bottom most line of the table.
    const Footer = (0, react_1.useMemo)(() => (0, createRowComponent_1.createRowComponent)({
        cell: skeleton,
        padding,
        skeleton: {
            component: skeleton,
            // chars
            line: '─',
            left: '└',
            right: '┘',
            cross: '┴',
        },
    }), [header, skeleton, padding]);
    /**
     * Render the table line by line.
     */
    return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
        react_1.default.createElement(Top, { key: "header", propKey: "header", columns: columnConfigs, data: {} }),
        react_1.default.createElement(Heading, { key: "heading", propKey: "heading", columns: columnConfigs, data: headings }),
        data.map((row, index) => {
            // Calculate the hash of the row based on its value and position
            const key = `row-${(0, object_hash_1.sha1)(row)}-${index}`;
            // Construct a row.
            return (react_1.default.createElement(ink_1.Box, { flexDirection: "column", key: key },
                react_1.default.createElement(Separator, { key: `separator-${key}`, propKey: `separator-${key}`, columns: columnConfigs, data: {} }),
                react_1.default.createElement(Data, { key: `data-${key}`, propKey: `data-${key}`, columns: columnConfigs, data: row })));
        }),
        react_1.default.createElement(Footer, { key: "footer", propKey: "footer", columns: columnConfigs, data: {} })));
};
exports.default = Table;
