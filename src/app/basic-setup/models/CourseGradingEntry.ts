export interface CourseGradingEntry {
    courseGradingEntryId: number;
    baseSchoolNameId:number;
    courseNameId:number;
    assessmentId:number;
    markObtained: number;
    grade: string;
    markFrom: string;
    markTo: string;
    isActive: boolean;
}