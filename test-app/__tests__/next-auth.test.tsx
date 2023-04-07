const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("My e2e test", () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@example.com",
        password: "password",
        role: "admin"
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  test("My test case", async () => {
    const users = await prisma.user.findMany();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe("Alice");
    expect(users[0].email).toBe("alice@example.com");
    expect(users[0].password).toBe("password");
    expect(users[0].role).toBe("admin");
  });
});
