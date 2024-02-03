"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRowComponent = void 0;
const tslib_1 = require("tslib");
const ink_1 = require("ink");
const react_1 = tslib_1.__importDefault(require("react"));
/**
 * Intersperses a list of elements with another element.
 */
function intersperse(intersperser, elements) {
    // Intersparse by reducing from left.
    let interspersed = elements.reduce((acc, element, index) => {
        // Only add element if it's the first one.
        if (acc.length === 0)
            return [element];
        // Add the intersparser as well otherwise.
        return [...acc, intersperser(index), element];
    }, []);
    return interspersed;
}
/**
 * Constructs a Row element from the configuration.
 */
function createRowComponent(config) {
    /* This is a component builder. We return a function. */
    const skeleton = config.skeleton;
    const SkeletonComponent = skeleton.component;
    /* Row */
    return (props) => {
        const defKey = props.propKey || props.key;
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "row" },
            react_1.default.createElement(SkeletonComponent, null, skeleton.left),
            ...intersperse((i) => {
                const key = `${defKey}-hseparator-${i}`;
                // The horizontal separator.
                return (react_1.default.createElement(SkeletonComponent, { key: key }, skeleton.cross));
            }, 
            // Values.
            props.columns.map((column, colI) => {
                // content
                const value = props.data[column.column];
                if (value == undefined || value == null) {
                    const key = `${defKey}-empty-${column.key}`;
                    return (react_1.default.createElement(config.cell, { key: key, column: colI }, skeleton.line.repeat(column.width)));
                }
                else {
                    const key = `${defKey}-cell-${column.key}`;
                    // margins
                    const ml = config.padding;
                    const mr = column.width - String(value).length - config.padding;
                    return (
                    /* prettier-ignore */
                    react_1.default.createElement(config.cell, { key: key, column: colI }, `${skeleton.line.repeat(ml)}${String(value)}${skeleton.line.repeat(mr)}`));
                }
            })),
            react_1.default.createElement(SkeletonComponent, null, skeleton.right)));
    };
}
exports.createRowComponent = createRowComponent;
