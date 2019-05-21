import { SvgPathNode } from '../core/svg-path-node';
import { SvgPathStart } from '../core/svg-path-start';
import { SvgPathSmoothQuadraticCurve } from '../core/svg-path-smooth-quadratic-curve';
import { SvgPathNodeType } from '../core/svg-path-node-type';
import { SvgPathQuadraticCurve } from '../core/svg-path-quadratic-curve';
import each from 'jest-each';

function create(x: number, y: number, prev: SvgPathNode): SvgPathSmoothQuadraticCurve {
    return new SvgPathSmoothQuadraticCurve(x, y, prev);
}

function createDefault(prev: SvgPathNode): SvgPathSmoothQuadraticCurve {
    return create(0, 0, prev);
}

function createCurve(bx: number, by: number): SvgPathQuadraticCurve {
    return new SvgPathQuadraticCurve(0, 0, bx, by, createStart());
}

function createStart(x: number = 0, y: number = 0): SvgPathStart {
    return new SvgPathStart(x, y, 0, null);
}

each([
    [-101, -90, createStart()],
    [0, 0, createDefault(createStart())],
    [null, null, createDefault(createStart())]
])
.test('ctor should create with provided parameters (%#): x: %f, y: %f, prev: %o',
    (x, y, prev) => {
        const sut = new SvgPathSmoothQuadraticCurve(x, y, prev);
        expect(sut.x).toBe(x || 0);
        expect(sut.y).toBe(y || 0);
        expect(sut.prev).toBe(prev);
    }
);

test('ctor should throw when prev is not defined',
    () => {
        const action = () => new SvgPathSmoothQuadraticCurve(0, 0, null as any);
        expect(action).toThrowError();
    }
);

test('type getter should return smooth quadratic curve',
    () => {
        const sut = createDefault(createStart());
        expect(sut.type).toBe(SvgPathNodeType.SmoothQuadraticCurve);
    }
);

each([
    [10, 20, createStart(10, 20), 0],
    [0, 1, createStart(), 90],
    [0, 0, create(5, -3, createStart()), 149.036243467],
    [15.33, 7.5, createCurve(12.44, -3.456), 8.285443948],
    [-55.6, 11.234, create(-33.3345, 2.24101, createStart()), 31.38277608]
])
.test('angle in degrees getter should return correct value (%#): x: %f, y: %f, prev: %o, expected: %f',
    (x, y, prev, expected) => {
        const sut = new SvgPathSmoothQuadraticCurve(x, y, prev);
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
    [null, null, create(-33.3345, 2.24101, createStart())]
])
.test('bezier x and y setters should set correct values (%#): x: %f, y: %f, prev: %o',
    (x, y, prev) => {
        const sut = createDefault(prev);
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
    [null, createStart(10, 20)],
    [{ x: 5, y: -5 }, createStart()],
    [{ x: 0, y: 0 }, createCurve(12.44, -3.456)],
    [{ x: -2, y: 17 }, create(-33.3345, 2.24101, createStart())]
])
.test('bezier point setter should set correct x and y (%#): value: %o, prev: %o',
    (value, prev) => {
        const sut = createDefault(prev);
        sut.bezierPoint = value;
        expect(sut.bezierPoint).toStrictEqual(value || { x: 0, y: 0 });
    }
);

each([
    [0, 0, createStart()],
    [10, -50, createStart()]
])
.test('copy should return new valid object (%#): x: %f, y: %f, prev: %o',
    (x, y, prev) => {
        const sut = new SvgPathSmoothQuadraticCurve(x, y, createStart());
        const result = sut.copy(prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathSmoothQuadraticCurve).toBe(true);
        expect(result.x).toBe(sut.x);
        expect(result.y).toBe(sut.y);
        expect(result.prev).toBe(prev);
    }
);

each([
    [0, 0, { x: 0, y: 0 }, 0, createStart(), { x: 0, y: 0 }],
    [10, -20, { x: 5, y: -5 }, 0, createDefault(createStart()), { x: 5, y: -5 }],
    [-5, -1, { x: 0, y: 0 }, 1, createStart(), { x: -5, y: -1 }],
    [12.5, -0.5, { x: 5, y: -5 }, 1, createDefault(createStart()), { x: 12.5, y: -0.5 }],
    [7.7, 0, { x: 0, y: 0 }, 2, createStart(), { x: 15.4, y: 0 }],
    [3.3, 22.87, { x: 12.1, y: 3.5 }, 2.8, createStart(), { x: -12.54, y: 57.736 }]
])
.test(`scale should return new valid object (%#): x: %f, y: %f, origin: %o, scale: %f, prev: %o, expected point: %o`,
    (x, y, origin, scale, prev, expected) => {
        const sut = new SvgPathSmoothQuadraticCurve(x, y, createStart());
        const result = sut.scale(origin.x, origin.y, scale, prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathSmoothQuadraticCurve).toBe(true);
        expect(result.x).toBeCloseTo(expected.x, 8);
        expect(result.y).toBeCloseTo(expected.y, 8);
        expect(result.prev).toBe(prev);
    }
);

each([
    [0, 0, 0, 'T 0 0'],
    [1, -1.7, 1, 'T 1.0 -1.7'],
    [0, 0, 2, 'T 0.00 0.00'],
    [0, 5.5, 3, 'T 0.000 5.500'],
    [3.12, 0, 4, 'T 3.1200 0.0000'],
    [-0.5678, 5.1234, 5, 'T -0.56780 5.12340'],
    [12.77, -3.33456, 6, 'T 12.770000 -3.334560'],
    [1, -0.0005543, 4, 'T 1.0000 -0.0006']
])
.test('create svg command should return correct result (%#): x: %f, y: %f, precision: %f, expected: %s',
    (x, y, precision, expected) => {
        const sut = new SvgPathSmoothQuadraticCurve(x, y, createStart());
        expect(sut.createSvgCommand(precision)).toBe(expected);
    }
);
