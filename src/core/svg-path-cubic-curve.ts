import { SvgPathNode } from './svg-path-node';
import { SvgPathNodeType } from './svg-path-node-type';
import { Vector, Vector2 } from './primitives/vector';

/** Specifies an svg path cubic curve node. */
export class SvgPathCubicCurve extends SvgPathNode {

    public get type(): SvgPathNodeType {
        return SvgPathNodeType.CubicCurve;
    }
    public get angleInDegrees(): number {
        return Vector.getAngle({ x: this.x - this.bezierX2, y: this.y - this.bezierY2 });
    }

    /** Specifies curve node's first bezier point's x coordinate. */
    public set bezierX1(value: number) {
        this._bezierX1 = value || 0;
    }
    public get bezierX1(): number {
        return this._bezierX1;
    }
    /** Specifies curve node's first bezier point's y coordinate. */
    public set bezierY1(value: number) {
        this._bezierY1 = value || 0;
    }
    public get bezierY1(): number {
        return this._bezierY1;
    }
    /** Specifies curve node's first bezier point's coordinates. */
    public set bezierPoint1(value: Vector2) {
        if (value) {
            this.bezierX1 = value.x;
            this.bezierY1 = value.y;
        } else {
            this.bezierX1 = 0;
            this.bezierY1 = 0;
        }
    }
    public get bezierPoint1(): Vector2 {
        return { x: this.bezierX1, y: this.bezierY1 };
    }

    /** Specifies curve node's second bezier point's x coordinate. */
    public set bezierX2(value: number) {
        this._bezierX2 = value || 0;
    }
    public get bezierX2(): number {
        return this._bezierX2;
    }
    /** Specifies curve node's second bezier point's y coordinate. */
    public set bezierY2(value: number) {
        this._bezierY2 = value || 0;
    }
    public get bezierY2(): number {
        return this._bezierY2;
    }
    /** Specifies curve node's second bezier point's coordinates. */
    public set bezierPoint2(value: Vector2) {
        if (value) {
            this.bezierX2 = value.x;
            this.bezierY2 = value.y;
        } else {
            this.bezierX2 = 0;
            this.bezierY2 = 0;
        }
    }
    public get bezierPoint2(): Vector2 {
        return { x: this.bezierX2, y: this.bezierY2 };
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

    private _bezierX1: number;
    private _bezierY1: number;
    private _bezierX2: number;
    private _bezierY2: number;
    private _x: number;
    private _y: number;

    /**
     * Creates new svg path cubic curve node.
     * @param x x coordinate
     * @param y y coordinate
     * @param bezierX1 first bezier point's x coordinate
     * @param bezierY1 first bezier point's y coordinate
     * @param bezierX2 second bezier point's x coordinate
     * @param bezierY2 second bezier point's y coordinate
     * @param prev node's predecessor
     * */
    public constructor(x: number, y: number, bezierX1: number, bezierY1: number, bezierX2: number, bezierY2: number, prev: SvgPathNode) {
        super(prev);
        if (!prev) {
            throw new Error('svg path cubic curve node lacks predecessor node');
        }
        this._x = x || 0;
        this._y = y || 0;
        this._bezierX1 = bezierX1 || 0;
        this._bezierY1 = bezierY1 || 0;
        this._bezierX2 = bezierX2 || 0;
        this._bezierY2 = bezierY2 || 0;
    }

    /**
     * Creates a copy of this node.
     * @param prev predecessor node
     * @returns a copy of this node
     * */
    public copy(prev: SvgPathNode): SvgPathCubicCurve {
        return new SvgPathCubicCurve(this.x, this.y, this.bezierX1, this.bezierY1, this.bezierX2, this.bezierY2, prev);
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
        this.bezierX1 = (this.bezierX1 - originX) * value + originX;
        this.bezierY1 = (this.bezierY1 - originY) * value + originY;
        this.bezierX2 = (this.bezierX2 - originX) * value + originX;
        this.bezierY2 = (this.bezierY2 - originY) * value + originY;
    }
    /**
     * Creates an svg command from this node.
     * @param precision number of digits after the decimal point
     * @returns created svg command
     * */
    public createSvgCommand(precision: number): string {
        const bx1 = this.bezierX1.toFixed(precision);
        const by1 = this.bezierY1.toFixed(precision);
        const bx2 = this.bezierX2.toFixed(precision);
        const by2 = this.bezierY2.toFixed(precision);
        const x = this.x.toFixed(precision);
        const y = this.y.toFixed(precision);
        return `C ${bx1} ${by1} ${bx2} ${by2} ${x} ${y}`;
    }
}
