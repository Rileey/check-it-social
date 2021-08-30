import validatePassword from '../utils/validatePassword'

describe('password validation', () => {
    test('returns false for empty password', () => {
        expect(validatePassword("")).toBe(false)
    })
    test('returns false for password without letters', () => {
        expect(validatePassword("1234567")).toBe(false)
    })
    test('returns false for password with length less than 7 charaters', () => {
        expect(validatePassword("12345d")).toBe(false)
    })
    test('returns true for password with numbers and letters greater than or equal 7', () => {
        expect(validatePassword("45673d1s")).toBe(true)
    })
    test('returns true for password with only one numbers', () => {
        expect(validatePassword("45673d1s")).toBe(true)
    })
    test('returns false for password with only letter', () => {
        expect(validatePassword("dennimanadams")).toBe(false)
    })
    test('returns true for password without upper case letters', () => {
        expect(validatePassword("4567311s")).toBe(true)
    })
    test('returns true for password ending with number', () => {
        expect(validatePassword("denny6731s1")).toBe(true)
    })
    test('returns true for both upper and lower aplhanumeric characters', () => {
        expect(validatePassword("DNNY67311")).toBe(true)
    })
    test('returns true for password ending with capital letter', () => {
        expect(validatePassword("6731134D")).toBe(true)
    })
})