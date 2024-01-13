import { ConfigService } from '../../config/config.service';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { RightSidebarService } from 'src/app/core/service/rightsidebar.service';
import { Role } from 'src/app/core/models/role';
import { LanguageService } from 'src/app/core/service/language.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BaseSchoolNameService } from 'src/app/security/service/BaseSchoolName.service';
const document: any = window.document;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit
{
  public config: any = {};
  userRole = Role;
  userImg: string;
  homePage: string;
  role:any;
  traineeId: any;
  branchId: any;
  isNavbarCollapsed = true;
  flagvalue;
  countryName;
  langStoreValue: string;
  defaultFlag: string;
  isOpenSidebar: boolean;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    private baseSchoolNameService: BaseSchoolNameService,
    public languageService: LanguageService
  ) {
    super();
  }
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
  ];
  notifications: any[] = [
    {
      userImg: 'assets/images/user/user1.jpg',
      userName: 'Sarah Smith',
      time: '14 mins ago',
      message: 'Please check your mail',
    },
    {
      userImg: 'assets/images/user/user2.jpg',
      userName: 'Airi Satou',
      time: '22 mins ago',
      message: 'Work Completed !!!',
    },
    {
      userImg: 'assets/images/user/user3.jpg',
      userName: 'John Doe',
      time: '3 hours ago',
      message: 'kindly help me for code.',
    },
    {
      userImg: 'assets/images/user/user4.jpg',
      userName: 'Ashton Cox',
      time: '5 hours ago',
      message: 'Lets break for lunch...',
    },
    {
      userImg: 'assets/images/user/user5.jpg',
      userName: 'Sarah Smith',
      time: '14 mins ago',
      message: 'Please check your mail',
    },
    {
      userImg: 'assets/images/user/user6.jpg',
      userName: 'Airi Satou',
      time: '22 mins ago',
      message: 'Work Completed !!!',
    },
    {
      userImg: 'assets/images/user/user7.jpg',
      userName: 'John Doe',
      time: '3 hours ago',
      message: 'kindly help me for code.',
    },
  ];
  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    // this.branchId =  this.authService.currentUserValue.branchId.trim();
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log("from header - "+ this.role, this.traineeId, this.branchId)
this.userRole.SchoolOIC
    this.config = this.configService.configData;

    if(this.role == Role.SuperAdmin || this.role === Role.BNASchool || this.role === Role.JSTISchool || this.role == Role.SchoolOIC || this.role == Role.TC || this.role == Role.CO || this.role == Role.DataEntry){
      this.baseSchoolNameService.find(this.branchId).subscribe(res=>{
        console.log("school find");
        console.log(res);
        this.userImg = res.schoolLogo;
        console.log(this.userImg);
        if(!this.userImg){
          this.userImg = 'assets/images/main.jpg';
        }
      });
    }else{
      this.userImg = 'assets/images/main.jpg';
    }

    // const userRole = this.authService.currentUserValue.role;
    // this.userImg = this.authService.currentUserValue.img;

    // if (userRole === Role.Admin) {
    //   this.homePage = 'admin/dashboard/main';
    // } else if (userRole === Role.Teacher) {
    //   this.homePage = 'teacher/dashboard';
    // } else if (userRole === Role.Student) {
    //   this.homePage = 'student/dashboard';
    // } else {
    //   this.homePage = 'admin/dashboard/main';
    // }

    this.langStoreValue = localStorage.getItem('lang');
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/us.jpg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
  }
  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem('theme')) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem('theme'));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem('menuOption')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('menuOption')
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'menu_' + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem('choose_logoheader')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('choose_logoheader')
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'logo-' + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem('sidebar_status')) {
      if (localStorage.getItem('sidebar_status') === 'close') {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      } else {
        this.renderer.removeClass(this.document.body, 'side-closed');
        this.renderer.removeClass(this.document.body, 'submenu-closed');
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      }
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  public toggleRightSidebar(): void {
    this.subs.sink = this.rightSidebarService.sidebarState.subscribe(
      (isRunning) => {
        this.isOpenSidebar = isRunning;
      }
    );

    this.rightSidebarService.setRightSidebar(
      (this.isOpenSidebar = !this.isOpenSidebar)
    );
  }
  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }
}
