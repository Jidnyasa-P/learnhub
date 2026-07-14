const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userSchema = require("./schemas/userModel");
const courseSchema = require("./schemas/courseModel");

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("Error: MONGO_URI is not defined in environment variables.");
      process.exit(1);
    }

    console.log("Connecting to database...");
    await mongoose.connect(mongoUri, {
      dbName: 'video-course-application',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully.");

    // Warning and wiping collections
    console.warn("WARNING: Wiping existing users and courses collections...");
    await userSchema.deleteMany({});
    await courseSchema.deleteMany({});
    console.log("Collections wiped.");

    // Generate hashed passwords
    const salt = await bcrypt.genSalt(10);

    const adminEmail = process.env.SEED_ADMIN_EMAIL || "learn@learnhub.com";
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || "changethispassword";
    const hashedAdminPassword = await bcrypt.hash(adminPassword, salt);

    const teacherPassword = "teacherpassword";
    const hashedTeacherPassword = await bcrypt.hash(teacherPassword, salt);

    const student1Password = "student1password";
    const hashedStudent1Password = await bcrypt.hash(student1Password, salt);

    const student2Password = "student2password";
    const hashedStudent2Password = await bcrypt.hash(student2Password, salt);

    // Create Admin
    const admin = new userSchema({
      name: "System Admin",
      email: adminEmail,
      password: hashedAdminPassword,
      type: "Admin",
      isVerified: true,
    });
    await admin.save();

    // Create Teacher
    const teacher = new userSchema({
      name: "Jane Educator",
      email: "teacher@learnhub.com",
      password: hashedTeacherPassword,
      type: "Teacher",
      isVerified: true,
    });
    await teacher.save();

    // Create Student 1
    const student1 = new userSchema({
      name: "Alex Learner",
      email: "student1@learnhub.com",
      password: hashedStudent1Password,
      type: "Student",
      isVerified: true,
    });
    await student1.save();

    // Create Student 2
    const student2 = new userSchema({
      name: "Chris Student",
      email: "student2@learnhub.com",
      password: hashedStudent2Password,
      type: "Student",
      isVerified: true,
    });
    await student2.save();

    console.log("Users seeded successfully.");

    // Create sample courses assigned to the teacher
    const sampleCourses = [
      {
        userId: teacher._id.toString(),
        C_educator: teacher.name,
        C_title: "Introduction to HTML and CSS",
        C_categories: "Web Development",
        C_price: "0", // free
        C_description: "Learn the fundamentals of structuring and styling web pages using HTML5 and CSS3.",
        sections: [
          {
            S_title: "Course Introduction",
            S_content: { filename: "intro.mp4", path: "/uploads/intro.mp4" },
            S_description: "Welcome to the course and introduction to the tools.",
          },
          {
            S_title: "HTML Basics",
            S_content: { filename: "html_basics.mp4", path: "/uploads/html_basics.mp4" },
            S_description: "Learn about tags, attributes, and basic page layout.",
          }
        ],
      },
      {
        userId: teacher._id.toString(),
        C_educator: teacher.name,
        C_title: "Modern JavaScript (ES6+)",
        C_categories: "Programming",
        C_price: "29",
        C_description: "Master modern JavaScript syntax, async/await, modules, and ES6+ features.",
        sections: [
          {
            S_title: "Let, Const, and Arrow Functions",
            S_content: { filename: "es6_intro.mp4", path: "/uploads/es6_intro.mp4" },
            S_description: "An overview of variable declaration changes and arrow function syntax.",
          }
        ],
      },
      {
        userId: teacher._id.toString(),
        C_educator: teacher.name,
        C_title: "React Fundamentals for Beginners",
        C_categories: "Web Development",
        C_price: "49",
        C_description: "Build robust frontend web applications using React components, props, state, and hooks.",
        sections: [
          {
            S_title: "Introduction to Components",
            S_content: { filename: "react_components.mp4", path: "/uploads/react_components.mp4" },
            S_description: "Learn how to write functional components and style them.",
          }
        ],
      },
      {
        userId: teacher._id.toString(),
        C_educator: teacher.name,
        C_title: "Node.js and Express REST APIs",
        C_categories: "Backend Development",
        C_price: "39",
        C_description: "Build powerful, scalable backend server applications with Node.js and Express.js framework.",
        sections: [
          {
            S_title: "Express Server Setup",
            S_content: { filename: "express_setup.mp4", path: "/uploads/express_setup.mp4" },
            S_description: "Initialize your Node app and configure your first Express server.",
          }
        ],
      },
    ];

    for (const courseData of sampleCourses) {
      const course = new courseSchema(courseData);
      await course.save();
    }

    console.log("Courses seeded successfully.");
    console.log("\n========================================================");
    console.log("SEEDING COMPLETED. USE THE FOLLOWING TEST CREDENTIALS:");
    console.log(`1. ADMIN:    Email: ${adminEmail} | Password: ${adminPassword}`);
    console.log(`2. TEACHER:  Email: teacher@learnhub.com | Password: ${teacherPassword}`);
    console.log(`3. STUDENT 1:Email: student1@learnhub.com | Password: ${student1Password}`);
    console.log(`4. STUDENT 2:Email: student2@learnhub.com | Password: ${student2Password}`);
    console.log("========================================================\n");

    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
