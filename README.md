# Prerequisites

Node.js, Docker, Docker Compose should be installed.

# Run tests

```
npm i
npm run startlocalstack
npm run test
npm run stoplocalstack
```



# Example of using

```
import AWS from 'aws-sdk'
import { SQSqueue } from './src'

const sqsConfig = config('SQS_CONFIG')
const sqsUrl = config('SQS_URL')

const sqs = new AWS.SQS(sqsConfig)

const myQueue = SQSqueue(sqs, sqsUrl)

const arr = [
  { id: 0, name: 'aaaaaaa'},
  { id: 1, name: 'bbbbbbb'},
  { id: 2, name: 'ccccccc'},
]

myQueue.sendArray(arr)
.then(() => console.log('Success'))
.catch(error => console.log(error))
```
