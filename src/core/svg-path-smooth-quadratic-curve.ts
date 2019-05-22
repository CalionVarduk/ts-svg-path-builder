import { SvgPathNode } from './svg-path-node';
import { SvgPathNodeType } from './svg-path-node-type';
import { Vector, Vector2 } from './primitives/vector';
import { SvgPathQuadraticCurve } from './svg-path-quadratic-curve';

/** Specifies an svg path smooth quadratic curve node. */
export class SvgPathSmoothQuadraticCurve extends SvgPathNode {

    public get type(): SvgPathNodeType {
        return SvgPathNodeType.SmoothQuadraticCurve;
    }
    public get angleInDegrees(): number {
        const bezier = this.bezierPoint;
        return Vector.getAngle({ x: this.x - bezier.x, y: this.y - bezier.y });
    }

    /** Specifies smooth curve node's bezier point's x coordinate. */
    public set bezierX(value: number) {
        this._setBezierPoint(value || 0, this.bezierY);
    }
    public get bezierX(): number {
        return this.bezierPoint.x;
    }
    /** Specifies smooth curve node's bezier point's y coordinate. */
    public set bezierY(value: number) {
        this._setBezierPoint(this.bezierX, value || 0);
    }
    public get bezierY(): number {
        return this.bezierPoint.y;
    }
    /** Specifies smooth curve node's bezier point's coordinates. */
    public set bezierPoint(value: Vector2) {
        if (!value) {
            value = { x: 0, y: 0 };
        }
        this._setBezierPoint(value.x, value.y);
    }
    public get bezierPoint(): Vector2 {
        if (this.prev!.type === SvgPathNodeType.QuadraticCurve) {
            const prev = this.prev as SvgPathQuadraticCurve;
            return this._getBezierPoint(prev.bezierPoint);
        }
        if (this.prev!.type === SvgPathNodeType.SmoothQuadraticCurve) {
            const prev = this.prev as SvgPathSmoothQuadraticCurve;
            return this._getBezierPoint(prev.bezierPoint);
        }
        return this.prev!.point;
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
     * Creates new svg path smooth quadratic curve node.
     * @param x x coordinate
     * @param y y coordinate
     * @param prev node's predecessor
     * */
    public constructor(x: number, y: number, prev: SvgPathNode) {
        super(prev);
        if (!prev) {
            throw new Error('svg path smooth quadratic curve node lacks predecessor node');
        }
        this._x = x || 0;
        this._y = y || 0;
    }

    /**
     * Creates a copy of this node.
     * @param prev predecessor node
     * @returns a copy of this node
     * */
    public copy(prev: SvgPathNode): SvgPathSmoothQuadraticCurve {
        return new SvgPathSmoothQuadraticCurve(this.x, this.y, prev);
    }
    /**
     * Creates a scaled copy of this node.
     * @param originX x coordinate of the scaling origin point
     * @param originY y coordinate of the scaling origin point
     * @param value scale value
     * @param prev predecessor node
     * @returns a scaled copy of this node
     * */
    public scale(originX: number, originY: number, value: number, prev: SvgPathNode): SvgPathSmoothQuadraticCurve {
        return new SvgPathSmoothQuadraticCurve(
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
        return `T ${this.x.toFixed(precision)} ${this.y.toFixed(precision)}`;
    }

    private _setBezierPoint(x: number, y: number): void {
        switch (this.prev!.type) {
            case SvgPathNodeType.QuadraticCurve: {
                const prev = this.prev as SvgPathQuadraticCurve;
                prev.bezierPoint = this._createPrevBezierPoint({ x: x, y: y });
                break;
            }
            case SvgPathNodeType.SmoothQuadraticCurve: {
                const prev = this.prev as SvgPathSmoothQuadraticCurve;
                prev.bezierPoint = this._createPrevBezierPoint({ x: x, y: y });
                break;
            }
            default: {
                this.prev!.point = { x: x, y: y };
                break;
            }
        }
    }

    private _createPrevBezierPoint(thisBezierPoint: Vector2): Vector2 {
        const prevPoint = this.prev!.point;
        return Vector.sub(prevPoint, Vector.sub(thisBezierPoint, prevPoint));
    }

    private _getBezierPoint(prevBezierPoint: Vector2): Vector2 {
        const prevPoint = this.prev!.point;
        return Vector.add(Vector.sub(Vector.copy(prevPoint), prevBezierPoint), prevPoint);
    }
}
