export interface User {
    id: number;
    roleName: string;
    userName: string;
    firstName: string;
    lastName: string;
    password?: string;
    confirmPassword?: string;
    // isAnonymous: boolean; 
    // lastActivityDate: Date;
    
    branchId: string;
    firstLevel: string;
    secondLevel?: string;
    thirdLevel?: string;
    fourthLevel?: string;
    // winPassword: boolean;
    // userFullName: string;
    // approvedUser: boolean;
    phoneNumber : string;
    email : string;
    // securityQustion : string;
    // answer : string;
    // isFirstTime: boolean;
    // isLogin: number;
    // ipAddress: string;
    // hostName: string;
    // isActive: boolean;   

    traineeId:string,
    traineeName:string,
}