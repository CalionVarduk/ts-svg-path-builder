import { SvgPathNode } from './svg-path-node';
import { SvgPathNodeType } from './svg-path-node-type';
import { Vector } from './primitives/vector';
import { Angle } from './primitives/angle';

/** Specifies an svg path line offset node. */
export class SvgPathLineOffset extends SvgPathNode
{
    public get type(): SvgPathNodeType
    {
        return SvgPathNodeType.LineOffset;
    }
    public get angleInDegrees(): number
    {
        return Vector.getAngle({ x: this.dx, y: this.dy });
    }

    /** Returns offset node's length. */
    public get length(): number
    {
        return Vector.magnitude({ x: this.dx, y: this.dy });
    }

    /** Specifies offset node's x offset. */
    public set dx(value: number)
    {
        this.x = this.prev!.x + (value || 0);
    }
    public get dx(): number
    {
        return this.x - this.prev!.x;
    }
    /** Specifies offset node's y offset. */
    public set dy(value: number)
    {
        this.y = this.prev!.y + (value || 0);
    }
    public get dy(): number
    {
        return this.y - this.prev!.y;
    }

    public set x(value: number)
    {
        this._x = value || 0;
    }
    public get x(): number
    {
        return this._x;
    }
    public set y(value: number)
    {
        this._y = value || 0;
    }
    public get y(): number
    {
        return this._y;
    }

    private _x: number;
    private _y: number;

    /**
     * Creates new svg path line offset node.
     * @param dx x offset
     * @param dy y offset
     * @param prev node's predecessor
     * */
    public constructor(dx: number, dy: number, prev: SvgPathNode)
    {
        super(prev);
        if (!prev)
            throw new Error('svg path line offset node lacks predecessor node');

        this._x = this.prev!.x + (dx || 0);
        this._y = this.prev!.y + (dy || 0);
    }

    /**
     * Creates a copy of this node.
     * @param prev predecessor node
     * @returns a copy of this node
     * */
    public copy(prev: SvgPathNode): SvgPathLineOffset
    {
        return new SvgPathLineOffset(this.dx, this.dy, prev);
    }
    /**
     * Scales this node according to the provided origin and scale value.
     * @param _originX x coordinate of the scaling origin point (unused)
     * @param _originY y coordinate of the scaling origin point (unused)
     * @param value scale value
     * */
    public scale(_originX: number, _originY: number, value: number): void
    {
        this.dx *= value;
        this.dy *= value;
    }
    /**
     * Translates this node according to the provided offset.
     * @param dx x coordinate offset
     * @param dy y coordinate offset
     * */
    public translate(dx: number, dy: number): void
    {
        this.x += dx;
        this.y += dy;
    }
    /**
     * Rotates this node clockwise according to the provided origin and angle.
     * @param originX x coordinate of the rotation origin point
     * @param originY y coordinate of the rotation origin point
     * @param angle angle to rotate by
     * */
    public rotate(originX: number, originY: number, angle: Angle): void
    {
        const x = this.x - originX;
        const y = this.y - originY;
        this.x = (x * angle.cos + y * angle.sin) + originX;
        this.y = (-x * angle.sin + y * angle.cos) + originY;
    }
    /**
     * Creates an svg command from this node.
     * @param precision number of digits after the decimal point
     * @returns created svg command
     * */
    public createSvgCommand(precision: number): string
    {
        const zero = (0).toFixed(precision);
        const dx = this.dx.toFixed(precision);
        const dy = this.dy.toFixed(precision);
        return dx === zero ?
            (dy === zero ? '' : `v ${dy}`) :
            (dy === zero ? `h ${dx}` : `l ${dx} ${dy}`);
    }
}
