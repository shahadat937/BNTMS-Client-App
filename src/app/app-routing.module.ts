import { Page404Component } from './authentication/page404/page404.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { Role } from './core/models/role'; 
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      
      {
        path: 'basic-setup',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.ForeignTraining,Role.DDNT]
        },
        loadChildren: () =>
          import('./basic-setup/basic-setup.module').then((m) => m.BasicSetupModule),
      },
      {
        path: 'profile-update',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.ForeignTraining,Role.DDNT,Role.CO,Role.Director,Role.TC,Role.TCO]
        },
        loadChildren: () =>
          import('./profile-update/profileupdate.module').then((m) => m.ProfileUpdateModule),
      },


      {
        path: 'security',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT,Role.SuperAdmin],
        },
        loadChildren: () =>
          import('./security/security.module').then((m) => m.SecurityModule),
      },
 
      {
        path: 'semester-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT,Role.BNASchool],
        },
        loadChildren: () =>
          import('./semester-management/semester-management.module').then((m) => m.SemesterManagementModule),
      },

      {
        path: 'notice-bulletin',
        canActivate: [AuthGuard],
        data: {
          // role: [Role.Director,Role.MasterAdmin,Role.SuperAdmin,Role.DataEntry,Role.DDNT, Role.InterSeeviceCourse,Role.InterSeeviceDesk],

          role: [Role.Director,Role.MasterAdmin,Role.SuperAdmin, Role.BNASchool, Role.JSTISchool, Role.CO,Role.SchoolOIC,Role.TC,Role.TCO,Role.DataEntry,Role.DDNT, Role.InterSeeviceCourse,Role.InterSeeviceDesk],

        },
        loadChildren: () =>
          import('./notice-bulletin/notice-bulletin.module').then((m) => m.NoticeBulletinModule),
      },

      {
        path: 'trainee-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT],
        },
        loadChildren: () =>
          import('./trainee-management/trainee-management.module').then((m) => m.TraineeManagementModule),
      },
      {
        path: 'subject-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool,Role.DDNT],
        },
        loadChildren: () =>
          import('./subject-management/subject-management.module').then((m) => m.SubjectManagementModule),
      },

      {
        path: 'bna-subject-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool,Role.BNA,Role.DDNT],
        },
        loadChildren: () =>
          import('./bna-subject-management/bna-subject-management.module').then((m) => m.BNASubjectManagementModule),
      },
      {
        path: 'attendance-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool,Role.Instructor,Role.DDNT],
        },
        loadChildren: () =>
          import('./attendance-management/attendance-management.module').then((m) => m.AttendanceManagementModule),
      },
      // BnaRoutineManagementModule
      {
        path: 'bnaattendance-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool,Role.BNA,Role.DDNT],
        },
        loadChildren: () =>
          import('./bnaattendance-management/bnaattendance-management.module').then((m) => m.BnaAttendanceManagementModule),
      },

      {
        path: 'bnaroutine-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool,Role.BNA,Role.DDNT],
        },
        loadChildren: () =>
          import('./bnaroutine-management/bnaroutine-management.module').then((m) => m.BnaRoutineManagementModule),
      },


      {
        path: 'allowance-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.ForeignTraining,Role.DDNT],
        },
        loadChildren: () =>
          import('./allowance-management/allowance-management.module').then((m) => m.AllowanceManagementModule),
      },
      {
        path: 'exam-management',
        canActivate: [AuthGuard],
        data: {

          role: [Role.MasterAdmin,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool,Role.SchoolOIC,Role.OICNBCDSchool,Role.OICNETSchool,Role.Instructor,Role.DDNT],

          //role: [Role.MasterAdmin,Role.SuperAdmin, Role.Instructor],

        },
        loadChildren: () =>
          import('./exam-management/exam-management.module').then((m) => m.ExamManagementModule),
      },

      {
        path: 'bna-exam-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool, Role.BNA,Role.DDNT],
        },
        loadChildren: () =>
          import('./bna-exam-management/bna-exam-management.module').then((m) => m.BNAExamManagementModule),
      },
      {
        path: 'central-exam',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin, Role.DDNT,Role.Instructor,Role.DDNT],
        },
        loadChildren: () =>
          import('./central-exam/central-exam.module').then((m) => m.CentralExamModule),
      },
      {
        path: 'foreign-training',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.ForeignTraining,Role.DDNT],
        },
        loadChildren: () =>
          import('./foreign-training/foreign-training.module').then((m) => m.ForeignTrainingModule),
      },

      {
        path: 'budget-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.ForeignTraining,Role.DDNT, Role.InterSeeviceCourse,Role.InterSeeviceDesk],
        },
        loadChildren: () =>
          import('./budget-management/budget-management.module').then((m) => m.BudgetManagementModule),
      },
      {
        path: 'air-ticket',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.ForeignTraining,Role.DDNT],
        },
        loadChildren: () =>
          import('./air-ticket/air-ticket.module').then((m) => m.AirTicketModule),
      },

      {
        path: 'inter-service',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.InterSeeviceCourse,Role.DDNT, Role.Student,Role.InterSeeviceDesk],
        },
        loadChildren: () =>
          import('./inter-service/inter-service.module').then((m) => m.InterServiceModule),
      },
      {
        path: 'mist-course',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT],
        },
        loadChildren: () =>
          import('./mist-course/mist-course.module').then((m) => m.MISTCourseModule),
      },

      {
        path: 'nets-course',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT,Role.BNASchool],
        },
        loadChildren: () => 
        import('./nets-course/nets-course.module').then((m) => m.NETSCourseModule),
    },

      {
        path: 'staff-collage',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT,Role.Instructor,Role.DDNT],
        },
        loadChildren: () =>
          import('./staff-collage/staff-collage.module').then((m) => m.StaffCollageModule),
      },
      {
        path: 'jcos-training',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT,Role.Instructor,Role.DDNT, Role.InterSeeviceCourse,Role.InterSeeviceDesk],
        },
        loadChildren: () =>
          import('./jcos-training/jcos-training.module').then((m) => m.JCOsTrainingModule),
      },
      {
        path: 'teachers-evaluation',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool,Role.TCO,Role.CO,Role.SchoolOIC,Role.CO,Role.TC],
        },
        loadChildren: () =>
          import('./teachers-evaluation/teachers-evaluation.module').then((m) => m.TeachersEvaluationModule),
      },
      {
        path: 'syllabus-entry',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool,Role.DDNT],
        },
        loadChildren: () =>
          import('./syllabus-entry/syllabus-entry.module').then((m) => m.SyllabusEntryModule),
      },
      {
        path: 'course-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.Director,Role.MasterAdmin, Role.DDNT,Role.SchoolOIC,Role.OICNBCDSchool,Role.OICNETSchool,Role.TrainingOffice, Role.SuperAdmin , Role.BNASchool, Role.JSTISchool, Role.Instructor, Role.Student,Role.DDNT, Role.InterSeeviceCourse,Role.InterSeeviceDesk,Role.AreaCommander,Role.CO,Role.TC]
        },
        loadChildren: () =>
          import('./course-management/course-management.module').then((m) => m.CourseManagementModule),
      },

      {
        path: 'bnacourse-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin, Role.SuperAdmin,Role.BNASchool, Role.JSTISchool, Role.Instructor, Role.Student,Role.BNA,Role.DDNT],
        },
        loadChildren: () =>
          import('./bnacourse-management/bnacourse-management.module').then((m) => m.BnaCourseManagementModule),
      },

      {
        path: 'reading-materials',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool,Role.DataEntry,Role.Instructor,Role.DDNT, Role.InterSeeviceCourse,Role.InterSeeviceDesk],
        },
        loadChildren: () =>
          import('./reading-materials/reading-materials.module').then((m) => m.ReadingMaterialsModule),
      },

      {
        path: 'user-manual',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin],
        },
        loadChildren: () =>
          import('./user-manual/user-manual.module').then((m) => m.UserManualModule),
      },

      {
        path: 'calendar',
        canActivate: [AuthGuard],
        data: {
          role: [Role.Director,Role.MasterAdmin, Role.InterSeeviceCourse, Role.ForeignTraining,Role.DDNT],
        },
        loadChildren: () =>
          import('./calendar/calendar.module').then((m) => m.CalendarsModule),
      },
      {
        path: 'routine-management',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool,Role.SchoolOIC,Role.TrainingOffice,Role.DataEntry, Role.BNA,Role.DDNT],
        },
        loadChildren: () =>
          import('./routine-management/routine-management.module').then((m) => m.RoutineManagementModule),
      },
      {
        path: 'trainee-biodata',
        loadChildren: () =>
          import('./trainee-biodata/trainee-biodata.module').then(
            (m) => m.TraineeBiodataModule
          ),
      },
      {
        path: 'bna-trainee-biodata',
        loadChildren: () =>
          import('./bna-trainee-biodata/bna-trainee-biodata-routing.module').then( (m) => m.BNATraineeBiodataRoutingModule),
      },

      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: {
          role: [Role.Director,Role.MasterAdmin, Role.DDNT, Role.SuperAdmin,Role.BNASchool, Role.JSTISchool, Role.DataEntry, Role.TrainingOffice,Role.SchoolOIC, Role.Instructor, Role.Student, Role.InterSeeviceCourse, Role.InterSeeviceDesk, Role.BNA,Role.ForeignTraining,Role.TC,Role.CO,Role.AreaCommander,Role.TCO,Role.OICNBCDSchool,Role.OICNETSchool,Role.BnaDataEntry]
        },
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'trainee-assessment',
        canActivate: [AuthGuard],
        data: {
          role: [Role.Director,Role.MasterAdmin, Role.DDNT, Role.SuperAdmin,Role.BNASchool, Role.JSTISchool, Role.DataEntry, Role.TrainingOffice,Role.SchoolOIC, Role.Instructor, Role.Student, Role.InterSeeviceCourse, Role.InterSeeviceDesk, Role.BNA,Role.ForeignTraining,Role.TC,Role.CO,Role.AreaCommander,Role.TCO,Role.OICNBCDSchool,Role.OICNETSchool]
        },
        loadChildren: () =>
          import('./trainee-assessment/trainee-assessment.module').then((m) => m.TraineeAssessmentModule),
      },
      {
        path: 'interservice-dashboard',
        canActivate: [AuthGuard],
        data: {
          role: [Role.InterSeeviceCourse,Role.DDNT,Role.InterSeeviceDesk],
        },
        loadChildren: () =>
          import('./inter-service-dashboard/inter-service-dashboard.module').then((m) => m.InterServiceDashboardModule),
      },
      {
        path: 'teacher',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT],
        },
        loadChildren: () =>
          import('./teacher/teacher.module').then((m) => m.TeacherModule),
      },

      {
        path: 'student',
        canActivate: [AuthGuard],
        data: {
          role: [Role.Student,Role.DDNT],
        },
        loadChildren: () =>
          import('./student/student.module').then((m) => m.StudentModule),
      },

      {
        path: 'password',
        canActivate: [AuthGuard],
        data: {
          role: [Role.Director,Role.MasterAdmin, Role.SuperAdmin,Role.BNASchool, Role.JSTISchool, Role.SchoolOIC,Role.OICNBCDSchool,Role.OICNETSchool,Role.TrainingOffice,Role.DDNT,Role.CO,Role.TC,Role.AreaCommander,Role.TCO],
        },
        loadChildren: () =>
          import('./password/password.module').then((m) => m.PasswordModule),
      },

      {
        path: 'school',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT],
        },
        loadChildren: () =>
          import('./school/school.module').then((m) => m.SchoolModule),
      },
      
      {
        path: 'foreigntraining-dashboard',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT],
        },
        loadChildren: () =>
          import('./foreigntraining-dashboard/foreigntraining-dashboard.module').then((m) => m.ForeignTrainingDashboardModule),
      },

      {
        path: 'guest-speaker',
        canActivate: [AuthGuard],
        data: {
          role: [Role.MasterAdmin,Role.DDNT,Role.SuperAdmin,Role.BNASchool, Role.JSTISchool,Role.TCO,Role.CO,Role.SchoolOIC,Role.CO,Role.TC],
        },
        loadChildren: () =>
          import('./guest-speaker/guest-speaker.module').then((m) => m.GuestSpeakerModule),
      },

      {
        path: 'instructor',
        canActivate: [AuthGuard],
        data: {
          //role: [Role.MasterAdmin,  Role.Instructor], // multiple user role
          role: [Role.Instructor,Role.Student,Role.DDNT],
        },
        loadChildren: () =>
          import('./instructor/instructor.module').then((m) => m.InstructorModule),
      },

      // Extra components
      {
        path: 'extra-pages',
        loadChildren: () =>
          import('./extra-pages/extra-pages.module').then(
            (m) => m.ExtraPagesModule
          ),
      },
      {
        path: 'multilevel',
        loadChildren: () =>
          import('./multilevel/multilevel.module').then(
            (m) => m.MultilevelModule
          ),
      },
      
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
