import { SvgPathNode } from './svg-path-node';
import { SvgPathNodeType } from './svg-path-node-type';
import { Vector, Vector2 } from './primitives/vector';
import { SvgPathCubicCurve } from './svg-path-cubic-curve';
import { Angle } from './primitives/angle';

/** Specifies an svg path smooth cubic curve node. */
export class SvgPathSmoothCubicCurve extends SvgPathNode
{
    public get type(): SvgPathNodeType
    {
        return SvgPathNodeType.SmoothCubicCurve;
    }
    public get angleInDegrees(): number
    {
        return Vector.getAngle({ x: this.x - this.bezierX2, y: this.y - this.bezierY2 });
    }

    /** Specifies smooth curve node's first bezier point's x coordinate. */
    public set bezierX1(value: number)
    {
        this._setBezierPoint1(value || 0, this.bezierY1);
    }
    public get bezierX1(): number
    {
        return this.bezierPoint1.x;
    }
    /** Specifies smooth curve node's first bezier point's y coordinate. */
    public set bezierY1(value: number)
    {
        this._setBezierPoint1(this.bezierX1, value || 0);
    }
    public get bezierY1(): number
    {
        return this.bezierPoint1.y;
    }
    /** Specifies smooth curve node's first bezier point's coordinates. */
    public set bezierPoint1(value: Vector2)
    {
        if (!value)
            value = { x: 0, y: 0 };

        this._setBezierPoint1(value.x, value.y);
    }
    public get bezierPoint1(): Vector2
    {
        if (this.prev!.type === SvgPathNodeType.CubicCurve)
        {
            const prev = this.prev as SvgPathCubicCurve;
            return this._getBezierPoint1(prev.bezierPoint2);
        }
        if (this.prev!.type === SvgPathNodeType.SmoothCubicCurve)
        {
            const prev = this.prev as SvgPathSmoothCubicCurve;
            return this._getBezierPoint1(prev.bezierPoint2);
        }
        return this.prev!.point;
    }

    /** Specifies smooth curve node's second bezier point's x coordinate. */
    public set bezierX2(value: number)
    {
        this._bezierX2 = value || 0;
    }
    public get bezierX2(): number
    {
        return this._bezierX2;
    }
    /** Specifies smooth curve node's second bezier point's y coordinate. */
    public set bezierY2(value: number)
    {
        this._bezierY2 = value || 0;
    }
    public get bezierY2(): number
    {
        return this._bezierY2;
    }
    /** Specifies smooth curve node's second bezier point's coordinates. */
    public set bezierPoint2(value: Vector2)
    {
        if (value)
        {
            this.bezierX2 = value.x;
            this.bezierY2 = value.y;
        }
        else
        {
            this.bezierX2 = 0;
            this.bezierY2 = 0;
        }
    }
    public get bezierPoint2(): Vector2
    {
        return { x: this.bezierX2, y: this.bezierY2 };
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

    private _bezierX2: number;
    private _bezierY2: number;
    private _x: number;
    private _y: number;

    /**
     * Creates new svg path smooth cubic curve node.
     * @param x x coordinate
     * @param y y coordinate
     * @param bezierX2 second bezier point's x coordinate
     * @param bezierY2 second bezier point's y coordinate
     * @param prev node's predecessor
     * */
    public constructor(x: number, y: number, bezierX2: number, bezierY2: number, prev: SvgPathNode)
    {
        super(prev);
        if (!prev)
            throw new Error('svg path smooth cubic curve node lacks predecessor node');

        this._x = x || 0;
        this._y = y || 0;
        this._bezierX2 = bezierX2 || 0;
        this._bezierY2 = bezierY2 || 0;
    }

    /**
     * Creates a copy of this node.
     * @param prev predecessor node
     * @returns a copy of this node
     * */
    public copy(prev: SvgPathNode): SvgPathSmoothCubicCurve
    {
        return new SvgPathSmoothCubicCurve(this.x, this.y, this.bezierX2, this.bezierY2, prev);
    }
    /**
     * Scales this node according to the provided origin and scale value.
     * @param originX x coordinate of the scaling origin point
     * @param originY y coordinate of the scaling origin point
     * @param value scale value
     * */
    public scale(originX: number, originY: number, value: number): void
    {
        this.x = (this.x - originX) * value + originX;
        this.y = (this.y - originY) * value + originY;
        this.bezierX2 = (this.bezierX2 - originX) * value + originX;
        this.bezierY2 = (this.bezierY2 - originY) * value + originY;
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
        this.bezierX2 += dx;
        this.bezierY2 += dy;
    }
    /**
     * Rotates this node clockwise according to the provided origin and angle.
     * @param originX x coordinate of the rotation origin point
     * @param originY y coordinate of the rotation origin point
     * @param angle angle to rotate by
     * */
    public rotate(originX: number, originY: number, angle: Angle): void
    {
        let x = this.x - originX;
        let y = this.y - originY;
        this.x = (x * angle.cos + y * angle.sin) + originX;
        this.y = (-x * angle.sin + y * angle.cos) + originY;
        x = this.bezierX2 - originX;
        y = this.bezierY2 - originY;
        this.bezierX2 = (x * angle.cos + y * angle.sin) + originX;
        this.bezierY2 = (-x * angle.sin + y * angle.cos) + originY;
    }
    /**
     * Creates an svg command from this node.
     * @param precision number of digits after the decimal point
     * @returns created svg command
     * */
    public createSvgCommand(precision: number): string
    {
        const x = this.x.toFixed(precision);
        const y = this.y.toFixed(precision);
        const bx2 = this.bezierX2.toFixed(precision);
        const by2 = this.bezierY2.toFixed(precision);
        return `S ${bx2} ${by2} ${x} ${y}`;
    }

    private _setBezierPoint1(x: number, y: number): void
    {
        switch (this.prev!.type)
        {
            case SvgPathNodeType.CubicCurve:
            {
                const prev = this.prev as SvgPathCubicCurve;
                prev.bezierPoint2 = this._createPrevBezierPoint2({ x: x, y: y });
                break;
            }
            case SvgPathNodeType.SmoothCubicCurve:
            {
                const prev = this.prev as SvgPathSmoothCubicCurve;
                prev.bezierPoint2 = this._createPrevBezierPoint2({ x: x, y: y });
                break;
            }
            default:
            {
                this.prev!.point = { x: x, y: y };
                break;
            }
        }
    }

    private _createPrevBezierPoint2(thisBezierPoint1: Vector2): Vector2
    {
        const prevPoint = this.prev!.point;
        return Vector.sub(prevPoint, Vector.sub(thisBezierPoint1, prevPoint));
    }

    private _getBezierPoint1(prevBezierPoint2: Vector2): Vector2
    {
        const prevPoint = this.prev!.point;
        return Vector.add(Vector.sub(Vector.copy(prevPoint), prevBezierPoint2), prevPoint);
    }
}
