
const {Kafka} = require('kafkajs') ; 

const sendEmailUsecase =  require('../send-email/send-email.usecase') ;

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092', 'localhost:9092']
})


const producer = kafka.producer(); 

const kafkaSendemail = async (obj) => {
    console.log(obj);
    // Producing
    await producer.connect()
    await producer.send({
        topic: 'email-topic',
        messages: [
            { value: obj },
        ],
    })
    

    // Consumingu
   const consumer = kafka.consumer({ groupId: 'email-group' })
   await consumer.connect()
   await consumer.subscribe({ topic: 'email-topic' , fromBeginning:false })

   await consumer.run({
     eachMessage: async ({ topic, partition, message }) => {
       console.log({
         partition,
         offset: message.offset,
         value: message.value.toString(),
       })
       const replyUser = JSON.parse(message.value.toString()) ; 
       sendEmailUsecase({ to : replyUser.email , name : replyUser.name })
     },
   })
}




module.exports = kafkaSendemail 

