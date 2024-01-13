import { StudentAssignmentSubmit } from "./StudentAssignmentSubmit";
export interface IStudentAssignmentSubmitPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: StudentAssignmentSubmit[];
}

export class StudentAssignmentSubmitPagination implements IStudentAssignmentSubmitPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: StudentAssignmentSubmit[] = [];
}
