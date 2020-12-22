export const resolvers = {
 Query: {
     hello: (parent, args, context) => 'hi!',
     feed: (parent, {data: { id }}, {prisma}) => prisma.feed.findUnique({where: {id}}),
     feeds: (parent, args, {prisma}) => prisma.feed.findMany()
 },
 Mutation: {
     createFeed: async (parent, {data}, {prisma, user}) => {
         const result = await prisma.feed.create({data: {...data}})
         return result
     }
 }   
}