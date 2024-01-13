import { formatDate } from '@angular/common';
export class Calendar {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    details: string;
    courseTitle: string;
    durationForm: string;
    durationTo: string;
    noOfCandidates: string;
    professional: string;
    location:string;
    nbcd: string;
    remark: string;
    constructor(calendar) {
        {
            this.id = calendar.id || this.getRandomID();
            this.title = calendar.title || '';
            this.courseTitle = calendar.courseTitle;
            this.durationForm = calendar.durationForm;
            this.durationTo = calendar.durationTo;
            this.noOfCandidates = calendar.noOfCandidates;
            this.professional = calendar.professional;
            this.nbcd = calendar.nbcd;
            this.location = calendar.location;
            this.remark = calendar.remark;
            this.startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
            this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
            this.details = calendar.details || '';
        }
    }
    public getRandomID(): string {
        const S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
    }
}
