import { SvgPathNode } from '../core/svg-path-node';
import { SvgPathStart } from '../core/svg-path-start';
import { SvgPathQuadraticCurve } from '../core/svg-path-quadratic-curve';
import { SvgPathNodeType } from '../core/svg-path-node-type';
import { Angle } from '../core/primitives/angle';
import each from 'jest-each';

function createDefault(prev: SvgPathNode): SvgPathQuadraticCurve {
    return new SvgPathQuadraticCurve(0, 0, 0, 0, prev);
}

function createStart(x: number = 0, y: number = 0): SvgPathStart {
    return new SvgPathStart(x, y, 0, null);
}

each([
    [-101, -90, 50, 40, createStart()],
    [0, 0, 0, 0, createDefault(createStart())],
    [null, null, null, null, createDefault(createStart())]
])
.test('ctor should create with provided parameters (%#): x: %f, y: %f, bezier x: %f, bezier y: %f, prev: %o',
    (x, y, bx, by, prev) => {
        const sut = new SvgPathQuadraticCurve(x, y, bx, by, prev);
        expect(sut.x).toBe(x || 0);
        expect(sut.y).toBe(y || 0);
        expect(sut.bezierX).toBe(bx || 0);
        expect(sut.bezierY).toBe(by || 0);
        expect(sut.prev).toBe(prev);
    }
);

test('ctor should throw when prev is not defined',
    () => {
        const action = () => new SvgPathQuadraticCurve(0, 0, 0, 0, null as any);
        expect(action).toThrowError();
    }
);

test('type getter should return quadratic curve',
    () => {
        const sut = createDefault(createStart());
        expect(sut.type).toBe(SvgPathNodeType.QuadraticCurve);
    }
);

each([
    [10, 20, 10, 20, 0],
    [0, 1, 0, 0, 90],
    [0, 0, 1, 0, 180],
    [15.33, 7.5, 7.322, 5.5324, 13.804362615],
    [-55.6, 11.234, -66.834, -0.63423, 46.572557157]
])
.test('angle in degrees getter should return correct value (%#): x: %f, y: %f, bezier x: %f, bezier y: %f, expected: %f',
    (x, y, bx, by, expected) => {
        const sut = new SvgPathQuadraticCurve(x, y, bx, by, createStart());
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
.test('bezier x and y setters should set correct values (%#): x: %f, y: %f',
    (x, y) => {
        const sut = createDefault(createStart());
        sut.bezierX = x;
        sut.bezierY = y;
        expect(sut.bezierX).toBe(x || 0);
        expect(sut.bezierY).toBe(y || 0);
    }
);

test('bezier point getter should return correct x and y',
    () => {
        const sut = createDefault(createStart());
        expect(sut.bezierPoint).toStrictEqual({ x: sut.bezierX, y: sut.bezierY });
    }
);

each([
    [null],
    [{ x: 5, y: -5 }],
    [{ x: 0, y: 0 }],
    [{ x: -2, y: 17 }]
])
.test('bezier point setter should set correct x and y (%#): value: %o',
    (value) => {
        const sut = createDefault(createStart());
        sut.bezierPoint = value;
        expect(sut.bezierPoint).toStrictEqual(value || { x: 0, y: 0 });
    }
);

each([
    [0, 0, 0, 0, createStart()],
    [10, -50, 20, 40, createStart()]
])
.test('copy should return new valid object (%#): x: %f, y: %f, bezier x: %f, bezier y: %f, prev: %o',
    (x, y, bx, by, prev) => {
        const sut = new SvgPathQuadraticCurve(x, y, bx, by, createStart());
        const result = sut.copy(prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathQuadraticCurve).toBe(true);
        expect(result.x).toBe(sut.x);
        expect(result.y).toBe(sut.y);
        expect(result.prev).toBe(prev);
        expect(result.bezierX).toBe(sut.bezierX);
        expect(result.bezierY).toBe(sut.bezierY);
    }
);

test('copy should throw when prev is not defined',
    () => {
        const sut = new SvgPathQuadraticCurve(0, 0, 0, 0, createStart());
        const action = () => sut.copy(null as any);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, { x: 0, y: 0 }, 0, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [10, -20, 15, 12, { x: 5, y: -5 }, 0, { x: 5, y: -5 }, { x: 5, y: -5 }],
    [-5, -1, -13, 4, { x: 0, y: 0 }, 1, { x: -5, y: -1 }, { x: -13, y: 4 }],
    [12.5, -0.5, 2.55, 4, { x: 5, y: -5 }, 1, { x: 12.5, y: -0.5 }, { x: 2.55, y: 4 }],
    [7.7, 0, 8, 0.09, { x: 0, y: 0 }, 2, { x: 15.4, y: 0 }, { x: 16, y: 0.18 }],
    [3.3, 22.87, 13.4, 2.231, { x: 12.1, y: 3.5 }, 2.8, { x: -12.54, y: 57.736 }, { x: 15.74, y: -0.0532 }]
])
.test(`scale should modify node properly (%#): x: %f, y: %f, bezier x: %f, bezier y: %f,
origin: %o, scale: %f, expected point: %o, expected bezier point: %o`,
    (x, y, bx, by, origin, scale, expected, expectedBezier) => {
        const sut = new SvgPathQuadraticCurve(x, y, bx, by, createStart());
        sut.scale(origin.x, origin.y, scale);
        expect(sut.x).toBeCloseTo(expected.x, 8);
        expect(sut.y).toBeCloseTo(expected.y, 8);
        expect(sut.bezierX).toBeCloseTo(expectedBezier.x, 8);
        expect(sut.bezierY).toBeCloseTo(expectedBezier.y, 8);
    }
);

each([
    [0, 0, 0, 0, 0, 0, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [10, -20, 15, 12, 5, -5, { x: 15, y: -25 }, { x: 20, y: 7 }],
    [-5, -1, -13, 4, 0.5, 1, { x: -4.5, y: 0 }, { x: -12.5, y: 5 }],
    [12.5, -0.5, 2.55, 4, -5, 1.2, { x: 7.5, y: 0.7 }, { x: -2.45, y: 5.2 }],
    [7.7, 0, 8, 0.09, 2.355, 12.411, { x: 10.055, y: 12.411 }, { x: 10.355, y: 12.501 }],
    [3.3, 22.87, 13.4, 2.231, 12.1, -2.8, { x: 15.4, y: 20.07 }, { x: 25.5, y: -0.569 }]
])
.test(`translate should modify node properly (%#): x: %f, y: %f, bezier x: %f, bezier y: %f,
dx: %f, dy: %f, expected point: %o, expected bezier point: %o`,
    (x, y, bx, by, dx, dy, expected, expectedBezier) => {
        const sut = new SvgPathQuadraticCurve(x, y, bx, by, createStart());
        sut.translate(dx, dy);
        expect(sut.x).toBeCloseTo(expected.x, 8);
        expect(sut.y).toBeCloseTo(expected.y, 8);
        expect(sut.bezierX).toBeCloseTo(expectedBezier.x, 8);
        expect(sut.bezierY).toBeCloseTo(expectedBezier.y, 8);
    }
);

each([
    [0, 0, 0, 0, { x: 0, y: 0 }, 0, { x: 0, y: 0 }, { x: 0, y: 0 }],
    [10, -20, 15, 12, { x: 5, y: -5 }, 100, { x: -10.640357183, y: -7.3193161 }, { x: 20.005250024, y: -17.80009655 }],
    [-5, -1, -13, 4, { x: 1, y: 2 }, 0, { x: -5, y: -1 }, { x: -13, y: 4 }],
    [12.5, -0.5, 2.55, 4, { x: 5, y: -5 }, 5, { x: 12.863661078, y: -1.170791929 }, { x: 3.343724674, y: 4.179283852 }],
    [7.7, 0, 8, 0.09, { x: 0, y: 0 }, 67.24, { x: 2.978913708, y: -7.100427671 }, { x: 3.177967293, y: -7.342249238 }],
    [3.3, 22.87, 13.4, 2.231, { x: 12.1, y: 3.5 }, -387, { x: -4.534653392, y: 16.763679975 }, { x: 13.834422425, y: 2.95950037 }]
])
.test(`rotate should modify node properly (%#): x: %f, y: %f, bezier x: %f, bezier y: %f,
origin: %o, angle: %f, expected point: %o, expected bezier point: %o`,
    (x, y, bx, by, origin, angle, expected, expectedBezier) => {
        const sut = new SvgPathQuadraticCurve(x, y, bx, by, createStart());
        sut.rotate(origin.x, origin.y, new Angle(angle));
        expect(sut.x).toBeCloseTo(expected.x, 8);
        expect(sut.y).toBeCloseTo(expected.y, 8);
        expect(sut.bezierX).toBeCloseTo(expectedBezier.x, 8);
        expect(sut.bezierY).toBeCloseTo(expectedBezier.y, 8);
    }
);

each([
    [0, 0, 0, 0, 0, 'Q 0 0 0 0'],
    [1, -1.7, 0, 0, 1, 'Q 0.0 0.0 1.0 -1.7'],
    [0, 0, 1, 1, 2, 'Q 1.00 1.00 0.00 0.00'],
    [0, 5.5, 0, 2.3, 3, 'Q 0.000 2.300 0.000 5.500'],
    [3.12, 0, 4.55, 0, 4, 'Q 4.5500 0.0000 3.1200 0.0000'],
    [-0.5678, 5.1234, 2.433, -23.312, 5, 'Q 2.43300 -23.31200 -0.56780 5.12340'],
    [12.77, -3.33456, 12.77, 3.3, 6, 'Q 12.770000 3.300000 12.770000 -3.334560'],
    [1, -0.0005543, -9.7676, -0.0006, 4, 'Q -9.7676 -0.0006 1.0000 -0.0006']
])
.test('create svg command should return correct result (%#): x: %f, y: %f, bezier x: %f, bezier y: %f, precision: %f, expected: %s',
    (x, y, bx, by, precision, expected) => {
        const sut = new SvgPathQuadraticCurve(x, y, bx, by, createStart());
        expect(sut.createSvgCommand(precision)).toBe(expected);
    }
);
