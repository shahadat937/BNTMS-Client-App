export interface SubjectMark {
    subjectMarkId: number,
    baseSchoolNameId: number,
    courseNameId:  number,
    bnaSemesterId:number,
    bnaSubjectCurriculumId:number,
    bnaSubjectNameId: number,
    courseModuleId: number,
    markTypeId: number,
    markCategoryId:number,
    passMark: number,
    mark: number,
    remarks:string,    
    status:number,
    menuPosition:number,
    isActive: boolean,
    courseModule:string;
    bnaSubjectName:string;
    courseName: string;
}