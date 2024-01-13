export interface CourseWeek {
    courseWeekId: number,
    courseDurationId: number,
    courseNameId: number,
    baseSchoolNameId: number,
    weekName: string,
    dateFrom: Date,
    dateTo: Date,
    remarks: string,
    status:number,
    menuPosition:number,
    isActive: boolean
}
