export interface Question {
    questionId: number;
    traineeId: number;  
    questionTypeId: number; 
    questionType: string; 
    answer: string;  
    additionalInformation: string;  
    menuPosition: number;
    isActive: boolean;
} 