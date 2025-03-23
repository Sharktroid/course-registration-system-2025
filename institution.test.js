const Instructor = require('./instructor')
const Institution = require('./institution')
const Person = require('./person');
const Student = require('./student');
const Course = require('./course');
const CourseOffering = require('./course-offering');

describe('Instructor-Tests', () => {
    let institution;
    beforeEach(() => {
        institution = new Institution('Quinnipiac University', 'qu.edu')
    });
    test('GivenAValidInstructor-AllConditionsMet-HiresANewInstructor', () => {
        const sqaInstructor = new Instructor('Nicolini', 'Dylan', institution, '1/1/2024', 'dnicolini')
        institution.hire_instructor(sqaInstructor)
        expect(Object.keys(institution.facultyList).length).toBe(1)
        expect(Object.keys(institution.facultyList)).toStrictEqual(['dnicolini'])
    })
    test('GivenAValidInstructor-VerifiesDuplicateInstructor-DoesNotAddDuplicate', () => {
        const sqaInstructor = new Instructor('Nicolini', 'Dylan', institution, '1/1/2024', 'dnicolini')
        institution.hire_instructor(sqaInstructor)
        institution.hire_instructor(sqaInstructor)
        expect(Object.keys(institution.facultyList).length).toBe(1)
        expect(Object.keys(institution.facultyList)).toStrictEqual(['dnicolini'])
    })
    test('GivenAnInvalidInstructor-AttemptsToHireInstructor-ThrowsError', () => {
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        let testPerson = new Person('lastName', 'firstName', 'test school', '1/1/2024', 'student_username', 'affiliation')
        expect(() => institution.hire_instructor(testPerson)).toThrowError(TypeError)
    })
    test('GivenAValidStudent-AddsStudentToInstitution-StudentListContainsStudent', () => {
        const testStudent = new Student('Doe', 'John', institution, '1/1/2024', 'jdoe', 'student')
        institution.enroll_student(testStudent)
        expect(Object.keys(institution.studentList).length).toBe(1)
        expect(Object.keys(institution.studentList)).toStrictEqual(['jdoe'])
    });
    test('GivenAValidCourse-AddsCourseToInstitution-CourseCatalogContainsCourse', () => {
        const testCourse = new Course('CS', 1, 'Software Quality Assurance', 3);
        institution.add_course(testCourse)
        expect(institution.courseCatalog['Software Quality Assurance']).toBe(testCourse)
    });
    test('GivenAValidCourseOffering-AddsCourseOfferingToInstitution-CourseScheduleContainsOffering', () => {
        const testCourse = new Course('CS', 1, 'Software Quality Assurance', 3);
        const testCourseOffering = new CourseOffering(testCourse, 1, 2024, 'Spring')
        institution.add_course(testCourse)
        institution.add_course_offering(testCourseOffering)
        expect(institution.courseSchedule['Software Quality Assurance'][0]).toBe(testCourseOffering)
    });
    test('GivenAValidInstructorAndCourseOffering-AssignsInstructor-CourseOfferingContainsInstructorAndInstructorCourseListContainsOffering', () => {
        const courseName = 'Software Quality Assurance'
        const dept = 'CS'
        const number = 1
        const sectionNumber = 1
        const year = 2024
        const quarter = 'Spring'
        const testCourse = new Course(dept, number, courseName, 3)
        const testCourseOffering = new CourseOffering(testCourse, sectionNumber, year, quarter)
        const testInstructor = new Instructor('Nicolini', 'Dylan', institution, '1/1/2024', 'dnicolini')
        institution.add_course(testCourse)
        institution.add_course_offering(testCourseOffering)
        institution.hire_instructor(testInstructor)
        institution.assign_instructor(testInstructor, courseName, dept, number, sectionNumber, year, quarter)
        expect(testCourseOffering.instructor).toBe(testInstructor)
    });
    test('GivenAValidStudentAndCourseOffering-RegistersStudentForCourseOffering-CourseOfferingContainsStudentAndStudentCourseListContainsOffering', () => {
        const courseName = 'Software Quality Assurance'
        const dept = 'CS'
        const number = 1
        const sectionNumber = 1
        const year = 2024
        const quarter = 'Spring'
        const testCourse = new Course(dept, number, courseName, 3)
        const testCourseOffering = new CourseOffering(testCourse, sectionNumber, year, quarter)
        const testStudent = new Student('Doe', 'John', institution, '1/1/2024', 'jdoe', 'student')
        institution.add_course(testCourse)
        institution.add_course_offering(testCourseOffering)
        institution.enroll_student(testStudent)
        institution.register_student_for_course(testStudent, courseName, dept, number, sectionNumber, year, quarter)
        expect(Object.keys(institution.studentList)[0]).toBe(testStudent.userName)
        expect(testCourseOffering.registeredStudents[0]).toBe(testStudent)
    });
})
