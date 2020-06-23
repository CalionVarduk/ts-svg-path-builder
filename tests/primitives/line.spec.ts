import { Line } from '../../src/primitives/line';
import { Vector2 } from '../../src/primitives/vector';
import each from 'jest-each';

each([
    [{ p: { x: 0, y: 0 }, angle: 0 }],
    [{ p: { x: 1, y: 0 }, angle: 1 }],
    [{ p: { x: 0, y: 1 }, angle: -1 }],
    [{ p: { x: -1, y: 0 }, angle: 2 }],
    [{ p: { x: 0, y: -1 }, angle: -2 }],
    [{ p: { x: 2, y: 0 }, angle: 90 }],
    [{ p: { x: 0, y: 2 }, angle: 180 }],
    [{ p: { x: -2, y: 0 }, angle: -270 }],
    [{ p: { x: 0, y: -2 }, angle: 360 }],
    [{ p: { x: 5, y: 0 }, angle: 540 }],
    [{ p: { x: 0, y: 5 }, angle: -720 }],
    [{ p: { x: -5, y: 0 }, angle: 45 }],
    [{ p: { x: 0, y: -5 }, angle: -45 }],
    [{ p: { x: -2, y: 3 }, angle: 13 }],
    [{ p: { x: 2, y: -3 }, angle: 12.5 }],
    [{ p: { x: 2, y: 3 }, angle: 17.7 }],
    [{ p: { x: 3, y: 2 }, angle: -44.4 }],
    [{ p: { x: 5.5, y: 2.2 }, angle: 0.01 }],
    [{ p: { x: -2.2, y: -5.5 }, angle: -12 }],
    [{ p: { x: 5.5, y: -0.4 }, angle: 1111 }],
    [{ p: { x: -0.4, y: 5.5 }, angle: -1111 }]
])
.test('copy (%#): line: %o',
    (l) =>
    {
        const result = Line.copy(l);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).not.toBe(l);
        expect(result.p).toBeDefined();
        expect(result.p).not.toBeNull();
        expect(result.p).not.toBe(l.p);
        expect(result.p.x).toBe(l.p.x);
        expect(result.p.y).toBe(l.p.y);
        expect(result.angle).toBe(l.angle);
    }
);

each([
    [{ p: { x: 0, y: 0 }, angle: 0 }, { p: { x: 0, y: 0 }, angle: 0 }],
    [{ p: { x: 1, y: 0 }, angle: 1 }, { p: { x: 0, y: 0 }, angle: 0 }],
    [{ p: { x: 0, y: 1 }, angle: -1 }, { p: { x: 0, y: 0 }, angle: 0 }],
    [{ p: { x: -1, y: 0 }, angle: 2 }, { p: { x: 0, y: 0 }, angle: 0 }],
    [{ p: { x: 0, y: -1 }, angle: -2 }, { p: { x: 0, y: 0 }, angle: 0 }],
    [{ p: { x: 2, y: 0 }, angle: 90 }, { p: { x: 2, y: 0 }, angle: 90 }],
    [{ p: { x: 0, y: 2 }, angle: 180 }, { p: { x: 0, y: 2 }, angle: 180 }],
    [{ p: { x: -2, y: 0 }, angle: -270 }, { p: { x: -5, y: 0 }, angle: 45 }],
    [{ p: { x: 0, y: -2 }, angle: 360 }, { p: { x: 2, y: 3 }, angle: 17.7 }],
    [{ p: { x: 5, y: 0 }, angle: 540 }, { p: { x: 5, y: 0 }, angle: -720 }],
    [{ p: { x: 0, y: 5 }, angle: -720 }, { p: { x: 0, y: 5.2 }, angle: 0.01 }],
    [{ p: { x: -5, y: 0 }, angle: 45 }, { p: { x: 5.5, y: -0.4 }, angle: 1111 }],
    [{ p: { x: 0, y: -5 }, angle: -45 }, { p: { x: 0, y: 1 }, angle: -1 }],
    [{ p: { x: -2, y: 3 }, angle: 13 }, { p: { x: 2, y: -3 }, angle: 12.5 }],
    [{ p: { x: 2, y: -3 }, angle: 12.5 }, { p: { x: 2, y: -3 }, angle: 25 }],
    [{ p: { x: 2, y: 3 }, angle: 17.7 }, { p: { x: 0, y: 2 }, angle: 180 }],
    [{ p: { x: 3, y: 2 }, angle: -44.4 }, { p: { x: 0, y: -1 }, angle: -2 }],
    [{ p: { x: 5.5, y: 2.2 }, angle: 0.01 }, { p: { x: 0, y: 2 }, angle: 180 }],
    [{ p: { x: -2.2, y: -5.5 }, angle: -12 }, { p: { x: 7.7, y: -5.5 }, angle: 12 }],
    [{ p: { x: 5.5, y: -0.4 }, angle: 1111 }, { p: { x: 5.5, y: -6.2 }, angle: 1111 }],
    [{ p: { x: -0.4, y: 5.5 }, angle: -1111 }, { p: { x: 5.6, y: 5.5 }, angle: -1111 }]
])
.test('assign (%#): line1: %o, line2: %o',
    (l1, l2) =>
    {
        const result = Line.assign(l1, l2);
        expect(result).toBe(l1);
        expect(result.p).toBeDefined();
        expect(result.p).not.toBeNull();
        expect(result.p).not.toBe(l2.p);
        expect(result.p.x).toBe(l2.p.x);
        expect(result.p.y).toBe(l2.p.y);
        expect(result.angle).toBe(l2.angle);
    }
);

each([
    [{ p: { x: 0, y: 0 }, angle: 0 }, 0, { x: 0, y: 0 }],
    [{ p: { x: 1, y: 0 }, angle: 1 }, 1, { x: 1.999847695, y: 0.017452406 }],
    [{ p: { x: 0, y: 1 }, angle: -1 }, -1, { x: 0.999847695, y: 0.982547593 }],
    [{ p: { x: -1, y: 0 }, angle: 2 }, 2, { x: 0.998781654, y: 0.069798993 }],
    [{ p: { x: 0, y: -1 }, angle: -2 }, -2, { x: 1.998781654, y: -1.069798993 }],
    [{ p: { x: 2, y: 0 }, angle: 90 }, 9, { x: 2, y: 9 }],
    [{ p: { x: 0, y: 2 }, angle: 180 }, 18, { x: -18, y: 2 }],
    [{ p: { x: -2, y: 0 }, angle: 270 }, -27.33, { x: -2, y: -27.33 }],
    [{ p: { x: 0, y: -2 }, angle: 360 }, 0.4, { x: 0.4, y: -2 }],
    [{ p: { x: 5, y: 0 }, angle: 540 }, 12, { x: -7, y: 0 }],
    [{ p: { x: 0, y: 5 }, angle: -700 }, -0.2, { x: 0.187938524, y: 5.068404028 }],
    [{ p: { x: -5, y: 0 }, angle: 0.01 }, 0.01, { x: -4.99, y: 0.000001745 }],
    [{ p: { x: 0, y: -5 }, angle: -0 }, 5, { x: 5, y: -5 }],
    [{ p: { x: -2, y: 3 }, angle: 17.2 }, 17.2, { x: 14.430787828, y: 8.08617846 }],
    [{ p: { x: 2, y: -3 }, angle: 105 }, -17.2, { x: -2.451687575, y: 13.613924212 }],
    [{ p: { x: 2, y: 3 }, angle: -360 }, 0, { x: 2, y: 3 }],
    [{ p: { x: 3, y: 2 }, angle: 1111.5 }, 31.5, { x: 29.858165177, y: 18.458704788 }],
    [{ p: { x: 5.5, y: 2.2 }, angle: -1111 }, 32.9, { x: 33.700804193, y: -14.744752664 }],
    [{ p: { x: -2.2, y: -5.5 }, angle: 200.76 }, -2.76, { x: -4.780802473, y: -6.478293714 }],
    [{ p: { x: 5.5, y: -0.4 }, angle: -200 }, 16, { x: -9.535081932, y: 5.072322293 }],
    [{ p: { x: -0.4, y: 5.5 }, angle: 300.88 }, 30.88, { x: 15.448903684, y: -21.002578214 }]
])
.test('create point on (%#): line: %o, t: %f, expected point: %o',
    (l, t, expected) =>
    {
        const result = Line.createPointOn(l, t);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result.x).toBeCloseTo(expected.x, 8);
        expect(result.y).toBeCloseTo(expected.y, 8);
    }
);

each([
    [{ p: { x: 0, y: 0 }, angle: 0 }, { p: { x: 0, y: 0 }, angle: 0 }, null],
    [{ p: { x: 1, y: 0 }, angle: 1 }, { p: { x: 0, y: 0 }, angle: 0 }, {
        p1: { x: 1, y: 0 }, d1: { x: 0.999847695, y: 0.017452406 },
        p2: { x: 1.999847695, y: 0.017452406 }, d2: { x: 1, y: 0 },
        t: 0, u: 1
    }],
    [{ p: { x: 0, y: 1 }, angle: -1 }, { p: { x: 0, y: 0 }, angle: 0 }, {
        p1: { x: 0, y: 1 }, d1: { x: 0.999847695, y: -0.017452406 },
        p2: { x: 0.999847695, y: 0.982547593 }, d2: { x: 1, y: 0 },
        t: 57.298688498, u: 57.289961630
    }],
    [{ p: { x: -1, y: 0 }, angle: 2 }, { p: { x: 0, y: 0 }, angle: 0 }, {
        p1: { x: -1, y: 0 }, d1: { x: 0.999390827, y: 0.034899496 },
        p2: { x: -0.000609172, y: 0.034899496 }, d2: { x: 1, y: 0 },
        t: 0, u: -1
    }],
    [{ p: { x: 0, y: -1 }, angle: -2 }, { p: { x: 0, y: 0 }, angle: 0 }, {
        p1: { x: 0, y: -1 }, d1: { x: 0.999390827, y: -0.034899496 },
        p2: { x: 0.999390827, y: -1.034899496 }, d2: { x: 1, y: 0 },
        t: -28.653708347, u: -28.636253282
    }],
    [{ p: { x: 2, y: 0 }, angle: 90 }, { p: { x: 5, y: -7 }, angle: 90 }, null],
    [{ p: { x: 0, y: 2 }, angle: 180 }, { p: { x: 0, y: -2 }, angle: -180 }, null],
    [{ p: { x: -2, y: 0 }, angle: -270 }, { p: { x: -5, y: 0 }, angle: 45 }, {
        p1: { x: -2, y: 0 }, d1: { x: 0, y: 1 },
        p2: { x: -2, y: 1 }, d2: { x: 0.707106781, y: 0.707106781 },
        t: 3, u: 4.242640687
    }],
    [{ p: { x: 0, y: -2 }, angle: 360 }, { p: { x: 2, y: 3 }, angle: 17.7 }, {
        p1: { x: 0, y: -2 }, d1: { x: 1, y: 0 },
        p2: { x: 1, y: -2 }, d2: { x: 0.952661481, y: 0.30403306 },
        t: -13.667070521, u: -16.445579914
    }],
    [{ p: { x: 5, y: 0 }, angle: 540 }, { p: { x: 5, y: 0 }, angle: -720 }, null],
    [{ p: { x: 0, y: 5 }, angle: -720 }, { p: { x: 0, y: 5.2 }, angle: 0.01 }, {
        p1: { x: 0, y: 5 }, d1: { x: 1, y: 0 },
        p2: { x: 1, y: 5 }, d2: { x: 0.999999984, y: 0.000174532 },
        t: -1145.915578634, u: -1145.915596087
    }],
    [{ p: { x: -5, y: 0 }, angle: 45 }, { p: { x: 5.5, y: -0.4 }, angle: 1111 }, {
        p1: { x: -5, y: 0 }, d1: { x: 0.707106781, y: 0.707106781 },
        p2: { x: -4.292893218, y: 0.707106781 }, d2: { x: 0.8571673, y: 0.515038074 },
        t: -23.771170825, u: -31.859306888
    }],
    [{ p: { x: 0, y: -5 }, angle: -45 }, { p: { x: 0, y: 1 }, angle: -1 }, {
        p1: { x: 0, y: -5 }, d1: { x: 0.707106781, y: -0.707106781 },
        p2: { x: 0.707106781, y: -5.707106781 }, d2: { x: 0.999847695, y: -0.017452406 },
        t: -8.636023729, u: -6.107521146
    }],
    [{ p: { x: -2, y: 3 }, angle: 12.5 }, { p: { x: 2, y: -3 }, angle: 12.5 }, null],
    [{ p: { x: 2, y: -3 }, angle: 12.5 }, { p: { x: 2, y: -3 }, angle: 25 }, {
        p1: { x: 2, y: -3 }, d1: { x: 0.976296007, y: 0.216439613 },
        p2: { x: 2.976296007, y: -2.783560386 }, d2: { x: 0.906307787, y: 0.422618261 },
        t: 0, u: 0
    }],
    [{ p: { x: 2, y: 3 }, angle: 17.7 }, { p: { x: 0, y: 2 }, angle: 180 }, {
        p1: { x: 2, y: 3 }, d1: { x: 0.952661481, y: 0.30403306 },
        p2: { x: 2.952661481, y: 3.30403306 }, d2: { x: -1, y: 0 },
        t: -3.289115982, u: 1.133414104
    }],
    [{ p: { x: 3, y: 2 }, angle: -44.4 }, { p: { x: 0, y: -1 }, angle: -2 }, {
        p1: { x: 3, y: 2 }, d1: { x: 0.714472679, y: -0.69966334 },
        p2: { x: 3.714472679, y: 1.300336659 }, d2: { x: 0.999390827, y: -0.034899496 },
        t: 4.601601637, u: 6.291551295
    }],
    [{ p: { x: 5.5, y: 2.2 }, angle: 0.01 }, { p: { x: 0, y: 2 }, angle: 180 }, {
        p1: { x: 5.5, y: 2.2 }, d1: { x: 0.999999984, y: 0.000174532 },
        p2: { x: 6.499999984, y: 2.200174532 }, d2: { x: -1, y: 0 },
        t: -1145.915596078, u: 1140.415578625
    }],
    [{ p: { x: -2.2, y: -5.5 }, angle: -12 }, { p: { x: 7.7, y: -5.5 }, angle: 12 }, {
        p1: { x: -2.2, y: -5.5 }, d1: { x: 0.9781476, y: -0.20791169 },
        p2: { x: -1.221852399, y: -5.70791169 }, d2: { x: 0.9781476, y: 0.20791169 },
        t: 5.060585944, u: -5.060585944
    }],
    [{ p: { x: 5.5, y: -0.4 }, angle: 1111 }, { p: { x: 5.5, y: -6.2 }, angle: 1111 }, null],
    [{ p: { x: -0.4, y: 5.5 }, angle: -1111 }, { p: { x: 5.6, y: 5.5 }, angle: -1111 }, null]
])
.test('create intersection solution (%#): line1: %o, line2: %o, expected: %o',
    (l1, l2, expected) =>
    {
        const result = Line.createIntersectionSolution(l1, l2);
        if (expected === null)
            expect(result).toBeNull();
        else
        {
            expect(result).toBeDefined();
            expect(result).not.toBeNull();
            expect(result).not.toBe(l1.p);
            expect(result).not.toBe(l2.p);
            expect(result!.p1.x).toBeCloseTo(expected.p1.x, 8);
            expect(result!.p1.y).toBeCloseTo(expected.p1.y, 8);
            expect(result!.p2.x).toBeCloseTo(expected.p2.x, 8);
            expect(result!.p2.y).toBeCloseTo(expected.p2.y, 8);
            expect(result!.d1.x).toBeCloseTo(expected.d1.x, 8);
            expect(result!.d1.y).toBeCloseTo(expected.d1.y, 8);
            expect(result!.d2.x).toBeCloseTo(expected.d2.x, 8);
            expect(result!.d2.y).toBeCloseTo(expected.d2.y, 8);
            expect(result!.t).toBeCloseTo(expected.t, 8);
            expect(result!.u).toBeCloseTo(expected.u, 8);
        }
    }
);

each([
    [{ p: { x: 0, y: 0 }, angle: 0 }, { p: { x: 0, y: 0 }, angle: 0 }, null],
    [{ p: { x: 1, y: 0 }, angle: 1 }, { p: { x: 0, y: 0 }, angle: 0 }, { x: 1, y: 0 }],
    [{ p: { x: 0, y: 1 }, angle: -1 }, { p: { x: 0, y: 0 }, angle: 0 }, { x: 57.28996163, y: 0 }],
    [{ p: { x: -1, y: 0 }, angle: 2 }, { p: { x: 0, y: 0 }, angle: 0 }, { x: -1, y: 0 }],
    [{ p: { x: 0, y: -1 }, angle: -2 }, { p: { x: 0, y: 0 }, angle: 0 }, { x: -28.636253282, y: 0 }],
    [{ p: { x: 2, y: 0 }, angle: 90 }, { p: { x: 5, y: -7 }, angle: 90 }, null],
    [{ p: { x: 0, y: 2 }, angle: 180 }, { p: { x: 0, y: -2 }, angle: -180 }, null],
    [{ p: { x: -2, y: 0 }, angle: -270 }, { p: { x: -5, y: 0 }, angle: 45 }, { x: -2, y: 3 }],
    [{ p: { x: 0, y: -2 }, angle: 360 }, { p: { x: 2, y: 3 }, angle: 17.7 }, { x: -13.667070521, y: -2 }],
    [{ p: { x: 5, y: 0 }, angle: 540 }, { p: { x: 5, y: 0 }, angle: -720 }, null],
    [{ p: { x: 0, y: 5 }, angle: -720 }, { p: { x: 0, y: 5.2 }, angle: 0.01 }, { x: -1145.915578634, y: 5 }],
    [{ p: { x: -5, y: 0 }, angle: 45 }, { p: { x: 5.5, y: -0.4 }, angle: 1111 }, { x: -21.808756087, y: -16.808756087 }],
    [{ p: { x: 0, y: -5 }, angle: -45 }, { p: { x: 0, y: 1 }, angle: -1 }, { x: -6.106590941, y: 1.106590941 }],
    [{ p: { x: -2, y: 3 }, angle: 12.5 }, { p: { x: 2, y: -3 }, angle: 12.5 }, null],
    [{ p: { x: 2, y: -3 }, angle: 12.5 }, { p: { x: 2, y: -3 }, angle: 25 }, { x: 2, y: -3 }],
    [{ p: { x: 2, y: 3 }, angle: 17.7 }, { p: { x: 0, y: 2 }, angle: 180 }, { x: -1.133414104, y: 2 }],
    [{ p: { x: 3, y: 2 }, angle: -44.4 }, { p: { x: 0, y: -1 }, angle: -2 }, { x: 6.287718652, y: -1.219571973 }],
    [{ p: { x: 5.5, y: 2.2 }, angle: 0.01 }, { p: { x: 0, y: 2 }, angle: 180 }, { x: -1140.415578625, y: 2 }],
    [{ p: { x: -2.2, y: -5.5 }, angle: -12 }, { p: { x: 7.7, y: -5.5 }, angle: 12 }, { x: 2.75, y: -6.55215498 }],
    [{ p: { x: 5.5, y: -0.4 }, angle: 1111 }, { p: { x: 5.5, y: -6.2 }, angle: 1111 }, null],
    [{ p: { x: -0.4, y: 5.5 }, angle: -1111 }, { p: { x: 5.6, y: 5.5 }, angle: -1111 }, null]
])
.test('find intersection (%#): line1: %o, line2: %o, expected: %o',
    (l1, l2, expected) =>
    {
        const result = Line.findIntersection(l1, l2);
        if (expected === null)
            expect(result).toBeNull();
        else
        {
            expect(result).toBeDefined();
            expect(result).not.toBeNull();
            expect(result).not.toBe(l1.p);
            expect(result).not.toBe(l2.p);
            expect(result!.x).toBeCloseTo(expected.x, 8);
            expect(result!.y).toBeCloseTo(expected.y, 8);
        }
    }
);

each([
    [{ p: { x: 0, y: 0 }, angle: 0 }, { p: { x: 0, y: 0 }, angle: 0 }, null],
    [{ p: { x: 1, y: 0 }, angle: 1 }, { p: { x: 0, y: 0 }, angle: 0 }, { x: 1, y: 0 }],
    [{ p: { x: 0, y: 1 }, angle: -1 }, { p: { x: 0, y: 0 }, angle: 0 }, { x: 57.28996163, y: 0 }],
    [{ p: { x: -1, y: 0 }, angle: 2 }, { p: { x: 0, y: 0 }, angle: 0 }, null],
    [{ p: { x: 0, y: -1 }, angle: -2 }, { p: { x: 0, y: 0 }, angle: 0 }, null],
    [{ p: { x: 2, y: 0 }, angle: 90 }, { p: { x: 5, y: -7 }, angle: 90 }, null],
    [{ p: { x: 0, y: 2 }, angle: 180 }, { p: { x: 0, y: -2 }, angle: -180 }, null],
    [{ p: { x: -2, y: 0 }, angle: -270 }, { p: { x: -5, y: 0 }, angle: 45 }, { x: -2, y: 3 }],
    [{ p: { x: 0, y: -2 }, angle: 360 }, { p: { x: 2, y: 3 }, angle: 17.7 }, null],
    [{ p: { x: 5, y: 0 }, angle: 540 }, { p: { x: 5, y: 0 }, angle: -720 }, null],
    [{ p: { x: 0, y: 5 }, angle: -720 }, { p: { x: 0, y: 5.2 }, angle: -0.01 }, { x: 1145.915578622, y: 5 }],
    [{ p: { x: -5, y: 0 }, angle: 45 }, { p: { x: 5.5, y: -0.4 }, angle: 1111 }, null],
    [{ p: { x: 0, y: -5 }, angle: -45 }, { p: { x: 0, y: 1 }, angle: -1 }, null],
    [{ p: { x: -2, y: 3 }, angle: 12.5 }, { p: { x: 2, y: -3 }, angle: 12.5 }, null],
    [{ p: { x: 2, y: -3 }, angle: 12.5 }, { p: { x: 2, y: -3 }, angle: 25 }, { x: 2, y: -3 }],
    [{ p: { x: 2, y: 3 }, angle: 17.7 }, { p: { x: 0, y: 2 }, angle: 180 }, { x: -1.133414104, y: 2 }],
    [{ p: { x: 3, y: 2 }, angle: -44.4 }, { p: { x: 0, y: -1 }, angle: -2 }, { x: 6.287718652, y: -1.219571973 }],
    [{ p: { x: 5.5, y: 2.2 }, angle: 0.01 }, { p: { x: 0, y: 2 }, angle: 180 }, { x: -1140.415578625, y: 2 }],
    [{ p: { x: -2.2, y: -5.5 }, angle: -12 }, { p: { x: 7.7, y: -5.5 }, angle: 12 }, null],
    [{ p: { x: 5.5, y: -0.4 }, angle: 1111 }, { p: { x: 5.5, y: -6.2 }, angle: 1111 }, null],
    [{ p: { x: -0.4, y: 5.5 }, angle: -1111 }, { p: { x: 5.6, y: 5.5 }, angle: -1111 }, null]
])
.test('find ray intersection (%#): line: %o, ray: %o, expected: %o',
    (l, r, expected) =>
    {
        const result = Line.findRayIntersection(l, r);
        if (expected === null)
            expect(result).toBeNull();
        else
        {
            expect(result).toBeDefined();
            expect(result).not.toBeNull();
            expect(result).not.toBe(l.p);
            expect(result).not.toBe(r.p);
            expect(result!.x).toBeCloseTo(expected.x, 8);
            expect(result!.y).toBeCloseTo(expected.y, 8);
        }
    }
);

each([
    [{ p: { x: 0, y: 0 }, angle: 0 }, 0],
    [{ p: { x: 1, y: 0 }, angle: 1 }, 1],
    [{ p: { x: 0, y: 1 }, angle: -1 }, 359],
    [{ p: { x: -1, y: 0 }, angle: 2 }, 2],
    [{ p: { x: 0, y: -1 }, angle: -2 }, 358],
    [{ p: { x: 2, y: 0 }, angle: 90 }, 90],
    [{ p: { x: 0, y: 2 }, angle: 180 }, 180],
    [{ p: { x: -2, y: 0 }, angle: 270 }, 270],
    [{ p: { x: 0, y: -2 }, angle: 360 }, 0],
    [{ p: { x: 5, y: 0 }, angle: 540 }, 180],
    [{ p: { x: 0, y: 5 }, angle: -700 }, 20],
    [{ p: { x: -5, y: 0 }, angle: 0.01 }, 0.01],
    [{ p: { x: 0, y: -5 }, angle: -0 }, 0],
    [{ p: { x: -2, y: 3 }, angle: 17.2 }, 17.2],
    [{ p: { x: 2, y: -3 }, angle: 105 }, 105],
    [{ p: { x: 2, y: 3 }, angle: -360 }, 0],
    [{ p: { x: 3, y: 2 }, angle: 1111.5 }, 31.5],
    [{ p: { x: 5.5, y: 2.2 }, angle: -1111 }, 329],
    [{ p: { x: -2.2, y: -5.5 }, angle: 200.76 }, 200.76],
    [{ p: { x: 5.5, y: -0.4 }, angle: -200 }, 160],
    [{ p: { x: -0.4, y: 5.5 }, angle: 300.88 }, 300.88]
])
.test('normalize angle (%#): line: %o, expected angle: %f',
    (l, expectedAngle) =>
    {
        const x: number = l.p.x;
        const y: number = l.p.y;
        const p: Vector2 = l.p;
        const result = Line.normalizeAngle(l);
        expect(result).toBe(l);
        expect(result.p).toBe(p);
        expect(result.p.x).toBe(x);
        expect(result.p.y).toBe(y);
        expect(result.angle).toBeCloseTo(expectedAngle, 8);
    }
);

each([
    [{ p: { x: 0, y: 0 }, angle: 0 }, 0, 180],
    [{ p: { x: 1, y: 0 }, angle: 1 }, -1, 179],
    [{ p: { x: 0, y: 1 }, angle: -1 }, 0, 181],
    [{ p: { x: -1, y: 0 }, angle: 2 }, 1, 178],
    [{ p: { x: 0, y: -1 }, angle: -2 }, 0, 182],
    [{ p: { x: 2, y: 0 }, angle: 90 }, -2, 90],
    [{ p: { x: 0, y: 2 }, angle: 180 }, 0, 0],
    [{ p: { x: -2, y: 0 }, angle: 270 }, 2, -90],
    [{ p: { x: 0, y: -2 }, angle: 360 }, 0, -180],
    [{ p: { x: 5, y: 0 }, angle: 540 }, -5, -360],
    [{ p: { x: 0, y: 5 }, angle: -700 }, 0, 880],
    [{ p: { x: -5, y: 0 }, angle: 0.01 }, 5, 179.99],
    [{ p: { x: 0, y: -5 }, angle: 60 }, 0, 120],
    [{ p: { x: -2, y: 3 }, angle: 17.2 }, 2, 162.8],
    [{ p: { x: 2, y: -3 }, angle: 105 }, -2, 75],
    [{ p: { x: 2, y: 3 }, angle: 120 }, -2, 60],
    [{ p: { x: 3, y: 2 }, angle: 1111.5 }, -3, -931.5],
    [{ p: { x: 5.5, y: 2.2 }, angle: -1111 }, -5.5, 1291],
    [{ p: { x: -2.2, y: -5.5 }, angle: 200.76 }, 2.2, -20.76],
    [{ p: { x: 5.5, y: -0.4 }, angle: -200 }, -5.5, 380],
    [{ p: { x: -0.4, y: 5.5 }, angle: 300.88 }, 0.4, -120.88]
])
.test('mirror x (%#): line: %o, expected x: %f, expected angle: %f',
    (l, expectedX, expectedAngle) =>
    {
        const y: number = l.p.y;
        const p: Vector2 = l.p;
        const result = Line.mirrorX(l);
        expect(result).toBe(l);
        expect(result.p).toBe(p);
        expect(result.p.x).toBeCloseTo(expectedX, 8);
        expect(result.p.y).toBe(y);
        expect(result.angle).toBeCloseTo(expectedAngle, 8);
    }
);

each([
    [{ p: { x: 0, y: 0 }, angle: 0 }, 0, 0],
    [{ p: { x: 1, y: 0 }, angle: 1 }, 0, -1],
    [{ p: { x: 0, y: 1 }, angle: -1 }, -1, 1],
    [{ p: { x: -1, y: 0 }, angle: 2 }, 0, -2],
    [{ p: { x: 0, y: -1 }, angle: -2 }, 1, 2],
    [{ p: { x: 2, y: 0 }, angle: 90 }, 0, -90],
    [{ p: { x: 0, y: 2 }, angle: 180 }, -2, -180],
    [{ p: { x: -2, y: 0 }, angle: 270 }, 0, -270],
    [{ p: { x: 0, y: -2 }, angle: 360 }, 2, -360],
    [{ p: { x: 5, y: 0 }, angle: 540 }, 0, -540],
    [{ p: { x: 0, y: 5 }, angle: -700 }, -5, 700],
    [{ p: { x: -5, y: 0 }, angle: 0.01 }, 0, -0.01],
    [{ p: { x: 0, y: -5 }, angle: 60 }, 5, -60],
    [{ p: { x: -2, y: 3 }, angle: 17.2 }, -3, -17.2],
    [{ p: { x: 2, y: -3 }, angle: 105 }, 3, -105],
    [{ p: { x: 2, y: 3 }, angle: 120 }, -3, -120],
    [{ p: { x: 3, y: 2 }, angle: 1111.5 }, -2, -1111.5],
    [{ p: { x: 5.5, y: 2.2 }, angle: -1111 }, -2.2, 1111],
    [{ p: { x: -2.2, y: -5.5 }, angle: 200.76 }, 5.5, -200.76],
    [{ p: { x: 5.5, y: -0.4 }, angle: -200 }, 0.4, 200],
    [{ p: { x: -0.4, y: 5.5 }, angle: 300.88 }, -5.5, -300.88]
])
.test('mirror y (%#): line: %o, expected y: %f, expected angle: %f',
    (l, expectedY, expectedAngle) =>
    {
        const x: number = l.p.x;
        const p: Vector2 = l.p;
        const result = Line.mirrorY(l);
        expect(result).toBe(l);
        expect(result.p).toBe(p);
        expect(result.p.x).toBeCloseTo(x);
        expect(result.p.y).toBeCloseTo(expectedY, 8);
        expect(result.angle).toBeCloseTo(expectedAngle, 8);
    }
);

each([
    [{ p: { x: 0, y: 0 }, angle: 0 }, 0, 0, -180],
    [{ p: { x: 1, y: 0 }, angle: 1 }, -1, 0, -179],
    [{ p: { x: 0, y: 1 }, angle: -1 }, 0, -1, -181],
    [{ p: { x: -1, y: 0 }, angle: 2 }, 1, 0, -178],
    [{ p: { x: 0, y: -1 }, angle: -2 }, 0, 1, -182],
    [{ p: { x: 2, y: 0 }, angle: 90 }, -2, 0, -90],
    [{ p: { x: 0, y: 2 }, angle: 180 }, 0, -2, 0],
    [{ p: { x: -2, y: 0 }, angle: 270 }, 2, 0, 90],
    [{ p: { x: 0, y: -2 }, angle: 360 }, 0, 2, 180],
    [{ p: { x: 5, y: 0 }, angle: 540 }, -5, 0, 360],
    [{ p: { x: 0, y: 5 }, angle: -700 }, 0, -5, -880],
    [{ p: { x: -5, y: 0 }, angle: 0.01 }, 5, 0, -179.99],
    [{ p: { x: 0, y: -5 }, angle: 60 }, 0, 5, -120],
    [{ p: { x: -2, y: 3 }, angle: 17.2 }, 2, -3, -162.8],
    [{ p: { x: 2, y: -3 }, angle: 105 }, -2, 3, -75],
    [{ p: { x: 2, y: 3 }, angle: 120 }, -2, -3, -60],
    [{ p: { x: 3, y: 2 }, angle: 1111.5 }, -3, -2, 931.5],
    [{ p: { x: 5.5, y: 2.2 }, angle: -1111 }, -5.5, -2.2, -1291],
    [{ p: { x: -2.2, y: -5.5 }, angle: 200.76 }, 2.2, 5.5, 20.76],
    [{ p: { x: 5.5, y: -0.4 }, angle: -200 }, -5.5, 0.4, -380],
    [{ p: { x: -0.4, y: 5.5 }, angle: 300.88 }, 0.4, -5.5, 120.88]
])
.test('mirror (%#): line: %o, expected x: %f, expected y: %f, expected angle: %f',
    (l, expectedX, expectedY, expectedAngle) =>
    {
        const p: Vector2 = l.p;
        const result = Line.mirror(l);
        expect(result).toBe(l);
        expect(result.p).toBe(p);
        expect(result.p.x).toBeCloseTo(expectedX, 8);
        expect(result.p.y).toBeCloseTo(expectedY, 8);
        expect(result.angle).toBeCloseTo(expectedAngle, 8);
    }
);
