import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.magenta("*********WELCOME TO STUDENT MANAGMENT SYSTEM********"));
console.log(chalk.yellow("_".repeat(70)));
//Define the student class
class student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 20000;
    }
    //Method to enroll student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    //Method to view astudent balance
    view_balance() {
        console.log(`balance for ${this.name} $${this.balance}`);
    }
    //Method for pay fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} fees paid sucessfully ${this.name}`);
    }
    //Method for show status
    show_status() {
        console.log(`Id ${this.id}`);
        console.log(`Name ${this.name}`);
        console.log(`Courses ${this.courses}`);
        console.log(`Balance ${this.balance}`);
    }
}
//defining the student manager class to manage student
class student_manager {
    Students;
    constructor() {
        this.Students = [];
    }
    //Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.Students.push(student);
        console.log(`student :${name} added successfully.student.id:${student.id}`);
    }
    //Method to enroll astudent in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} sucessfully`);
        }
    }
    //Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("student not found please enter a correct student id");
        }
    }
    // method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("student not found please enter acorrect student id");
        }
    }
    //Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    //Method to finf a student from student id
    find_student(student_id) {
        return this.Students.find(std => std.id === student_id);
    }
}
//Main function to run the program
async function main() {
    let student_manager = new Student_manager();
    // while loop to keep program running
    while (true) {
        let program = await inquirer.prompt([
            {
                name: "program",
                type: "list",
                message: "select an option",
                choices: [
                    "add student",
                    "enroll student",
                    "view student balance",
                    "pay fees",
                    "show status",
                    "exit",
                ]
            }
        ]);
        // using switch case to handle user program
        switch (program.choice) {
            case "add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "enter a student name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "enter a course name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "view student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "pay fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "enter the amount to pay",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
