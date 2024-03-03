import { TestBed } from "@angular/core/testing";
import { CoursesComponent } from "./courses.component";
import { MockProvider } from 'ng-mocks';
import { CoursesService } from "./courses.service";
import { of } from "rxjs";

describe('courses tests', () => {
  let component: CoursesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      providers:[MockProvider(CoursesService, {
        getCourses: () => of ([
            {
              id: 1,
              courseName: 'Java',
              createdAt: new Date (),
            },
            {
              id: 2,
              courseName: 'SQL',
              createdAt: new Date (),
            },
            {
              id: 3,
              courseName: 'Python',
              createdAt: new Date (),
            },
            {
              id: 4,
              courseName: 'Vue',
              createdAt: new Date (),
          },])
      })],
    }); 
    component = TestBed.createComponent(CoursesComponent).componentInstance;
  });

  it('Courses column table are (displayedColumns): "id", "courseName", "createdAt", "actions"', () => {
    expect(component.displayedColumns).toContain('id');
    expect(component.displayedColumns).toContain('courseName'); 
    expect(component.displayedColumns).toContain('createdAt');
    expect(component.displayedColumns).toContain('actions');
  });
});
