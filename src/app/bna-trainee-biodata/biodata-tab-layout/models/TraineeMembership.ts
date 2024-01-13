export interface TraineeMembership {    
    traineeMembershipId: number;
    traineeId: number;
    orgName: string;
    membershipTypeId: number;
    membershipType: string;
    briefAddress: string;
    appointment: string;
    durationFrom: Date;
    durationTo: Date;
    additionalInformation: string;
    menuPosition: number;
    isActive: boolean;
} 

