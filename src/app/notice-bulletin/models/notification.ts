export interface Notification {
      notificationId: number,
      sendBaseSchoolNameId: number,
      receivedBaseSchoolNameId: number,
      senderRole: string,
      receiverRole: string,
      notes: string,
      reciverSeenStatus:number,
      endDate:Date,
      isActive: boolean
}
