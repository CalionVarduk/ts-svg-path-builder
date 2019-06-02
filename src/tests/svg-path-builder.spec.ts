import { SvgPathBuilder, SvgPathStarter, SvgPathAfterCornerBuilder, SvgGeometryBuilder } from '../core/svg-path-builder';
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
import { Angle } from '../core/primitives/angle';
import { mock, IMockedMethodInfo, IMock, partialMock, IInvocationData } from 'frlluc-mocking';
import { reinterpretCast, Nullable } from 'frlluc-utils';
import each from 'jest-each';

function assertMockArgs(data: IInvocationData[], expected: any[][]): void {
    for (let i = 1; i < data.length; ++i) {
        expect(data[i].globalNo).toBeGreaterThan(data[i - 1].globalNo);
    }
    for (let i = 0; i < data.length; ++i) {
        expect(data[i].arguments.length).toBe(expected[i].length);
        for (let a = 0; a < expected[i].length; ++a) {
            expect(data[i].arguments[a]).toBeCloseTo(expected[i][a], 8);
        }
    }
}

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

test('geometry builder ctor should create with provided builder',
    () => {
        const builderMock = mock<SvgPathBuilder>({});
        const sut = new SvgGeometryBuilder(builderMock.subject);
        expect(sut.builder()).toBe(builderMock.subject);
    }
);

each([
    [0, 0, 0, [
        [0, 0, -90],
        [0, 0, 0, 0, 0, SvgPathArcStyle.CcwGt180],
        [0, 0, 0, 0, 0, SvgPathArcStyle.CcwGt180],
        []
    ]],
    [1, 2, 100, [
        [-99, 2, -90],
        [101, 2, 100, 100, 0, SvgPathArcStyle.CcwGt180],
        [-99, 2, 100, 100, 0, SvgPathArcStyle.CcwGt180],
        []
    ]],
    [-1, -3, -70, [
        [69, -3, -90],
        [-71, -3, -70, -70, 0, SvgPathArcStyle.CcwGt180],
        [69, -3, -70, -70, 0, SvgPathArcStyle.CcwGt180],
        []
    ]],
    [24, 56, 365.6, [
        [-341.6, 56, -90],
        [389.6, 56, 365.6, 365.6, 0, SvgPathArcStyle.CcwGt180],
        [-341.6, 56, 365.6, 365.6, 0, SvgPathArcStyle.CcwGt180],
        []
    ]],
    [-45.32, 24.332, 12.312, [
        [-57.632, 24.332, -90],
        [-33.008, 24.332, 12.312, 12.312, 0, SvgPathArcStyle.CcwGt180],
        [-57.632, 24.332, 12.312, 12.312, 0, SvgPathArcStyle.CcwGt180],
        []
    ]],
])
.test('geometry builder add circle should invoke proper builder methods (%#): cx: %f, cy: %f, r: %f, expected args: %o',
    (cx, cy, r, args) => {
        const builderMock = mock<SvgPathBuilder>({
            moveTo(x, y, a) { return reinterpretCast<SvgPathBuilder>(this); },
            arcTo(x, y, rx, ry, a, s) { return reinterpretCast<SvgPathBuilder>(this); },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addCircle(cx, cy, r);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const arcToInfo = builderMock.getMemberInfo('arcTo') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        expect(moveToInfo.count).toBe(1);
        expect(arcToInfo.count).toBe(2);
        expect(closeInfo.count).toBe(1);
        const data = [
            moveToInfo.getData(0)!,
            arcToInfo.getData(0)!,
            arcToInfo.getData(1)!,
            closeInfo.getData(0)!
        ];
        assertMockArgs(data, args);
    }
);

each([
    [0, 0, 0, 0, 0, [
        [0, 0, -90],
        [0, 0, 0, 0, 0, SvgPathArcStyle.CcwGt180],
        [0, 0, 0, 0, 0, SvgPathArcStyle.CcwGt180],
        []
    ]],
    [1, 2, 100, 100, null, [
        [-99, 2, -90],
        [101, 2, 100, 100, 0, SvgPathArcStyle.CcwGt180],
        [-99, 2, 100, 100, 0, SvgPathArcStyle.CcwGt180],
        []
    ]],
    [1, 5, 10, 15, void(0), [
        [-9, 5, -90],
        [11, 5, 10, 15, 0, SvgPathArcStyle.CcwGt180],
        [-9, 5, 10, 15, 0, SvgPathArcStyle.CcwGt180],
        []
    ]],
    [-1, -3, -70, 10, 12, [
        [-69.470332051, -17.553818357, -78],
        [67.470332051, 11.553818357, -70, 10, 12, SvgPathArcStyle.CcwGt180],
        [-69.470332051, -17.553818357, -70, 10, 12, SvgPathArcStyle.CcwGt180],
        []
    ]],
    [24, 56, 365.6, 453.2, 129.21, [
        [255.119358151, -227.279371447, 39.21],
        [-207.119358151, 339.279371447, 365.6, 453.2, 129.21, SvgPathArcStyle.CcwGt180],
        [255.119358151, -227.279371447, 365.6, 453.2, 129.21, SvgPathArcStyle.CcwGt180],
        []
    ]],
    [-45.32, 24.332, 12.312, 10.432, -56.77, [
        [-52.066991724, 34.630710922, -146.77],
        [-38.573008275, 14.033289077, 12.312, 10.432, -56.77, SvgPathArcStyle.CcwGt180],
        [-52.066991724, 34.630710922, 12.312, 10.432, -56.77, SvgPathArcStyle.CcwGt180],
        []
    ]],
])
.test(`geometry builder add ellipse should invoke proper builder methods (%#):
cx: %f, cy: %f, rx: %f, ry: %f, angle: %f, expected args: %o`,
    (cx, cy, rx, ry, angle, args) => {
        const builderMock = mock<SvgPathBuilder>({
            moveTo(x, y, a) { return reinterpretCast<SvgPathBuilder>(this); },
            arcTo(x, y, r1, r2, a, s) { return reinterpretCast<SvgPathBuilder>(this); },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addEllipse(cx, cy, rx, ry, angle);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const arcToInfo = builderMock.getMemberInfo('arcTo') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        expect(moveToInfo.count).toBe(1);
        expect(arcToInfo.count).toBe(2);
        expect(closeInfo.count).toBe(1);
        const data = [
            moveToInfo.getData(0)!,
            arcToInfo.getData(0)!,
            arcToInfo.getData(1)!,
            closeInfo.getData(0)!
        ];
        assertMockArgs(data, args);
    }
);

each([
    [0, 0, 0, 0, [
        [0, 0, -90],
        [0, 0, 0, 0, 0, SvgPathArcStyle.CcwGt180],
        [0, 0, 0, 0, 0, SvgPathArcStyle.CcwGt180],
        [0, 0, 90],
        [0, 0, 0, 0, 0, SvgPathArcStyle.CccwGt180],
        [0, 0, 0, 0, 0, SvgPathArcStyle.CccwGt180],
        []
    ]],
    [1, 2, 100, 0, [
        [-99, 2, -90],
        [101, 2, 100, 100, 0, SvgPathArcStyle.CcwGt180],
        [-99, 2, 100, 100, 0, SvgPathArcStyle.CcwGt180],
        [-99, 2, 90],
        [101, 2, 100, 100, 0, SvgPathArcStyle.CccwGt180],
        [-99, 2, 100, 100, 0, SvgPathArcStyle.CccwGt180],
        []
    ]],
    [-1, -3, -70, 10, [
        [59, -3, -90],
        [-61, -3, -60, -60, 0, SvgPathArcStyle.CcwGt180],
        [59, -3, -60, -60, 0, SvgPathArcStyle.CcwGt180],
        [69, -3, 90],
        [-71, -3, -70, -70, 0, SvgPathArcStyle.CccwGt180],
        [69, -3, -70, -70, 0, SvgPathArcStyle.CccwGt180],
        []
    ]],
    [24, 56, 365.6, 453.2, [
        [-794.8, 56, -90],
        [842.8, 56, 818.8, 818.8, 0, SvgPathArcStyle.CcwGt180],
        [-794.8, 56, 818.8, 818.8, 0, SvgPathArcStyle.CcwGt180],
        [-341.6, 56, 90],
        [389.6, 56, 365.6, 365.6, 0, SvgPathArcStyle.CccwGt180],
        [-341.6, 56, 365.6, 365.6, 0, SvgPathArcStyle.CccwGt180],
        []
    ]],
    [-45.32, 24.332, 12.312, 10.432, [
        [-68.064, 24.332, -90],
        [-22.576, 24.332, 22.744, 22.744, 0, SvgPathArcStyle.CcwGt180],
        [-68.064, 24.332, 22.744, 22.744, 0, SvgPathArcStyle.CcwGt180],
        [-57.632, 24.332, 90],
        [-33.008, 24.332, 12.312, 12.312, 0, SvgPathArcStyle.CccwGt180],
        [-57.632, 24.332, 12.312, 12.312, 0, SvgPathArcStyle.CccwGt180],
        []
    ]],
])
.test(`geometry builder add ring should invoke proper builder methods (%#):
cx: %f, cy: %f, r: %f, w: %f, expected args: %o`,
    (cx, cy, r, w, args) => {
        const builderMock = mock<SvgPathBuilder>({
            moveTo(x, y, a) { return reinterpretCast<SvgPathBuilder>(this); },
            arcTo(x, y, r1, r2, a, s) { return reinterpretCast<SvgPathBuilder>(this); },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addRing(cx, cy, r, w);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const arcToInfo = builderMock.getMemberInfo('arcTo') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        expect(moveToInfo.count).toBe(2);
        expect(arcToInfo.count).toBe(4);
        expect(closeInfo.count).toBe(1);
        const data = [
            moveToInfo.getData(0)!,
            arcToInfo.getData(0)!,
            arcToInfo.getData(1)!,
            moveToInfo.getData(1)!,
            arcToInfo.getData(2)!,
            arcToInfo.getData(3)!,
            closeInfo.getData(0)!
        ];
        assertMockArgs(data, args);
    }
);

each([
    [0, 0, 0, null],
    [0, 1, 2, void(0)],
    [1, 2, -5, {}],
    [10, 30, 2, { angleInDegrees: 5 }],
    [-22.23, -536.3, 17.56, { cornerRadii: { topLeft: 7, bottomRight: -3 } }],
    [234.12, -1.235, 21.345, { angleInDegrees: -123.4, cornerRadii: { topLeft: 5.5, bottomRight: 12.32, topRight: 0 } }]
])
.test('geometry builder add square should invoke add rectangle (%#): left: %f, top: %f, size: %f, options: %o',
    (l, t, s, o) => {
        const sut = new SvgGeometryBuilder(mock<SvgPathBuilder>({}).subject);
        const sutMock = partialMock(sut, {
            addRectangle(x: number, y: number, w: number, h: number, opt: any) { return reinterpretCast<SvgGeometryBuilder>(this); }
        });
        const result = sut.addSquare(l, t, s, o);
        expect(result).toBe(sut);
        const info = sutMock.getMemberInfo('addRectangle') as IMockedMethodInfo;
        expect(info.count).toBe(1);
        expect(info.getData(0)!.arguments).toStrictEqual([l, t, s, s, o || null]);
    }
);

each([
    [0, 0, 0, 0, null, [
        [0, 0, 270],
        [0, 0],
        [0, 90],
        [0, 180],
        []
    ]],
    [0, 1, 2, 3, void(0), [
        [0, 1, 270],
        [2, 0],
        [3, 90],
        [2, 180],
        []
    ]],
    [1, 2, 100, 85, {}, [
        [1, 2, 270],
        [100, 0],
        [85, 90],
        [100, 180],
        []
    ]],
    [-1, -3, 70, 10, { angleInDegrees: 0 }, [
        [-1, -3, 270],
        [70, 0],
        [10, 90],
        [70, 180],
        []
    ]],
    [24, 56, 365.6, 453.2, { angleInDegrees: 123 }, [
        [24, 56, 393],
        [365.6, 123],
        [453.2, 213],
        [365.6, 303],
        []
    ]],
    [-45.32, 24.332, 12.312, 10.432, { angleInDegrees: -562.3 }, [
        [-45.32, 24.332, -292.3],
        [12.312, -562.3],
        [10.432, -472.3],
        [12.312, -382.3],
        []
    ]]
])
.test(`geometry builder add rectangle without corner options should invoke proper builder methods (%#):
left: %f, top: %f, width: %f, height: %f, options: %o, expected args: %o`,
    (x, y, w, h, o, args) => {
        const builderMock = mock<SvgPathBuilder>({
            moveTo(l, t, a) { return reinterpretCast<SvgPathBuilder>(this); },
            addLine(l, a) { return reinterpretCast<SvgPathBuilder>(this); },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addRectangle(x, y, w, h, o);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const addLineInfo = builderMock.getMemberInfo('addLine') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        expect(moveToInfo.count).toBe(1);
        expect(addLineInfo.count).toBe(3);
        expect(closeInfo.count).toBe(1);
        const data = [
            moveToInfo.getData(0)!,
            addLineInfo.getData(0)!,
            addLineInfo.getData(1)!,
            addLineInfo.getData(2)!,
            closeInfo.getData(0)!
        ];
        assertMockArgs(data, args);
    }
);

each([
    [-1, -3, 70, 10, { angleInDegrees: 0, cornerRadii: { topLeft: 5 } }, [
        [-1, 2, 270],
        [4, -3, -1, -3],
        [65, 0],
        [10, 90],
        [70, 180],
        []
    ]],
    [24, 56, 365.6, 453.2, { angleInDegrees: 123, cornerRadii: { topLeft: 12 } }, [
        [13.935953184, 49.464331579, 393],
        [17.464331579, 66.064046815, 24, 56],
        [353.6, 123],
        [453.2, 213],
        [365.6, 303],
        []
    ]],
    [-45.32, 24.332, 12.312, 10.432, { angleInDegrees: -562.3, cornerRadii: { topLeft: 1.2345 } }, [
        [-45.788438628, 23.189828602, -292.3],
        [-46.462171397, 24.800438628, -45.32, 24.332],
        [11.0775, -562.3],
        [10.432, -472.3],
        [12.312, -382.3],
        []
    ]]
])
.test(`geometry builder add rectangle with top left corner option should invoke proper builder methods (%#):
left: %f, top: %f, width: %f, height: %f, options: %o, expected args: %o`,
    (x, y, w, h, o, args) => {
        const builderMock = mock<SvgPathBuilder>({
            moveTo(l, t, a) { return reinterpretCast<SvgPathBuilder>(this); },
            addLine(l, a) { return reinterpretCast<SvgPathBuilder>(this); },
            curveTo(a, b, bx1, by1, bx2, by2) { return reinterpretCast<SvgPathBuilder>(this); },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addRectangle(x, y, w, h, o);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const addLineInfo = builderMock.getMemberInfo('addLine') as IMockedMethodInfo;
        const curveToInfo = builderMock.getMemberInfo('curveTo') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        expect(moveToInfo.count).toBe(1);
        expect(addLineInfo.count).toBe(3);
        expect(curveToInfo.count).toBe(1);
        expect(closeInfo.count).toBe(1);
        const data = [
            moveToInfo.getData(0)!,
            curveToInfo.getData(0)!,
            addLineInfo.getData(0)!,
            addLineInfo.getData(1)!,
            addLineInfo.getData(2)!,
            closeInfo.getData(0)!
        ];
        assertMockArgs(data, args);
    }
);

each([
    [-1, -3, 70, 10, { angleInDegrees: 0, cornerRadii: { topRight: 5 } }, [
        [-1, -3, 270],
        [65, 0],
        [69, 2, 69, -3],
        [5, 90],
        [70, 180],
        []
    ]],
    [24, 56, 365.6, 453.2, { angleInDegrees: 123, cornerRadii: { topRight: 12 } }, [
        [24, 56, 393],
        [353.6, 123],
        [-185.184078016, 356.08229122, -175.120031201, 362.61795964],
        [441.2, 213],
        [365.6, 303],
        []
    ]],
    [-45.32, 24.332, 12.312, 10.432, { angleInDegrees: -562.3, cornerRadii: { topRight: 1.2345 } }, [
        [-45.32, 24.332, -292.3],
        [11.0775, -562.3],
        [-57.179620681, 27.861692838, -56.711182052, 29.003864236],
        [9.1975, -472.3],
        [12.312, -382.3],
        []
    ]]
])
.test(`geometry builder add rectangle with top right corner option should invoke proper builder methods (%#):
left: %f, top: %f, width: %f, height: %f, options: %o, expected args: %o`,
    (x, y, w, h, o, args) => {
        const builder = new SvgPathBuilder();
        const moveToMethod = builder.moveTo.bind(builder);
        const addLineMethod = builder.addLine.bind(builder);
        const curveToMethod = builder.curveTo.bind(builder);

        const builderMock = partialMock<SvgPathBuilder>(builder, {
            moveTo(l, t, a) {
                moveToMethod(l, t, a);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            addLine(l, a) {
                addLineMethod(l, a);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            curveTo(a, b, bx1, by1, bx2, by2) {
                curveToMethod(a, b, bx1, by1, bx2, by2);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addRectangle(x, y, w, h, o);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const addLineInfo = builderMock.getMemberInfo('addLine') as IMockedMethodInfo;
        const curveToInfo = builderMock.getMemberInfo('curveTo') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        expect(moveToInfo.count).toBe(1);
        expect(addLineInfo.count).toBe(3);
        expect(curveToInfo.count).toBe(1);
        expect(closeInfo.count).toBe(1);
        const data = [
            moveToInfo.getData(0)!,
            addLineInfo.getData(0)!,
            curveToInfo.getData(0)!,
            addLineInfo.getData(1)!,
            addLineInfo.getData(2)!,
            closeInfo.getData(0)!
        ];
        assertMockArgs(data, args);
    }
);

each([
    [-1, -3, 70, 10, { angleInDegrees: 0, cornerRadii: { bottomRight: 5 } }, [
        [-1, -3, 270],
        [70, 0],
        [5, 90],
        [64, 7, 69, 7],
        [65, 180],
        []
    ]],
    [24, 56, 365.6, 453.2, { angleInDegrees: 123, cornerRadii: { bottomRight: 12 } }, [
        [24, 56, 393],
        [365.6, 123],
        [441.2, 213],
        [-548.669864174, 105.723502156, -555.205532594, 115.787548972],
        [353.6, 303],
        []
    ]],
    [-45.32, 24.332, 12.312, 10.432, { angleInDegrees: -562.3, cornerRadii: { bottomRight: 1.2345 } }, [
        [-45.32, 24.332, -292.3],
        [12.312, -562.3],
        [9.1975, -472.3],
        [-59.527497311, 18.883637824, -60.669668708, 19.352076453],
        [11.0775, -382.3],
        []
    ]]
])
.test(`geometry builder add rectangle with bottom right corner option should invoke proper builder methods (%#):
left: %f, top: %f, width: %f, height: %f, options: %o, expected args: %o`,
    (x, y, w, h, o, args) => {
        const builder = new SvgPathBuilder();
        const moveToMethod = builder.moveTo.bind(builder);
        const addLineMethod = builder.addLine.bind(builder);
        const curveToMethod = builder.curveTo.bind(builder);

        const builderMock = partialMock<SvgPathBuilder>(builder, {
            moveTo(l, t, a) {
                moveToMethod(l, t, a);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            addLine(l, a) {
                addLineMethod(l, a);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            curveTo(a, b, bx1, by1, bx2, by2) {
                curveToMethod(a, b, bx1, by1, bx2, by2);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addRectangle(x, y, w, h, o);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const addLineInfo = builderMock.getMemberInfo('addLine') as IMockedMethodInfo;
        const curveToInfo = builderMock.getMemberInfo('curveTo') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        expect(moveToInfo.count).toBe(1);
        expect(addLineInfo.count).toBe(3);
        expect(curveToInfo.count).toBe(1);
        expect(closeInfo.count).toBe(1);
        const data = [
            moveToInfo.getData(0)!,
            addLineInfo.getData(0)!,
            addLineInfo.getData(1)!,
            curveToInfo.getData(0)!,
            addLineInfo.getData(2)!,
            closeInfo.getData(0)!
        ];
        assertMockArgs(data, args);
    }
);

each([
    [-1, -3, 70, 10, { angleInDegrees: 0, cornerRadii: { bottomLeft: 5 } }, [
        [-1, -3, 270],
        [70, 0],
        [10, 90],
        [65, 180],
        [-1, 2, -1, 7],
        []
    ]],
    [24, 56, 365.6, 453.2, { angleInDegrees: 123, cornerRadii: { bottomLeft: 12 } }, [
        [24, 56, 393],
        [365.6, 123],
        [453.2, 213],
        [353.6, 303],
        [-346.021454577, -184.294742248, -356.085501392, -190.830410668],
        []
    ]],
    [-45.32, 24.332, 12.312, 10.432, { angleInDegrees: -562.3, cornerRadii: { bottomLeft: 1.2345 } }, [
        [-45.32, 24.332, -292.3],
        [12.312, -562.3],
        [10.432, -472.3],
        [11.0775, -382.3],
        [-48.810048027, 15.822383615, -49.278486656, 14.680212217],
        []
    ]]
])
.test(`geometry builder add rectangle with bottom left corner option should invoke proper builder methods (%#):
left: %f, top: %f, width: %f, height: %f, options: %o, expected args: %o`,
    (x, y, w, h, o, args) => {
        const builder = new SvgPathBuilder();
        const moveToMethod = builder.moveTo.bind(builder);
        const addLineMethod = builder.addLine.bind(builder);
        const curveToMethod = builder.curveTo.bind(builder);

        const builderMock = partialMock<SvgPathBuilder>(builder, {
            moveTo(l, t, a) {
                moveToMethod(l, t, a);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            addLine(l, a) {
                addLineMethod(l, a);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            curveTo(a, b, bx1, by1, bx2, by2) {
                curveToMethod(a, b, bx1, by1, bx2, by2);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addRectangle(x, y, w, h, o);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const addLineInfo = builderMock.getMemberInfo('addLine') as IMockedMethodInfo;
        const curveToInfo = builderMock.getMemberInfo('curveTo') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        expect(moveToInfo.count).toBe(1);
        expect(addLineInfo.count).toBe(3);
        expect(curveToInfo.count).toBe(1);
        expect(closeInfo.count).toBe(1);
        const data = [
            moveToInfo.getData(0)!,
            addLineInfo.getData(0)!,
            addLineInfo.getData(1)!,
            addLineInfo.getData(2)!,
            curveToInfo.getData(0)!,
            closeInfo.getData(0)!
        ];
        assertMockArgs(data, args);
    }
);

each([
    [-1, -3, 70, 10,
        { angleInDegrees: 0, cornerRadii: { topLeft: 3, topRight: 2, bottomRight: 4, bottomLeft: 5 } }, [
        [-1, 0, 270],
        [2, -3, -1, -3],
        [65, 0],
        [69, -1, 69, -3],
        [4, 90],
        [65, 7, 69, 7],
        [61, 180],
        [-1, 2, -1, 7],
        []
    ]],
    [24, 56, 365.6, 453.2,
        { angleInDegrees: 123, cornerRadii: { topLeft: 16, topRight: 21, bottomRight: 23, bottomLeft: 12 } }, [
        [10.581270912, 47.285775439, 393],
        [15.285775439, 69.418729087, 24, 56],
        [328.6, 123],
        [-192.732113128, 351.180539905, -175.120031201, 362.61795964],
        [409.2, 213],
        [-542.678834789, 96.498125909, -555.205532594, 115.787548972],
        [330.6, 303],
        [-346.021454577, -184.294742248, -356.085501392, -190.830410668],
        []
    ]],
    [-45.32, 24.332, 12.312, 10.432,
        { angleInDegrees: -562.3, cornerRadii: { topLeft: 2.45, topRight: 1.9458, bottomRight: 0.562, bottomLeft: 1.2345 } }, [
        [-46.24966759, 22.065236189, -292.3],
        [-47.58676381, 25.26166759, -45.32, 24.332],
        [7.9162, -562.3],
        [-57.449527847, 27.203591166, -56.711182052, 29.003864236],
        [7.9242, -472.3],
        [-60.149700847, 19.138822092, -60.669668708, 19.352076453],
        [10.5155, -382.3],
        [-48.810048027, 15.822383615, -49.278486656, 14.680212217],
        []
    ]]
])
.test(`geometry builder add rectangle with bottom left corner option should invoke proper builder methods (%#):
left: %f, top: %f, width: %f, height: %f, options: %o, expected args: %o`,
    (x, y, w, h, o, args) => {
        const builder = new SvgPathBuilder();
        const moveToMethod = builder.moveTo.bind(builder);
        const addLineMethod = builder.addLine.bind(builder);
        const curveToMethod = builder.curveTo.bind(builder);

        const builderMock = partialMock<SvgPathBuilder>(builder, {
            moveTo(l, t, a) {
                moveToMethod(l, t, a);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            addLine(l, a) {
                addLineMethod(l, a);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            curveTo(a, b, bx1, by1, bx2, by2) {
                curveToMethod(a, b, bx1, by1, bx2, by2);
                return reinterpretCast<SvgPathBuilder>(this);
            },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addRectangle(x, y, w, h, o);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const addLineInfo = builderMock.getMemberInfo('addLine') as IMockedMethodInfo;
        const curveToInfo = builderMock.getMemberInfo('curveTo') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        expect(moveToInfo.count).toBe(1);
        expect(addLineInfo.count).toBe(3);
        expect(curveToInfo.count).toBe(4);
        expect(closeInfo.count).toBe(1);
        const data = [
            moveToInfo.getData(0)!,
            curveToInfo.getData(0)!,
            addLineInfo.getData(0)!,
            curveToInfo.getData(1)!,
            addLineInfo.getData(1)!,
            curveToInfo.getData(2)!,
            addLineInfo.getData(2)!,
            curveToInfo.getData(3)!,
            closeInfo.getData(0)!
        ];
        assertMockArgs(data, args);
    }
);

each([
    [[]],
    [[{ x: 0, y: 0 }]],
    [[{ x: 0, y: 0 }, { x: 1, y: 2 }]],
    [[{ x: 0, y: 0 }, { x: 2, y: -3 }, { x: 1.34, y: 7.64 }]],
    [[{ x: 0, y: 0 }, { x: 2, y: -3 }, { x: 2.45, y: -0.42 }, { x: 0, y: 0 }, { x: 1.34, y: 7.64 }, { x: 0.12, y: 1.4 }]]
])
.test('geometry builder add polygon should invoke proper builder methods (%#): vertexes: %o',
    (v) => {
        const builderMock = mock<SvgPathBuilder>({
            moveTo(x, y, a) { return reinterpretCast<SvgPathBuilder>(this); },
            lineTo(x, y) { return reinterpretCast<SvgPathBuilder>(this); },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addPolygon(...v);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const lineToInfo = builderMock.getMemberInfo('lineTo') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        if (v.length === 0) {
            expect(moveToInfo.count).toBe(0);
            expect(lineToInfo.count).toBe(0);
            expect(closeInfo.count).toBe(0);
        } else {
            expect(moveToInfo.count).toBe(1);
            expect(lineToInfo.count).toBe(v.length - 1);
            expect(closeInfo.count).toBe(1);
            expect(moveToInfo.getData(0)!.arguments).toStrictEqual([v[0].x, v[0].y]);
            for (let i = 1; i < v.length; ++i) {
                expect(lineToInfo.getData(i - 1)!.arguments).toStrictEqual([v[i].x, v[i].y]);
            }
        }
    }
);

each([
    [0, 0, 0, 0, 0],
    [1, 2, -5, 25, 25],
    [10, 30, 2, 100, -260],
    [-22.23, -536.3, 17.56, -45.67, -45.67],
    [234.12, -1.235, 21.345, -22.5, 337.5]
])
.test('geometry builder add pie should invoke add circle with the same angles (%#): cx: %f, cy: %f, r: %f, start: %f, end: %f',
    (cx, cy, r, start, end) => {
        const sut = new SvgGeometryBuilder(mock<SvgPathBuilder>({}).subject);
        const sutMock = partialMock(sut, {
            addCircle(x: number, y: number, s: number) { return reinterpretCast<SvgGeometryBuilder>(this); }
        });
        const result = sut.addPie(cx, cy, r, start, end);
        expect(result).toBe(sut);
        const info = sutMock.getMemberInfo('addCircle') as IMockedMethodInfo;
        expect(info.count).toBe(1);
        expect(info.getData(0)!.arguments).toStrictEqual([cx, cy, r]);
    }
);

each([
    [0, 0, 0, 0, 1, [
        [0, 0, 0],
        [0, 0, 0, 0, 0, SvgPathArcStyle.CcwLt180],
        [0, 0],
        []
    ]],
    [1, 2, 100, 10, 70, [
        [18.364817766, -96.480775301, 10],
        [94.969262078, -32.202014332, 100, 100, 0, SvgPathArcStyle.CcwLt180],
        [1, 2],
        []
    ]],
    [-1, -3, -70, 50, 305, [
        [-54.623111018, 41.995132678, 50],
        [56.3406431, 37.150350544, -70, -70, 0, SvgPathArcStyle.CcwGt180],
        [-1, -3],
        []
    ]],
    [24, 56, 365.6, 40, 10, [
        [259.003150101, -224.065848404, 40],
        [87.485773755, -304.045714501, 365.6, 365.6, 0, SvgPathArcStyle.CcwGt180],
        [24, 56],
        []
    ]],
    [-45.32, 24.332, 12.312, -5.321, 2.223, [
        [-46.461759887, 12.073055169, 354.679],
        [-44.842430622, 12.02926569, 12.312, 12.312, 0, SvgPathArcStyle.CcwLt180],
        [-45.32, 24.332],
        []
    ]],
])
.test('geometry builder add pie should invoke proper builder methods (%#): cx: %f, cy: %f, r: %f, start: %f, end: %f, expected args: %o',
    (cx, cy, r, start, end, args) => {
        const builderMock = mock<SvgPathBuilder>({
            moveTo(x, y, a) { return reinterpretCast<SvgPathBuilder>(this); },
            arcTo(x, y, rx, ry, a, s) { return reinterpretCast<SvgPathBuilder>(this); },
            lineTo(x, y) { return reinterpretCast<SvgPathBuilder>(this); },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addPie(cx, cy, r, start, end);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const arcToInfo = builderMock.getMemberInfo('arcTo') as IMockedMethodInfo;
        const lineToInfo = builderMock.getMemberInfo('lineTo') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        expect(moveToInfo.count).toBe(1);
        expect(arcToInfo.count).toBe(1);
        expect(lineToInfo.count).toBe(1);
        expect(closeInfo.count).toBe(1);
        const data = [
            moveToInfo.getData(0)!,
            arcToInfo.getData(0)!,
            lineToInfo.getData(0)!,
            closeInfo.getData(0)!
        ];
        assertMockArgs(data, args);
    }
);

each([
    [0, 0, 0, 0, 0, 0],
    [1, 2, -5, 2, 25, 25],
    [10, 30, 2, -7, 100, -260],
    [-22.23, -536.3, 17.56, 13.22, -45.67, -45.67],
    [234.12, -1.235, 21.345, 1.2345, -22.5, 337.5]
])
.test(`geometry builder add ring pie should invoke add circle with the same angles (%#):
cx: %f, cy: %f, r: %f, width: %f, start: %f, end: %f`,
    (cx, cy, r, w, start, end) => {
        const sut = new SvgGeometryBuilder(mock<SvgPathBuilder>({}).subject);
        const sutMock = partialMock(sut, {
            addRing(x: number, y: number, i: number, s: number) { return reinterpretCast<SvgGeometryBuilder>(this); }
        });
        const result = sut.addRingPie(cx, cy, r, w, start, end);
        expect(result).toBe(sut);
        const info = sutMock.getMemberInfo('addRing') as IMockedMethodInfo;
        expect(info.count).toBe(1);
        expect(info.getData(0)!.arguments).toStrictEqual([cx, cy, r, w]);
    }
);

each([
    [0, 0, 0, 0, 0, 1, [
        [0, 0, 0],
        [0, 0, 0, 0, 0, SvgPathArcStyle.CcwLt180],
        [0, 0],
        [0, 0, 0, 0, 0, SvgPathArcStyle.CccwLt180],
        []
    ]],
    [1, 2, 100, 20, 10, 70, [
        [21.83778132, -116.176930361, 10],
        [113.763114494, -39.042417199, 120, 120, 0, SvgPathArcStyle.CcwLt180],
        [94.969262078, -32.202014332],
        [18.364817766, -96.480775301, 100, 100, 0, SvgPathArcStyle.CccwLt180],
        []
    ]],
    [-1, -3, -70, 10, 50, 305, [
        [-46.962666587, 35.567256581, 50],
        [48.149122657, 31.414586181, -60, -60, 0, SvgPathArcStyle.CcwGt180],
        [56.3406431, 37.150350544],
        [-54.623111018, 41.995132678, -70, -70, 0, SvgPathArcStyle.CccwGt180],
        []
    ]],
    [24, 56, 365.6, 33.231, 40, 10, [
        [280.363625158, -249.522271293, 40],
        [93.256276347, -336.771860941, 398.831, 398.831, 0, SvgPathArcStyle.CcwGt180],
        [87.485773755, -304.045714501],
        [259.003150101, -224.065848404, 365.6, 365.6, 0, SvgPathArcStyle.CccwGt180],
        []
    ]],
    [-45.32, 24.332, 12.312, 2.936, -5.321, 2.223, [
        [-46.734031413, 9.149707051, 354.679],
        [-44.728546306, 9.095475247, 15.248, 15.248, 0, SvgPathArcStyle.CcwLt180],
        [-44.842430622, 12.02926569],
        [-46.461759887, 12.073055169, 12.312, 12.312, 0, SvgPathArcStyle.CccwLt180],
        []
    ]],
])
.test(`geometry builder add ring pie should invoke proper builder methods (%#):
cx: %f, cy: %f, r: %f, width: %f, start: %f, end: %f, expected args: %o`,
    (cx, cy, r, w, start, end, args) => {
        const builderMock = mock<SvgPathBuilder>({
            moveTo(x, y, a) { return reinterpretCast<SvgPathBuilder>(this); },
            arcTo(x, y, rx, ry, a, s) { return reinterpretCast<SvgPathBuilder>(this); },
            lineTo(x, y) { return reinterpretCast<SvgPathBuilder>(this); },
            close() { return reinterpretCast<SvgPathBuilder>(this); }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
        const result = sut.addRingPie(cx, cy, r, w, start, end);
        const moveToInfo = builderMock.getMemberInfo('moveTo') as IMockedMethodInfo;
        const arcToInfo = builderMock.getMemberInfo('arcTo') as IMockedMethodInfo;
        const lineToInfo = builderMock.getMemberInfo('lineTo') as IMockedMethodInfo;
        const closeInfo = builderMock.getMemberInfo('close') as IMockedMethodInfo;
        expect(result).toBe(sut);
        expect(moveToInfo.count).toBe(1);
        expect(arcToInfo.count).toBe(2);
        expect(lineToInfo.count).toBe(1);
        expect(closeInfo.count).toBe(1);
        const data = [
            moveToInfo.getData(0)!,
            arcToInfo.getData(0)!,
            lineToInfo.getData(0)!,
            arcToInfo.getData(1)!,
            closeInfo.getData(0)!
        ];
        assertMockArgs(data, args);
    }
);

test('geometry builder build should invoke proper builder method',
    () => {
        const svg = 'foo';
        const builderMock = mock<SvgPathBuilder>({
            build() { return svg; }
        });
        const sut = new SvgGeometryBuilder(builderMock.subject);
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

test('builder with geometry should return a geometry builder',
    () => {
        const sut = new SvgPathBuilder();
        const result = sut.withGeometry();
        expect(result.builder()).toBe(sut);
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
