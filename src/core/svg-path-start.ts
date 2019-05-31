import { SvgPathNode } from './svg-path-node';
import { SvgPathNodeType } from './svg-path-node-type';
import { Nullable } from './utils/nullable';
import { Angle } from './primitives/angle';

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

    private _angleInDegrees: number;
    private _x: number;
    private _y: number;

    /**
     * Creates new svg path start node.
     * @param x x coordinate
     * @param y y coordinate
     * @param angleInDegrees starting angle in degrees
     * @param prev node's predecessor
     * */
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
     * Scales this node according to the provided origin and scale value.
     * @param originX x coordinate of the scaling origin point
     * @param originY y coordinate of the scaling origin point
     * @param value scale value
     * */
    public scale(originX: number, originY: number, value: number): void {
        this.x = (this.x - originX) * value + originX;
        this.y = (this.y - originY) * value + originY;
    }
    /**
     * Translates this node according to the provided offset.
     * @param dx x coordinate offset
     * @param dy y coordinate offset
     * */
    public translate(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }
    /**
     * Rotates this node clockwise according to the provided origin and angle.
     * @param originX x coordinate of the rotation origin point
     * @param originY y coordinate of the rotation origin point
     * @param angle angle to rotate by
     * */
    public rotate(originX: number, originY: number, angle: Angle): void {
        const x = this.x - originX;
        const y = this.y - originY;
        this.x = (x * angle.cos + y * angle.sin) + originX;
        this.y = (-x * angle.sin + y * angle.cos) + originY;
        this._angleInDegrees += angle.degrees;
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
