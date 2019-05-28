import { Vector2 } from './primitives/vector';
import { SvgPathNodeType } from './svg-path-node-type';
import { Nullable } from './utils/nullable';

/** Specifies an svg path node. */
export abstract class SvgPathNode {

    /** Returns node's type. */
    public abstract get type(): SvgPathNodeType;
    /** Returns node's angle in degrees. */
    public abstract get angleInDegrees(): number;

    /** Specifies node's x coordinate. */
    public abstract x: number;
    /** Specifies node's y coordinate. */
    public abstract y: number;

    /** Specifies node's coordinates. */
    public set point(value: Vector2) {
        if (value) {
            this.x = value.x;
            this.y = value.y;
        } else {
            this.x = 0;
            this.y = 0;
        }
    }
    public get point(): Vector2 {
        return { x: this.x, y: this.y };
    }

    /**
     * Creates new svg path node.
     * @param prev node's predecessor
     * */
    protected constructor(
        /** Specifies node's predecessor. */
        public readonly prev: Nullable<SvgPathNode>) { }

    /**
     * Creates a copy of this node.
     * @param prev predecessor node
     * @returns a copy of this node
     * */
    public abstract copy(prev: Nullable<SvgPathNode>): SvgPathNode;
    /**
     * Scales this node according to the provided origin and scale value.
     * @param originX x coordinate of the scaling origin point
     * @param originY y coordinate of the scaling origin point
     * @param value scale value
     * */
    public abstract scale(originX: number, originY: number, value: number): void;
    /**
     * Creates an svg command from this node.
     * @param precision number of digits after the decimal point
     * @returns created svg command
     * */
    public abstract createSvgCommand(precision: number): string;
}
