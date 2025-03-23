const Course = require('./course');
const CourseOffering = require('./course-offering')
const Student = require('./student');

describe('CourseOffering', () => {
  let courseOffering;
  beforeEach(() => {
    courseOffering = new CourseOffering(new Course('Math', 101, 'Calculus I', 3), '01', 2021, 'Fall');
  });
  test('GivenAValidStudent-RegisterStudents-AddsStudentsToRegisteredList', () => {
    let studentA = new Student('Doe', 'John', 'UCLA', new Date(1990, 1, 1), 'johndoe');
    let studentB = new Student('Smith', 'Jane', 'UCLA', new Date(1990, 1, 1), 'janesmith');
    courseOffering.register_students([studentA, studentB]);
    expect(courseOffering.registeredStudents).toEqual([studentA, studentB]);
    expect(courseOffering.get_students()).toEqual([studentA, studentB]);
    let courseOffering2 = new CourseOffering('Math', 102, 2021, 'Fall');
    courseOffering2.register_students([studentA, studentB]);
    expect(courseOffering2.registeredStudents).toEqual([studentA, studentB]);
    expect(courseOffering2.get_students()).toEqual([studentA, studentB]);
    expect(studentA.courseList).toEqual([courseOffering, courseOffering2]);
    expect(studentB.courseList).toEqual([courseOffering, courseOffering2]);
  });
  test('GivenAValidStudentAndGrade-SubmitGrade-AddsGradeToGradesList', () => {
    let student = new Student('Doe', 'John', 'UCLA', new Date(1990, 1, 1), 'johndoe');
    courseOffering.submit_grade(student, 'A');
    expect(courseOffering.grades[student.userName]).toEqual('A');
    expect(courseOffering.get_grade(student)).toEqual('A');
    expect(courseOffering.get_grade(student.userName)).toEqual('A');
    expect(student.transcript[courseOffering.toString()]).toEqual('A');
    expect(courseOffering.submit_grade(student, '8')).toEqual('Please enter a valid grade');
  });
  test('GivenAValidStudentAndGrade-GetGrade-ReturnsCorrectGrade', () => {
    let student = new Student('Doe', 'John', 'UCLA', new Date(1990, 1, 1), 'johndoe');
    courseOffering.submit_grade(student, 'A');
    expect(courseOffering.get_grade(student)).toEqual('A');
    expect(courseOffering.get_grade(student.userName)).toEqual('A');
  });
  test('GivenAValidCourseOffering-ToString-ReturnsCorrectString', () => {
    let instructor = { firstName: 'Jane', lastName: 'Doe' };
    courseOffering.instructor = instructor;
    expect(courseOffering.toString()).toBe('Calculus I, Math 101-01, Jane Doe (Fall 2021)');
    courseOffering.instructor = null;
    expect(courseOffering.toString()).toBe('Calculus I, Math 101-01 (Fall 2021)');
  });
  test('GivenAValidStudents-GetStudents-ReturnsCorrectStudents', () => {
    let studentA = new Student('Doe', 'John', 'UCLA', new Date(1990, 1, 1), 'johndoe');
    let studentB = new Student('Smith', 'Jane', 'UCLA', new Date(1990, 1, 1), 'janesmith');
    courseOffering.register_students([studentA, studentB]);
    expect(courseOffering.get_students()).toEqual([studentA, studentB]);
  });
});