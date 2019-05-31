import { SvgPathNode } from '../core/svg-path-node';
import { SvgPathStart } from '../core/svg-path-start';
import { SvgPathCubicCurve } from '../core/svg-path-cubic-curve';
import { SvgPathNodeType } from '../core/svg-path-node-type';
import { Angle } from '../core/primitives/angle';
import each from 'jest-each';

function createDefault(prev: SvgPathNode): SvgPathCubicCurve {
    return new SvgPathCubicCurve(0, 0, 0, 0, 0, 0, prev);
}

function createStart(x: number = 0, y: number = 0): SvgPathStart {
    return new SvgPathStart(x, y, 0, null);
}

each([
    [-101, -90, 50, 40, -5, 12, createStart()],
    [0, 0, 0, 0, 0, 0, createDefault(createStart())],
    [null, null, null, null, null, null, createDefault(createStart())]
])
.test(`ctor should create with provided parameters (%#): x: %f, y: %f,
bezier x1: %f, bezier y1: %f, bezier x2: %f, bezier y2: %f, prev: %o`,
    (x, y, bx1, by1, bx2, by2, prev) => {
        const sut = new SvgPathCubicCurve(x, y, bx1, by1, bx2, by2, prev);
        expect(sut.x).toBe(x || 0);
        expect(sut.y).toBe(y || 0);
        expect(sut.bezierX1).toBe(bx1 || 0);
        expect(sut.bezierY1).toBe(by1 || 0);
        expect(sut.bezierX2).toBe(bx2 || 0);
        expect(sut.bezierY2).toBe(by2 || 0);
        expect(sut.prev).toBe(prev);
    }
);

test('ctor should throw when prev is not defined',
    () => {
        const action = () => new SvgPathCubicCurve(0, 0, 0, 0, 0, 0, null as any);
        expect(action).toThrowError();
    }
);

test('type getter should return cubic curve',
    () => {
        const sut = createDefault(createStart());
        expect(sut.type).toBe(SvgPathNodeType.CubicCurve);
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
        const sut = new SvgPathCubicCurve(x, y, 0, 0, bx2, by2, createStart());
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
    [10, 20],
    [0, 0],
    [-5, -20],
    [null, null]
])
.test('bezier x1 and y1 setters should set correct values (%#): x: %f, y: %f',
    (x, y) => {
        const sut = createDefault(createStart());
        sut.bezierX1 = x;
        sut.bezierY1 = y;
        expect(sut.bezierX1).toBe(x || 0);
        expect(sut.bezierY1).toBe(y || 0);
    }
);

test('bezier point1 getter should return correct x and y',
    () => {
        const sut = createDefault(createStart());
        expect(sut.bezierPoint1).toStrictEqual({ x: sut.bezierX1, y: sut.bezierY1 });
    }
);

each([
    [null],
    [{ x: 5, y: -5 }],
    [{ x: 0, y: 0 }],
    [{ x: -2, y: 17 }]
])
.test('bezier point1 setter should set correct x and y (%#): value: %o',
    (value) => {
        const sut = createDefault(createStart());
        sut.bezierPoint1 = value;
        expect(sut.bezierPoint1).toStrictEqual(value || { x: 0, y: 0 });
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
    [0, 0, 0, 0, 0, 0, createStart()],
    [10, -50, 20, 40, 12, -13, createStart()]
])
.test('copy should return new valid object (%#): x: %f, y: %f, bezier x1: %f, bezier y1: %f, bezier x2: %f, bezier y2: %f, prev: %o',
    (x, y, bx1, by1, bx2, by2, prev) => {
        const sut = new SvgPathCubicCurve(x, y, bx1, by1, bx2, by2, createStart());
        const result = sut.copy(prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathCubicCurve).toBe(true);
        expect(result.x).toBe(sut.x);
        expect(result.y).toBe(sut.y);
        expect(result.prev).toBe(prev);
        expect(result.bezierX1).toBe(sut.bezierX1);
        expect(result.bezierY1).toBe(sut.bezierY1);
        expect(result.bezierX2).toBe(sut.bezierX2);
        expect(result.bezierY2).toBe(sut.bezierY2);
    }
);

test('copy should throw when prev is not defined',
    () => {
        const sut = new SvgPathCubicCurve(0, 0, 0, 0, 0, 0, createStart());
        const action = () => sut.copy(null as any);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, 0, 0, { x: 0, y: 0 }, 0,
        { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [10, -20, 15, 12, 13, 21, { x: 5, y: -5 }, 0,
        { x: 5, y: -5 }, { x: 5, y: -5 }, { x: 5, y: -5 }],
    [-5, -1, -13, 4, -3, -11, { x: 0, y: 0 }, 1,
        { x: -5, y: -1 }, { x: -13, y: 4 }, { x: -3, y: -11 }],
    [12.5, -0.5, 2.55, 4, 11.1, -7.65, { x: 5, y: -5 }, 1,
        { x: 12.5, y: -0.5 }, { x: 2.55, y: 4 }, { x: 11.1, y: -7.65 }],
    [7.7, 0, 8, 0.09, 1.32, -8.8, { x: 0, y: 0 }, 2,
        { x: 15.4, y: 0 }, { x: 16, y: 0.18 }, { x: 2.64, y: -17.6 }],
    [3.3, 22.87, 13.4, 2.231, 2.2222, -1.0987, { x: 12.1, y: 3.5 }, 2.8,
        { x: -12.54, y: 57.736 }, { x: 15.74, y: -0.0532 }, { x: -15.55784, y: -9.37636 }]
])
.test(`scale should modify node properly (%#): x: %f, y: %f, bezier x1: %f, bezier y1: %f, bezier x2: %f, bezier y2: %f,
origin: %o, scale: %f, expected point: %o, expected bezier point1: %o, expected bezier point2: %o`,
    (x, y, bx1, by1, bx2, by2, origin, scale, expected, expectedBezier1, expectedBezier2) => {
        const sut = new SvgPathCubicCurve(x, y, bx1, by1, bx2, by2, createStart());
        sut.scale(origin.x, origin.y, scale);
        expect(sut.x).toBeCloseTo(expected.x, 8);
        expect(sut.y).toBeCloseTo(expected.y, 8);
        expect(sut.bezierX1).toBeCloseTo(expectedBezier1.x, 8);
        expect(sut.bezierY1).toBeCloseTo(expectedBezier1.y, 8);
        expect(sut.bezierX2).toBeCloseTo(expectedBezier2.x, 8);
        expect(sut.bezierY2).toBeCloseTo(expectedBezier2.y, 8);
    }
);

each([
    [0, 0, 0, 0, 0, 0, 0, 0,
        { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [10, -20, 15, 12, 13, 21, 5, -5,
        { x: 15, y: -25 }, { x: 20, y: 7 }, { x: 18, y: 16 }],
    [-5, -1, -13, 4, -3, -11, 0.5, 1,
        { x: -4.5, y: 0 }, { x: -12.5, y: 5 }, { x: -2.5, y: -10 }],
    [12.5, -0.5, 2.55, 4, 11.1, -7.65, -5, 1.2,
        { x: 7.5, y: 0.7 }, { x: -2.45, y: 5.2 }, { x: 6.1, y: -6.45 }],
    [7.7, 0, 8, 0.09, 1.32, -8.8, 2.355, 12.411,
        { x: 10.055, y: 12.411 }, { x: 10.355, y: 12.501 }, { x: 3.675, y: 3.611 }],
    [3.3, 22.87, 13.4, 2.231, 2.2222, -1.0987, 12.1, -2.8,
        { x: 15.4, y: 20.07 }, { x: 25.5, y: -0.569 }, { x: 14.3222, y: -3.8987 }]
])
.test(`translate should modify node properly (%#): x: %f, y: %f, bezier x1: %f, bezier y1: %f, bezier x2: %f, bezier y2: %f,
dx: %f, dy: %f, expected point: %o, expected bezier point1: %o, expected bezier point2: %o`,
    (x, y, bx1, by1, bx2, by2, dx, dy, expected, expectedBezier1, expectedBezier2) => {
        const sut = new SvgPathCubicCurve(x, y, bx1, by1, bx2, by2, createStart());
        sut.translate(dx, dy);
        expect(sut.x).toBeCloseTo(expected.x, 8);
        expect(sut.y).toBeCloseTo(expected.y, 8);
        expect(sut.bezierX1).toBeCloseTo(expectedBezier1.x, 8);
        expect(sut.bezierY1).toBeCloseTo(expectedBezier1.y, 8);
        expect(sut.bezierX2).toBeCloseTo(expectedBezier2.x, 8);
        expect(sut.bezierY2).toBeCloseTo(expectedBezier2.y, 8);
    }
);

each([
    [0, 0, 0, 0, 0, 0, { x: 0, y: 0 }, 0,
        { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [10, -20, 15, 12, 13, 21, { x: 5, y: -5 }, 100,
        { x: -10.640357183, y: -7.3193161 }, { x: 20.005250024, y: -17.80009655 }, { x: 29.215816156, y: -17.393314643 }],
    [-5, -1, -13, 4, -3, -11, { x: 1, y: 2 }, 0,
        { x: -5, y: -1 }, { x: -13, y: 4 }, { x: -3, y: -11 }],
    [12.5, -0.5, 2.55, 4, 11.1, -7.65, { x: 5, y: -5 }, 5,
        { x: 12.863661078, y: -1.170791929 }, { x: 3.343724674, y: 4.179283852 }, { x: 10.84582494, y: -8.17156598 }],
    [7.7, 0, 8, 0.09, 1.32, -8.8, { x: 0, y: 0 }, 67.24,
        { x: 2.978913708, y: -7.100427671 }, { x: 3.177967293, y: -7.342249238 }, { x: -7.60410356, y: -4.621688981 }],
    [3.3, 22.87, 13.4, 2.231, 2.2222, -1.0987, { x: 12.1, y: 3.5 }, -387,
        { x: -4.534653392, y: 16.763679975 }, { x: 13.834422425, y: 2.95950037 }, { x: 5.386581866, y: -5.081899061 }]
])
.test(`rotate should modify node properly (%#): x: %f, y: %f, bezier x1: %f, bezier y1: %f, bezier x2: %f, bezier y2: %f,
origin: %o, angle: %f, expected point: %o, expected bezier point1: %o, expected bezier point2: %o`,
    (x, y, bx1, by1, bx2, by2, origin, angle, expected, expectedBezier1, expectedBezier2) => {
        const sut = new SvgPathCubicCurve(x, y, bx1, by1, bx2, by2, createStart());
        sut.rotate(origin.x, origin.y, new Angle(angle));
        expect(sut.x).toBeCloseTo(expected.x, 8);
        expect(sut.y).toBeCloseTo(expected.y, 8);
        expect(sut.bezierX1).toBeCloseTo(expectedBezier1.x, 8);
        expect(sut.bezierY1).toBeCloseTo(expectedBezier1.y, 8);
        expect(sut.bezierX2).toBeCloseTo(expectedBezier2.x, 8);
        expect(sut.bezierY2).toBeCloseTo(expectedBezier2.y, 8);
    }
);

each([
    [0, 0, 0, 0, 0, 0, 0, 'C 0 0 0 0 0 0'],
    [1, -1.7, 0, 0, 1, 2, 1, 'C 0.0 0.0 1.0 2.0 1.0 -1.7'],
    [0, 0, 1, 1, 0, 0, 2, 'C 1.00 1.00 0.00 0.00 0.00 0.00'],
    [0, 5.5, 0, 2.3, -3.3, 1.1, 3, 'C 0.000 2.300 -3.300 1.100 0.000 5.500'],
    [3.12, 0, 4.55, 0, 2.21, 1.113, 4, 'C 4.5500 0.0000 2.2100 1.1130 3.1200 0.0000'],
    [-0.5678, 5.1234, 2.433, -23.312, -7.654, 1.8473, 5, 'C 2.43300 -23.31200 -7.65400 1.84730 -0.56780 5.12340'],
    [12.77, -3.33456, 12.77, 3.3, 1.232, 33.11, 6, 'C 12.770000 3.300000 1.232000 33.110000 12.770000 -3.334560'],
    [1, -0.0005543, -9.7676, -0.0006, -20.882228, 11.21112, 4, 'C -9.7676 -0.0006 -20.8822 11.2111 1.0000 -0.0006']
])
.test(`create svg command should return correct result (%#): x: %f, y: %f,
bezier x1: %f, bezier y1: %f, bezier x2: %f, bezier y2: %f, precision: %f, expected: %s`,
    (x, y, bx1, by1, bx2, by2, precision, expected) => {
        const sut = new SvgPathCubicCurve(x, y, bx1, by1, bx2, by2, createStart());
        expect(sut.createSvgCommand(precision)).toBe(expected);
    }
);
