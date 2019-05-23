import { SvgPathBuilder, SvgPathStarter } from '../core/svg-path-builder';
import each from 'jest-each';

each([
    [0, 0],
    [-1, 0],
    [1, 1],
    [2, 2],
    [5, 5],
    [10, 10],
    [18, 18],
    [20, 20],
    [21, 20],
    [3.4, 3],
    [3.5, 4],
    [3.6, 4],
    [null, SvgPathBuilder.DEFAULT_PRECISION],
    [void(0), SvgPathBuilder.DEFAULT_PRECISION]
])
.test('starter ctor should create with provided precision (%#): value: %f, expected: %i',
    (value, expected) => {
        const sut = new SvgPathStarter(value);
        expect(sut.precision).toBe(expected);
    }
);

each([
    [0, 0],
    [-1, 0],
    [1, 1],
    [2, 2],
    [5, 5],
    [10, 10],
    [18, 18],
    [20, 20],
    [21, 20],
    [3.4, 3],
    [3.5, 4],
    [3.6, 4],
    [null, SvgPathBuilder.DEFAULT_PRECISION],
    [void(0), SvgPathBuilder.DEFAULT_PRECISION]
])
.test('builder ctor should create with provided precision (%#): value: %f, expected: %i',
    (value, expected) => {
        const sut = new SvgPathBuilder(value);
        expect(sut.precision).toBe(expected);
    }
);
