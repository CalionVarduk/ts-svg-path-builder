import { SvgPathNode } from './svg-path-node';
import { SvgPathNodeType } from './svg-path-node-type';
import { SvgPathStart } from './svg-path-start';
import { Vector } from './primitives/vector';
import { Nullable } from './utils/nullable';

function findStart(prev: Nullable<SvgPathNode>): SvgPathStart {
    let result = prev;
    while (result && result.type !== SvgPathNodeType.Start) {
        result = result.prev;
    }
    if (!result) {
        throw new Error('failed to locate close node\'s starting node');
    }
    return result as SvgPathStart;
}

/** Specifies an svg path close node. */
export class SvgPathClose extends SvgPathNode {

    public get type(): SvgPathNodeType {
        return SvgPathNodeType.Close;
    }
    public get angleInDegrees(): number {
        return Vector.getAngle({ x: this.dx, y: this.dy });
    }

    /** Returns closing line's length. */
    public get length(): number {
        return Vector.magnitude({ x: this.dx, y: this.dy });
    }

    /** Returns closing line's length vector's x coordinate. */
    public get dx(): number {
        return this.x - this.prev!.x;
    }
    /** Returns closing line's length vector's y coordinate. */
    public get dy(): number {
        return this.y - this.prev!.y;
    }

    public set x(value: number) {
        this.start.x = value;
    }
    public get x(): number {
        return this.start.x;
    }
    public set y(value: number) {
        this.start.y = value;
    }
    public get y(): number {
        return this.start.y;
    }

    /**
     * Creates new svg path close node.
     * @param start path's starting node
     * @param prev node's predecessor
     * */
    public constructor(
        /** Specifies close node's starting node. */
        public readonly start: SvgPathStart,
        prev: SvgPathNode) {
        super(prev);
        if (!prev) {
            throw new Error('svg path close node lacks predecessor node');
        }
        if (!start) {
            throw new Error('svg path close node lacks starting node');
        }
    }

    /**
     * Creates a copy of this node.
     * @param prev predecessor node
     * @returns a copy of this node
     * */
    public copy(prev: SvgPathNode): SvgPathClose {
        return new SvgPathClose(findStart(prev), prev);
    }
    /**
     * Scales this node according to the provided origin and scale value.
     * @param _originX x coordinate of the scaling origin point (unused)
     * @param _originY y coordinate of the scaling origin point (unused)
     * @param _value scale value (unused)
     * */
    public scale(_originX: number, _originY: number, _value: number): void { }
    /**
     * Creates an svg command from this node.
     * @param _precision number of digits after the decimal point (unused)
     * @returns created svg command
     * */
    public createSvgCommand(_precision: number): string {
        return 'Z';
    }
}
