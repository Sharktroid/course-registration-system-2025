const Instructor = require('./instructor')
const Institution = require('./institution')
const Course = require('./course');
const CourseOffering = require('./course-offering');

describe('Instructor-Tests', () => {
    let instructor;
    beforeEach(() => {
        instructor = new Instructor('Claus', 'Schmidt', new Institution('University of Test'), new Date('1980-01-01'), 'cschmidt')
    });
    test('GivenAValidCourseList-WhenListCoursesIsCalled-ThenItReturnsTheCoursesSortedByYearAndQuarter', () => {
        const course1 = new Course('Math', 101, "Calculus I", 2);
        const course2 = new Course('Math', 201, "Linear Algebra", 1);
        const course3 = new Course('CS', 101, "Introduction to Programming", 1);
        const courseOffering1 = new CourseOffering(course1, '01', '2023', 2);
        const courseOffering2 = new CourseOffering(course2, '01', '2024', 1);
        const courseOffering3 = new CourseOffering(course3, '01', '2023', 1);
        instructor.course_list = [courseOffering1, courseOffering2, courseOffering3];
        expect(instructor.list_courses()).toEqual([
            'Linear Algebra, Math 201-01 (1 2024)',
            'Calculus I, Math 101-01 (2 2023)',
            'Introduction to Programming, CS 101-01 (1 2023)',
        ]);
    });
})
