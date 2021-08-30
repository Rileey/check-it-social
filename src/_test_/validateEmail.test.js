import emailValidation from '../utils/validateEmail'

describe('email validation', () => {
    it('returns true if email has @ and dot come', () => {
        expect(emailValidation('denny@yahoo.com')).toBe(true)
    })
    it('returns false if email has @ without dot come', () => {
        expect(emailValidation('denny@yahoocom')).toBe(false)
    })
    it('returns false if email has no @', () => {
        expect(emailValidation('dennyyahoo.com')).toBe(false)
    })
    it('returns false if email has @ without dot', () => {
        expect(emailValidation('denny@yahoocom')).toBe(false)
    })
})