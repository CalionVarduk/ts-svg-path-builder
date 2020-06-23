import { normalizeAngle } from '../../src/primitives/normalize-angle';
import each from 'jest-each';

each([
    [0, 0],
    [1, 1],
    [-1, 359],
    [2, 2],
    [-2, 358],
    [90, 90],
    [180, 180],
    [270, 270],
    [360, 0],
    [540, 180],
    [-700, 20],
    [0.01, 0.01],
    [-0, 0],
    [17.2, 17.2],
    [105, 105],
    [-360, 0],
    [1111.5, 31.5],
    [-1111, 329],
    [200.76, 200.76],
    [-200, 160],
    [300.88, 300.88]
])
.test('normalize angle (%#): angle: %f, expected angle: %f',
    (angle, expected) =>
    {
        const result = normalizeAngle(angle);
        expect(result).toBeCloseTo(expected, 8);
    }
);
