export interface BNASubjectName {
    bnaSubjectNameId: number,
    bnaSemesterId: number,
    courseModuleId:  number,
    subjectCategoryId: number,
    bnaSubjectCurriculumId: number,
    courseNameId: number,
    courseName: string;
    courseTypeId:number,
    branchId:number,
    qExamTime:string,
    resultStatusId: number,
    subjectTypeId: number,
    kindOfSubjectId: number,
    baseSchoolNameId: number,
    subjectClassificationId: number,
    subjectName: string,
    subjectNameBangla: string,
    subjectShortName: string,
    subjectCode: string,
    totalMark: string,
    passMarkBna:string,
    // passMarkBNA:string,
    passMarkBup:string,
    classTestMark: string,
    assignmentMark: string,
    caseStudyMark:string,
    totalPeriod:string,    
    status:number,
    remarks:string,
    paperNo:string;
    menuPosition:number;
    isActive: boolean
}