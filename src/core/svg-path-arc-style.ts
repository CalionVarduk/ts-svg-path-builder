/** Specifies svg path arc node style. */
export enum SvgPathArcStyle {
    /** LargeArcFlag: `false`, SweepFlag: `false` */
    CccwLt180 = 0,
    /** LargeArcFlag: `true`, SweepFlag: `false` */
    CccwGt180 = 1,
    /** LargeArcFlag: `false`, SweepFlag: `true` */
    CcwLt180 = 2,
    /** LargeArcFlag: `true`, SweepFlag: `true` */
    CcwGt180 = 3
}
