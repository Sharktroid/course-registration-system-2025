const Institution = require('./institution')
const Person = require('./person');

describe('Instructor-Tests', () => {
    let person;
    beforeEach(() => {
        person = new Person('Claus', 'Schmidt', new Institution('University of Test', 'test.edu'), new Date('1980-01-01'), 'cschmidt', 'faculty');
    });
    test('GivenAValidPerson-WhenEmailIsRequested-ThenEmailIsReturned', () => {
        expect(person.email).toBe('cschmidt@test.edu');
    });
})
