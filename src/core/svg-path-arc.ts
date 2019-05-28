import { SvgPathNode } from './svg-path-node';
import { SvgPathNodeType } from './svg-path-node-type';
import { SvgPathArcStyle } from './svg-path-arc-style';
import { Vector2, Vector } from './primitives/vector';
import { SqMatrix } from './primitives/sq-matrix';

/** Specifies an svg path arc node. */
export class SvgPathArc extends SvgPathNode {

    public get type(): SvgPathNodeType {
        return SvgPathNodeType.Arc;
    }
    public get angleInDegrees(): number {
        if (this.rx === 0 || this.ry === 0 || (this.x === this.prev!.x && this.y === this.prev!.y)) {
            return Vector.getAngle({ x: this.x - this.prev!.x, y: this.y - this.prev!.y });
        }
        const c = this._getCentrePoint();
        const d = Vector.mirrorY(Vector.setAngle({ x: 1, y: 0 }, -this.rotationAngleInDegrees));
        const f1 = Vector.add(Vector.copy(c), d);
        const f2 = Vector.add(Vector.copy(c), { x: -d.x, y: -d.y });
        const a1 = Vector.getAngle(Vector.sub(Vector.copy(f1), this.point));
        const a2 = Vector.getAngle(Vector.sub(Vector.copy(f2), this.point));
        return ((a1 + a2) * 0.5) + (this.hasSweepFlag ? -90 : 90);
    }

    /** Specifies whether or not this arc node has large arc flag enabled. */
    public get hasLargeArcFlag(): boolean {
        return (this.style & 1) === 1;
    }
    /** Specifies whether or not this arc node has sweep flag enabled. */
    public get hasSweepFlag(): boolean {
        return this.style > 1;
    }

    /** Returns the centre point of an ellipse that this arc lies on. */
    public get centrePoint(): Vector2 {
        if (this.rx === 0 || this.ry === 0 || (this.x === this.prev!.x && this.y === this.prev!.y)) {
            return Vector.add(Vector.scale({ x: this.x - this.prev!.x, y: this.y - this.prev!.y }, 0.5), this.prev!.point);
        }
        return this._getCentrePoint();
    }

    /** Specifies arc node's semi x axis' value. */
    public set rx(value: number) {
        this._rx = value || 0;
    }
    public get rx(): number {
        return this._rx;
    }
    /** Specifies arc node's semi y axis' value. */
    public set ry(value: number) {
        this._ry = value || 0;
    }
    public get ry(): number {
        return this._ry;
    }

    /** Specifies arc node's rotation angle in degrees. */
    public set rotationAngleInDegrees(value: number) {
        this._rotationAngleInDegrees = value || 0;
    }
    public get rotationAngleInDegrees(): number {
        return this._rotationAngleInDegrees;
    }

    /** Specifies arc node's style. */
    public set style(value: SvgPathArcStyle) {
        this._style = value || SvgPathArcStyle.CccwLt180;
    }
    public get style(): SvgPathArcStyle {
        return this._style;
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

    private _rx: number;
    private _ry: number;
    private _rotationAngleInDegrees: number;
    private _style: SvgPathArcStyle;
    private _x: number;
    private _y: number;

    /**
     * Creates new svg path arc node.
     * @param x x coordinate
     * @param y y coordinate
     * @param rx semi x axis value
     * @param ry semi y axis value
     * @param rotationAngleInDegrees angle in degrees
     * @param style specifies large arc flag and sweep flag values
     * @param prev node's predecessor
     * */
    public constructor(x: number, y: number, rx: number, ry: number,
        rotationAngleInDegrees: number, style: SvgPathArcStyle, prev: SvgPathNode) {
        super(prev);
        if (!prev) {
            throw new Error('svg path arc node lacks predecessor node');
        }
        this._x = x || 0;
        this._y = y || 0;
        this._rx = rx || 0;
        this._ry = ry || 0;
        this._rotationAngleInDegrees = rotationAngleInDegrees || 0;
        this._style = style || SvgPathArcStyle.CccwLt180;
    }

    /**
     * Creates a copy of this node.
     * @param prev predecessor node
     * @returns a copy of this node
     * */
    public copy(prev: SvgPathNode): SvgPathArc {
        return new SvgPathArc(this.x, this.y, this.rx, this.ry, this.rotationAngleInDegrees, this.style, prev);
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
        this.rx *= value;
        this.ry *= value;
    }
    /**
     * Creates an svg command from this node.
     * @param precision number of digits after the decimal point
     * @returns created svg command
     * */
    public createSvgCommand(precision: number): string {
        const rx = this.rx.toFixed(precision);
        const ry = this.ry.toFixed(precision);
        const rot = this.rotationAngleInDegrees.toFixed(precision);
        const larc = this.hasLargeArcFlag ? '1' : '0';
        const sweep = this.hasSweepFlag ? '1' : '0';
        const x = this.x.toFixed(precision);
        const y = this.y.toFixed(precision);
        return `A ${rx} ${ry} ${rot} ${larc} ${sweep} ${x} ${y}`;
    }

    private _getCentrePoint(): Vector2 {
        const cos = Math.cos(this.rotationAngleInDegrees);
        const sin = Math.sin(this.rotationAngleInDegrees);
        const rotMatrix = { t0: cos, t1: sin, b0: -sin, b1: cos };

        const vp = SqMatrix.multVec(rotMatrix, Vector.scale({ x: this.prev!.x - this.x, y: this.prev!.y - this.y }, 0.5));
        const vpxSq = vp.x * vp.x;
        const vpySq = vp.y * vp.y;
        let rx = Math.abs(this.rx);
        let ry = Math.abs(this.ry);
        let rxSq = rx * rx;
        let rySq = ry * ry;
        const lambda = vpxSq / rxSq + vpySq / rySq;
        if (lambda > 1) {
            const lambdaSqrt = Math.sqrt(lambda);
            rx *= lambdaSqrt;
            ry *= lambdaSqrt;
            rxSq = rx * rx;
            rySq = ry * ry;
        }
        const cps = (this.hasLargeArcFlag === this.hasSweepFlag ? -1 : 1) *
            Math.sqrt(Math.max(rxSq * rySq - rxSq * vpySq - rySq * vpxSq, 0) / (rxSq * vpySq + rySq * vpxSq));

        const cp = Vector.scale({ x: rx * vp.y / ry, y: -(ry * vp.x / rx) }, cps);

        return Vector.add(
            SqMatrix.multVec(SqMatrix.transpose(rotMatrix), cp),
            Vector.scale({ x: this.x + this.prev!.x, y: this.y + this.prev!.y }, 0.5));
    }
}
