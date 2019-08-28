const { compress } = require('./compress')

describe('#compress', () => {

    it('reduces length of a given string', () => {
        const input = 'My random string for testing compression. It is very very long and it should be compressed.'
        const output = compress(input)
        expect(output.length).toBeLessThan(input.length)
    })

    it('throws an error when gets bad parameters', () => {
        const input = ['array']
        expect(() => compress(input)).toThrow("Only strings should be passed to compress function.")
    })

})
