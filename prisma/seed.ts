import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@hermoso.local";
  const adminPassword = "admin1234";

  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    console.log("✅ کاربر ادمین از قبل وجود دارد");
    console.log(`   ایمیل: ${adminEmail}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      name: "مدیر سایت",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("🎉 کاربر ادمین ساخته شد:");
  console.log(`   ایمیل: ${adminEmail}`);
  console.log(`   رمز عبور: ${adminPassword}`);
  console.log("");
  console.log("⚠️  بعد از اولین ورود، رمز رو عوض کن!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });