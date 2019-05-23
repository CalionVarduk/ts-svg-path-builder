import { Vector } from './primitives/vector';
import { Line } from './primitives/line';
import { SvgPathNode } from './svg-path-node';
import { SvgPathStart } from './svg-path-start';
import { SvgPathLine } from './svg-path-line';
import { SvgPathQuadraticCurve } from './svg-path-quadratic-curve';
import { SvgPathLineOffset } from './svg-path-line-offset';
import { SvgPathNodeType } from './svg-path-node-type';
import { SvgPathCubicCurve } from './svg-path-cubic-curve';
import { SvgPathClose } from './svg-path-close';
import { SvgPathArcStyle } from './svg-path-arc-style';
import { SvgPathArc } from './svg-path-arc';
import { Nullable } from './utils/nullable';

/** Instances of this class are created by the `SvgPathBuilder` after the `addRoundedCornerTo` method call. */
export class SvgPathAfterCornerBuilder {

    /**
     * Creates new after corner builder.
     * @param builder underlying builder
     * */
    public constructor(
        /** Specifies the underlying `SvgPathBuilder`. */
        public readonly builder: SvgPathBuilder) { }

    /**
     * Adds a new line node that starts from the current point `p` with the provided `length`
     * and at an angle equal to the last node's `angleInDegrees`.
     * @param length line's length
     * @returns `builder`
     * */
    public addLine(length: number): SvgPathBuilder {
        return this.builder.addLine(length, this.builder.last!.angleInDegrees);
    }

    /**
     * Adds a new line node that starts from the current point `p`
     * at an angle equal to the last node's `angleInDegrees` and ends at the point with the provided `x` coordinate.
     * @param x x coordinate to line to
     * @returns `builder`
     * */
    public lineToX(x: number): SvgPathBuilder {
        return this.builder.angledLineToX(x, this.builder.last!.angleInDegrees);
    }

    /**
     * Adds a new line node that starts from the current point `p`
     * at an angle equal to the last node's `angleInDegrees` and ends at the point with the provided `y` coordinate.
     * @param y y coordinate to line to
     * @returns `builder`
     * */
    public lineToY(y: number): SvgPathBuilder {
        return this.builder.angledLineToY(y, this.builder.last!.angleInDegrees);
    }

    /**
     * Adds a new quadratic curve node representing a rounded corner that starts from the current point `p`
     * and ends at the `(x, y)` point where that corner's shape is defined by the `nextNodeAngleInDegrees` hint.
     * @param x corner end point's x coordinate
     * @param y corner end point's y coordinate
     * @param nextNodeAngleInDegrees angle hint for the next svg node created after this corner
     * @returns new `SvgPathAfterCornerBuilder` instance
     * */
    public addRoundedCornerTo(x: number, y: number, nextNodeAngleInDegrees: number): SvgPathAfterCornerBuilder {
        return this.builder.addRoundedCornerTo(x, y, nextNodeAngleInDegrees);
    }

    /**
     * Closes current svg path.
     * @returns `builder`
     * */
    public close(): SvgPathBuilder {
        return this.builder.close();
    }

    /**
     * Builds current svg path.
     * @returns built svg path command
     * */
    public build(): string {
        return this.builder.build();
    }
}

/** Allows to build an svg path. */
export class SvgPathBuilder {

    /** Specifies default svg path node coordinates precision. */
    public static readonly DEFAULT_PRECISION = 3;

    /** Returns current svg path nodes. */
    public get nodes(): ReadonlyArray<SvgPathNode> {
        return this._nodes;
    }
    /** Specifies whether or not this builder contains any svg path nodes. */
    public get isEmpty(): boolean {
        return this._nodes.length === 0;
    }
    /** Returns the first svg path node. */
    public get first(): Nullable<SvgPathNode> {
        return !this.isEmpty ? this._nodes[0] : null;
    }
    /** Returns the last svg path node. */
    public get last(): Nullable<SvgPathNode> {
        return !this.isEmpty ? this._nodes[this._nodes.length - 1] : null;
    }
    /** Returns the last svg path start node. */
    public get lastStart(): Nullable<SvgPathStart> {
        return this.isOpen ? this._nodes[this._lastStartIndex] as SvgPathStart : null;
    }
    /** Specifies whether or not this builder contains an active start node. */
    public get isOpen(): boolean {
        return this._lastStartIndex !== -1;
    }
    /** Specifies whether or not this builder doesn't contain an active start node. */
    public get isClosed(): boolean {
        return this._lastStartIndex === -1;
    }

    /** Specifies fixed precision of svg path node's coordinates. */
    public readonly precision: number;

    private _nodes: SvgPathNode[] = [];
    private _lastStartIndex: number = -1;

    /**
     * Create new svg path builder.
     * @param precision optional svg path node coordinates precision used during the svg command building process
     */
    public constructor(precision: Nullable<number> = null) {
        this.precision = Math.min(Math.max(0, precision || SvgPathBuilder.DEFAULT_PRECISION), 20);
    }

    /**
     * Moves to `(x, y)` point with an optional starting angle in degrees.
     * @param x x coordinate to move to
     * @param y y coordinate to move to
     * @param angleInDegrees optional angle to start with
     * @returns `this`
     * */
    public moveTo(x: number, y: number, angleInDegrees: Nullable<number> = null): SvgPathBuilder {
        this._lastStartIndex = this._nodes.length;
        this._nodes.push(new SvgPathStart(x, y, angleInDegrees!, this.last));
        return this;
    }

    /**
     * Moves from the current point `p` to the point equal to `(p.x + dx, p.y + dy)` with an optional angle in degrees override.
     * @param dx x coordinate offset
     * @param dy y coordinate offset
     * @param angleInDegrees optional angle override
     * @returns `this`
     * */
    public moveBy(dx: number, dy: number, angleInDegrees: Nullable<number> = null): SvgPathBuilder {
        const last = this.last;
        this._lastStartIndex = this._nodes.length;
        if (last) {
            if (angleInDegrees === null) {
                angleInDegrees = last.angleInDegrees;
            }
            this._nodes.push(new SvgPathStart(last.x + dx, last.y + dy, angleInDegrees, last));
        } else {
            this._nodes.push(new SvgPathStart(dx, dy, angleInDegrees!, last));
        }
        return this;
    }

    /**
     * Adds a copy of `node` to the svg path.
     * @param node svg path node to add a copy of
     * @returns `this`
     * */
    public addNode(node: SvgPathNode): SvgPathBuilder {
        if (!node) {
            throw new Error('svg path node to add must be defined');
        }
        const copy = node.copy(this.last);
        if (copy.type === SvgPathNodeType.Start) {
            this._lastStartIndex = this._nodes.length;
        } else {
            this._validatePathStart();
        }
        this._nodes.push(copy);
        return this;
    }

    /**
     * Adds a new horizontal line node that starts from the current point `p` and ends at the point equal to `(p.x + dx, p.y)`.
     * @param dx x coordinate offset
     * @returns `this`
     * */
    public lineByX(dx: number): SvgPathBuilder {
        this._validatePathStart();
        this._nodes.push(new SvgPathLineOffset(dx, 0, this.last!));
        return this;
    }

    /**
     * Adds a new vertical line node that starts from the current point `p` and ends at the point equal to `(p.x, p.y + dy)`.
     * @param dy y coordinate offset
     * @returns `this`
     * */
    public lineByY(dy: number): SvgPathBuilder {
        this._validatePathStart();
        this._nodes.push(new SvgPathLineOffset(0, dy, this.last!));
        return this;
    }

    /**
     * Adds a new line node that starts from the current point `p` and ends at the point equal to `(p.x + dx, p.y + dy)`.
     * @param dx x coordinate offset
     * @param dy y coordinate offset
     * @returns `this`
     * */
    public lineBy(dx: number, dy: number): SvgPathBuilder {
        this._validatePathStart();
        this._nodes.push(new SvgPathLineOffset(dx, dy, this.last!));
        return this;
    }

    /**
     * Adds a new horizontal line node that starts from the current point `p` and ends at the point equal to `(x, p.y)`.
     * */
    public lineToX(x: number): SvgPathBuilder {
        this._validatePathStart();
        const last = this.last!;
        this._nodes.push(new SvgPathLine(x, last.y, last));
        return this;
    }

    /**
     * Adds a new vertical line node that starts from the current point `p` and ends at the point equal to `(p.x, y)`.
     * */
    public lineToY(y: number): SvgPathBuilder {
        this._validatePathStart();
        const last = this.last!;
        this._nodes.push(new SvgPathLine(last.x, y, last));
        return this;
    }

    /**
     * Adds a new line node that starts from the current point `p` and ends at the `(x, y)` point.
     * */
    public lineTo(x: number, y: number): SvgPathBuilder {
        this._validatePathStart();
        this._nodes.push(new SvgPathLine(x, y, this.last!));
        return this;
    }

    /**
     * Adds a new line node that starts from the current point `p`
     * at the provided `angleInDegrees` and ends at the point with the provided `x` coordinate.
     * */
    public angledLineToX(x: number, angleInDegrees: number): SvgPathBuilder {
        this._validatePathStart();
        const last = this.last!;
        const intersection = Line.findRayIntersection(
            Line.mirrorY({ p: { x: x, y: 0 }, angle: 90 }),
            Line.mirrorY({ p: { x: last.x, y: last.y }, angle: angleInDegrees }));

        if (!intersection) {
            throw new Error(`failed to create an angled line to \'x = ${x}\':
            ray starting from (x: ${last.x}, y: ${last.y}) at a ${angleInDegrees} degrees angle
            doesn\'t intersect with the vertical line with its x coordinate equal to ${x}.`);
        }
        return this.lineTo(x, -intersection.y);
    }

    /**
     * Adds a new line node that starts from the current point `p`
     * at the provided `angleInDegrees` and ends at the point with the provided `y` coordinate.
     * */
    public angledLineToY(y: number, angleInDegrees: number): SvgPathBuilder {
        this._validatePathStart();
        const last = this.last!;
        const intersection = Line.findRayIntersection(
            Line.mirrorY({ p: { x: 0, y: y }, angle: 0 }),
            Line.mirrorY({ p: { x: last.x, y: last.y }, angle: angleInDegrees }));

        if (!intersection) {
            throw new Error(`failed to create an angled line to \'y = ${y}\':
            ray starting from (x: ${last.x}, y: ${last.y}) at a ${angleInDegrees} degrees angle
            doesn\'t intersect with the horizontal line with its y coordinate equal to ${y}.`);
        }
        return this.lineTo(intersection.x, y);
    }

    /**
     * Adds a new line node that starts from the current point `p` with the provided `length` and at the provided `angleInDegrees`.
     * */
    public addLine(length: number, angleInDegrees: number): SvgPathBuilder {
        this._validatePathStart();
        if (length < 0) {
            length = -length;
            angleInDegrees = -angleInDegrees;
        }
        const last = this.last!;
        const v = Vector.setAngle({ x: length, y: 0 }, -angleInDegrees);
        return this.lineTo(last.x + v.x, last.y - v.y);
    }

    /**
     * Adds a new curve node that starts from the current point `p`, ends at the `(x, y)` point
     * and has its first bezier point set to `(bezierX1, bezierY1)` and an optional second bezier point set to `(bezierX2, bezierY2)`.
     * */
    public curveTo(x: number, y: number,
        bezierX1: number, bezierY1: number,
        bezierX2: Nullable<number> = null, bezierY2: Nullable<number> = null): SvgPathBuilder {
        this._validatePathStart();
        const last = this.last!;
        if (bezierX2 !== null || bezierY2 !== null) {
            this._nodes.push(new SvgPathCubicCurve(x, y, bezierX1, bezierY1, bezierX2!, bezierY2!, last));
        } else {
            this._nodes.push(new SvgPathQuadraticCurve(x, y, bezierX1, bezierY1, last));
        }
        return this;
    }

    /**
     * Adds a new arc node that starts from the current point `p`, ends at the `(x, y)` point,
     * has semi x axis value equal to `rx` and semi y axis value equal to `ry`,
     * is rotated by `rotationAngleInDegrees` and has the provided `style`.
     * */
    public arcTo(x: number, y: number, rx: number, ry: number, rotationAngleInDegrees: number, style: SvgPathArcStyle): SvgPathBuilder {
        this._validatePathStart();
        this._nodes.push(new SvgPathArc(x, y, rx, ry, rotationAngleInDegrees, style, this.last!));
        return this;
    }

    /**
     * Adds a new curve node representing a rounded corner that starts from the current point `p`
     * and ends at the `(x, y)` point with the next svg path node's angle set to `nextNodeAngleInDegrees`.
     * */
    public addRoundedCornerTo(x: number, y: number, nextNodeAngleInDegrees: number): SvgPathAfterCornerBuilder {
        this._validatePathStart();
        const last = this.last!;
        const intersection = Line.findIntersection(
            Line.mirrorY({ p: { x: last.x, y: last.y }, angle: last.angleInDegrees }),
            Line.mirrorY({ p: { x: x, y: y }, angle: nextNodeAngleInDegrees }));

        if (intersection) {
            this.curveTo(x, y, intersection.x, -intersection.y);
        } else {
            this.lineTo(x, y);
        }
        return new SvgPathAfterCornerBuilder(this);
    }

    /**
     * Scales all current svg path nodes.
     * */
    public scale(originX: number, originY: number, value: number): SvgPathBuilder {
        if (!this.isEmpty) {
            const newNodes = [this.first!.scale(originX, originY, value, null)];
            for (let i = 1; i < this._nodes.length; ++i) {
                newNodes.push(this._nodes[i].scale(originX, originY, value, newNodes[i - 1]));
            }
            this._nodes = newNodes;
        }
        return this;
    }

    /**
     * Returns a copy of this builder.
     * */
    public copy(): SvgPathBuilder {
        const result = new SvgPathBuilder(this.precision);
        result._lastStartIndex = this._lastStartIndex;
        if (!this.isEmpty) {
            result._nodes.push(this.first!.copy(null));
            for (let i = 1; i < this._nodes.length; ++i) {
                result._nodes.push(this._nodes[i].copy(result._nodes[i - 1]));
            }
        }
        return result;
    }

    /**
     * Closes current svg path.
     * */
    public close(): SvgPathBuilder {
        this._validatePathStart();
        const lastStart = this._nodes[this._lastStartIndex] as SvgPathStart;
        this._nodes.push(new SvgPathClose(lastStart, this.last!));
        this._lastStartIndex = -1;
        return this;
    }

    /**
     * Builds current svg path.
     * */
    public build(): string {
        return this._nodes.map(n => n.createSvgCommand(this.precision)).join(' ');
    }

    private _validatePathStart(): void {
        if (this.isClosed) {
            throw new Error('path must be started first: use moveTo or moveBy method');
        }
    }
}

/** Allows to start a new svg path. */
export class SvgPathStarter {
    /** Specifies fixed precision of svg path node's coordinates. */
    public readonly precision: number;

    /** */
    public constructor(precision: Nullable<number> = null) {
        this.precision = Math.min(Math.max(0, precision || SvgPathBuilder.DEFAULT_PRECISION), 20);
    }

    /**
     * Creates a new, empty svg path builder.
     * @returns new svg path builder
     * */
    public start(): SvgPathBuilder {
        return new SvgPathBuilder(this.precision);
    }

    /**
     * Creates a new svg path builder with the provided starting point and an optional starting angle.
     * */
    public startAt(x: number, y: number, angleInDegrees: Nullable<number> = null): SvgPathBuilder {
        return this.start().moveTo(x, y, angleInDegrees);
    }
}
