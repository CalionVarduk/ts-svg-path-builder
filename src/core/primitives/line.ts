import { Vector2, Vector } from './vector';
import { Nullable } from '../utils/nullable';
import { Const } from '../utils/const';

/** 2D line literal type alias. */
export type Line2 = {
    /** Point on the line. */
    p: Vector2;
    /** Angle in degrees of the line. */
    angle: number;
};

/** Contains helper functions that allow to manipulate line literals. */
export namespace Line {

    function _createIntersectionPoint(p: Const<Vector2>, d: Vector2, t: number): Vector2 {
        return Vector.add(Vector.scale(d, t), p);
    }

    /**
     * Creates a deep copy of line `l`.
     * @param l target line literal to copy
     * @returns a copy of `l`
     * */
    export function copy(l: Const<Line2>): Line2 {
        return { p: { x: l.p.x, y: l.p.y }, angle: l.angle };
    }
    /**
     * Assigns properties from line `other` to line `l`.
     * @param l target line literal
     * @param other line literal to assign properties from
     * @returns `l`
     * */
    export function assign(l: Line2, other: Const<Line2>): Line2 {
        l.p.x = other.p.x;
        l.p.y = other.p.y;
        l.angle = other.angle;
        return l;
    }
    /**
     * Creates a point that lies on line `l` and is moved from the point `p` representing the line by `abs(t)`.
     * @param l target line literal
     * @param t offset value. If negative, then the point will be moved at the `l.angle - 180` angle.
     * @returns point on `l`
     * */
    export function createPointOn(l: Const<Line2>, t: number): Vector2 {
        return Vector.add(Vector.setAngle({ x: t, y: 0 }, l.angle), l.p);
    }
    /**
     * Calculates line intersection solution for lines `l1` and `l2`.
     * @param l1 first line literal
     * @param l2 second line literal
     * @returns line intersection solution or `null`, if lines `l1` and `l2` are parallel to each other
     * */
    export function createIntersectionSolution(l1: Const<Line2>, l2: Const<Line2>): Nullable<{
        p1: Vector2;
        d1: Vector2;
        p2: Vector2;
        d2: Vector2;
        t: number;
        u: number;
    }> {
        if (areParallel(l1, l2)) {
            return null;
        }
        const p1 = l1.p;
        const p2 = createPointOn(l1, 1);
        const q1 = l2.p;
        const q2 = createPointOn(l2, 1);
        const d1 = Vector.sub(Vector.copy(p2), p1);
        const d2 = Vector.sub(Vector.copy(q2), q1);
        const cr = Vector.cross(d1, d2);
        const s = Vector.sub(Vector.copy(q1), p1);
        return {
            p1: Vector.copy(p1),
            d1: d1,
            p2: p2,
            d2: d2,
            t: Vector.cross(s, d2) / cr,
            u: Vector.cross(s, d1) / cr
        };
    }
    /**
     * Calculates intersection point of lines `l1` and `l2`.
     * @param l1 first line literal
     * @param l2 second line literal
     * @returns intersection point or `null`, if lines `l1` and `l2` are parallel to each other
     * */
    export function findIntersection(l1: Const<Line2>, l2: Const<Line2>): Nullable<Vector2> {
        const sol = createIntersectionSolution(l1, l2);
        return sol ? _createIntersectionPoint(sol.p1, sol.d1, sol.t) : null;
    }
    /**
     * Calculates intersection point of line `l` and ray `ray`.
     * @param l first line literal
     * @param ray second line literal representing a ray
     * @returns intersection point or `null`, if line `l` and ray `ray` don't intersect each other
     * */
    export function findRayIntersection(l: Const<Line2>, ray: Const<Line2>): Nullable<Vector2> {
        const sol = createIntersectionSolution(ray, l);
        return sol && sol.t >= 0 ? _createIntersectionPoint(sol.p1, sol.d1, sol.t) : null;
    }
    /**
     * Normalizes angle of line `l` to be in `[0, 360)` range.
     * @param l target line literal
     * @returns `l`
     * */
    export function normalizeAngle(l: Line2): Line2 {
        l.angle %= 360;
        if (l.angle === -0) {
            l.angle = 0;
        } else if (l.angle < 0) {
            l.angle += 360;
        }
        return l;
    }
    /**
     * Calculates whether or not lines `l1` and `l2` are parallel to each other.
     * @param l1 first line literal
     * @param l2 second line literal
     * @returns `true`, if lines are parallel to each other, otherwise `false`
     * */
    export function areParallel(l1: Const<Line2>, l2: Const<Line2>): boolean {
        const ans = (l1.angle - l2.angle) % 180;
        return ans === 0 || ans === -0;
    }
    /**
     * Flips line `l` accross the y-axis.
     * @param l target line literal
     * @returns `l`
     * */
    export function mirrorX(l: Line2): Line2 {
        l.p.x = -l.p.x;
        l.angle = 180 - l.angle;
        return l;
    }
    /**
     * Flips line `l` accross the x-axis.
     * @param l target line literal
     * @returns `l`
     * */
    export function mirrorY(l: Line2): Line2 {
        l.p.y = -l.p.y;
        l.angle = -l.angle;
        return l;
    }
    /**
     * Negates line `l`.
     * @param l target line literal
     * @returns `l`
     * */
    export function mirror(l: Line2): Line2 {
        return mirrorY(mirrorX(l));
    }
}
