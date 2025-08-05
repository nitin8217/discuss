const { PrismaClient } = require('../src/generated/prisma')
const prisma = new PrismaClient()

async function cleanupComments() {
  console.log('Starting comment cleanup...')
  
  // Find all comments with markdown GIF syntax
  const commentsWithMarkdown = await prisma.comment.findMany({
    where: {
      content: {
        contains: '![GIF]('
      }
    }
  })
  
  console.log(`Found ${commentsWithMarkdown.length} comments with markdown syntax`)
  
  // Clean up each comment
  for (const comment of commentsWithMarkdown) {
    const cleanedContent = comment.content.replace(/!\[GIF\]\((.*?)\)/g, '$1')
    
    await prisma.comment.update({
      where: { id: comment.id },
      data: { content: cleanedContent }
    })
    
    console.log(`Cleaned comment ${comment.id}: "${comment.content}" -> "${cleanedContent}"`)
  }
  
  console.log('Cleanup completed!')
  await prisma.$disconnect()
}

cleanupComments()
  .then(() => {
    console.log('Success!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })
