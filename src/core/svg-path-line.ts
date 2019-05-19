import { SvgPathNode } from './svg-path-node';
import { SvgPathNodeType } from './svg-path-node-type';
import { Vector } from './primitives/vector';

/** Specifies an svg path line node. */
export class SvgPathLine extends SvgPathNode {

    public get type(): SvgPathNodeType {
        return SvgPathNodeType.Line;
    }
    public get angleInDegrees(): number {
        return Vector.getAngle({ x: this.dx, y: this.dy });
    }

    /** Returns line node's length. */
    public get length(): number {
        return Vector.magnitude({ x: this.dx, y: this.dy });
    }

    /** Returns line node's length vector's x coordinate. */
    public get dx(): number {
        return this.x - this.prev!.x;
    }
    /** Returns line node's length vector's y coordinate. */
    public get dy(): number {
        return this.y - this.prev!.y;
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

    private _x: number;
    private _y: number;

    /**
     * Creates new svg path line node.
     * @param x x coordinate
     * @param y y coordinate
     * @param prev node's predecessor
     * */
    public constructor(x: number, y: number, prev: SvgPathNode) {
        super(prev);
        if (!prev) {
            throw new Error('svg path line node lacks predecessor node');
        }
        this._x = x || 0;
        this._y = y || 0;
    }

    /**
     * Creates a copy of this node.
     * @param prev predecessor node
     * @returns a copy of this node
     * */
    public copy(prev: SvgPathNode): SvgPathLine {
        return new SvgPathLine(this.x, this.y, prev);
    }
    /**
     * Creates a scaled copy of this node.
     * @param originX x coordinate of the scaling origin point
     * @param originY y coordinate of the scaling origin point
     * @param value scale value
     * @param prev predecessor node
     * @returns a scaled copy of this node
     * */
    public scale(originX: number, originY: number, value: number, prev: SvgPathNode): SvgPathLine {
        return new SvgPathLine(
            (this.x - originX) * value + originX,
            (this.y - originY) * value + originY,
            prev);
    }
    /**
     * Creates an svg command from this node.
     * @param precision number of digits after the decimal point
     * @returns created svg command
     * */
    public createSvgCommand(precision: number): string {
        const zero = (0).toFixed(precision);
        const dx = this.dx.toFixed(precision);
        const dy = this.dy.toFixed(precision);
        const x = this.x.toFixed(precision);
        const y = this.y.toFixed(precision);
        return dx === zero ?
            (dy === zero ? '' : `V ${y}`) :
            (dy === zero ? `H ${x}` : `L ${x} ${y}`);
    }
}
