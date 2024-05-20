import { PrismaClient } from "@prisma/client"

const seeds = ["./data/01-systemSeed.js"]
const prisma = new PrismaClient()

/**
* Seeds data in JSON format from any file provided in the seeds variable
*/
const seed = async () => {
  try {
    // Import and seed data from each file in the seeds variable
    for (let i = 0; i < seeds.length; i++) {
      let { name, data } = await import(seeds[i])
      await prisma[name].createMany({
        data: data,
      })
    }

    console.log("Database successfully seeded")

    await prisma.$disconnect() // Disconnect from the database
  } catch (err) {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1) // Exit the process
  }
}

seed()
