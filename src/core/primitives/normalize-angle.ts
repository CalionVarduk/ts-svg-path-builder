/**
 * Normalizes angle to be in `[0, 360)` range.
 * @param value angle to normalize
 * @returns normalized angle
 * */
export function normalizeAngle(value: number): number {
    value %= 360;
    if (value === -0) {
        value = 0;
    } else if (value < 0) {
        value += 360;
    }
    return value;
}
