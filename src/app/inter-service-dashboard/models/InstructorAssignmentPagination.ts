import { InstructorAssignment } from "./InstructorAssignment";

export interface IInstructorAssignmentPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: InstructorAssignment[];
}

export class InstructorAssignmentPagination implements IInstructorAssignmentPagination {
    totalPages:number;
    itemsFrom:number;
    itemsTo:number;
    totalItemsCount:number;
    items: InstructorAssignment[] = [];


}
