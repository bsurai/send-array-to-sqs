const jsonpack = require('jsonpack')

module.exports.SQSqueue = (SQSservice, queueUrl) => {
  if (!SQSservice) {
    throw new Error('SQSservice should not be empty.');
  }

  if (!queueUrl) {
    throw new Error('queueUrl should not be empty.');
  }

  const sqs = SQSservice
  const url = queueUrl

  return {
    async sendArray(list) {
      if (!Array.isArray(list)) {
        throw new Error('Only arrays should be passed to the sendArray method.')
      }

      const compressed = jsonpack.pack(list)
      return sqs.sendMessage({ QueueUrl: url, MessageBody: compressed }).promise()
    }
  }
}
