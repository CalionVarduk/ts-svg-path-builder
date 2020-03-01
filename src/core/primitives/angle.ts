const _HALF_PI_DEGREES_BY_PI = 180 / Math.PI;
const _PI_BY_HALF_PI_DEGREES = Math.PI / 180;

/** Represents basic angle data. */
export class Angle
{
    /**
     * Converts radians to degrees.
     * @param radians angle in radians to convert
     * @returns angle converted to degrees
     * */
    public static toDegrees(radians: number): number
    {
        return radians * _HALF_PI_DEGREES_BY_PI;
    }
    /**
     * Converts degrees to radians.
     * @param degrees angle in degrees to convert
     * @returns angle converted to radians
     * */
    public static toRadians(degrees: number): number
    {
        return degrees * _PI_BY_HALF_PI_DEGREES;
    }

    /** Returns the angle's sine. */
    public get sin(): number
    {
        return this._sin;
    }
    /** Returns the angle's cosine. */
    public get cos(): number
    {
        return this._cos;
    }
    /** Returns the angle's radians. */
    public get radians(): number
    {
        return Angle.toRadians(this.degrees);
    }

    private readonly _sin: number;
    private readonly _cos: number;

    /**
     * Creates a new angle data.
     * @param degrees angle degrees
     * */
    public constructor(
        /** Specifies the angle's degrees. */
        public readonly degrees: number)
    {
        const radians = Angle.toRadians(degrees);
        this._sin = Math.sin(radians);
        this._cos = Math.cos(radians);
    }
}
