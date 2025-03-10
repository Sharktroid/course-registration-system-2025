const CourseOffering = require('./course-offering')
const Student = require('./student');

describe('CourseOffering', () => {
  let courseOffering;
  beforeEach(() => {
    courseOffering = new CourseOffering('Math', 101, 2021, 'Fall');
  });
  test('should be properly constructed', () => {
    expect(courseOffering.course).toBe('Math');
    expect(courseOffering.sectionNumber).toBe(101);
    expect(courseOffering.year).toBe(2021);
    expect(courseOffering.quarter).toBe('Fall');
  });
  test('should register students properly', () => {
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
  test('should register grades properly', () => {
    let student = new Student('Doe', 'John', 'UCLA', new Date(1990, 1, 1), 'johndoe');
    courseOffering.submit_grade(student, 'A');
    expect(courseOffering.grades[student.userName]).toEqual('A');
    expect(courseOffering.get_grade(student)).toEqual('A');
    expect(courseOffering.get_grade(student.userName)).toEqual('A');
    expect(student.transcript[courseOffering.toString()]).toEqual('A');
    expect(courseOffering.submit_grade(student, '8')).toEqual('Please enter a valid grade');
  });
});