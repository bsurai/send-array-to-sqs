const { SQSqueue } = require('./index')
const AWS = require('aws-sdk')
const jsonpack = require('jsonpack')

const sqsConfig = {
  region: 'us-west-2',
  endpoint:"http://localhost:9324"
 }
const sqs = new AWS.SQS(sqsConfig)

const sqsUrl = 'http://localhost:9324/queue/test-queue'
const sqsParams = { QueueName: 'test-queue' }

describe('#sendArray int', () => {

  beforeEach(async () => {
    await sqs.createQueue(sqsParams).promise()
  })

  afterEach(async () => {
    await sqs.deleteQueue({ QueueUrl: sqsUrl }).promise()
  })
  
  it('calls the sendMessage method of SQS', async () => {
    const arr = [
      { id: 0, name: 'aaaaaaa'},
      { id: 1, name: 'bbbbbbb'},
      { id: 2, name: 'ccccccc'},
    ]

    const queue = SQSqueue(sqs, sqsUrl)
    await queue.sendArray(arr)

    const msgs = await sqs.receiveMessage({ QueueUrl: sqsUrl }).promise()

    const unpacked = jsonpack.unpack(msgs.Messages[0].Body)
    expect(unpacked).toEqual(arr)
  })
})
