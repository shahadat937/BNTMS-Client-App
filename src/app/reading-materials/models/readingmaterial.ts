export interface ReadingMaterial {
      readingMaterialId: number;
      readingMaterialTitleId:number;
      readingMaterialTitle:string;
      courseNameId:number,
      courseName: string;
      documentName: string,
      baseSchoolNameId: number,
      documentTypeId: number,
      documentLink:string,
      showRightId:number,
      downloadRightId:number,
      isApproved:boolean,
      approvedDate:Date,
      approvedUser:string,
      status:number,
      menuPosition:number,
      isActive: boolean
}
