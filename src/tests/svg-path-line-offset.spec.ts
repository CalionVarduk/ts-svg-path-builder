import { SvgPathNode } from '../core/svg-path-node';
import { SvgPathStart } from '../core/svg-path-start';
import { SvgPathLineOffset } from '../core/svg-path-line-offset';
import { SvgPathNodeType } from '../core/svg-path-node-type';
import each from 'jest-each';

function createDefault(prev: SvgPathNode): SvgPathLineOffset {
    return new SvgPathLineOffset(0, 0, prev);
}

function createStart(x: number = 0, y: number = 0): SvgPathStart {
    return new SvgPathStart(x, y, 0, null);
}

each([
    [-101, -90, createStart()],
    [0, 0, createDefault(createStart())],
    [null, null, createDefault(createStart())]
])
.test('ctor should create with provided parameters (%#): dx: %f, dy: %f, prev: %o',
    (dx, dy, prev) => {
        const sut = new SvgPathLineOffset(dx, dy, prev);
        expect(sut.dx).toBe(dx || 0);
        expect(sut.dy).toBe(dy || 0);
        expect(sut.prev).toBe(prev);
    }
);

test('ctor should throw when prev is not defined',
    () => {
        const action = () => new SvgPathLineOffset(0, 0, null as any);
        expect(action).toThrowError();
    }
);

test('type getter should return line offset',
    () => {
        const sut = createDefault(createStart());
        expect(sut.type).toBe(SvgPathNodeType.LineOffset);
    }
);

each([
    [10, 20, 10, 20, 63.434948822],
    [0, 1, 0, 0, 90],
    [0, 0, 1, 0, 0],
    [15.33, 7.5, 7.322, 5.5324, 26.069581157],
    [-55.6, 11.234, -66.834, -0.63423, 168.57715358]
])
.test('angle in degrees getter should return correct value (%#): dx: %f, dy: %f, prev x: %f, prev y: %f, expected: %f',
    (dx, dy, prevX, prevY, expected) => {
        const sut = new SvgPathLineOffset(dx, dy, createStart(prevX, prevY));
        expect(sut.angleInDegrees).toBeCloseTo(expected, 8);
    }
);

each([
    [10, 20, 10, 20, 22.360679774],
    [0, 1, 0, 0, 1],
    [0, 0, -1, 0, 0],
    [15.33, 7.5, 7.322, 5.5324, 17.066308915],
    [-55.6, 11.234, -66.834, -0.63423, 56.723564380]
])
.test('length getter should return correct value (%#): dx: %f, dy: %f, prev x: %f, prev y: %f, expected: %f',
    (dx, dy, prevX, prevY, expected) => {
        const sut = new SvgPathLineOffset(dx, dy, createStart(prevX, prevY));
        expect(sut.length).toBeCloseTo(expected, 8);
    }
);

each([
    [10, 20],
    [0, 0],
    [-7, -7],
    [15.33, 7.5],
    [-55.6, 11.234]
])
.test('dx getter should return correct value (%#): dx: %f, prev x: %f',
    (dx, prevX) => {
        const sut = new SvgPathLineOffset(dx, 0, createStart(prevX));
        expect(sut.dx).toBeCloseTo(dx, 8);
    }
);

each([
    [10, 20, 30],
    [null, 0, 0],
    [-7, -7, -14],
    [15.33, 7.5, 22.83],
    [-55.6, 11.234, -44.366]
])
.test('dx setter should set correct x (%#): dx: %f, prev x: %f, expected x: %f',
    (dx, prevX, expectedX) => {
        const sut = new SvgPathLineOffset(0, 0, createStart(prevX));
        sut.dx = dx;
        expect(sut.dx).toBeCloseTo(dx || 0, 8);
        expect(sut.x).toBeCloseTo(expectedX, 8);
    }
);

each([
    [10, 20],
    [0, 0],
    [-7, -7],
    [15.33, 7.5],
    [-55.6, 11.234]
])
.test('dy getter should return correct value (%#): dy: %f, prev y: %f',
    (dy, prevY) => {
        const sut = new SvgPathLineOffset(0, dy, createStart(0, prevY));
        expect(sut.dy).toBeCloseTo(dy, 8);
    }
);

each([
    [10, 20, 30],
    [null, 0, 0],
    [-7, -7, -14],
    [15.33, 7.5, 22.83],
    [-55.6, 11.234, -44.366]
])
.test('dy setter should set correct y (%#): dy: %f, prev y: %f, expected y: %f',
    (dy, prevY, expectedY) => {
        const sut = new SvgPathLineOffset(0, 0, createStart(0, prevY));
        sut.dy = dy;
        expect(sut.dy).toBeCloseTo(dy || 0, 8);
        expect(sut.y).toBeCloseTo(expectedY, 8);
    }
);

each([
    [10, 20, -10],
    [null, 0, 0],
    [-7, -7, 0],
    [15.33, 7.5, 7.83],
    [-55.6, 11.234, -66.834]
])
.test('x setter should set correct dx (%#): x: %f, prev x: %f, expected dx: %f',
    (x, prevX, expectedDx) => {
        const sut = new SvgPathLineOffset(0, 0, createStart(prevX));
        sut.x = x;
        expect(sut.x).toBe(x || 0);
        expect(sut.dx).toBeCloseTo(expectedDx, 8);
    }
);

each([
    [10, 20, -10],
    [null, 0, 0],
    [-7, -7, 0],
    [15.33, 7.5, 7.83],
    [-55.6, 11.234, -66.834]
])
.test('y setter should set correct dy (%#): y: %f, prev y: %f, expected dy: %f',
    (y, prevY, expectedDy) => {
        const sut = new SvgPathLineOffset(0, 0, createStart(0, prevY));
        sut.y = y;
        expect(sut.y).toBe(y || 0);
        expect(sut.dy).toBeCloseTo(expectedDy, 8);
    }
);

each([
    [0, 0, createStart()],
    [10, -50, createStart()]
])
.test('copy should return new valid object (%#): dx: %f, dy: %f, prev: %o',
    (dx, dy, prev) => {
        const sut = new SvgPathLineOffset(dx, dy, createStart());
        const result = sut.copy(prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathLineOffset).toBe(true);
        expect(result.x).toBe(sut.x);
        expect(result.y).toBe(sut.y);
        expect(result.prev).toBe(prev);
    }
);

test('copy should throw when prev is not defined',
    () => {
        const sut = new SvgPathLineOffset(0, 0, createStart());
        const action = () => sut.copy(null as any);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, { x: 0, y: 0 }, 0, { x: 0, y: 0 }],
    [10, -20, { x: 5, y: -5 }, 0, { x: 0, y: 0 }],
    [-5, -1, { x: 0, y: 0 }, 1, { x: -5, y: -1 }],
    [12.5, -0.5, { x: 5, y: -5 }, 1, { x: 12.5, y: -0.5 }],
    [7.7, 0, { x: 0, y: 0 }, 2, { x: 15.4, y: 0 }],
    [3.3, 22.87, { x: 12.1, y: 3.5 }, 2.8, { x: 9.24, y: 64.036 }]
])
.test('scale should modify node properly (%#): dx: %f, dy: %f, origin: %o, scale: %f, expected point: %o',
    (dx, dy, origin, scale, expected) => {
        const sut = new SvgPathLineOffset(dx, dy, createStart());
        sut.scale(origin.x, origin.y, scale);
        expect(sut.x).toBeCloseTo(expected.x, 8);
        expect(sut.y).toBeCloseTo(expected.y, 8);
    }
);

each([
    [0, 0, 0, 0, { x: 0, y: 0 }],
    [10, -20, 5, -5, { x: 15, y: -25 }],
    [-5, -1, 0.5, 1, { x: -4.5, y: 0 }],
    [12.5, -0.5, -5, 1.2, { x: 7.5, y: 0.7 }],
    [7.7, 0, 2.355, 12.411, { x: 10.055, y: 12.411 }],
    [3.3, 22.87, 12.1, -2.8, { x: 15.4, y: 20.07 }]
])
.test(`translate should modify node properly (%#): dx: %f, dy: %f, translate dx: %f, translate dy: %f, expected point: %o`,
    (dx, dy, tdx, tdy, expected) => {
        const sut = new SvgPathLineOffset(dx, dy, createStart());
        sut.translate(tdx, tdy);
        expect(sut.x).toBeCloseTo(expected.x, 8);
        expect(sut.y).toBeCloseTo(expected.y, 8);
    }
);

each([
    [0, 0, 0, 0, 0, ''],
    [1, -1.7, 0, 0, 1, 'l 1.0 -1.7'],
    [1, 1, 1, 1, 2, 'l 1.00 1.00'],
    [0, 5.5, 0, 2.3, 3, 'v 5.500'],
    [3.12, 0, 4.55, 0, 4, 'h 3.1200'],
    [-0.5678, 5.1234, 2.433, -23.312, 5, 'l -0.56780 5.12340'],
    [12.77, -3.33456, 12.77, 3.3, 6, 'l 12.770000 -3.334560'],
    [1, -0.0005543, -9.7676, -0.0006, 4, 'l 1.0000 -0.0006']
])
.test('create svg command should return correct result (%#): dx: %f, dy: %f, prev x: %f, prev y: %f, precision: %f, expected: %s',
    (dx, dy, prevX, prevY, precision, expected) => {
        const sut = new SvgPathLineOffset(dx, dy, createStart(prevX, prevY));
        expect(sut.createSvgCommand(precision)).toBe(expected);
    }
);
