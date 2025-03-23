const Course = require('./course');
const CourseOffering = require('./course-offering');
const Institution = require('./institution')
const Student = require('./student');
const { default: expect } = require('expect');

describe('Instructor-Tests', () => {
    let student;
    let courseOffering1
    let courseOffering2
    beforeEach(() => {
        student = new Student('Schmidt', 'Carl', new Institution('Test University', 'test.edu'), new Date('2000-01-01'), 'cschmidt');
        courseOffering1 = new CourseOffering(new Course('Math', 101, 'Algebra I', 3), '01', 2023, 'Fall');
        courseOffering2 = new CourseOffering(new Course('Math', 102, 'Calculus I', 4), '01', 2023, 'Fall');
        courseOffering1.register_students([student]);
        courseOffering2.register_students([student]);
        courseOffering1.submit_grade(student, 'A');
        courseOffering2.submit_grade(student, 'B+');
    });
    test('GivenAValidListOfCourses-WhenListCoursesIsCalled-ThenReturnsTheCoursesInOrder', () => {
        expect(student.list_courses()).toEqual([courseOffering1.toString(), courseOffering2.toString()]);
    });
    test('GivenAValidListOfCourses-WhenCreditsIsCalled-ThenReturnsTheTotalCredits', () => {
        expect(student.credits).toEqual(7); // 3 + 4
    });
    test('GivenAValidListOfCourses-WhenGPAIsCalled-ThenReturnsTheCorrectGPA', () => {
        expect(student.gpa).toBeCloseTo(3.5, 0.01); // (4.0 * 3 + 3.33 * 4) / 7 = 3.5
    });
})
