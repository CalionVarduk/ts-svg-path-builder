import { SvgPathNodeType } from '../src/svg-path-node-type';

test('svg path node type uniqueness',
    () =>
    {
        const values: number[] = [];
        for (const member in SvgPathNodeType)
            if (isNaN(Number(member)))
                values.push(SvgPathNodeType[member] as any);

        expect(new Set(values).size).toBe(values.length);
    }
);
