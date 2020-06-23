import { SvgPathArcStyle } from '../src/svg-path-arc-style';

test('svg path arc style uniqueness',
    () =>
    {
        const values: number[] = [];
        for (const member in SvgPathArcStyle)
            if (isNaN(Number(member)))
                values.push(SvgPathArcStyle[member] as any);

        expect(new Set(values).size).toBe(values.length);
    }
);
