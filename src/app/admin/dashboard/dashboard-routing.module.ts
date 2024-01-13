import { DashboardComponent as studentDashboard } from './../../student/dashboard/dashboard.component';
import { DashboardComponent as teacherDashboard } from './../../teacher/dashboard/dashboard.component';
import { DashboardComponent as schoolDashboard } from './../../school/dashboard/dashboard.component';
import { DashboardComponent as bnaDashboard } from './../../naval-academy/dashboard/dashboard.component';
import { DashboardComponent as foreigntrainingdashboard } from './../../foreigntraining-dashboard/dashboard/dashboard.component';
import { DashboardComponent as interServiceDashboard } from './../../inter-service-dashboard/dashboard/dashboard.component';
import { ViewSubjectListByModuleComponent as subjectbymodule } from './../../student/viewsubjectbymodule-list/viewsubjectbymodule-list.component';  
import { CourseInstructorListComponent as subjectmoduleinstructor } from './../../student/courseinstructor-list/courseinstructor-list.component';  
import { ViewSubjectMarkListByModuleComponent as subjectMarkByModule } from './../../student/viewsubjectmarkbymodule-list/viewsubjectmarkbymodule-list.component';  
import { ExamRoutineListComponent as ExamRoutineList } from './../../student/examroutine-list/examroutine-list.component';  
import { SubjectModuleListComponent as subjectModule } from './../../student/subjectmodule-list/subjectmodule-list.component';
import { WeeklyProgramListComponent as WeeklyProgram } from './../../student/weeklyprogram-list/weeklyprogram-list.component';
import { ReadingMaterialListComponent as ReadingMaterialList } from './../../student/readingmaterial-list/readingmaterial-list.component';
import { WeeklyAttendanceListComponent as WeeklyAttendanceList } from './../../student/weeklyattendance-list/weeklyattendance-list.component';
import { TraineeMarkSheetComponent as TraineeMarkSheet } from './../../student/traineemarksheet-list/traineemarksheet-list.component';
import { TeacherEvaluationListComponent as TeacherEvaluationList } from './../../student/teacherevaluation-list/teacherevaluation-list.component';
import { AssignmentListComponent as StudentAssignmentList } from './../../student/assignment-list/assignment-list.component';
import { TeacherSubjectEvaluationComponent as TeacherSubjectEvaluation } from './../../student/teachersubjectevaluation-list/teachersubjectevaluation-list.component';
import { SyllabusbySubjectListComponent  } from './syllabusbysubject-list/syllabusbysubject-list.component';
import { TraineeAbsentDetailListComponent as traineeAttendanceDetails } from './../../school/traineeabsentdetail-list/traineeabsentdetail-list.component';  
import { CountedOfficersListComponent as traineOfficerListBySchool } from './../../school/countedofficers-list/countedofficers-list.component';
import { RoutineByCourseListComponent as RoutineByCourseList } from './../../school/routinebycourse-list/routinebycourse-list.component';
import { MaterialByCourseListComponent as MaterialByCourseList } from './../../school/materialbycourse-list/materialbycourse-list.component';
import { InstructorByCourseListComponent as InstructorByCourseList } from './../../school/instructorbycourse-list/instructorbycourse-list.component';
import { AttendanceByCourseListComponent as AttendanceByCourseList } from './../../school/attendancebycourse-list/attendancebycourse-list.component';
import { AttendanceByRoutineListComponent as AttendanceByRoutineList } from './../../school/attendancebyroutine-list/attendancebyroutine-list.component';
import { SchoolNoticeListComponent as SchoolNotice } from './../../school/schoolnotice-list/schoolnotice-list.component';
import { SchoolEventListComponent as SchoolEvent } from './../../school/schoolevent-list/schoolevent-list.component';

import { totaltraineeListComponent as InterServiceTraineeList } from './../../inter-service-dashboard/totaltrainee-list/totaltrainee-list.component';
import { upcomingcourseListComponent as upcomingcourseList } from './../../inter-service-dashboard/upcomingcourse-list/upcomingcourse-list.component';


import { BudgetInfoListComponent as BudgetInfoList } from './../../foreigntraining-dashboard/budgetinfo-list/budgetinfo-list.component';
import { ForeigncourseListComponent as ForeigncourseList } from './../../foreigntraining-dashboard/foreigncourse-list/foreigncourse-list.component';
import { PaymentScheduleListComponent as PaymentScheduleList } from './../../foreigntraining-dashboard/paymentschedule-list/paymentschedule-list.component';
import { RemittanceNotificationListComponent as RemittanceNotification } from './../../foreigntraining-dashboard/remittancenotification-list/remittancenotification-list.component';
import { ReleventStatusInfoListComponent as ReleventStatusInfoList } from './../../foreigntraining-dashboard/releventstatusinfo-list/releventstatusinfo-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ViewRunningCourseComponent } from './view-runningcourse/view-runningcourse.component';
import { LocalcourseListComponent } from './localcourse/localcourse-list/localcourse-list.component';
import { ViewSubjectListBySchoolAndCourseComponent } from './viewsubjectbyschool-list/viewsubjectbyschool-list.component';
import { ViewSubjectMarkListBySubjectComponent } from './viewsubjectmarkbysubject-list/viewsubjectmarkbysubject-list.component';
import { TraineeNominationListComponent } from './traineenomination-list/traineenomination-list.component';
import { CourseInstructorListComponent } from './courseinstructor-list/courseinstructor-list.component';
import { ClassRoutineListComponent } from './classroutine-list/classroutine-list.component';
import { SubjectInstructorListComponent } from './subjectinstructor-list/subjectinstructor-list.component';
import { ExamInstructorListComponent } from './examinstructor-list/examinstructor-list.component';
import { CountedOfficersListComponent } from './countedofficers-list/countedofficers-list.component';
import { RunningCourseListComponent } from './runningcourse-list/runningcourse-list.component';
import { UpcomingCourseListComponent } from './upcomingcourse-list/upcomingcourse-list.component';
import {RunningCoursesListComponent} from './../../school/runningcourses-list/runningcourses-list.component'
import { UpcomingCoursesListComponent } from './../../school/upcomingcourses-list/upcomingcourses-list.component';
import { ReadingMateriallistDashboardComponent } from './../../school/readingmateriallistdashboard/readingmateriallistdashboard.component';
import {WeeklyProgramDashboardComponent} from './../../school/weeklyprogramdashboard/weeklyprogramdashboard.component';
import {DailyprogramlistDashboardComponent} from './../../school/dailyprogramlist-dashboard/dailyprogramlist-dashboard.component'
import {AbsentlistDashboardComponent} from './../../school/absentlist-dashboard/absentlist-dashboard.component'
import { ExamStatusBySubjectListComponent as ExamStatusBySubjectList } from '../../school/examstatusbysubject-list/examstatusbysubject-list.component';
import {CourseInstructorListDashboardComponent} from './../../school/courseinstructorlist-dashboard/courseinstructorlist-dashboard.component'
import{PendingExamEvaluationlistDashboardComponent} from './../../school/pendingexamevaluationlist-dashboard/pendingexamevaluationlist-dashboard.component'
import {ReadingMaterialListTeacherDashboardComponent} from './../../teacher/readingmateriallistteacherdashboard/readingmateriallistteacherdashboard.component'
import {WeeklyRoutineTeacherDashboard} from './../../teacher/weeklyroutineteacherdashboard/weeklyroutineteacherdashboard.component'
import {InstructorCourseForClassComponent as instructorcourselistforroutine} from './../../teacher/instructorcourseforclass-list/instructorcourseforclass-list.component';
import {InstructorRoutinebyCourseComponent as instructorroutinebycourselist} from './../../teacher/instructorroutinebycourse-list/instructorroutinebycourse-list.component';
import { AssignedSubjectListComponent as assignedsubject } from '../../teacher/assignedsubject-list/assignedsubject-list.component'
import { AssignedSubjectMarkListComponent as assignedsubjectmark } from '../../teacher/assignedsubjectmark-list/assignedsubjectmark-list.component'
import { InstructorExamComponent as InstructorExamList } from '../../teacher/instructorexam-list/instructorexam-list.component';
import {AssignmentListComponent} from '../../teacher/assignment/assignment-list/assignment-list.component'
import {SubmittedAssignmentComponent as StudentSubmittedAssignment} from '../../teacher/assignment/submittedassignment-list/submittedassignment-list.component';
import {NewInstructorAssignmentComponent} from '../../teacher/assignment/new-instructorassignment/new-instructorassignment.component'
import {CentralExamComponent as centralExamMarkEntry} from '../../teacher/centralexam-list/centralexam-list.component';
import {NewQExamMarkComponent as NewCentralExamMarkEntry} from '../../teacher/qexammark/new-qexammark/new-qexammark.component';
import {QExamMarkApproveComponent as FinalCentralExamMarkEntry} from '../../teacher/qexammark/qexammark-approve/qexammark-approve.component';
import {NewStudentAssignmentComponent} from '../../student/new-studentassignment/new-studentassignment.component'
import { NewPasswordChangeComponent } from 'src/app/instructor/passwordchange/new-passwordchange.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { CoursebySchoolListComponent } from './coursebyschool-list/coursebyschool-list.component';
import { NewInterserviceReportComponent as studentInterserviceReportSubmit } from '../../inter-service/Interservicereport/new-Interservicereport/new-Interservicereport.component';
import { UpdateTraineeNominationComponent as UpdateInterServiceTraineeNomination } from '../../inter-service-dashboard/update-traineenomination/update-traineenomination.component';
import { JcoExamListComponent as JcoExamListForInterserviceDashboard } from '../../inter-service-dashboard/jcoexam-list/jcoexam-list.component';
import { TraineeNominationListComponent as JcoExamTraineeNominationList } from '../../inter-service-dashboard/traineenomination-list/traineenomination-list.component';
import { ViewSubjectListByJCOsComponent as ViewSubjectListByJCOsForDashboard } from '../../jcos-training/jcostraining/viewsubjectbyjcos-list/viewsubjectbyjcos-list.component';
import { InstallmentListComponent as InstallmentList } from '../../student/installment-list/installment-list.component';
import { CourseWeekByDurationListComponent } from './courseweekbyduration-list/courseweekbyduration-list.component';
import { CentralExamCourseListComponent } from './centralexamcourse-list/centralexamcourse-list.component';
import { MarkListByCourseComponent } from '../../course-management/localcourse/marklistbycourse-list/marklistbycourse-list.component';
import { ViewSubjectListByStaffCollageComponent } from '../../staff-collage/staffcollagecourse/viewsubjectbystaffcollage-list/viewsubjectbystaffcollage-list.component';
import { CentralExamNominatedListComponent } from './centralexamnominated-list/centralexamnominated-list.component';
import { JcoResultBySubjectListComponent as JcoResultBySubjectList} from '../../student/jcoresultbysubject-list/jcoresultbysubject-list.component';
import { ViewSubjectResultJcosComponent as ViewSubjectResultJcos} from '../../jcos-training/jcostraining/viewsubjectresultjcos-list/viewsubjectresultjcos-list.component';
import { ViewReadingMaterialComponent as ViewReadingMaterial} from '../../student/view-readingmaterial/view-readingmaterial.component';
import { ViewCourseListBySchoolComponent as ViewCourseListBySchool} from '../../school/view-courselistbyschool/view-courselistbyschool.component';
import {ViewObtainMarkListComponent} from './viewobtainmarklist/viewobtainmark-list.component';
import {TraineeAttendanceListComponent} from './traineeattendance-list/traineeattendance-list.component';
import {ViewTraineeCourseProfileListComponent} from './view-traineecourseprofile/view-traineecourseprofile-list.component';
import {UpdateCourseDurationComponent} from './coursedurationnbcd/update-courseduration.component';
import {TraineePerformanceDetailsListComponent} from './trainee-performancedetails/trainee-performancedetails.component';
import {ViewCourseDetailsComponent} from './view-coursedetails/view-coursedetails.component';
import {TraineeCertificateListComponent} from './trainee-certificate/trainee-certificate.component';
import {UpcomingCoursesNbcdListComponent} from './../../school/upcomingcoursesnbcd-list/upcomingcoursesnbcd-list.component'
import {NewSchoolNoticeComponent} from './../../notice-bulletin/school-notice/new-notice/new-school-notice.component';
import {ViewCourseCreateNbcdComponent} from './../dashboard/view-coursecreatenbcd/view-coursecreatenbcd.component';
import { SchoolHistoryComponent } from './school-history/school-history.component';
import { JstiTraineeDetailsComponent } from './jsti-trainee-details/jsti-trainee-details.component';

import { CourseOutlineListComponent } from './courseoutline-list/courseoutline-list.component';

import { NewAssessmentMarkComponent } from '../../student/new-assessmentmark/new-assessmentmark.component';

import {RoutineSoftcopyTraineeComponent} from '../dashboard/routinesoftcopytrainee/routinesoftcopytrainee.component'

import {CombinedBnaRoutineListComponent} from '../../school/combinedbnaroutine-list/combinedbnaroutine-list.component';
import { CentralExamListComponent } from 'src/app/central-exam/centralexam/centralexam-list/centralexam-list.component';
import { NewForeignTrainingCourseReportComponent } from 'src/app/foreign-training/foreigntrainingcoursereport/new-foreigntrainingcoursereport/new-foreigntrainingcoursereport.component';
import { RunningCoursForeignRraineecountListComponent } from 'src/app/foreign-training/runningcoursforeigntraineecount/runningcoursforeigntraineecount-list.component';
import { RunningCourseForeignRraineeUpcomingListComponent } from 'src/app/foreign-training/runningcourseforeigntraineeupcoming/runningcourseforeigntraineeupcoming-list.component';
import { RunningCoursForeignRraineecountDetailsListComponent } from 'src/app/foreign-training/runningcoursforeigntraineecountdetails/runningcoursforeigntraineecountdetails-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'localcourse',
    component: LocalcourseListComponent,
  },
  {
    path: 'routinesoftcopytrainee-list',
    component: RoutineSoftcopyTraineeComponent,
  },
  
  {
    path: 'school-list',
    component: SchoolListComponent,
  },
  {
    path: 'coursebyschool-list/:baseSchoolNameId',
    component: CoursebySchoolListComponent,
  },

  {
    path: 'staffcollagesubject-list/:courseNameId/:mainDb',
    component: ViewSubjectListByStaffCollageComponent,
  },
  {
    path: 'view-centralexamcourse/:courseNameId',
    component: CentralExamCourseListComponent,
  },
  
  {
    path: 'view-staffcollegemarksheet/:courseDurationId/:courseNameId/:mainDb',
    component: MarkListByCourseComponent,
  },
  
  {
    path: 'view-jcoresultbysubject/:courseDurationId/:bnaSubjectNameId/:resultStatus',
    component: JcoResultBySubjectList,
  },
  
  {
    path: 'view-jcosexammarksheet/:courseDurationId/:courseNameId/:mainDb',
    component: MarkListByCourseComponent,
  },
  {
    path: 'view-subjectresultjcos/:courseDurationId',
    component: ViewSubjectResultJcos,
  },
  
  {
    path: 'view-centralexamtraineelist/:courseDurationId/:courseNameId/:mainDb',
    component: CentralExamNominatedListComponent,
  },

  {
    path: 'ViewSubjectListByJCOs/:backType/:courseDurationId',
    component: ViewSubjectListByJCOsForDashboard,
  },
  {
    path: 'jcoexamnominated-list/:courseDurationId',
    component: JcoExamTraineeNominationList,
  },
  {
    path: 'Installment-list/:courseDurationId',
    component: InstallmentList,
  },
  
  {
    path: 'update-interservicetraineestate/:traineeNominationId',
    component: UpdateInterServiceTraineeNomination,
  },
  { 
    path: 'view-subjectbyschoolandcourse/:baseSchoolNameId/:courseNameId/:courseDurationId/:courseTypeId', 
    component: ViewSubjectListBySchoolAndCourseComponent 
  },
  
  { 
    path: 'view-syllabus/:traineeId/:baseSchoolNameId/:courseNameId/:courseDurationId/:traineeDb', 
    component: ViewSubjectListBySchoolAndCourseComponent 
  },
  { 
    path: 'view-syllabusfromschool/:baseSchoolNameId/:courseNameId/:courseDurationId/:schoolDb', 
    component: ViewSubjectListBySchoolAndCourseComponent 
  },

  { 
    path: 'viewobtainmark/:baseSchoolNameId/:courseDurationId/:traineeId', 
    component: ViewObtainMarkListComponent 
  },
  { 
    path: 'trainee-performancedetails/:baseSchoolNameId/:courseDurationId/:traineeId', 
    component: TraineePerformanceDetailsListComponent 
  },
  { 
    path: 'school-history', 
    component: SchoolHistoryComponent 
  },

  { 
    path: 'trainee-certificate/:baseSchoolNameId/:courseDurationId/:traineeId', 
    component: TraineeCertificateListComponent 
  },

  { 
    path: 'view-traineecourseprofile/:traineeId', 
    component: ViewTraineeCourseProfileListComponent 
  },
  
  { 
    path: 'view-subjectlist/:baseSchoolNameId/:courseNameId/:courseListStatus', 
    component: ViewSubjectListBySchoolAndCourseComponent 
  },
  { 
    path: 'view-examstatusbysubjectlist/:baseSchoolNameId/:courseNameId/:courseDurationId', 
    component: ExamStatusBySubjectList 
  },
  { 
    path: 'view-examstatusbysubject/:baseSchoolNameId/:courseNameId/:courseDurationId/:mainDb', 
    component: ExamStatusBySubjectList 
  },
  { 
    path: 'view-examstatusbysubjectlist/:courseDurationId', 
    component: ExamStatusBySubjectList 
  },

  { 
    path: 'view-subjectbyschoolandcourse/:baseSchoolNameId/:courseNameId/:courseType1/:courseType2/:courseType3', 
    component: ViewSubjectListBySchoolAndCourseComponent 
  }, 

  { 
    path: 'view-schoolnotice/:baseSchoolNameId', 
    component: SchoolNotice 
  },
  { 
    path: 'view-schoolevent/:baseSchoolNameId', 
    component: SchoolEvent 
  },
  
  { 
    path: 'view-subjectbyschoolandcourse/:baseSchoolNameId/:courseNameId', 
    component: ViewSubjectListBySchoolAndCourseComponent 
  }, 
  { 
    path: 'view-subjectbyschoolandcourse/:baseSchoolNameId/:courseNameId/:courseType/:courseType1', 
    component: ViewSubjectListBySchoolAndCourseComponent 
  }, 
  { 
    path: 'view-subjectbyschoolandcourse/:baseSchoolNameId/:courseNameId', 
    component: ViewSubjectListBySchoolAndCourseComponent 
  }, 

  { 
    path: 'view-subjectbyschoolandcourse/:baseSchoolNameId/:courseNameId', 
    component: ViewSubjectListBySchoolAndCourseComponent 
  }, 

 { 
    path: 'readingmateriallist-dashboard/:baseSchoolNameId', 
    component: ReadingMateriallistDashboardComponent 
  }, 

 { 
    path: 'view-courselistbyschool/:baseSchoolNameId', 
    component: ViewCourseListBySchool 
  }, 

  { 
    path: 'readingmateriallistinstructor/:traineeId/:baseSchoolNameId', 
    component: ReadingMaterialListTeacherDashboardComponent 
  }, 

  { 
    path: 'assignedsubject-list/:traineeId', 
    component: assignedsubject 
  }, 

  { 
    path: 'assignment-list/:traineeId', 
    component: AssignmentListComponent 
  }, 
  { 
    path: 'view-readingmaterial', 
    component: ViewReadingMaterial 
  }, 
  { 
    path: 'studentassignment-list/:traineeId/:baseSchoolNameId/:courseNameId/:courseDurationId', 
    component: StudentAssignmentList 
  }, 
  
  { 
    path: 'add-instructorassignment/:traineeId/:baseSchoolNameId/:courseNameId/:courseDurationId/:bnaSubjectNameId', 
    component: NewInstructorAssignmentComponent 
  },

  { 
    path: 'view-submittedassignment/:traineeId/:instructorAssignmentId/:baseSchoolNameId/:courseNameId/:courseDurationId/:bnaSubjectNameId', 
    component: StudentSubmittedAssignment 
  },
  // row.baseSchoolNameId,row.courseDurationId,row.courseNameId,row.bnaSubjectNameId44787,69,11
  { 
    path: 'add-studentassignment/:traineeId/:instructorId/:courseInstructorId/:instructorAssignmentId/:baseSchoolNameId/:courseDurationId/:courseNameId/:bnaSubjectNameId', 
    component: NewStudentAssignmentComponent 
  },


  { 
    path: 'assignedsubjectmark-list/:traineeId/:baseSchoolNameId/:courseNameId/:courseDurationId/:bnaSubjectNameId', 
    component: assignedsubjectmark 
  },

  { 
    path: 'view-syllabusbySubject/:traineeId/:baseSchoolNameId/:courseNameId/:bnaSubjectNameId', 
    component: SyllabusbySubjectListComponent
  },

  { 
    path: 'view-syllabusbySubject/:traineeId/:baseSchoolNameId/:courseNameId/:courseDurationId/:bnaSubjectNameId', 
    component: SyllabusbySubjectListComponent
  },
  

  { 
    path: 'weeklyroutineinstructor/:traineeId', 
    component: WeeklyRoutineTeacherDashboard 
  }, 
  

  { 
    path: 'weeklyprogramdashboard/:baseSchoolNameId', 
    component: WeeklyProgramDashboardComponent 
  },
  { 
    path: 'instructorcourselistforroutine/:traineeId', 
    component: instructorcourselistforroutine 
  },
  { 
    path: 'instructorroutinebycourse-list/:baseSchoolNameId/:courseNameId/:courseDurationId/:bnaSubjectNameId', 
    component: instructorroutinebycourselist 
  },
  { 
    path: 'examroutinelist/:courseDurationId', 
    component: ExamRoutineList 
  }, 

  { 
    path: 'dailyprogramlistdashboard/:baseSchoolNameId', 
    component: DailyprogramlistDashboardComponent 
  }, 
  { 
    path: 'absentlistdashboard/:baseSchoolNameId', 
    component: AbsentlistDashboardComponent 
  }, 
  
  { 
    path: 'courseinstructorlist/:baseSchoolNameId', 
    component: CourseInstructorListDashboardComponent 
  }, 
  

  // { 
  //   path: 'view-subjectbyschoolandcourse/:baseSchoolNameId/:courseNameId/:dbType/:dbType1', 
  //   component: ViewSubjectListBySchoolAndCourseComponent 
  // }, 

  { 
    path: 'view-runningcourses/:courseTypeId', 
    component: RunningCourseListComponent 
  },
  
  { 
    path: 'view-subjectmarksbysubject/:baseSchoolNameId/:courseNameId/:courseDurationId/:bnaSubjectNameId', 
    component: ViewSubjectMarkListBySubjectComponent 
  },
  { 
    path: 'view-subjectmarksbycourse/:baseSchoolNameId/:courseNameId/:bnaSubjectNameId/:courseListStatus', 
    component: ViewSubjectMarkListBySubjectComponent 
  },

  { 
    path: 'view-instructorsubjectmarks/:traineeId/:baseSchoolNameId/:courseNameId/:courseDurationId/:bnaSubjectNameId', 
    component: ViewSubjectMarkListBySubjectComponent 
  },

  { 
    path: 'view-traineemarksheet/:traineeId/:courseDurationId', 
    component: TraineeMarkSheet 
  },
  
  { 
    path: 'teacherevaluation-list/:traineeId/:baseSchoolNameId/:courseNameId/:courseDurationId', 
    component: TeacherEvaluationList 
  },

  { 
    path: 'view-teacherevaluationbysubject/:traineeId/:baseSchoolNameId/:courseNameId/:courseDurationId/:bnaSubjectNameId', 
    component: TeacherSubjectEvaluation 
  },
  
  { 
    path: 'view-examinstructor/:baseSchoolNameId/:courseNameId/:courseTypeId', 
    component: ExamInstructorListComponent 
  },
  // { 
  //   path: 'view-examinstructor/:baseSchoolNameId/:courseNameId/:schooldash', 
  //   component: ExamInstructorListComponent 
  // },
  { 
    path: 'view-examinstructor/:baseSchoolNameId/:courseNameId', 
    component: ExamInstructorListComponent 
  },
  { 
    path: 'view-examinstructor/:baseSchoolNameId/:courseNameId/:dbType/:dbType1', 
    component: ExamInstructorListComponent 
  },

  { 
    path: 'view-officerlist/:traineeStatusId', 
    component: CountedOfficersListComponent 
  },
  { 
    path: 'view-totaltraineelist', 
    component: CountedOfficersListComponent 
  },
  { 
    path: 'view-totaltraineelist/:dbType', 
    component: CountedOfficersListComponent 
  },
  { 
    path: 'view-totaltraineelistbyschool/:schoolId', 
    component: traineOfficerListBySchool 
  },
  { 
    path: 'view-totalforeigntraineelistbyschool/:schoolId/:officerTypeId', 
    component: traineOfficerListBySchool 
  },
  { 
    path: 'view-officerlistbyschool/:schoolId/:traineeStatusId', 
    component: traineOfficerListBySchool 
  },
  { 
    path: 'view-routinebycourse/:baseSchoolNameId/:courseNameId/:courseDurationId', 
    component: RoutineByCourseList 
  },
  { 
    path: 'view-combinedbnaroutine', 
    component: CombinedBnaRoutineListComponent 
  },
  { 
    path: 'view-routinebycourse/:baseSchoolNameId/:courseNameId/:courseDurationId/:courseTypeId', 
    component: RoutineByCourseList 
  },
  { 
    path: 'view-traineeattendance/:traineeId/:courseDurationId', 
    component: TraineeAttendanceListComponent 
  },
  { 
    path: 'view-subjectmodule/:courseNameId', 
    component: subjectModule 
  },
  { 
    path: 'view-weeklyprogram/:baseSchoolNameId/:courseNameId/:courseDurationId/:courseSectionId', 
    component: RoutineByCourseList 
  },

  { 
    path: 'view-interservicereportsubmit/:traineeId/:courseNameId/:courseDurationId', 
    component: studentInterserviceReportSubmit 
  },
  { 
    path: 'view-foreigntrainingreportsubmit/:traineeId/:courseNameId/:courseDurationId', 
    component: NewForeignTrainingCourseReportComponent 
  },
  { 
    path: 'view-weeklyattendance/:traineeId/:courseDurationId', 
    component: WeeklyAttendanceList
  },
  
  
  { 
    path: 'view-instructorbycourse/:courseNameId/:baseSchoolNameId/:courseDurationId', 
    component: InstructorByCourseList 
  },
  
  { 
    path: 'runningcourses-list/:baseSchoolNameId', 
    component: RunningCoursesListComponent  
  },

  { 
    path: 'upcomingcourses-list/:baseSchoolNameId', 
    component: UpcomingCoursesListComponent  
  },
  
  { 
    path: 'upcomingcoursesnbcd-list/:baseSchoolNameId', 
    component: UpcomingCoursesNbcdListComponent  
  },

  { 
    path: 'view-coursemateriallist/:baseSchoolNameId/:courseNameId', 
    component: ReadingMaterialList 
  },
  
  
  { 
    path: 'view-readingmateriallist/:documentTypeId',
    component: ReadingMaterialList 
  },
  
  { 
    path: 'view-routinebycourse/:baseSchoolNameId/:courseNameId/:dbType', 
    component: RoutineByCourseList 
  },

  // { 
  //   path: 'view-routinebycourse/:baseSchoolNameId/:courseNameId/:courseType', 
  //   component: RoutineByCourseList 
  // },

  { 
    path: 'view-materialbycourse/:baseSchoolNameId/:courseNameId', 
    component: MaterialByCourseList
  },
  { 
    path: 'view-courseinstructors/:baseSchoolNameId/:bnaSubjectNameId/:courseModuleId/:courseNameId/:courseDurationId/:courseSectionId', 
    component: CourseInstructorListComponent 
  },
  { 
    path: 'pendingexamevaluation-list/:baseSchoolNameId', 
    component: PendingExamEvaluationlistDashboardComponent 
  },
  { 
    path: 'instructorexam-list/:traineeId/:courseDurationId', 
    component: InstructorExamList 
  },
  
  { 
    path: 'centralexammarkentry-list/:traineeId/:courseTypeId/:courseNameId', 
    component: centralExamMarkEntry 
  },
  
  { 
    path: 'qexammarkentry-list/:traineeId/:courseDurationId/:courseNameId/:courseTypeId/:classRoutineId/:branchId/:bnaSubjectNameId', 
    component: NewCentralExamMarkEntry 
  },

  { 
    path: 'submitqexammark-list/:traineeId/:courseDurationId/:courseNameId/:courseTypeId/:classRoutineId/:branchId/:bnaSubjectNameId', 
    component: FinalCentralExamMarkEntry 
  },
  
  { 
    path: 'jcoexammarkentry-list/:traineeId/:courseDurationId/:courseNameId/:courseTypeId/:saylorBranchId/:saylorSubBranchId/:classRoutineId/:bnaSubjectNameId', 
    component: NewCentralExamMarkEntry 
  },

  { 
    path: 'submitjcoexammark-list/:traineeId/:courseDurationId/:courseNameId/:courseTypeId/:saylorBranchId/:saylorSubBranchId/:classRoutineId/:bnaSubjectNameId', 
    component: FinalCentralExamMarkEntry 
  },

  { 
    path: 'staffexammarkentry-list/:traineeId/:courseDurationId/:courseNameId/:courseTypeId/:classRoutineId/:bnaSubjectNameId', 
    component: NewCentralExamMarkEntry 
  },
  
  { 
    path: 'submitstaffexammark-list/:traineeId/:courseDurationId/:courseNameId/:courseTypeId/:classRoutineId/:bnaSubjectNameId', 
    component: FinalCentralExamMarkEntry 
  },
  
  { 
    path: 'localexammarkentry-list/:traineeId/:baseSchoolNameId/:courseDurationId/:courseNameId/:courseTypeId/:classRoutineId/:bnaSubjectNameId/:courseSectionId/:subjectMarkId/:markTypeId', 
    component: NewCentralExamMarkEntry 
  },

  { 
    path: 'submitlocalexammark-list/:traineeId/:baseSchoolNameId/:courseDurationId/:courseNameId/:courseTypeId/:classRoutineId/:bnaSubjectNameId/:courseSectionId/:subjectMarkId/:markTypeId', 
    component: FinalCentralExamMarkEntry 
  },
  
  { 
    path: 'view-subjectinstructors/:courseDurationId/:routingType', 
    component: SubjectInstructorListComponent 
  },
  { 
    path: 'view-jcosexamsubjectinstructors/:courseDurationId/:courseNameId/:mainDb', 
    component: SubjectInstructorListComponent 
  },
  { 
    path: 'view-courseweekbyduration/:courseDurationId', 
    component: CourseWeekByDurationListComponent 
  },
  { 
    path: 'traineeassessment-list/:courseDurationId', 
    component: CourseOutlineListComponent 
  },
  { 
    path: 'assessmentmark-entry/:baseSchoolNameId/:courseDurationId/:traineeAssessmentCreateId', 
    component: NewAssessmentMarkComponent 
  },
  { 
    path: 'view-courseweekbyduration/:courseDurationId/:courseTypeId', 
    component: CourseWeekByDurationListComponent 
  },
  { 
    path: 'view-subjectinstructors/:baseSchoolNameId/:courseDurationId/:courseNameId', 
    component: SubjectInstructorListComponent 
  },

  { 
    path: 'view-subjectinstructors/:baseSchoolNameId/:courseDurationId/:courseNameId/:courseTypeId', 
    component: SubjectInstructorListComponent 
  },

  { 
    path: 'view-subjectinstructors/:baseSchoolNameId/:courseDurationId/:courseNameId/:dbType/:dbType1', 
    component: SubjectInstructorListComponent 
  },

  { 
    path: 'runningcourse-details/:courseDurationId/:courseTypeId', 
    component: ViewRunningCourseComponent 
  },
  { 
    path: 'course-details/:courseDurationId/:schoolDb', 
    component: ViewRunningCourseComponent 
  },

  { 
    path: 'view-course-details/:courseDurationId/:schoolDb', 
    component: ViewCourseDetailsComponent 
  },

  { 
    path: 'upcomingcourse-list', 
    component: UpcomingCourseListComponent 
  },
  { 
    path: 'Jcoexamlistindashboard-list', 
    component: JcoExamListForInterserviceDashboard 
  },
  { 
    path: 'centralexam-list', 
    component: CentralExamListComponent 
  },
  
  
  {
    path: 'traineenomination-list/:courseDurationId/:courseTypeId', 
    component: TraineeNominationListComponent,
  },
  {
    path: 'traineenomination-list/:baseSchoolNameId/:courseDurationId', 
    component: TraineeNominationListComponent,
  },
  {
    path: 'traineenomination-list/:courseDurationId/:courseTypeId/:dbType', 
    component: TraineeNominationListComponent,
  },
 
  {
    path: 'traineenomination-list/:courseDurationId', 
    component: TraineeNominationListComponent,
  },
  {
    path: 'traineenomination-list/:courseDurationId/:courseType/:courseType1/:courseType2/:courseType3/:courseType4', 
    component: TraineeNominationListComponent,
  },
  {
    path: 'traineenomination-list/:courseDurationId/:courseType/:courseType1/:courseType2/:courseType3', 
    component: TraineeNominationListComponent,
  },

  {
    path: 'traineenomination-list/:courseDurationId/:dbType/:dbType1', 
    component: TraineeNominationListComponent,
  },

  {
    path: 'routinebycourse-list/:baseSchoolNameId/:courseNameId/:courseDurationId/:courseTypeId',
    component: ClassRoutineListComponent,
  },

  {
    path: 'routinebycourse-list/:baseSchoolNameId/:courseNameId/:courseDurationId',
    component: ClassRoutineListComponent,
  },

  {
    path: 'routinebycourse-list/:baseSchoolNameId/:courseNameId/:courseDurationId/:dbType/:dbType1',
    component: ClassRoutineListComponent,
  },

  {
    path: 'view-attendancebycourse/:baseSchoolNameId/:courseNameId/:courseDurationId',
    component: AttendanceByCourseList,
  },
  {
    path: 'view-attendancebyroutine/:courseNameId/:baseSchoolNameId/:courseDurationId/:classRoutineId',
    component: AttendanceByRoutineList,
  },
  
  {
    path: 'instructor-dashboard',
    component: teacherDashboard,
  },
  {
    path: 'interservice-dashboard',
    component: interServiceDashboard,
  },
  {
    path: 'trainee-dashboard',
    component: studentDashboard,
  },
  // {
  //   path: 'school-dashboard',
  //   component: schoolDashboard,
  // },
  {
    path: 'school-dashboard',
    component: schoolDashboard,
  },

  { 
    path: 'view-coursecreatenbcd/:courseDurationId', 
    component: ViewCourseCreateNbcdComponent 
  },

  {
    path: 'update-nbcdcourseduration/:courseDurationId',
    component: UpdateCourseDurationComponent,
  },

  {
    path: 'bna-dashboard',
    component: bnaDashboard,
  },

  {
    path: 'foreigntraining-dashboard',
    component: foreigntrainingdashboard,
  },
  {
    path: 'runningcoursforeigntraineecount-list',
    component: RunningCoursForeignRraineecountListComponent,
  },
  {
    path: 'runningcoursforeigntraineedetails-list',
    component: RunningCoursForeignRraineecountDetailsListComponent,
  },
  {
    path: 'runningcourseforeigntraineeupcoming-list',
    component: RunningCourseForeignRraineeUpcomingListComponent,
  },


  { 
    path: 'view-subjectbymodule/:baseSchoolNameId/:courseNameId/:courseModuleId', 
    component: subjectbymodule 
  },
  { 
    path: 'view-courseinstructorbymodule/:baseSchoolNameId/:bnaSubjectNameId/:courseModuleId/:courseNameId', 
    component: subjectmoduleinstructor 
  },
  { 
    path: 'view-subjectmarksbymodule/:baseSchoolNameId/:courseNameId/:bnaSubjectNameId/:courseModuleId', 
    component: subjectMarkByModule 
  },
  { 
    path: 'view-traineeabsentdetails/:traineeId', 
    component: traineeAttendanceDetails 
  },
  { 
    path: 'view-interservicetraineelist/:courseTypeId/:traineeStatusId', 
    component: InterServiceTraineeList 
  },
  { 
    path: 'view-foreigncourseraineelist/:courseTypeId/:traineeStatusId/:dbType', 
    component: InterServiceTraineeList 
  },
  { 
    path: 'view-upcominginterservicecourselist/:courseTypeId', 
    component: upcomingcourseList 
  },
  { 
    path: 'view-upcomingforeigncourselist/:courseTypeId/:dbType', 
    component: upcomingcourseList 
  },

  { 
    path: 'view-budgetinfolist', 
    component: BudgetInfoList 
  },
  
  { 
    path: 'view-foreigncourselist', 
    component: ForeigncourseList 
  },
  
  { 
    path: 'view-paymentschedulelist/:courseDurationId', 
    component: PaymentScheduleList 
  },

  { 
    path: 'view-sanction/:courseDurationId/:dbType', 
    component: PaymentScheduleList 
  },

  { 
    path: 'view-releventstatusinfolist/:courseDurationId', 
    component: ReleventStatusInfoList 
  },
  
  { 
    path: 'view-remittancenotification', 
    component: RemittanceNotification 
  },

  {
    path: 'passwordupdate-student',
    component: NewPasswordChangeComponent,
  },

  {
    path: 'online-interaction',
    component: NewSchoolNoticeComponent,
  },

  {
    path: 'jstitrainee-details/:traineeId',
    component:JstiTraineeDetailsComponent,    
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
