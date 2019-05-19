import { SvgPathNode } from '../core/svg-path-node';
import { SvgPathStart } from '../core/svg-path-start';
import { SvgPathLine } from '../core/svg-path-line';
import { SvgPathNodeType } from '../core/svg-path-node-type';
import { Nullable } from '../core/utils/nullable';
import each from 'jest-each';

function createDefault(prev: Nullable<SvgPathNode> = null): SvgPathLine {
    return new SvgPathLine(0, 0, prev);
}

function createStart(x: number = 0, y: number = 0): SvgPathStart {
    return new SvgPathStart(x, y, 0, null);
}

each([
    [10, 20, null],
    [-101, -90, createStart()],
    [0, 0, createDefault()],
    [null, null, null],
    [null, 5, createDefault(createStart())]
])
.test('ctor should create with provided parameters (%#): x: %f, y: %f, prev: %o',
    (x, y, prev) => {
        const sut = new SvgPathLine(x, y, prev);
        expect(sut.x).toBe(x || 0);
        expect(sut.y).toBe(y || 0);
        expect(sut.prev).toBe(prev);
    }
);

test('type getter should return line',
    () => {
        const sut = createDefault();
        expect(sut.type).toBe(SvgPathNodeType.Line);
    }
);

each([
    [10, 20, 10, 20, 0],
    [0, 1, 0, 0, 90],
    [0, 0, 1, 0, 180],
    [15.33, 7.5, 7.322, 5.5324, 13.804362615],
    [-55.6, 11.234, -66.834, -0.63423, 46.572557157]
])
.test('angle in degrees getter should return correct value (%#): x: %f, y: %f, prev x: %f, prev y: %f, expected: %f',
    (x, y, prevX, prevY, expected) => {
        const sut = new SvgPathLine(x, y, createStart(prevX, prevY));
        expect(sut.angleInDegrees).toBeCloseTo(expected, 8);
    }
);

each([
    [10, 20, 10, 20, 0],
    [0, 1, 0, 0, 1],
    [0, 0, -1, 0, 1],
    [15.33, 7.5, 7.322, 5.5324, 8.246181768],
    [-55.6, 11.234, -66.834, -0.63423, 16.341898278]
])
.test('length getter should return correct value (%#): x: %f, y: %f, prev x: %f, prev y: %f, expected: %f',
    (x, y, prevX, prevY, expected) => {
        const sut = new SvgPathLine(x, y, createStart(prevX, prevY));
        expect(sut.length).toBeCloseTo(expected, 8);
    }
);

each([
    [10, 20, -10],
    [0, 0, 0],
    [-7, -7, 0],
    [15.33, 7.5, 7.83],
    [-55.6, 11.234, -66.834]
])
.test('dx getter should return correct value (%#): x: %f, prev x: %f, expected: %f',
    (x, prevX, expected) => {
        const sut = new SvgPathLine(x, 0, createStart(prevX));
        expect(sut.dx).toBeCloseTo(expected, 8);
    }
);

each([
    [10, 20, -10],
    [0, 0, 0],
    [-7, -7, 0],
    [15.33, 7.5, 7.83],
    [-55.6, 11.234, -66.834]
])
.test('dy getter should return correct value (%#): y: %f, prev y: %f, expected: %f',
    (y, prevY, expected) => {
        const sut = new SvgPathLine(0, y, createStart(0, prevY));
        expect(sut.dy).toBeCloseTo(expected, 8);
    }
);

each([
    [10, 20],
    [0, 0],
    [-5, -20],
    [null, null]
])
.test('x and y setters should set correct values (%#): x: %f, y: %f',
    (x, y) => {
        const sut = createDefault();
        sut.x = x;
        sut.y = y;
        expect(sut.x).toBe(x || 0);
        expect(sut.y).toBe(y || 0);
    }
);

each([
    [0, 0, null],
    [10, -50, createStart()]
])
.test('copy should return new valid object (%#): x: %f, y: %f, prev: %o',
    (x, y, prev) => {
        const sut = new SvgPathLine(x, y, createStart());
        const result = sut.copy(prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathLine).toBe(true);
        expect(result.x).toBe(sut.x);
        expect(result.y).toBe(sut.y);
        expect(result.prev).toBe(prev);
    }
);

each([
    [0, 0, { x: 0, y: 0 }, 0, null, { x: 0, y: 0 }],
    [10, -20, { x: 5, y: -5 }, 0, createDefault(), { x: 5, y: -5 }],
    [-5, -1, { x: 0, y: 0 }, 1, null, { x: -5, y: -1 }],
    [12.5, -0.5, { x: 5, y: -5 }, 1, createDefault(createStart()), { x: 12.5, y: -0.5 }],
    [7.7, 0, { x: 0, y: 0 }, 2, null, { x: 15.4, y: 0 }],
    [3.3, 22.87, { x: 12.1, y: 3.5 }, 2.8, null, { x: -12.54, y: 57.736 }]
])
.test('scale should return new valid object (%#): x: %f, y: %f, origin: %o, scale: %f, prev: %o, expected point: %o',
    (x, y, origin, scale, prev, expected) => {
        const sut = new SvgPathLine(x, y, createStart());
        const result = sut.scale(origin.x, origin.y, scale, prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathLine).toBe(true);
        expect(result.x).toBeCloseTo(expected.x, 8);
        expect(result.y).toBeCloseTo(expected.y, 8);
        expect(result.prev).toBe(prev);
    }
);

each([
    [0, 0, 0, 0, 0, ''],
    [1, -1.7, 0, 0, 1, 'L 1.0 -1.7'],
    [0, 0, 1, 1, 2, 'L 0.00 0.00'],
    [0, 5.5, 0, 2.3, 3, 'V 5.500'],
    [3.12, 0, 4.55, 0, 4, 'H 3.1200'],
    [-0.5678, 5.1234, 2.433, -23.312, 5, 'L -0.56780 5.12340'],
    [12.77, -3.33456, 12.77, 3.3, 6, 'V -3.334560'],
    [1, -0.0005543, -9.7676, -0.0006, 4, 'H 1.0000']
])
.test('create svg command should return correct result (%#): x: %f, y: %f, prev x: %f, prev y: %f, precision: %f, expected: %s',
    (x, y, prevX, prevY, precision, expected) => {
        const sut = new SvgPathLine(x, y, createStart(prevX, prevY));
        expect(sut.createSvgCommand(precision)).toBe(expected);
    }
);
