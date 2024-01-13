export interface SubjectMark {
    subjectMarkId: number,
    baseSchoolNameId: number,
    courseNameId:  number,
    courseName: string;
    bnaSubjectNameId: number,
    branchId:number,
    saylorBranchId:number,
    saylorSubBranchId:number,
    courseModuleId: number,
    markTypeId: number,
    passMark: number,
    mark: number,
    remarks:string,    
    status:number,
    menuPosition:number,
    isActive: boolean
}