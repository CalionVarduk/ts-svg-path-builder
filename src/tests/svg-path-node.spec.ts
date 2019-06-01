import { SvgPathNode } from '../core/svg-path-node';
import { SvgPathNodeType } from '../core/svg-path-node-type';
import { Angle } from '../core/primitives/angle';
import { Nullable } from 'frlluc-utils';
import each from 'jest-each';

class Mock extends SvgPathNode {
    public type: SvgPathNodeType;
    public angleInDegrees: number;
    public x: number;
    public y: number;
    public constructor(prev: Nullable<SvgPathNode> = null) {
        super(prev);
        this.type = SvgPathNodeType.Start;
        this.angleInDegrees = 0;
        this.x = 10;
        this.y = 20;
    }
    public copy(_prev: Nullable<SvgPathNode>): SvgPathNode {
        throw new Error('Method not implemented.');
    }
    public scale(_originX: number, _originY: number, _value: number): void {
        throw new Error('Method not implemented.');
    }
    public translate(_dx: number, _dy: number): void {
        throw new Error('Method not implemented.');
    }
    public rotate(_originX: number, _originY: number, _angle: Angle): void {
        throw new Error('Method not implemented.');
    }
    public createSvgCommand(_precision: number): string {
        throw new Error('Method not implemented.');
    }
}

each([
    [null],
    [new Mock()],
    [new Mock(new Mock())]
])
.test('ctor should create with provided prev (%#): prev: %o',
    (prev) => {
        const sut = new Mock(prev);
        expect(sut.prev).toBe(prev);
    }
);

test('point getter should return correct x and y',
    () => {
        const sut = new Mock();
        expect(sut.point).toStrictEqual({ x: sut.x, y: sut.y });
    }
);

each([
    [null],
    [{ x: 5, y: -5 }],
    [{ x: 0, y: 0 }],
    [{ x: -2, y: 17 }]
])
.test('point setter should set correct x and y (%#): value: %o',
    (value) => {
        const sut = new Mock();
        sut.point = value;
        expect(sut.point).toStrictEqual(value || { x: 0, y: 0 });
    }
);
