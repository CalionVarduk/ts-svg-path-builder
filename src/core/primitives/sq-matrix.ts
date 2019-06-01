import { Vector2 } from './vector';
import { Nullable, Const } from 'frlluc-utils';

/** 2D square matrix literal type alias. */
export type SqMatrix2 = {
    /** Top left element. */
    t0: number;
    /** Top right element. */
    t1: number;
    /** Bottom left element. */
    b0: number;
    /** Bottom right element. */
    b1: number;
};

/** Contains helper functions that allow to manipulate square matrix literals. */
export namespace SqMatrix {
    /**
     * Creates a deep copy of square matrix `m`.
     * @param m target square matrix literal to copy
     * @returns a copy of `m`
     * */
    export function copy(m: Const<SqMatrix2>): SqMatrix2 {
        return { t0: m.t0, t1: m.t1, b0: m.b0, b1: m.b1 };
    }
    /**
     * Creates a square matrix from `top` and `bottom` rows.
     * @param top vector literal representing square matrix top row
     * @param bottom vector literal representing square matrix bottom row
     * @returns a new square matrix
     * */
    export function fromRows(top: Const<Vector2>, bottom: Const<Vector2>): SqMatrix2 {
        return { t0: top.x, t1: top.y, b0: bottom.x, b1: bottom.y };
    }
    /**
     * Creates a square matrix from `left` and `right` columns.
     * @param left vector literal representing square matrix left column
     * @param right vector literal representing square matrix right column
     * @returns a new square matrix
     * */
    export function fromCols(left: Const<Vector2>, right: Const<Vector2>): SqMatrix2 {
        return { t0: left.x, t1: right.x, b0: left.y, b1: right.y };
    }
    /**
     * Creates new identity square matrix.
     * @returns a new identity square matrix
     * */
    export function identity(): SqMatrix2 {
        return { t0: 1, t1: 0, b0: 0, b1: 1 };
    }
    /**
     * Assigns properties from square matrix `other` to square matrix `m`.
     * @param m target square matrix literal
     * @param other square matrix literal to assign properties from
     * @returns `m`
     * */
    export function assign(m: SqMatrix2, other: Const<SqMatrix2>): SqMatrix2 {
        m.t0 = other.t0;
        m.t1 = other.t1;
        m.b0 = other.b0;
        m.b1 = other.b1;
        return m;
    }
    /**
     * Calculates determinant of square matrix `m`.
     * @param m target square matrix literal
     * @returns determinant of `m`
     * */
    export function det(m: Const<SqMatrix2>): number {
        return m.t0 * m.b1 - m.t1 * m.b0;
    }
    /**
     * Adds square matrix `other` to square matrix `m`.
     * @param m target square matrix literal
     * @param other square matrix literal to add
     * @returns `m`
     * */
    export function add(m: SqMatrix2, other: Const<SqMatrix2>): SqMatrix2 {
        m.t0 += other.t0;
        m.t1 += other.t1;
        m.b0 += other.b0;
        m.b1 += other.b1;
        return m;
    }
    /**
     * Adds `scalar` to square matrix `m`.
     * @param m target square matrix literal
     * @param scalar value to add
     * @returns `m`
     * */
    export function addScalar(m: SqMatrix2, scalar: number): SqMatrix2 {
        m.t0 += scalar;
        m.t1 += scalar;
        m.b0 += scalar;
        m.b1 += scalar;
        return m;
    }
    /**
     * Subtracts square matrix `other` from square matrix `m`.
     * @param m target square matrix literal
     * @param other square matrix literal to subtract
     * @returns `m`
     * */
    export function sub(m: SqMatrix2, other: Const<SqMatrix2>): SqMatrix2 {
        m.t0 -= other.t0;
        m.t1 -= other.t1;
        m.b0 -= other.b0;
        m.b1 -= other.b1;
        return m;
    }
    /**
     * Subtracts `scalar` from square matrix `m`.
     * @param m target square matrix literal
     * @param scalar value to substract
     * @returns `m`
     * */
    export function subScalar(m: SqMatrix2, scalar: number): SqMatrix2 {
        m.t0 -= scalar;
        m.t1 -= scalar;
        m.b0 -= scalar;
        m.b1 -= scalar;
        return m;
    }
    /**
     * Scales square matrix `m` by `scalar`.
     * @param m target square matrix literal
     * @param scalar value to scale by
     * @returns `m`
     * */
    export function scale(m: SqMatrix2, scalar: number): SqMatrix2 {
        m.t0 *= scalar;
        m.t1 *= scalar;
        m.b0 *= scalar;
        m.b1 *= scalar;
        return m;
    }
    /**
     * Inverts square matrix `m`.
     * @param m target square matrix literal
     * @returns `m` or `null`, if square matrix `m` is not invertible
     * */
    export function invert(m: SqMatrix2): Nullable<SqMatrix2> {
        const d = det(m);
        if (d === 0) {
            return null;
        }
        m.t1 = -m.t1;
        m.b0 = -m.b0;
        const b1 = m.b1;
        m.b1 = m.t0;
        m.t0 = b1;
        return scale(m, 1 / d);
    }
    /**
     * Multiplies square matrix `m` by square matrix `other`.
     * @param m target square matrix literal
     * @param other square matrix literal to multiply by
     * @returns `m`
     * */
    export function mult(m: SqMatrix2, other: Const<SqMatrix2>): SqMatrix2 {
        let temp = m.t0 * other.t0 + m.t1 * other.b0;
        m.t1 = m.t0 * other.t1 + m.t1 * other.b1;
        m.t0 = temp;
        temp = m.b0 * other.t0 + m.b1 * other.b0;
        m.b1 = m.b0 * other.t1 + m.b1 * other.b1;
        m.b0 = temp;
        return m;
    }
    /**
     * Multiplies square matrix `m` by vector `v`.
     * @param m target square matrix literal
     * @param v vector literal to multiply by
     * @returns vector literal representing multiplication result
     * */
    export function multVec(m: Const<SqMatrix2>, v: Const<Vector2>): Vector2 {
        return { x: m.t0 * v.x + m.t1 * v.y, y: m.b0 * v.x + m.b1 * v.y };
    }
    /**
     * Transposes square matrix `m`.
     * @param m target square matrix literal
     * @returns `m`
     * */
    export function transpose(m: SqMatrix2): SqMatrix2 {
        const t1 = m.t1;
        m.t1 = m.b0;
        m.b0 = t1;
        return m;
    }
}
