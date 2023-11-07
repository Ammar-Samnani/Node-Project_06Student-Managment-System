import inquirer from "inquirer";

class Student {
    name: string;
    age: number;
    stdClass: number;
    student_courses: string[];
    static std_ID = 10000;

    constructor(stdName: string, stdAge: number, stdClass: number, student_courses: string[]) {
        this.name = stdName;
        this.age = stdAge;
        this.stdClass = stdClass;
        this.student_courses = student_courses;
    }

    student_status = () => {
        let status = `Name = ${this.name}\nAge = ${this.age}\nStudent ID = ${this.generate_ID()}\nClass = ${this.stdClass}\nEnroll Courses = ${this.student_courses}`;
        console.log(status);
    }

    generate_ID = () => {
        let id = ++Student.std_ID;
        return id;
    }
}

const students: Student[] = [];


async function main() {
    let operation;

    do {
        operation = await inquirer.prompt([
            {
                name: "operation_selection",
                type: "list",
                message: "Select the Operation",
                choices: ["Add Student", "Student Status", "Exit"],
            },
        ]);

        if (operation.operation_selection === "Add Student") {
            const std_detail = await inquirer.prompt([
                {
                    name: "std_name",
                    type: "input",
                    message: "Enter Student Full Name: ",
                },
                {
                    name: "std_age",
                    type: "number",
                    message: "Enter Student Age in Number: ",
                },
                {
                    name: "std_class",
                    type: "input",
                    message: "Enter Student Class: ",
                },
                {
                    name: "courses",
                    type: "checkbox",
                    message: "Select the Courses: ",
                    choices: [
                        "Python",
                        "Typescript",
                        "Blockchain",
                        "Cloud Computing",
                        "Internet of Thing",
                        "Node.js",
                        "Metaverse",
                    ],
                },
            ]);
            create_std_obj(std_detail.std_name, std_detail.std_age, std_detail.std_class, std_detail.courses);
        } else if (operation.operation_selection === "Student Status") {
            const studentName = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter the student's full name for status (Note:Chase Sensitive): ",
                },
            ]);
            displayStudentStatus(studentName.name);
        }
    } while (operation.operation_selection !== "Exit");
}

function create_std_obj(name: string, age: number, std_class: number, std_courses: string[]) {
    let std = new Student(name, age, std_class, std_courses);
    students.push(std);
    std.student_status();
}

function displayStudentStatus(studentName: string) {
    const student = students.find((std) => std.name === studentName);
    if (student) {
        student.student_status();
    } else {
        console.log(`Student '${studentName}' not found.`);
    }
}

main();
