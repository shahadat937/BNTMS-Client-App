export interface Election {
    electionId: number;
    traineeId: number;    
    instituteName: string;
    electedId: number;
    elected: string;
    appointmentName: string;
    durationFrom: Date;
    durationTo: Date;
    additionalInformation: string;
    menuPosition: number;
    isActive: boolean;
} 