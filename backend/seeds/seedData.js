import mongoose from "mongoose";
import dotenv from "dotenv";
import { Student } from "../models/Student.model.js";
import { Teacher } from "../models/Teacher.model.js";
import { Event } from "../models/event.model.js";
import { Class } from "../models/classes.model.js";
dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Event.deleteMany({});
    await Class.deleteMany({});

    // Seed Teachers
    const teachers = await Teacher.insertMany([
      {
        name: "Prof. Sarah Wilson",
        subject: "Mathematics",
        phone: "9876543213",
        email: "sarah.wilson@school.edu",
        qualification: "M.Sc Mathematics",
        experience: 8,
        salary: 45000,
        attendance: 95,
      },
      {
        name: "Dr. Robert Brown",
        subject: "Physics",
        phone: "9876543214",
        email: "robert.brown@school.edu",
        qualification: "Ph.D Physics",
        experience: 12,
        salary: 55000,
        attendance: 88,
      },
      {
        name: "Ms. Emily Davis",
        subject: "English",
        phone: "9876543215",
        email: "emily.davis@school.edu",
        qualification: "M.A English Literature",
        experience: 6,
        salary: 40000,
        attendance: 91,
      },
      {
        name: "Mr. James Wilson",
        subject: "Chemistry",
        phone: "9876543216",
        email: "james.wilson@school.edu",
        qualification: "M.Sc Chemistry",
        experience: 10,
        salary: 48000,
        attendance: 93,
      },
      {
        name: "Mrs. Lisa Anderson",
        subject: "History",
        phone: "9876543217",
        email: "lisa.anderson@school.edu",
        qualification: "M.A History",
        experience: 7,
        salary: 42000,
        attendance: 89,
      },
    ]);

    // Seed Classes
    const classes = await Class.insertMany([
      {
        name: "10-A",
        grade: "10",
        section: "A",
        capacity: 40,
        classTeacher: teachers[0]._id,
        subjects: ["Mathematics", "Physics", "Chemistry", "English", "History"],
      },
      {
        name: "10-B",
        grade: "10",
        section: "B",
        capacity: 40,
        classTeacher: teachers[1]._id,
        subjects: ["Mathematics", "Physics", "Chemistry", "English", "History"],
      },
      {
        name: "9-A",
        grade: "9",
        section: "A",
        capacity: 35,
        classTeacher: teachers[2]._id,
        subjects: ["Mathematics", "Physics", "Chemistry", "English", "History"],
      },
      {
        name: "9-B",
        grade: "9",
        section: "B",
        capacity: 35,
        classTeacher: teachers[3]._id,
        subjects: ["Mathematics", "Physics", "Chemistry", "English", "History"],
      },
    ]);

    // Seed Students
    const students = await Student.insertMany([
      {
        name: "John Doe",
        class: "10-A",
        rollNo: "10A001",
        phone: "9876543210",
        email: "john.doe@student.school.edu",
        parentName: "Michael Doe",
        parentPhone: "9876543200",
        dateOfBirth: new Date("2008-05-15"),
        attendance: 85,
      },
      {
        name: "Jane Smith",
        class: "10-A",
        rollNo: "10A002",
        phone: "9876543211",
        email: "jane.smith@student.school.edu",
        parentName: "David Smith",
        parentPhone: "9876543201",
        dateOfBirth: new Date("2008-08-22"),
        attendance: 92,
      },
      {
        name: "Mike Johnson",
        class: "9-B",
        rollNo: "9B001",
        phone: "9876543212",
        email: "mike.johnson@student.school.edu",
        parentName: "Robert Johnson",
        parentPhone: "9876543202",
        dateOfBirth: new Date("2009-03-10"),
        attendance: 78,
      },
      {
        name: "Alice Williams",
        class: "10-B",
        rollNo: "10B001",
        phone: "9876543213",
        email: "alice.williams@student.school.edu",
        parentName: "Thomas Williams",
        parentPhone: "9876543203",
        dateOfBirth: new Date("2008-11-05"),
        attendance: 94,
      },
      {
        name: "Bob Brown",
        class: "9-A",
        rollNo: "9A001",
        phone: "9876543214",
        email: "bob.brown@student.school.edu",
        parentName: "William Brown",
        parentPhone: "9876543204",
        dateOfBirth: new Date("2009-01-18"),
        attendance: 87,
      },
    ]);

    // Update class student references
    await Class.findOneAndUpdate(
      { name: "10-A" },
      { $push: { students: { $each: [students[0]._id, students[1]._id] } } }
    );

    await Class.findOneAndUpdate(
      { name: "10-B" },
      { $push: { students: students[3]._id } }
    );

    await Class.findOneAndUpdate(
      { name: "9-A" },
      { $push: { students: students[4]._id } }
    );

    await Class.findOneAndUpdate(
      { name: "9-B" },
      { $push: { students: students[2]._id } }
    );

    // Seed Events
    await Event.insertMany([
      {
        title: "Science Fair 2024",
        description: "Annual science exhibition showcasing student projects",
        date: new Date("2024-09-15"),
        type: "Academic",
        venue: "Main Auditorium",
        organizer: "Science Department",
      },
      {
        title: "Sports Day",
        description: "Inter-house sports competition",
        date: new Date("2024-10-20"),
        type: "Sports",
        venue: "Sports Ground",
        organizer: "Physical Education Department",
      },
      {
        title: "Cultural Program",
        description: "Annual cultural fest with dance, music and drama",
        date: new Date("2024-11-25"),
        type: "Cultural",
        venue: "Main Auditorium",
        organizer: "Cultural Committee",
      },
      {
        title: "Parent-Teacher Meeting",
        description: "Quarterly progress discussion",
        date: new Date("2024-08-30"),
        type: "Academic",
        venue: "Respective Classrooms",
        organizer: "Academic Office",
      },
    ]);

    console.log("✅ Sample data seeded successfully!");
    console.log(`📊 Created:`);
    console.log(`   - ${teachers.length} Teachers`);
    console.log(`   - ${students.length} Students`);
    console.log(`   - ${classes.length} Classes`);
    console.log(`   - 4 Events`);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await mongoose.connection.close();
  }
};

seedData();

export default seedData;
