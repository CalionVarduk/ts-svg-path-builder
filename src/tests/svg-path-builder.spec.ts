import { SvgPathBuilder, SvgPathStarter, SvgPathAfterCornerBuilder } from '../core/svg-path-builder';
import { SvgPathStart } from '../core/svg-path-start';
import { SvgPathNode } from '../core/svg-path-node';
import { SvgPathLineOffset } from '../core/svg-path-line-offset';
import { SvgPathLine } from '../core/svg-path-line';
import { SvgPathQuadraticCurve } from '../core/svg-path-quadratic-curve';
import { SvgPathCubicCurve } from '../core/svg-path-cubic-curve';
import { SvgPathSmoothQuadraticCurve } from '../core/svg-path-smooth-quadratic-curve';
import { SvgPathSmoothCubicCurve } from '../core/svg-path-smooth-cubic-curve';
import { SvgPathClose } from '../core/svg-path-close';
import { SvgPathArc } from '../core/svg-path-arc';
import { SvgPathArcStyle } from '../core/svg-path-arc-style';
import { Nullable } from '../core/utils/nullable';
import { Angle } from '../core/primitives/angle';
import { mock, reinterpretCast, IMockedMethodInfo, IMock } from 'frlluc-mocking';
import each from 'jest-each';

test('after corner builder ctor should create with provided builder',
    () => {
        const builderMock = mock<SvgPathBuilder>({});
        const sut = new SvgPathAfterCornerBuilder(builderMock.subject);
        expect(sut.builder()).toBe(builderMock.subject);
    }
);

each([
    [0, 0],
    [1, 100],
    [-1, -70],
    [24, 365.6],
    [-45.32, 12.312],
])
.test('after corner builder add line should invoke proper builder method (%#): length: %f, prev angle: %f',
    (length, prevAngle) => {
        const lastMock = mock<SvgPathNode>({
            angleInDegrees: prevAngle
        });
        const builderMock = mock<SvgPathBuilder>({
            get last() { return lastMock.subject; },
            addLine(l, a) { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgPathAfterCornerBuilder(builderMock.subject);
        const result = sut.addLine(length);
        const info = builderMock.getMemberInfo('addLine') as IMockedMethodInfo;
        expect(result).toBe(builderMock.subject);
        expect(info.count).toBe(1);
        expect(info.getData(0)!.arguments.length).toBe(2);
        expect(info.getData(0)!.arguments[0]).toBe(length);
        expect(info.getData(0)!.arguments[1]).toBe(prevAngle);
    }
);

each([
    [0, 0],
    [1, 100],
    [-1, -70],
    [24, 365.6],
    [-45.32, 12.312],
])
.test('after corner builder line to x should invoke proper builder method (%#): x: %f, prev angle: %f',
    (x, prevAngle) => {
        const lastMock = mock<SvgPathNode>({
            angleInDegrees: prevAngle
        });
        const builderMock = mock<SvgPathBuilder>({
            get last() { return lastMock.subject; },
            angledLineToX(c, a) { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgPathAfterCornerBuilder(builderMock.subject);
        const result = sut.lineToX(x);
        const info = builderMock.getMemberInfo('angledLineToX') as IMockedMethodInfo;
        expect(result).toBe(builderMock.subject);
        expect(info.count).toBe(1);
        expect(info.getData(0)!.arguments.length).toBe(2);
        expect(info.getData(0)!.arguments[0]).toBe(x);
        expect(info.getData(0)!.arguments[1]).toBe(prevAngle);
    }
);

each([
    [0, 0],
    [1, 100],
    [-1, -70],
    [24, 365.6],
    [-45.32, 12.312],
])
.test('after corner builder line to y should invoke proper builder method (%#): y: %f, prev angle: %f',
    (y, prevAngle) => {
        const lastMock = mock<SvgPathNode>({
            angleInDegrees: prevAngle
        });
        const builderMock = mock<SvgPathBuilder>({
            get last() { return lastMock.subject; },
            angledLineToY(c, a) { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgPathAfterCornerBuilder(builderMock.subject);
        const result = sut.lineToY(y);
        const info = builderMock.getMemberInfo('angledLineToY') as IMockedMethodInfo;
        expect(result).toBe(builderMock.subject);
        expect(info.count).toBe(1);
        expect(info.getData(0)!.arguments.length).toBe(2);
        expect(info.getData(0)!.arguments[0]).toBe(y);
        expect(info.getData(0)!.arguments[1]).toBe(prevAngle);
    }
);

each([
    [0, 0, 0],
    [1, 2, 100],
    [-1, -3, -70],
    [24, 56, 365.6],
    [-45.32, 24.332, 12.312],
])
.test('after corner builder add rounded corner to should invoke proper builder method (%#): x: %f, y: %f, angle: %f',
    (x, y, angle) => {
        const builderMock = mock<SvgPathBuilder>({
            addRoundedCornerTo(c, d, a) { return new SvgPathAfterCornerBuilder(reinterpretCast<SvgPathBuilder>(this)); }
        });
        const sut = new SvgPathAfterCornerBuilder(builderMock.subject);
        const result = sut.addRoundedCornerTo(x, y, angle);
        const info = builderMock.getMemberInfo('addRoundedCornerTo') as IMockedMethodInfo;
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result.builder()).toBe(builderMock.subject);
        expect(info.count).toBe(1);
        expect(info.getData(0)!.arguments.length).toBe(3);
        expect(info.getData(0)!.arguments[0]).toBe(x);
        expect(info.getData(0)!.arguments[1]).toBe(y);
        expect(info.getData(0)!.arguments[2]).toBe(angle);
    }
);

each([
    [0, 0, 0],
    [1, 2, 100],
    [-1, -3, -70],
    [24, 56, 365.6],
    [-45.32, 24.332, 12.312],
])
.test('after corner builder add rounded corner by should invoke proper builder method (%#): dx: %f, dy: %f, angle: %f',
    (dx, dy, angle) => {
        const builderMock = mock<SvgPathBuilder>({
            addRoundedCornerBy(c, d, a) { return new SvgPathAfterCornerBuilder(reinterpretCast<SvgPathBuilder>(this)); }
        });
        const sut = new SvgPathAfterCornerBuilder(builderMock.subject);
        const result = sut.addRoundedCornerBy(dx, dy, angle);
        const info = builderMock.getMemberInfo('addRoundedCornerBy') as IMockedMethodInfo;
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result.builder()).toBe(builderMock.subject);
        expect(info.count).toBe(1);
        expect(info.getData(0)!.arguments.length).toBe(3);
        expect(info.getData(0)!.arguments[0]).toBe(dx);
        expect(info.getData(0)!.arguments[1]).toBe(dy);
        expect(info.getData(0)!.arguments[2]).toBe(angle);
    }
);

test('after corner builder close should invoke proper builder method',
    () => {
        const builderMock = mock<SvgPathBuilder>({
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgPathAfterCornerBuilder(builderMock.subject);
        const result = sut.close();
        const info = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(builderMock.subject);
        expect(info.count).toBe(1);
        expect(info.getData(0)!.arguments.length).toBe(0);
    }
);

test('after corner builder build should invoke proper builder method',
    () => {
        const svg = 'foo';
        const builderMock = mock<SvgPathBuilder>({
            build() { return svg; }
        });
        const sut = new SvgPathAfterCornerBuilder(builderMock.subject);
        const result = sut.build();
        const info = builderMock.getMemberInfo('build') as IMockedMethodInfo;
        expect(result).toBe(svg);
        expect(info.count).toBe(1);
        expect(info.getData(0)!.arguments.length).toBe(0);
    }
);

each([
    [0, 0],
    [-1, 0],
    [1, 1],
    [2, 2],
    [5, 5],
    [10, 10],
    [18, 18],
    [20, 20],
    [21, 20],
    [3.4, 3],
    [3.5, 4],
    [3.6, 4],
    [null, SvgPathBuilder.DEFAULT_PRECISION],
    [void(0), SvgPathBuilder.DEFAULT_PRECISION]
])
.test('builder ctor should create with provided precision (%#): value: %f, expected: %i',
    (value, expected) => {
        const sut = new SvgPathBuilder(value);
        expect(sut.precision).toBe(expected);
    }
);

function assert(sut: SvgPathBuilder,
    expectedNodeCount: number,
    expectedFirst: SvgPathNode,
    expectedLast: SvgPathNode,
    expectedLastStart: Nullable<SvgPathStart> = null): void {

    expect(sut.nodes).toBeDefined();
    expect(sut.nodes).not.toBeNull();
    expect(sut.nodes.length).toBe(expectedNodeCount);
    expect(sut.isEmpty).toBe(false);
    expect(sut.first).toBe(expectedFirst);
    expect(sut.last).toBe(expectedLast);
    expect(sut.lastStart).toBe(expectedLastStart);
    expect(sut.isOpen).toBe(expectedLastStart !== null);
    expect(sut.isClosed).toBe(expectedLastStart === null);
    expect(sut.currentPoint).toStrictEqual({ x: expectedLast.x, y: expectedLast.y });
    expect(sut.currentAngleInDegrees).toBe(expectedLast.angleInDegrees);
}

test('builder ctor should create empty',
    () => {
        const sut = new SvgPathBuilder();
        expect(sut.nodes).toBeDefined();
        expect(sut.nodes).not.toBeNull();
        expect(sut.nodes.length).toBe(0);
        expect(sut.isEmpty).toBe(true);
        expect(sut.first).toBeNull();
        expect(sut.last).toBeNull();
        expect(sut.lastStart).toBeNull();
        expect(sut.isOpen).toBe(false);
        expect(sut.isClosed).toBe(true);
        expect(sut.currentPoint).toStrictEqual({ x: 0, y: 0 });
        expect(sut.currentAngleInDegrees).toBe(0);
        expect(sut.precision).toBe(SvgPathBuilder.DEFAULT_PRECISION);
    }
);

each([
    [0, 0, null],
    [5, 7, void(0)],
    [0, 0, 0],
    [-5.2, 3.3, 20.5],
    [7.77642, -31.323, -50.7],
    [11.23, 0.003, 471]
])
.test('builder move to should add start node (%#): x: %f, y: %f, angle: %f',
    (x, y, angle) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(x, y, angle);
        const node = sut.last as SvgPathStart;
        assert(sut, 1, node, node, node);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathStart).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBe(y);
        expect(node.angleInDegrees).toBe(angle || 0);
    }
);

each([
    [0, 0, null],
    [5, 7, void(0)],
    [0, 0, 0],
    [-5.2, 3.3, 20.5],
    [7.77642, -31.323, -50.7],
    [11.23, 0.003, 471]
])
.test('builder move to should add another start node (%#): x: %f, y: %f, angle: %f',
    (x, y, angle) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).moveTo(x, y, angle);
        const node = sut.last as SvgPathStart;
        assert(sut, 2, node.prev!, node, node);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathStart).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBe(y);
        expect(node.angleInDegrees).toBe(angle || 0);
    }
);

each([
    [0, 0, null],
    [5, 7, void(0)],
    [0, 0, 0],
    [-5.2, 3.3, 20.5],
    [7.77642, -31.323, -50.7],
    [11.23, 0.003, 471]
])
.test('builder move by should add start node (%#): dx: %f, dy: %f, angle: %f',
    (dx, dy, angle) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveBy(dx, dy, angle);
        const node = sut.last as SvgPathStart;
        assert(sut, 1, node, node, node);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathStart).toBe(true);
        expect(node.x).toBe(dx);
        expect(node.y).toBe(dy);
        expect(node.angleInDegrees).toBe(angle || 0);
    }
);

each([
    [0, 0, 0, 0, 0, null, 0, 0, 0],
    [5, 7, 17, -2, 3, null, 3, 10, 17],
    [4, -8, -10, 1, 5, 0, 5, -3, 0],
    [0, 0, 3.1, -5.2, 3.3, 20.5, -5.2, 3.3, 20.5],
    [1.23, -0.54, -50.7, 7.77642, -31.323, null, 9.00642, -31.863, -50.7],
    [5.5, -22.3, 101, 11.23, 0.003, 471, 16.73, -22.297, 471],
])
.test(`builder move by should add start node (%#): prev x: %f, prev y: %f, prev angle: %f, dx: %f, dy: %f, angle: %f,
expected x: %f, expected y: %f, expected angle: %f`,
    (prevX, prevY, prevAngle, dx, dy, angle, expectedX, expectedY, expectedAngle) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(prevX, prevY, prevAngle).moveBy(dx, dy, angle);
        const node = sut.last as SvgPathStart;
        assert(sut, 2, node.prev!, node, node);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathStart).toBe(true);
        expect(node.x).toBeCloseTo(expectedX, 8);
        expect(node.y).toBeCloseTo(expectedY, 8);
        expect(node.angleInDegrees).toBe(expectedAngle);
    }
);

test('builder add node should throw when node is null',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.addNode(reinterpretCast<SvgPathNode>(null));
        expect(action).toThrowError();
    }
);

test('builder add node should throw when node is not a start node and start node doesn\'t exist yet',
    () => {
        const nodeMock = mock<SvgPathNode>({
            copy(prev) { return reinterpretCast<SvgPathNode>({ prev: prev }); }
        });
        const sut = new SvgPathBuilder();
        const action = () => sut.addNode(nodeMock.subject);
        expect(action).toThrowError();
        const invokeInfo = nodeMock.getMemberInfo('copy') as IMockedMethodInfo;
        expect(invokeInfo.count).toBe(1);
        expect(invokeInfo.getData(0)!.arguments.length).toBe(1);
        expect(invokeInfo.getData(0)!.arguments[0]).toBe(null);
    }
);

test('builder add node should add another non-start node properly',
    () => {
        const nodeMock = mock<SvgPathNode>({
            copy(prev) { return reinterpretCast<SvgPathNode>({ prev: prev }); }
        });
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).addNode(nodeMock.subject);
        const node = sut.last!;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        const invokeInfo = nodeMock.getMemberInfo('copy') as IMockedMethodInfo;
        expect(invokeInfo.count).toBe(1);
        expect(invokeInfo.getData(0)!.arguments.length).toBe(1);
        expect(invokeInfo.getData(0)!.arguments[0]).toBe(sut.first);
    }
);

each([
    [0, 0, 0],
    [-5.2, 3.3, 20.5],
    [7.77642, -31.323, -50.7],
    [11.23, 0.003, 471]
])
.test('builder add node should add start node properly (%#): x: %f, y: %f, angle: %f',
    (x, y, angle) => {
        const start = new SvgPathStart(x, y, angle, null);
        const sut = new SvgPathBuilder();
        const result = sut.addNode(start);
        const node = sut.last! as SvgPathStart;
        assert(sut, 1, node, node, node);
        expect(result).toBe(sut);
        expect(node).not.toBe(start);
        expect(node instanceof SvgPathStart).toBe(true);
        expect(node.x).toBe(start.x);
        expect(node.y).toBe(start.y);
        expect(node.angleInDegrees).toBe(start.angleInDegrees);
        expect(node.prev).toBe(null);
    }
);

each([
    [0, 0, 0],
    [-5.2, 3.3, 20.5],
    [7.77642, -31.323, -50.7],
    [11.23, 0.003, 471]
])
.test('builder add node should add another start node properly (%#): x: %f, y: %f, angle: %f',
    (x, y, angle) => {
        const start = new SvgPathStart(x, y, angle, null);
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).addNode(start);
        const node = sut.last! as SvgPathStart;
        assert(sut, 2, node.prev!, node, node);
        expect(result).toBe(sut);
        expect(node).not.toBe(start);
        expect(node instanceof SvgPathStart).toBe(true);
        expect(node.x).toBe(start.x);
        expect(node.y).toBe(start.y);
        expect(node.angleInDegrees).toBe(start.angleInDegrees);
    }
);

test('builder line by x should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.lineByX(0);
        expect(action).toThrowError();
    }
);

each([
    [0],
    [12],
    [-44.4],
    [2.56]
])
.test('builder line by x should add new line offset node (%#): dx: %f',
    (dx) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).lineByX(dx);
        const node = sut.last! as SvgPathLineOffset;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathLineOffset).toBe(true);
        expect(node.dx).toBeCloseTo(dx, 8);
        expect(node.dy).toBeCloseTo(0, 8);
    }
);

test('builder line by y should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.lineByY(0);
        expect(action).toThrowError();
    }
);

each([
    [0],
    [12],
    [-44.4],
    [2.56]
])
.test('builder line by y should add new line offset node (%#): dy: %f',
    (dy) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).lineByY(dy);
        const node = sut.last! as SvgPathLineOffset;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathLineOffset).toBe(true);
        expect(node.dx).toBeCloseTo(0, 8);
        expect(node.dy).toBeCloseTo(dy, 8);
    }
);

test('builder line by should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.lineBy(0, 0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0],
    [12, 10],
    [-44.4, 12.32],
    [2.56, -6.332]
])
.test('builder line by should add new line offset node (%#): dx: %f, dy: %f',
    (dx, dy) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).lineBy(dx, dy);
        const node = sut.last! as SvgPathLineOffset;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathLineOffset).toBe(true);
        expect(node.dx).toBeCloseTo(dx, 8);
        expect(node.dy).toBeCloseTo(dy, 8);
    }
);

test('builder line to x should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.lineToX(0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0],
    [2, 12],
    [-3.21,- 44.4],
    [0.04, 2.56]
])
.test('builder line to x should add new line node (%#): start y: %f, x: %f',
    (startY, x) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, startY).lineToX(x);
        const node = sut.last! as SvgPathLine;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathLine).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBe(startY);
    }
);

test('builder line to y should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.lineToY(0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0],
    [2, 12],
    [-3.21,- 44.4],
    [0.04, 2.56]
])
.test('builder line to y should add new line node (%#): start x: %f, y: %f',
    (startX, y) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(startX, 0).lineToY(y);
        const node = sut.last! as SvgPathLine;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathLine).toBe(true);
        expect(node.x).toBe(startX);
        expect(node.y).toBe(y);
    }
);

test('builder line to should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.lineTo(0, 0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0],
    [12, 10],
    [-44.4, 12.32],
    [2.56, -6.332]
])
.test('builder line to should add new line node (%#): x: %f, y: %f',
    (x, y) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).lineTo(x, y);
        const node = sut.last! as SvgPathLine;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathLine).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBe(y);
    }
);

test('builder angled line to x should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.angledLineToX(0, 0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, -1, 0],
    [-10.1, 0, -9.1, 90],
    [5.9, 3.5, 5.91, 180],
    [12.34, -44.4, 12.32, 77.8],
    [0.045, 2.56, 6.332, -567]
])
.test('builder angled line to x should throw when intersection doesn\'t exist (%#): start x: %f, start y: %f, x: %f, angle: %f',
    (startX, startY, x, angle) => {
        const sut = new SvgPathBuilder();
        const action = () => sut.moveTo(startX, startY).angledLineToX(x, angle);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, 0, 0],
    [-10.1, 0, -10.1, 90, 0, 0],
    [5.9, 3.5, 5.9, 90, 3.5, 0],
    [12.34, -44.4, 32.32, 77.8, 48.011159955, 77.8],
    [0.045, 2.56, -6.332, -567, 5.809243791, 153]
])
.test(`builder angled line to x should add new line node (%#): start x: %f, start y: %f, x: %f, angle: %f,
expected y: %f, expected angle : %f`,
    (startX, startY, x, angle, expectedY, expectedAngle) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(startX, startY).angledLineToX(x, angle);
        const node = sut.last! as SvgPathLine;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathLine).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBeCloseTo(expectedY, 8);
        expect(node.angleInDegrees).toBeCloseTo(expectedAngle, 8);
    }
);

test('builder angled line to y should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.angledLineToY(0, 0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, -1, 0],
    [0, -10.1, -10.2, 90],
    [5.9, 3.5, 3.6, 270],
    [12.34, -44.4, -44.41, 77.8],
    [0.045, 2.56, -6.332, -567]
])
.test('builder angled line to y should throw when intersection doesn\'t exist (%#): start x: %f, start y: %f, y: %f, angle: %f',
    (startX, startY, y, angle) => {
        const sut = new SvgPathBuilder();
        const action = () => sut.moveTo(startX, startY).angledLineToY(y, angle);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, 0, 0],
    [0, -10.1, -10.1, 90, 0, 0],
    [3.5, 5.9, 5.9, 180, 3.5, 0],
    [12.34, -44.4, 32.32, 77.8, 28.927451133, 77.8],
    [0.045, 2.56, 6.332, -567, -7.357966826, 153]
])
.test(`builder angled line to y should add new line node (%#): start x: %f, start y: %f, y: %f, angle: %f,
expected x: %f, expected angle: %f`,
    (startX, startY, y, angle, expectedX, expectedAngle) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(startX, startY).angledLineToY(y, angle);
        const node = sut.last! as SvgPathLine;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathLine).toBe(true);
        expect(node.x).toBeCloseTo(expectedX, 8);
        expect(node.y).toBe(y);
        expect(node.angleInDegrees).toBeCloseTo(expectedAngle, 8);
    }
);

test('builder add line should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.addLine(0, 0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, 0, 0],
    [0, -10.1, 20, 90, 0, 9.9],
    [3.5, 5.9, 7.8, 180, -4.3, 5.9],
    [12.34, -44.4, -32.32, 77.8, 5.509982578, -75.990081703],
    [0.045, 2.56, -6.332, -567, 5.686853311, -0.314667844]
])
.test(`builder add line should add new offset line node (%#):
start x: %f, start y: %f, length: %f, angle: %f, expected x: %f, expected y: %f`,
    (startX, startY, length, angle, expectedX, expectedY) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(startX, startY).addLine(length, angle);
        const node = sut.last! as SvgPathLineOffset;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathLineOffset).toBe(true);
        expect(node.x).toBeCloseTo(expectedX, 8);
        expect(node.y).toBeCloseTo(expectedY, 8);
    }
);

test('builder curve to should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.curveTo(0, 0, 0, 0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0],
    [0, -10.1, 20, 1.1],
    [3.5, 5.9, 7.8, -4.3],
    [12.34, -44.4, -32.32, 5.509],
    [0.045, 2.56, -6.332, 5.686]
])
.test(`builder curve to should add new quadratic curve node (%#): x: %f, y: %f, bezier x: %f, bezier y: %f`,
    (x, y, bx, by) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).curveTo(x, y, bx, by);
        const node = sut.last! as SvgPathQuadraticCurve;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathQuadraticCurve).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBe(y);
        expect(node.bezierX).toBe(bx);
        expect(node.bezierY).toBe(by);
    }
);

each([
    [0, 0, 0, 0, 0, 0],
    [0, -10.1, 20, 1.1, 12, null],
    [3.5, 5.9, 7.8, -4.3, null, 3.2],
    [12.34, -44.4, -32.32, 5.509, 1.234, 2.332],
    [0.045, 2.56, -6.332, 5.686, 45.43, 6.74]
])
.test(`builder curve to should add new cubic curve node (%#): x: %f, y: %f, bezier x1: %f, bezier y1: %f, bezier x2: %f, bezier y2: %f`,
    (x, y, bx1, by1, bx2, by2) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).curveTo(x, y, bx1, by1, bx2, by2);
        const node = sut.last! as SvgPathCubicCurve;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathCubicCurve).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBe(y);
        expect(node.bezierX1).toBe(bx1);
        expect(node.bezierY1).toBe(by1);
        expect(node.bezierX2).toBe(bx2 || 0);
        expect(node.bezierY2).toBe(by2 || 0);
    }
);

test('builder curve by should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.curveBy(0, 0, 0, 0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, -10.1, 20, 1.1, 12, 7, 20, -9, 12, -3.1],
    [3.5, 5.9, 7.8, -4.3, -1.1, 3.2, 11.3, 1.6, 2.4, 9.1],
    [12.34, -44.4, -32.32, 5.509, 1.234, 2.332, -19.98, -38.891, 13.574, -42.068],
    [0.045, 2.56, -6.332, 5.686, 45.43, 6.74, -6.287, 8.246, 45.475, 9.3]
])
.test(`builder curve by should add new quadratic curve node (%#): start x: %f, start y: %f, dx: %f, dy: %f, bezier dx: %f, bezier dy: %f,
expected x: %f, expected y: %f, expected bezier x: %f, expected bezier y: %f`,
    (startX, startY, dx, dy, bdx, bdy, expectedX, expectedY, expectedBx, expectedBy) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(startX, startY).curveBy(dx, dy, bdx, bdy);
        const node = sut.last! as SvgPathQuadraticCurve;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathQuadraticCurve).toBe(true);
        expect(node.x).toBeCloseTo(expectedX, 8);
        expect(node.y).toBeCloseTo(expectedY, 8);
        expect(node.bezierX).toBeCloseTo(expectedBx, 8);
        expect(node.bezierY).toBeCloseTo(expectedBy, 8);
    }
);

each([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, -10.1, 20, 1.1, 12, 7, 8, null, 20, -9, 12, -3.1, 8, -10.1],
    [3.5, 5.9, 7.8, -4.3, -1.1, 3.2, null, 4.4, 11.3, 1.6, 2.4, 9.1, 3.5, 10.3],
    [12.34, -44.4, -32.32, 5.509, 1.234, 2.332, -4.54, 0.023, -19.98, -38.891, 13.574, -42.068, 7.8, -44.377],
    [0.045, 2.56, -6.332, 5.686, 45.43, 6.74, 7.88, -1.123, -6.287, 8.246, 45.475, 9.3, 7.925, 1.437]
])
.test(`builder curve by should add new cubic curve node (%#): start x: %f, start y: %f, dx: %f, dy: %f, bezier dx1: %f, bezier dy1: %f,
bezier dx2: %f, bezier dy2: %f, expected x: %f, expected y: %f, expected bezier x1: %f, expected bezier y1: %f,
expected bezier x2: %f, expected bezier y2: %f`,
    (startX, startY, dx, dy, bdx1, bdy1, bdx2, bdy2, expectedX, expectedY, expectedBx1, expectedBy1, expectedBx2, expectedBy2) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(startX, startY).curveBy(dx, dy, bdx1, bdy1, bdx2, bdy2);
        const node = sut.last! as SvgPathCubicCurve;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathCubicCurve).toBe(true);
        expect(node.x).toBeCloseTo(expectedX, 8);
        expect(node.y).toBeCloseTo(expectedY, 8);
        expect(node.bezierX1).toBeCloseTo(expectedBx1, 8);
        expect(node.bezierY1).toBeCloseTo(expectedBy1, 8);
        expect(node.bezierX2).toBeCloseTo(expectedBx2, 8);
        expect(node.bezierY2).toBeCloseTo(expectedBy2, 8);
    }
);

test('builder smooth curve to should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.smoothCurveTo(0, 0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0],
    [0, -10.1],
    [3.5, 5.9],
    [12.34, -44.4],
    [0.045, 2.56]
])
.test(`builder smooth curve to should add new smooth quadratic curve node (%#): x: %f, y: %f`,
    (x, y) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).smoothCurveTo(x, y);
        const node = sut.last! as SvgPathSmoothQuadraticCurve;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathSmoothQuadraticCurve).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBe(y);
    }
);

each([
    [0, 0, 0, 0],
    [0, -10.1, 12, null],
    [3.5, 5.9, null, 3.2],
    [12.34, -44.4, 1.234, 2.332],
    [0.045, 2.56, 45.43, 6.74]
])
.test(`builder smooth curve to should add new smooth cubic curve node (%#): x: %f, y: %f, bezier x2: %f, bezier y2: %f`,
    (x, y, bx2, by2) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).smoothCurveTo(x, y, bx2, by2);
        const node = sut.last! as SvgPathSmoothCubicCurve;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathSmoothCubicCurve).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBe(y);
        expect(node.bezierX2).toBe(bx2 || 0);
        expect(node.bezierY2).toBe(by2 || 0);
    }
);

test('builder smooth curve by should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.smoothCurveBy(0, 0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, 0, 0],
    [0, -10.1, 20, 1.1, 20, -9],
    [3.5, 5.9, 7.8, -4.3, 11.3, 1.6],
    [12.34, -44.4, -32.32, 5.509, -19.98, -38.891],
    [0.045, 2.56, -6.332, 5.686, -6.287, 8.246]
])
.test(`builder smooth curve by should add new smooth quadratic curve node (%#):
start x: %f, start y: %f, dx: %f, dy: %f, expected x: %f, expected y: %f`,
    (startX, startY, dx, dy, expectedX, expectedY) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(startX, startY).smoothCurveBy(dx, dy);
        const node = sut.last! as SvgPathSmoothQuadraticCurve;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathSmoothQuadraticCurve).toBe(true);
        expect(node.x).toBeCloseTo(expectedX, 8);
        expect(node.y).toBeCloseTo(expectedY, 8);
    }
);

each([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, -10.1, 20, 1.1, 8, null, 20, -9, 8, -10.1],
    [3.5, 5.9, 7.8, -4.3, null, 4.4, 11.3, 1.6, 3.5, 10.3],
    [12.34, -44.4, -32.32, 5.509, -4.54, 0.023, -19.98, -38.891, 7.8, -44.377],
    [0.045, 2.56, -6.332, 5.686, 7.88, -1.123, -6.287, 8.246, 7.925, 1.437]
])
.test(`builder smooth curve to should add new smooth cubic curve node (%#): start x: %f, start y: %f, dx: %f, dy: %f,
bezier dx2: %f, bezier dy2: %f, expected x: %f, expected y: %f, expected bezier x2: %f, expected bezier y2: %f`,
    (startX, startY, dx, dy, bdx2, bdy2, expectedX, expectedY, expectedBx2, expectedBy2) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(startX, startY).smoothCurveBy(dx, dy, bdx2, bdy2);
        const node = sut.last! as SvgPathSmoothCubicCurve;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathSmoothCubicCurve).toBe(true);
        expect(node.x).toBeCloseTo(expectedX, 8);
        expect(node.y).toBeCloseTo(expectedY, 8);
        expect(node.bezierX2).toBeCloseTo(expectedBx2, 8);
        expect(node.bezierY2).toBeCloseTo(expectedBy2, 8);
    }
);

test('builder arc to should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.arcTo(0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180],
    [12, 10, 1, 2, 50, SvgPathArcStyle.CccwGt180],
    [-44.4, 12.32, 12.214, -1.262, -98.76, SvgPathArcStyle.CcwGt180],
    [2.56, -6.332, -5.43, 0.853, 267, SvgPathArcStyle.CcwLt180]
])
.test('builder arc to should add new arc node (%#): x: %f, y: %f, rx: %f, ry: %f, angle: %f, style: %i',
    (x, y, rx, ry, angle, style) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).arcTo(x, y, rx, ry, angle, style);
        const node = sut.last! as SvgPathArc;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathArc).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBe(y);
        expect(node.rx).toBe(rx);
        expect(node.ry).toBe(ry);
        expect(node.rotationAngleInDegrees).toBe(angle);
        expect(node.style).toBe(style);
    }
);

test('builder arc by should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.arcBy(0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180, 0, 0],
    [4, 5, 12, 10, 1, 2, 50, SvgPathArcStyle.CccwGt180, 16, 15],
    [5.64, -23.511, -44.4, 12.32, 12.214, -1.262, -98.76, SvgPathArcStyle.CcwGt180, -38.76, -11.191],
    [1.462, 0.0075, 2.56, -6.332, -5.43, 0.853, 267, SvgPathArcStyle.CcwLt180, 4.022, -6.3245]
])
.test(`builder arc by should add new arc node (%#):
prev x: %f, prev y: %f, dx: %f, dy: %f, rx: %f, ry: %f, angle: %f, style: %i, expected x: %f, expected y: %f`,
    (startX, startY, dx, dy, rx, ry, angle, style, expectedX, expectedY) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(startX, startY).arcBy(dx, dy, rx, ry, angle, style);
        const node = sut.last! as SvgPathArc;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathArc).toBe(true);
        expect(node.x).toBeCloseTo(expectedX, 8);
        expect(node.y).toBeCloseTo(expectedY, 8);
        expect(node.rx).toBe(rx);
        expect(node.ry).toBe(ry);
        expect(node.rotationAngleInDegrees).toBe(angle);
        expect(node.style).toBe(style);
    }
);

test('builder add rounded corner to should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.addRoundedCornerTo(0, 0, 0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, 0, 0, 0],
    [5, 7, 17, -2, 3, 17, -150.255118703],
    [4, -8, -10, 1, 5, 170, 102.994616791],
    [0, 0, 90, -5.2, 3.3, -90, 147.600159826],
    [1.23, -0.54, -50.7, 7.77642, -31.323, -50.7, -77.994138797]
])
.test(`builder add rounded corner to should add line node when no intersection was found (%#):
prev x: %f, prev y: %f, prev angle: %f, x: %f, y: %f, angle: %f, expected angle: %f`,
    (prevX, prevY, prevAngle, x, y, angle, expectedAngle) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(prevX, prevY, prevAngle).addRoundedCornerTo(x, y, angle);
        const node = sut.last as SvgPathLine;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result.builder()).toBe(sut);
        expect(node instanceof SvgPathLine).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBe(y);
        expect(node.angleInDegrees).toBeCloseTo(expectedAngle, 8);
    }
);

each([
    [5, 7, 17, -2, 3, 30, 4.847389929, 6.953342419, -150],
    [4, -8, -10, 1, 5, 0, -69.726663655, 5, 0],
    [0, 0, 90, -5.2, 3.3, -50, 0, -2.897118681, 130],
    [1.23, -0.54, -50.7, 7.77642, -31.323, 270, 7.77642, -8.538162313, -90],
    [5.5, -22.3, 101, 11.23, 0.003, 471, -9.16063169, 53.122411638, -69]
])
.test(`builder add rounded corner to should add quadratic curve node (%#): prev x: %f, prev y: %f, prev angle: %f, x: %f, y: %f, angle: %f,
expected bezier x: %f, expected bezier y: %f, expected angle: %f`,
    (prevX, prevY, prevAngle, x, y, angle, expectedBx, expectedBy, expectedAngle) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(prevX, prevY, prevAngle).addRoundedCornerTo(x, y, angle);
        const node = sut.last as SvgPathQuadraticCurve;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result.builder()).toBe(sut);
        expect(node instanceof SvgPathQuadraticCurve).toBe(true);
        expect(node.x).toBe(x);
        expect(node.y).toBe(y);
        expect(node.bezierX).toBeCloseTo(expectedBx, 8);
        expect(node.bezierY).toBeCloseTo(expectedBy, 8);
        expect(node.angleInDegrees).toBeCloseTo(expectedAngle, 8);
    }
);

test('builder add rounded corner by should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.addRoundedCornerBy(0, 0, 0);
        expect(action).toThrowError();
    }
);

each([
    [0, 0, 0, 0, 0, 0, 0],
    [5, 7, 17, -2, 3, 17, 123.690067525],
    [4, -8, -10, 1, 5, 170, 78.690067525],
    [0, 0, 90, -5.2, 3.3, -90, 147.600159826],
    [1.23, -0.54, -50.7, 7.77642, -31.323, -50.7, -76.057328754]
])
.test(`builder add rounded corner by should add line offset node when no intersection was found (%#):
prev x: %f, prev y: %f, prev angle: %f, dx: %f, dy: %f, angle: %f, expected angle: %f`,
    (prevX, prevY, prevAngle, dx, dy, angle, expectedAngle) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(prevX, prevY, prevAngle).addRoundedCornerBy(dx, dy, angle);
        const node = sut.last as SvgPathLineOffset;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result.builder()).toBe(sut);
        expect(node instanceof SvgPathLineOffset).toBe(true);
        expect(node.dx).toBeCloseTo(dx, 8);
        expect(node.dy).toBeCloseTo(dy, 8);
        expect(node.angleInDegrees).toBeCloseTo(expectedAngle, 8);
    }
);

each([
    [5, 7, 17, -2, 3, 30, 3, 10, -10.296026965, 2.323535252, 30],
    [4, -8, -10, 1, 5, 0, 5, -3, -24.356409098, -3, 0],
    [0, 0, 90, -5.2, 3.3, -50, -5.2, 3.3, 0, -2.897118681, 130],
    [1.23, -0.54, -50.7, 7.77642, -31.323, 270, 9.00642, -31.863, 9.00642, -10.040928657, -90],
    [5.5, -22.3, 101, 11.23, 0.003, 471, 16.73, -22.297, -6.021383739, 36.972380986, -69]
])
.test(`builder add rounded corner by should add quadratic curve node (%#): prev x: %f, prev y: %f, prev angle: %f, dx: %f, dy: %f,
angle: %f, expected x: %f, expected y: %f, expected bezier x: %f, expected bezier y: %f, expected angle: %f`,
    (prevX, prevY, prevAngle, dx, dy, angle, expectedX, expectedY, expectedBx, expectedBy, expectedAngle) => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(prevX, prevY, prevAngle).addRoundedCornerBy(dx, dy, angle);
        const node = sut.last as SvgPathQuadraticCurve;
        assert(sut, 2, node.prev!, node, node.prev! as SvgPathStart);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result.builder()).toBe(sut);
        expect(node instanceof SvgPathQuadraticCurve).toBe(true);
        expect(node.x).toBeCloseTo(expectedX, 8);
        expect(node.y).toBeCloseTo(expectedY, 8);
        expect(node.bezierX).toBeCloseTo(expectedBx, 8);
        expect(node.bezierY).toBeCloseTo(expectedBy, 8);
        expect(node.angleInDegrees).toBeCloseTo(expectedAngle, 8);
    }
);

test('builder scale should return the builder',
    () => {
        const sut = new SvgPathBuilder();
        const result = sut.scale(0, 0, 0);
        expect(result).toBe(sut);
        expect(result.isEmpty).toBe(true);
    }
);

each([
    [0, 0, 0],
    [-10, 12, 0.6],
    [223.4, -11.2, 1],
    [0.445, 1.22, 2.5]
])
.test('builder scale should return the builder with scaled nodes (%#): ox: %f, oy: %f, value: %f',
    (ox, oy, scale) => {
        const mocks: IMock<SvgPathNode>[] = [];
        const sut = new SvgPathBuilder().moveTo(0, 0);
        const start = sut.first! as SvgPathStart;
        for (let i = 0; i < 10; ++i) {
            mocks.push(mock<SvgPathNode>({
                scale(x: number, y: number, value: number) { return; },
                copy(prev) { return reinterpretCast<SvgPathNode>(this); }
            }));
            sut.addNode(mocks[i].subject);
        }
        const result = sut.scale(ox, oy, scale);
        expect(result).toBe(sut);
        expect(result.nodes.length).toBe(11);
        expect(result.first).toBe(start);
        expect(result.lastStart).toBe(result.first);
        for (let i = 1; i < result.nodes.length; ++i) {
            const m = mocks[i - 1];
            const info = m.getMemberInfo('scale') as IMockedMethodInfo;
            expect(result.nodes[i]).toBe(m.subject);
            expect(info.count).toBe(1);
            expect(info.getData(0)!.arguments[0]).toBe(ox);
            expect(info.getData(0)!.arguments[1]).toBe(oy);
            expect(info.getData(0)!.arguments[2]).toBe(scale);
        }
    }
);

test('builder translate should return the builder',
    () => {
        const sut = new SvgPathBuilder();
        const result = sut.translate(0, 0);
        expect(result).toBe(sut);
        expect(result.isEmpty).toBe(true);
    }
);

each([
    [0, 0],
    [-10, 12],
    [223.4, -11.2],
    [0.445, 1.22]
])
.test('builder translate should return the builder with translated nodes (%#): dx: %f, dy: %f',
    (dx, dy) => {
        const mocks: IMock<SvgPathNode>[] = [];
        const sut = new SvgPathBuilder().moveTo(0, 0);
        const start = sut.first! as SvgPathStart;
        for (let i = 0; i < 10; ++i) {
            mocks.push(mock<SvgPathNode>({
                translate(x: number, y: number) { return; },
                copy(prev) { return reinterpretCast<SvgPathNode>(this); }
            }));
            sut.addNode(mocks[i].subject);
        }
        const result = sut.translate(dx, dy);
        expect(result).toBe(sut);
        expect(result.nodes.length).toBe(11);
        expect(result.first).toBe(start);
        expect(result.lastStart).toBe(result.first);
        for (let i = 1; i < result.nodes.length; ++i) {
            const m = mocks[i - 1];
            const info = m.getMemberInfo('translate') as IMockedMethodInfo;
            expect(result.nodes[i]).toBe(m.subject);
            expect(info.count).toBe(1);
            expect(info.getData(0)!.arguments[0]).toBe(dx);
            expect(info.getData(0)!.arguments[1]).toBe(dy);
        }
    }
);

test('builder rotate should return the builder',
    () => {
        const sut = new SvgPathBuilder();
        const result = sut.rotate(0, 0, 0);
        expect(result).toBe(sut);
        expect(result.isEmpty).toBe(true);
    }
);

each([
    [0, 0, 0],
    [-10, 12, 100],
    [223.4, -11.2, -456],
    [0.445, 1.22, 234.52]
])
.test('builder rotate should return the builder with rotated nodes (%#): ox: %f, oy: %f, degrees: %f',
    (ox, oy, degrees) => {
        const mocks: IMock<SvgPathNode>[] = [];
        const sut = new SvgPathBuilder().moveTo(0, 0);
        const start = sut.first! as SvgPathStart;
        for (let i = 0; i < 10; ++i) {
            mocks.push(mock<SvgPathNode>({
                rotate(x: number, y: number, value: Angle) { return; },
                copy(prev) { return reinterpretCast<SvgPathNode>(this); }
            }));
            sut.addNode(mocks[i].subject);
        }
        const result = sut.rotate(ox, oy, degrees);
        expect(result).toBe(sut);
        expect(result.nodes.length).toBe(11);
        expect(result.first).toBe(start);
        expect(result.lastStart).toBe(result.first);
        for (let i = 1; i < result.nodes.length; ++i) {
            const m = mocks[i - 1];
            const info = m.getMemberInfo('rotate') as IMockedMethodInfo;
            expect(result.nodes[i]).toBe(m.subject);
            expect(info.count).toBe(1);
            expect(info.getData(0)!.arguments[0]).toBe(ox);
            expect(info.getData(0)!.arguments[1]).toBe(oy);
            expect(info.getData(0)!.arguments[2].degrees).toBe(degrees);
        }
    }
);

each([
    [0],
    [1],
    [2],
    [5],
    [10],
    [18],
    [20]
])
.test('builder copy should return an empty builder if is empty (%#): precision: %i',
    (precision) => {
        const sut = new SvgPathBuilder(precision);
        const result = sut.copy();
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result.isEmpty).toBe(true);
        expect(result.precision).toBe(sut.precision);
    }
);

test('builder copy should return a valid builder',
    () => {
        const mocks: IMock<SvgPathNode>[] = [];
        const sut = new SvgPathBuilder().moveTo(0, 0);
        const start = sut.first! as SvgPathStart;
        for (let i = 0; i < 10; ++i) {
            mocks.push(mock<SvgPathNode>({
                copy(prev) { return reinterpretCast<SvgPathNode>(this); }
            }));
            sut.addNode(mocks[i].subject);
            (mocks[i].getMemberInfo('copy') as IMockedMethodInfo).clear();
        }
        const result = sut.copy();
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(sut);
        expect(result.nodes.length).toBe(sut.nodes.length);
        expect(result.first instanceof SvgPathStart).toBe(true);
        expect(result.first).not.toBe(start);
        expect(result.first!.prev).toBeNull();
        expect(result.lastStart).toBe(result.first);
        for (let i = 1; i < result.nodes.length; ++i) {
            const m = mocks[i - 1];
            const info = m.getMemberInfo('copy') as IMockedMethodInfo;
            expect(result.nodes[i]).toBe(m.subject);
            expect(info.count).toBe(1);
            if (i === 1) {
                expect(info.getData(0)!.arguments[0]).toBe(result.first);
            } else {
                const prevInfo = mocks[i - 2].getMemberInfo('copy') as IMockedMethodInfo;
                expect(info.getData(0)!.globalNo).toBeGreaterThan(prevInfo.getData(0)!.globalNo);
                expect(info.getData(0)!.arguments[0]).toBe(mocks[i - 2].subject);
            }
        }
    }
);

test('builder close should throw when start node doesn\'t exist yet',
    () => {
        const sut = new SvgPathBuilder();
        const action = () => sut.close();
        expect(action).toThrowError();
    }
);

test('builder close should add close node and reset last start node',
    () => {
        const sut = new SvgPathBuilder();
        const result = sut.moveTo(0, 0).close();
        const node = sut.last as SvgPathClose;
        assert(sut, 2, node.prev!, node);
        expect(result).toBe(sut);
        expect(node instanceof SvgPathClose).toBe(true);
    }
);

test('builder build should return an empty text if is empty',
    () => {
        const sut = new SvgPathBuilder();
        const result = sut.build();
        expect(result).toBe('');
    }
);

test('builder build should return a valid text',
    () => {
        const mocks: IMock<SvgPathNode>[] = [];
        const sut = new SvgPathBuilder().moveTo(0, 0);
        const start = sut.first! as SvgPathStart;
        for (let i = 0; i < 10; ++i) {
            mocks.push(mock<SvgPathNode>({
                createSvgCommand(prec) { return `MOCK[${i}]`; },
                copy(prev) { return reinterpretCast<SvgPathNode>(this); }
            }));
            sut.addNode(mocks[i].subject);
        }
        const result = sut.build();
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).toBe(`${start.createSvgCommand(sut.precision)} ${mocks.map((_, i) => `MOCK[${i}]`).join(' ')}`);
    }
);

each([
    [0, 0],
    [-1, 0],
    [1, 1],
    [2, 2],
    [5, 5],
    [10, 10],
    [18, 18],
    [20, 20],
    [21, 20],
    [3.4, 3],
    [3.5, 4],
    [3.6, 4],
    [null, SvgPathBuilder.DEFAULT_PRECISION],
    [void(0), SvgPathBuilder.DEFAULT_PRECISION]
])
.test('starter ctor should create with provided precision (%#): value: %f, expected: %i',
    (value, expected) => {
        const sut = new SvgPathStarter(value);
        expect(sut.precision).toBe(expected);
    }
);

each([
    [0],
    [1],
    [2],
    [5],
    [10],
    [18],
    [20]
])
.test('starter start should create new empty builder (%#): precision: %i',
    (precision) => {
        const sut = new SvgPathStarter(precision);
        const result = sut.start();
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result.isEmpty).toBe(true);
        expect(result.precision).toBe(sut.precision);
    }
);

each([
    [0, 0, void(0), 0],
    [0, 0, null, 0],
    [2, 5, 30, 1],
    [-5.5, 3.21, 127, 2],
    [-2.3, 22.4, -16.5, 5],
    [12.21, 55,42, 181, 10],
    [9.998, -8.7534, 234, 18],
    [55, -43, -678, 20]
])
.test('starter start at should create new builder with start node (%#): x: %f, y: %f, angle: %f, precision: %i',
    (x, y, angle, precision) => {
        const sut = new SvgPathStarter(precision);
        const result = sut.startAt(x, y, angle);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result.precision).toBe(sut.precision);
        const last = result.last! as SvgPathStart;
        assert(result, 1, last, last, last);
        expect(last instanceof SvgPathStart).toBe(true);
        expect(last.x).toBe(x);
        expect(last.y).toBe(y);
        expect(last.angleInDegrees).toBe(angle || 0);
    }
);
