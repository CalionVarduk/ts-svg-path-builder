import { SvgPathNode } from '../src/svg-path-node';
import { SvgPathStart } from '../src/svg-path-start';
import { SvgPathArc } from '../src/svg-path-arc';
import { SvgPathNodeType } from '../src/svg-path-node-type';
import { SvgPathArcStyle } from '../src/svg-path-arc-style';
import { Angle } from '../src/primitives/angle';
import each from 'jest-each';

function createDefault(prev: SvgPathNode): SvgPathArc
{
    return new SvgPathArc(0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180, prev);
}

function createStart(x: number = 0, y: number = 0): SvgPathStart
{
    return new SvgPathStart(x, y, 0, null);
}

each([
    [-101, -90, 50, 40, -5, SvgPathArcStyle.CccwGt180, createStart()],
    [0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180, createDefault(createStart())],
    [null, null, null, null, null, null, createDefault(createStart())]
])
.test(`ctor should create with provided parameters (%#): x: %f, y: %f, rx: %f, ry: %f, angle: %f, style: %f, prev: %o`,
    (x, y, rx, ry, angle, style, prev) =>
    {
        const sut = new SvgPathArc(x, y, rx, ry, angle, style, prev);
        expect(sut.x).toBe(x || 0);
        expect(sut.y).toBe(y || 0);
        expect(sut.rx).toBe(rx || 0);
        expect(sut.ry).toBe(ry || 0);
        expect(sut.rotationAngleInDegrees).toBe(angle || 0);
        expect(sut.style).toBe(style || SvgPathArcStyle.CccwLt180);
        expect(sut.prev).toBe(prev);
    }
);

test('ctor should throw when prev is not defined',
    () =>
    {
        const action = () => new SvgPathArc(0, 0, 0, 0, 0, 0, null as any);
        expect(action).toThrowError();
    }
);

test('type getter should return arc',
    () =>
    {
        const sut = createDefault(createStart());
        expect(sut.type).toBe(SvgPathNodeType.Arc);
    }
);

each([
    [10, 20, 10, 20, 100, SvgPathArcStyle.CccwLt180, 10, 20, 0],
    [0, 1, 0, 0, 0, SvgPathArcStyle.CccwGt180, -2, 5, -63.434948822],
    [0, 0, 1, 0, 5, SvgPathArcStyle.CcwLt180, 0, 0, 0],
    [0.0004, -0.0006, 0.007, 0.00095, 0, SvgPathArcStyle.CcwLt180, 0.0001, 0, -0.000133934],
    [15.33, 7.5, 7.322, 5.5324, 17.567, SvgPathArcStyle.CcwGt180, 11.12, -33.334, -185.836840206],
    [-55.6, 11.234, -66.834, -0.63423, -34.5, SvgPathArcStyle.CccwLt180, -2.445, 123.4, 154.641588475]
])
.test(`angle in degrees getter should return correct value (%#): x: %f, y: %f, rx: %f, ry: %f, angle: %f, style: %f,
prev x: %f, prev y: %f, expected: %f`,
    (x, y, rx, ry, angle, style, prevX, prevY, expected) =>
    {
        const sut = new SvgPathArc(x, y, rx, ry, angle, style, createStart(prevX, prevY));
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
    (x, y) =>
    {
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
.test('rx and ry setters should set correct values (%#): x: %f, y: %f',
    (x, y) =>
    {
        const sut = createDefault(createStart());
        sut.rx = x;
        sut.ry = y;
        expect(sut.rx).toBe(x || 0);
        expect(sut.ry).toBe(y || 0);
    }
);

each([
    [null],
    [SvgPathArcStyle.CccwLt180],
    [SvgPathArcStyle.CccwGt180],
    [SvgPathArcStyle.CcwLt180],
    [SvgPathArcStyle.CcwGt180]
])
.test('style setter should set correct values (%#): style: %f',
    (style) =>
    {
        const sut = createDefault(createStart());
        sut.style = style;
        expect(sut.style).toBe(style || SvgPathArcStyle.CccwLt180);
    }
);

each([
    [null],
    [0],
    [123.5],
    [-80],
    [367.67]
])
.test('rotation angle in degrees setter should set correct values (%#): angle: %f',
    (angle) =>
    {
        const sut = createDefault(createStart());
        sut.rotationAngleInDegrees = angle;
        expect(sut.rotationAngleInDegrees).toBe(angle || 0);
    }
);

each([
    [SvgPathArcStyle.CccwLt180, false],
    [SvgPathArcStyle.CccwGt180, true],
    [SvgPathArcStyle.CcwLt180, false],
    [SvgPathArcStyle.CcwGt180, true]
])
.test('has large arc flag getter should return correct result (%#): style: %f, expected: %s',
    (style, expected) =>
    {
        const sut = createDefault(createStart());
        sut.style = style;
        expect(sut.hasLargeArcFlag).toBe(expected);
    }
);

each([
    [SvgPathArcStyle.CccwLt180, false],
    [SvgPathArcStyle.CccwGt180, false],
    [SvgPathArcStyle.CcwLt180, true],
    [SvgPathArcStyle.CcwGt180, true]
])
.test('has sweep flag getter should return correct result (%#): style: %f, expected: %s',
    (style, expected) =>
    {
        const sut = createDefault(createStart());
        sut.style = style;
        expect(sut.hasSweepFlag).toBe(expected);
    }
);

each([
    [10, 20, 10, 20, 100, SvgPathArcStyle.CccwLt180, 10, 20, { x: 10, y: 20 }],
    [0, 1, 0, 0, 0, SvgPathArcStyle.CccwGt180, -2, 5, { x: -1, y: 3 }],
    [0, 0, 1, 0, 5, SvgPathArcStyle.CcwLt180, 0, 0, { x: 0, y: 0 }],
    [0.0004, -0.0006, 0.007, 0.00095, 0, SvgPathArcStyle.CcwLt180, 0.0001, 0, { x: 0.006874876, y: -0.00023899 }],
    [15.33, 7.5, 7.322, 5.5324, 17.567, SvgPathArcStyle.CcwGt180, 11.12, -33.334, { x: 13.225, y: -12.917 }],
    [-55.6, 11.234, -66.834, -0.63423, -34.5, SvgPathArcStyle.CccwLt180, -2.445, 123.4, { x: -29.0225, y: 67.317 }]
])
.test(`centre point getter should return correct result (%#): x: %f, y: %f, rx: %f, ry: %f, angle: %f, style: %f,
prev x: %f, prev y: %f, expected: %o`,
    (x, y, rx, ry, angle, style, prevX, prevY, expected) =>
    {
        const sut = new SvgPathArc(x, y, rx, ry, angle, style, createStart(prevX, prevY));
        const result = sut.centrePoint;
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result.x).toBeCloseTo(expected.x, 8);
        expect(result.y).toBeCloseTo(expected.y, 8);
    }
);

each([
    [0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180, createStart()],
    [10, -50, 20, 40, 12, SvgPathArcStyle.CcwLt180, createStart()]
])
.test('copy should return new valid object (%#): x: %f, y: %f, rx: %f, ry: %f, angle: %f, style: %f, prev: %o',
    (x, y, rx, ry, angle, style, prev) =>
    {
        const sut = new SvgPathArc(x, y, rx, ry, angle, style, createStart());
        const result = sut.copy(prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathArc).toBe(true);
        expect(result.x).toBe(sut.x);
        expect(result.y).toBe(sut.y);
        expect(result.prev).toBe(prev);
        expect(result.rx).toBe(sut.rx);
        expect(result.ry).toBe(sut.ry);
        expect(result.rotationAngleInDegrees).toBe(sut.rotationAngleInDegrees);
        expect(result.style).toBe(sut.style);
    }
);

test('copy should throw when prev is not defined',
    () =>
    {
        const sut = new SvgPathArc(0, 0, 0, 0, 0, 0, createStart());
        const action = () => sut.copy(null as any);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180, { x: 0, y: 0 }, 0,
        { x: 0, y: 0 }, 0, 0],
    [10, -20, 15, 12, 13, SvgPathArcStyle.CcwGt180, { x: 5, y: -5 }, 0,
        { x: 5, y: -5 }, 0, 0],
    [-5, -1, -13, 4, -3, SvgPathArcStyle.CcwLt180, { x: 0, y: 0 }, 1,
        { x: -5, y: -1 }, -13, 4],
    [12.5, -0.5, 2.55, 4, 11.1, SvgPathArcStyle.CccwGt180, { x: 5, y: -5 }, 1,
        { x: 12.5, y: -0.5 }, 2.55, 4],
    [7.7, 0, 8, 0.09, 1.32, SvgPathArcStyle.CcwGt180, { x: 0, y: 0 }, 2,
        { x: 15.4, y: 0 }, 16, 0.18],
    [3.3, 22.87, 13.4, 2.231, 2.2222, SvgPathArcStyle.CcwLt180, { x: 12.1, y: 3.5 }, 2.8,
        { x: -12.54, y: 57.736 }, 37.52, 6.2468]
])
.test(`scale should modify node properly (%#): x: %f, y: %f, rx: %f, ry: %f, angle: %f, style: %f,
origin: %o, scale: %f, expected point: %o, expected rx: %o, expected ry: %o`,
    (x, y, rx, ry, angle, style, origin, scale, expected, expectedRx, expectedRy) =>
    {
        const sut = new SvgPathArc(x, y, rx, ry, angle, style, createStart());
        sut.scale(origin.x, origin.y, scale);
        expect(sut.x).toBeCloseTo(expected.x, 8);
        expect(sut.y).toBeCloseTo(expected.y, 8);
        expect(sut.rx).toBeCloseTo(expectedRx, 8);
        expect(sut.ry).toBeCloseTo(expectedRy, 8);
        expect(sut.rotationAngleInDegrees).toBe(angle);
        expect(sut.style).toBe(style);
    }
);

each([
    [0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180, 0, 0, { x: 0, y: 0 }],
    [10, -20, 15, 12, 13, SvgPathArcStyle.CcwGt180, 5, -5, { x: 15, y: -25 }],
    [-5, -1, -13, 4, -3, SvgPathArcStyle.CcwLt180, 0.5, 1, { x: -4.5, y: 0 }],
    [12.5, -0.5, 2.55, 4, 11.1, SvgPathArcStyle.CccwGt180, -5, 1.2, { x: 7.5, y: 0.7 }],
    [7.7, 0, 8, 0.09, 1.32, SvgPathArcStyle.CcwGt180, 2.355, 12.411, { x: 10.055, y: 12.411 }],
    [3.3, 22.87, 13.4, 2.231, 2.2222, SvgPathArcStyle.CcwLt180, 12.1, -2.8, { x: 15.4, y: 20.07 }]
])
.test(`translate should modify node properly (%#): x: %f, y: %f, rx: %f, ry: %f, angle: %f, style: %f, dx: %f, dy: %f, expected point: %o`,
    (x, y, rx, ry, angle, style, dx, dy, expected) =>
    {
        const sut = new SvgPathArc(x, y, rx, ry, angle, style, createStart());
        sut.translate(dx, dy);
        expect(sut.x).toBeCloseTo(expected.x, 8);
        expect(sut.y).toBeCloseTo(expected.y, 8);
        expect(sut.rx).toBe(rx);
        expect(sut.ry).toBe(ry);
        expect(sut.rotationAngleInDegrees).toBe(angle);
        expect(sut.style).toBe(style);
    }
);

each([
    [0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180, { x: 0, y: 0 }, 0, { x: 0, y: 0 }, 0],
    [10, -20, 15, 12, 13, SvgPathArcStyle.CcwGt180, { x: 5, y: -5 }, 100, { x: -10.640357183, y: -7.3193161 }, 113],
    [-5, -1, -13, 4, -3, SvgPathArcStyle.CcwLt180, { x: 1, y: 2 }, 0, { x: -5, y: -1 }, -3],
    [12.5, -0.5, 2.55, 4, 11.1, SvgPathArcStyle.CccwGt180, { x: 5, y: -5 }, 5, { x: 12.863661078, y: -1.170791929 }, 16.1],
    [7.7, 0, 8, 0.09, 1.32, SvgPathArcStyle.CcwGt180, { x: 0, y: 0 }, 67.24, { x: 2.978913708, y: -7.100427671 }, 68.56],
    [3.3, 22.87, 13.4, 2.231, 2.2222, SvgPathArcStyle.CcwLt180, { x: 12.1, y: 3.5 }, -387, { x: -4.534653392, y: 16.763679975 }, -384.7778]
])
.test(`rotate should modify node properly (%#): x: %f, y: %f, rx: %f, ry: %f, angle: %f, style: %f,
origin: %o, value: %o, expected point: %o, expected angle: %f`,
    (x, y, rx, ry, angle, style, origin, value, expected, expectedAngle) =>
    {
        const sut = new SvgPathArc(x, y, rx, ry, angle, style, createStart());
        sut.rotate(origin.x, origin.y, new Angle(value));
        expect(sut.x).toBeCloseTo(expected.x, 8);
        expect(sut.y).toBeCloseTo(expected.y, 8);
        expect(sut.rx).toBe(rx);
        expect(sut.ry).toBe(ry);
        expect(sut.rotationAngleInDegrees).toBeCloseTo(expectedAngle, 8);
        expect(sut.style).toBe(style);
    }
);

each([
    [0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180, 0, 'A 0 0 0 0 0 0 0'],
    [1, -1.7, 0, 0, 1, SvgPathArcStyle.CcwGt180, 1, 'A 0.0 0.0 1.0 1 1 1.0 -1.7'],
    [0, 0, 1, 1, 0, SvgPathArcStyle.CcwLt180, 2, 'A 1.00 1.00 0.00 0 1 0.00 0.00'],
    [0, 5.5, 0, 2.3, -3.3, SvgPathArcStyle.CccwGt180, 3, 'A 0.000 2.300 -3.300 1 0 0.000 5.500'],
    [3.12, 0, 4.55, 0, 2.21, SvgPathArcStyle.CcwLt180, 4, 'A 4.5500 0.0000 2.2100 0 1 3.1200 0.0000'],
    [-0.5678, 5.1234, 2.433, 23.312, -7.654, SvgPathArcStyle.CcwGt180, 5, 'A 2.43300 23.31200 -7.65400 1 1 -0.56780 5.12340'],
    [12.77, -3.33456, 12.77, 3.3, 1.232, SvgPathArcStyle.CccwLt180, 6, 'A 12.770000 3.300000 1.232000 0 0 12.770000 -3.334560'],
    [1, -0.0005543, 9.7676, 0.0006, -20.882228, SvgPathArcStyle.CccwGt180, 4, 'A 9.7676 0.0006 -20.8822 1 0 1.0000 -0.0006']
])
.test(`create svg command should return correct result (%#): x: %f, y: %f, rx: %f, ry: %f, angle: %f, style: %f,
precision: %f, expected: %s`,
    (x, y, rx, ry, angle, style, precision, expected) =>
    {
        const sut = new SvgPathArc(x, y, rx, ry, angle, style, createStart());
        expect(sut.createSvgCommand(precision)).toBe(expected);
    }
);
