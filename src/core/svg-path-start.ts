import { SvgPathNode } from './svg-path-node';
import { SvgPathNodeType } from './svg-path-node-type';
import { Nullable } from './utils/nullable';

/** Specifies an svg path start node. */
export class SvgPathStart extends SvgPathNode {

    public get type(): SvgPathNodeType {
        return SvgPathNodeType.Start;
    }
    public get angleInDegrees(): number {
        return this._angleInDegrees;
    }

    public set x(value: number) {
        this._x = value || 0;
    }
    public get x(): number {
        return this._x;
    }
    public set y(value: number) {
        this._y = value || 0;
    }
    public get y(): number {
        return this._y;
    }

    private readonly _angleInDegrees: number;
    private _x: number;
    private _y: number;

    public constructor(x: number, y: number, angleInDegrees: number, prev: Nullable<SvgPathNode>) {
        super(prev);
        this._x = x || 0;
        this._y = y || 0;
        this._angleInDegrees = angleInDegrees || 0;
    }

    /**
     * Creates a copy of this node.
     * @param prev predecessor node
     * @returns a copy of this node
     * */
    public copy(prev: Nullable<SvgPathNode>): SvgPathNode {
        return new SvgPathStart(this.x, this.y, this._angleInDegrees, prev);
    }
    /**
     * Creates a scaled copy of this node.
     * @param originX x coordinate of the scaling origin point
     * @param originY y coordinate of the scaling origin point
     * @param value scale value
     * @param prev predecessor node
     * @returns a scaled copy of this node
     * */
    public scale(originX: number, originY: number, value: number, prev: Nullable<SvgPathNode>): SvgPathNode {
        return new SvgPathStart(
            (this.x - originX) * value + originX,
            (this.y - originY) * value + originY,
            this._angleInDegrees,
            prev);
    }
    /**
     * Creates an svg command from this node.
     * @param precision number of digits after the decimal point
     * @returns created svg command
     * */
    public createSvgCommand(precision: number): string {
        return `M ${this.x.toFixed(precision)} ${this.y.toFixed(precision)}`;
    }
}
