import { SvgPathStart } from '../core/svg-path-start';
import { SvgPathClose } from '../core/svg-path-close';
import { SvgPathNodeType } from '../core/svg-path-node-type';
import { SvgPathLine } from '../core/svg-path-line';
import each from 'jest-each';

function createStart(x: number = 0, y: number = 0): SvgPathStart {
    return new SvgPathStart(x, y, 0, null);
}

function createLine(): SvgPathLine {
    return new SvgPathLine(0, 0, createStart());
}

each([
    [createStart(2, 4), createStart()],
    [createStart(5, -7), null]
])
.test('ctor should create with provided parameters (%#): start: %o, prev: %o',
    (start, prev) => {
        prev = prev || start;
        const sut = new SvgPathClose(start, prev);
        expect(sut.x).toBe(sut.start.x);
        expect(sut.y).toBe(sut.start.y);
        expect(sut.start).toBe(start);
        expect(sut.prev).toBe(prev);
    }
);

test('ctor should throw when prev is not defined',
    () => {
        const action = () => new SvgPathClose(createStart(), null as any);
        expect(action).toThrowError();
    }
);

test('ctor should throw when start is not defined',
    () => {
        const action = () => new SvgPathClose(null as any, createStart());
        expect(action).toThrowError();
    }
);

test('type getter should return close',
    () => {
        const sut = new SvgPathClose(createStart(), createStart());
        expect(sut.type).toBe(SvgPathNodeType.Close);
    }
);

each([
    [10, 20, 10, 20, 0],
    [0, 1, 0, 0, 90],
    [0, 0, -1, 0, 0],
    [15.33, 7.5, 7.322, 5.5324, 13.804362615],
    [-55.6, 11.234, -66.834, -0.63423, 46.572557157]
])
.test('angle in degrees getter should return correct value (%#): start x: %f, start y: %f, prev x: %f, prev y: %f, expected: %f',
    (startX, startY, prevX, prevY, expected) => {
        const sut = new SvgPathClose(createStart(startX, startY), createStart(prevX, prevY));
        expect(sut.angleInDegrees).toBeCloseTo(expected, 8);
    }
);

each([
    [10, 20, 10, 20, 0],
    [0, 1, 0, 0, 1],
    [0, 0, -1, 0, 1],
    [15.33, 7.5, 7.322, 5.5324, 8.2461817685],
    [-55.6, 11.234, -66.834, -0.63423, 16.341898278]
])
.test('length getter should return correct value (%#): start x: %f, start y: %f, prev x: %f, prev y: %f, expected: %f',
    (startX, startY, prevX, prevY, expected) => {
        const sut = new SvgPathClose(createStart(startX, startY), createStart(prevX, prevY));
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
.test('dx getter should return correct value (%#): start x: %f, prev x: %f, expected dx: %f',
    (startX, prevX, expectedDx) => {
        const sut = new SvgPathClose(createStart(startX), createStart(prevX));
        expect(sut.dx).toBeCloseTo(expectedDx, 8);
    }
);

each([
    [10, 20, -10],
    [0, 0, 0],
    [-7, -7, 0],
    [15.33, 7.5, 7.83],
    [-55.6, 11.234, -66.834]
])
.test('dy getter should return correct value (%#): dy: %f, prev y: %f, expected dy: %f',
    (startY, prevY, expectedDy) => {
        const sut = new SvgPathClose(createStart(0, startY), createStart(0, prevY));
        expect(sut.dy).toBeCloseTo(expectedDy, 8);
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
        const sut = new SvgPathClose(createStart(), createStart());
        sut.x = x;
        sut.y = y;
        expect(sut.x).toBe(x || 0);
        expect(sut.y).toBe(y || 0);
        expect(sut.start.x).toBe(sut.x);
        expect(sut.start.y).toBe(sut.y);
    }
);

each([
    [10, 20],
    [0, 0],
    [-5, -20]
])
.test('copy should return new valid object (%#): start x: %f, start y: %f',
    (startX, startY) => {
        const prev = createStart(startX, startY);
        const sut = new SvgPathClose(createStart(startX, startY), createStart());
        const result = sut.copy(prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathClose).toBe(true);
        expect(result.x).toBe(sut.x);
        expect(result.y).toBe(sut.y);
        expect(result.prev).toBe(prev);
        expect(result.start).toBe(prev);
    }
);

test('copy should throw when prev is not defined',
    () => {
        const sut = new SvgPathClose(createStart(), createStart());
        const action = () => sut.copy(null as any);
        expect(action).toThrowError();
    }
);

each([
    [{ x: 0, y: 0 }, 0, createLine()],
    [{ x: 5, y: -5 }, 0, createLine()],
    [{ x: 12.1, y: 3.5 }, 2.8, createLine()]
])
.test('scale should return new valid object (%#): origin: %o, scale: %f, prev: %o',
    (origin, scale, prev) => {
        const sut = new SvgPathClose(createStart(), createStart());
        const result = sut.scale(origin.x, origin.y, scale, prev);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result instanceof SvgPathClose).toBe(true);
        expect(result.prev).toBe(prev);
        expect(result.start).toBe(prev.prev);
    }
);

test('scale should throw when prev is not defined',
    () => {
        const sut = new SvgPathClose(createStart(), createStart());
        const action = () => sut.scale(0, 0, 0, null as any);
        expect(action).toThrowError();
    }
);

test('create svg command should return correct result',
    () => {
        const sut = new SvgPathClose(createStart(), createStart());
        expect(sut.createSvgCommand(0)).toBe('Z');
    }
);
