const { SQSqueue } = require('./index')
const { compress } = require('./compress')

const sqsMock = {
  sendMessage() {
    return { promise: async () => {} }    
  }
}


describe('#sendArray', () => {
  
  it('calls the sendMessage method of SQS', async () => {
    const sendMessageSpy = jest.spyOn(sqsMock, 'sendMessage')

    const url = 'https://some.url'
    const arr = [
      { id: 0, name: 'aaaaaaa'},
      { id: 1, name: 'bbbbbbb'},
      { id: 2, name: 'ccccccc'},
    ]

    const queue = SQSqueue(sqsMock, url)
    await queue.sendArray(arr)

    const expectedMassageBody = compress(JSON.stringify(arr))
    expect(sendMessageSpy).toHaveBeenCalledTimes(1)
    expect(sendMessageSpy).toHaveBeenCalledWith({
      MessageBody: expectedMassageBody,
      QueueUrl: url,
    })

  })

  it('throws an error when SQSqueue is empty', async () => {
    const sqsMock = null
    const url = 'https://some.url'
    expect(() => SQSqueue(sqsMock, url)).toThrow("SQSservice should not be empty.")
  })

  it('throws an error when URL is empty', async () => {
    const url = ''
    expect(() => SQSqueue(sqsMock, url)).toThrow("queueUrl should not be empty.")
  })

  it('throws an error when an array is broken', async () => {
    const sendMessageSpy = jest.spyOn(sqsMock, 'sendMessage')

    const url = 'https://some.url'
    const arr = {} // object instead of array

    const queue = SQSqueue(sqsMock, url)
    await expect(queue.sendArray(arr)).rejects.toMatchObject({
      message: 'Only arrays should be passed to the sendArray method.'
    })
  })

  it('throws an error when an unexpected error from SQS.sendMessage()', async () => {
    const sendMessageSpy = jest.spyOn(sqsMock, 'sendMessage').mockImplementation(() => { throw new Error('Unexpected Error') })

    const url = 'https://some.url'
    const arr = [
      { id: 0, name: 'aaaaaaa'}
    ]

    const queue = SQSqueue(sqsMock, url)
    await expect(queue.sendArray(arr)).rejects.toMatchObject({
      message: 'Unexpected Error'
    })
  })

})
