import { SvgPathStart } from '../core/svg-path-start';
import { SvgPathNodeType } from '../core/svg-path-node-type';
import { Nullable } from '../core/utils/nullable';
import each from 'jest-each';

function createDefault(prev: Nullable<SvgPathStart> = null): SvgPathStart {
    return new SvgPathStart(0, 0, 0, prev);
}

each([
    [10, 20, 50, null],
    [-101, -90, -60, createDefault()],
    [0, 0, 0, createDefault()],
    [null, null, null, null],
    [null, 5, null, createDefault(createDefault())]
])
.test('ctor should create with provided parameters (%#): x: %f, y: %f, angle in degrees: %f, prev: %o',
    (x, y, angle, prev) => {
        const sut = new SvgPathStart(x, y, angle, prev);
        expect(sut.x).toBe(x || 0);
        expect(sut.y).toBe(y || 0);
        expect(sut.angleInDegrees).toBe(angle || 0);
        expect(sut.prev).toBe(prev);
    }
);

test('type getter should return start',
    () => {
        const sut = createDefault();
        expect(sut.type).toBe(SvgPathNodeType.Start);
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
    [0, 0, 0, null],
    [10, -50, 30, createDefault()]
])
.test('copy should return new valid object (%#): x: %f, y: %f, angle: %f, prev: %o',
    (x, y, angle, prev) => {
        const sut = new SvgPathStart(x, y, angle, createDefault());
        const result = sut.copy(prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathStart).toBe(true);
        expect(result.x).toBe(sut.x);
        expect(result.y).toBe(sut.y);
        expect(result.angleInDegrees).toBe(sut.angleInDegrees);
        expect(result.prev).toBe(prev);
    }
);

each([
    [0, 0, 0, { x: 0, y: 0 }, 0, null, { x: 0, y: 0 }],
    [10, -20, 30, { x: 5, y: -5 }, 0, createDefault(), { x: 5, y: -5 }],
    [-5, -1, 60, { x: 0, y: 0 }, 1, null, { x: -5, y: -1 }],
    [12.5, -0.5, 75, { x: 5, y: -5 }, 1, createDefault(createDefault()), { x: 12.5, y: -0.5 }],
    [7.7, 0, 200, { x: 0, y: 0 }, 2, null, { x: 15.4, y: 0 }],
    [3.3, 22.87, -80, { x: 12.1, y: 3.5 }, 2.8, null, { x: -12.54, y: 57.736 }]
])
.test('scale should return new valid object (%#): x: %f, y: %f, angle: %f, origin: %o, scale: %f, prev: %o, expected point: %o',
    (x, y, angle, origin, scale, prev, expected) => {
        const sut = new SvgPathStart(x, y, angle, createDefault());
        const result = sut.scale(origin.x, origin.y, scale, prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathStart).toBe(true);
        expect(result.x).toBeCloseTo(expected.x, 8);
        expect(result.y).toBeCloseTo(expected.y, 8);
        expect(result.angleInDegrees).toBe(sut.angleInDegrees);
        expect(result.prev).toBe(prev);
    }
);

each([
    [0, 0, 0, 'M 0 0'],
    [1, -1.7, 1, 'M 1.0 -1.7'],
    [-0.5678, 5.1234, 2, 'M -0.57 5.12'],
    [12.77, -3.33456, 3, 'M 12.770 -3.335'],
    [1, -0.0005543, 4, 'M 1.0000 -0.0006']
])
.test('create svg command should return correct result (%#): x: %f, y: %f, precision: %f, expected: %s',
    (x, y, precision, expected) => {
        const sut = new SvgPathStart(x, y, 0, null);
        expect(sut.createSvgCommand(precision)).toBe(expected);
    }
);
