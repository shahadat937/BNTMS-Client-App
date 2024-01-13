export interface InstructorAssignment {
      instructorAssignmentId: number,
      courseInstructorId: number,
      courseDurationId: number,
      courseNameId: number,
      baseSchoolNameId: number,
      bnaSubjectNameId: number,
      assignmentTopic: string, 
      remarks: string,
      startDate: Date,
      endDate: Date,
      status: number,
      menuPosition: number,
      isActive: boolean
}
