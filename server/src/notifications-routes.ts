import WebPush from 'web-push'
import { FastifyInstance } from "fastify"
 import { prisma } from "./lib/prisma"
 import { z } from "zod"


 const publicKey = "BKtl2csD4YsRNKfqDuvGekvKfl14H8cdoHBTrROYwz4cu-vLyhGRnOqKwCAdzGw1Bzcaadz1JL5vYPQH3aEsKbQ"
 const privateKey = "6I0OiU0gk9BICE95lbBPS_ncltahOn5rWm-1loInwNE"

 WebPush.setVapidDetails('http://localhost:3333', publicKey, privateKey,)
 
 export async function notificationsRoutes(app:FastifyInstance){


  app.get('/push/public_key', (request, reply) => {
    return {
      publicKey
    }
  })


  
  app.post('/push/register', async (request, reply) => {
    console.log(request.body)

    return reply.status(201).send()
  });


  app.post('/push/send', async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh : z.string(),
          auth: z.string()
        })
      })
    })

    const { subscription } = sendPushBody.parse(request.body)

    WebPush.sendNotification(subscription, 'batata')
    
    return reply.status(201).send()
  });


 }

 