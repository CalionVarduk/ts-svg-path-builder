import { SvgPathNode } from '../core/svg-path-node';
import { SvgPathStart } from '../core/svg-path-start';
import { SvgPathSmoothCubicCurve } from '../core/svg-path-smooth-cubic-curve';
import { SvgPathCubicCurve } from '../core/svg-path-cubic-curve';
import { SvgPathNodeType } from '../core/svg-path-node-type';
import each from 'jest-each';

function create(x: number, y: number, bx2: number, by2: number, prev: SvgPathNode): SvgPathSmoothCubicCurve {
    return new SvgPathSmoothCubicCurve(x, y, bx2, by2, prev);
}

function createDefault(prev: SvgPathNode): SvgPathSmoothCubicCurve {
    return create(0, 0, 0, 0, prev);
}

function createCurve(bx2: number, by2: number): SvgPathCubicCurve {
    return new SvgPathCubicCurve(0, 0, 0, 0, bx2, by2, createStart());
}

function createStart(x: number = 0, y: number = 0): SvgPathStart {
    return new SvgPathStart(x, y, 0, null);
}

each([
    [-101, -90, -5, 12, createStart()],
    [0, 0, 0, 0, createDefault(createStart())],
    [null, null, null, null, createDefault(createStart())]
])
.test(`ctor should create with provided parameters (%#): x: %f, y: %f, bezier x2: %f, bezier y2: %f, prev: %o`,
    (x, y, bx2, by2, prev) => {
        const sut = new SvgPathSmoothCubicCurve(x, y, bx2, by2, prev);
        expect(sut.x).toBe(x || 0);
        expect(sut.y).toBe(y || 0);
        expect(sut.bezierX2).toBe(bx2 || 0);
        expect(sut.bezierY2).toBe(by2 || 0);
        expect(sut.prev).toBe(prev);
    }
);

test('ctor should throw when prev is not defined',
    () => {
        const action = () => new SvgPathSmoothCubicCurve(0, 0, 0, 0, null as any);
        expect(action).toThrowError();
    }
);

test('type getter should return smooth cubic curve',
    () => {
        const sut = createDefault(createStart());
        expect(sut.type).toBe(SvgPathNodeType.SmoothCubicCurve);
    }
);

each([
    [10, 20, 10, 20, 0],
    [0, 1, 0, 0, 90],
    [0, 0, 1, 0, 180],
    [15.33, 7.5, 7.322, 5.5324, 13.804362615],
    [-55.6, 11.234, -66.834, -0.63423, 46.572557157]
])
.test('angle in degrees getter should return correct value (%#): x: %f, y: %f, bezier x2: %f, bezier y2: %f, expected: %f',
    (x, y, bx2, by2, expected) => {
        const sut = create(x, y, bx2, by2, createStart());
        expect(sut.angleInDegrees).toBeCloseTo(expected, 8);
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
        const sut = createDefault(createStart());
        sut.x = x;
        sut.y = y;
        expect(sut.x).toBe(x || 0);
        expect(sut.y).toBe(y || 0);
    }
);

each([
    [10, 20, createStart(10, 20)],
    [0, 0, createStart()],
    [-5, -20, createCurve(12.44, -3.456)],
    [null, null, create(2.453, -1.1123, -33.3345, 2.24101, createStart())]
])
.test('bezier x1 and y1 setters should set correct values (%#): x: %f, y: %f, prev: %o',
    (x, y, prev) => {
        const sut = createDefault(prev);
        sut.bezierX1 = x;
        sut.bezierY1 = y;
        expect(sut.bezierX1).toBeCloseTo(x || 0, 8);
        expect(sut.bezierY1).toBeCloseTo(y || 0, 8);
    }
);

test('bezier point1 getter should return correct x and y',
    () => {
        const sut = createDefault(createStart());
        expect(sut.bezierPoint1).toStrictEqual({ x: sut.bezierX1, y: sut.bezierY1 });
    }
);

each([
    [null, createStart(10, 20)],
    [{ x: 5, y: -5 }, createStart()],
    [{ x: 0, y: 0 }, createCurve(12.44, -3.456)],
    [{ x: -2, y: 17 }, create(2.453, -1.1123, -33.3345, 2.24101, createStart())]
])
.test('bezier point1 setter should set correct x and y (%#): value: %o, prev: %o',
    (value, prev) => {
        const sut = createDefault(prev);
        sut.bezierPoint1 = value;
        const point = sut.bezierPoint1;
        value = value || { x: 0, y: 0 };
        expect(point.x).toBeCloseTo(value.x, 8);
        expect(point.y).toBeCloseTo(value.y, 8);
    }
);

each([
    [10, 20],
    [0, 0],
    [-5, -20],
    [null, null]
])
.test('bezier x2 and y2 setters should set correct values (%#): x: %f, y: %f',
    (x, y) => {
        const sut = createDefault(createStart());
        sut.bezierX2 = x;
        sut.bezierY2 = y;
        expect(sut.bezierX2).toBe(x || 0);
        expect(sut.bezierY2).toBe(y || 0);
    }
);

test('bezier point2 getter should return correct x and y',
    () => {
        const sut = createDefault(createStart());
        expect(sut.bezierPoint2).toStrictEqual({ x: sut.bezierX2, y: sut.bezierY2 });
    }
);

each([
    [null],
    [{ x: 5, y: -5 }],
    [{ x: 0, y: 0 }],
    [{ x: -2, y: 17 }]
])
.test('bezier point2 setter should set correct x and y (%#): value: %o',
    (value) => {
        const sut = createDefault(createStart());
        sut.bezierPoint2 = value;
        expect(sut.bezierPoint2).toStrictEqual(value || { x: 0, y: 0 });
    }
);

each([
    [0, 0, 0, 0, createStart()],
    [10, -50, 12, -13, createStart()]
])
.test('copy should return new valid object (%#): x: %f, y: %f, bezier x2: %f, bezier y2: %f, prev: %o',
    (x, y, bx2, by2, prev) => {
        const sut = create(x, y, bx2, by2, createStart());
        const result = sut.copy(prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathSmoothCubicCurve).toBe(true);
        expect(result.x).toBe(sut.x);
        expect(result.y).toBe(sut.y);
        expect(result.prev).toBe(prev);
        expect(result.bezierX2).toBe(sut.bezierX2);
        expect(result.bezierY2).toBe(sut.bezierY2);
    }
);

each([
    [0, 0, 0, 0, { x: 0, y: 0 }, 0, createStart(),
        { x: 0, y: 0 }, { x: 0, y: 0 }],
    [10, -20, 13, 21, { x: 5, y: -5 }, 0, createDefault(createStart()),
        { x: 5, y: -5 }, { x: 5, y: -5 }],
    [-5, -1, -3, -11, { x: 0, y: 0 }, 1, createStart(),
        { x: -5, y: -1 }, { x: -3, y: -11 }],
    [12.5, -0.5, 11.1, -7.65, { x: 5, y: -5 }, 1, createDefault(createStart()),
        { x: 12.5, y: -0.5 }, { x: 11.1, y: -7.65 }],
    [7.7, 0, 1.32, -8.8, { x: 0, y: 0 }, 2, createStart(),
        { x: 15.4, y: 0 }, { x: 2.64, y: -17.6 }],
    [3.3, 22.87, 2.2222, -1.0987, { x: 12.1, y: 3.5 }, 2.8, createStart(),
        { x: -12.54, y: 57.736 }, { x: -15.55784, y: -9.37636 }]
])
.test(`scale should return new valid object (%#): x: %f, y: %f, bezier x2: %f, bezier y2: %f,
origin: %o, scale: %f, prev: %o, expected point: %o, expected bezier point2: %o`,
    (x, y, bx2, by2, origin, scale, prev, expected, expectedBezier2) => {
        const sut = create(x, y, bx2, by2, createStart());
        const result = sut.scale(origin.x, origin.y, scale, prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathSmoothCubicCurve).toBe(true);
        expect(result.x).toBeCloseTo(expected.x, 8);
        expect(result.y).toBeCloseTo(expected.y, 8);
        expect(result.prev).toBe(prev);
        expect(result.bezierX2).toBeCloseTo(expectedBezier2.x, 8);
        expect(result.bezierY2).toBeCloseTo(expectedBezier2.y, 8);
    }
);

each([
    [0, 0, 0, 0, 0, 'S 0 0 0 0'],
    [1, -1.7, 1, 2, 1, 'S 1.0 2.0 1.0 -1.7'],
    [0, 0, 1, 1, 2, 'S 1.00 1.00 0.00 0.00'],
    [0, 5.5, -3.3, 1.1, 3, 'S -3.300 1.100 0.000 5.500'],
    [3.12, 0, 2.21, 1.113, 4, 'S 2.2100 1.1130 3.1200 0.0000'],
    [-0.5678, 5.1234, -7.654, 1.8473, 5, 'S -7.65400 1.84730 -0.56780 5.12340'],
    [12.77, -3.33456, 1.232, 33.11, 6, 'S 1.232000 33.110000 12.770000 -3.334560'],
    [1, -0.0005543, -20.882228, 11.21112, 4, 'S -20.8822 11.2111 1.0000 -0.0006']
])
.test(`create svg command should return correct result (%#): x: %f, y: %f, bezier x2: %f, bezier y2: %f, precision: %f, expected: %s`,
    (x, y, bx2, by2, precision, expected) => {
        const sut = create(x, y, bx2, by2, createStart());
        expect(sut.createSvgCommand(precision)).toBe(expected);
    }
);
