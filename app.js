const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { type } = require("os");
// const Employee = require("./lib/Employee");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html"); //write my returned html text using fs, save file using outputPath for output directory
const render = require("./lib/htmlRenderer");


let teamComplete = false;
const team = [];
const questions = [
    {
        name:"name",
        type:"input",
        message:"Enter employee name:"
    },
    {
        name:"id",
        type:"input",
        message:"Enter employee id:"
    },
    {
        name:"email",
        type:"input",
        message:"Enter employee E-mail:"
    },
    {
        name:"role",
        type:"list",
        message:"What role does this employee hold?",
        choices:["Manager","Engineer","Intern"]
    }
]

function getMemberInfo (){
    return inquirer.prompt(questions);
}

async function addMembers(){
    try{
        return inquirer.prompt({//seperate this question and call it like the function above, then it should work
            name:"addMember",
            type:"list",
            message:"Would you like to add another team member?",
            choices:['Yes','No']
        })

    }catch(err){
        console.log(err);
    }
}
    //loop for amount of team members   
        async function buildMember() {
        // for await (index of numMembers){
        try {
            var roleInfo;
            const teamInfo = await getMemberInfo();
            switch (teamInfo.role){

                case "Manager":
                roleInfo = await inquirer.prompt([
                    {
                        name:"officeNumber",
                        type:"input",
                        message:"Enter Manager's office number: "
                    }
                ])
                team.push(new Manager(teamInfo.name,teamInfo.id,teamInfo.email,roleInfo.officeNumber))
                break;

                case "Engineer":
                roleInfo = await inquirer.prompt([
                    {
                        name:"github",
                        type:"input",
                        message:"Enter Engineer's GitHub username: "
                    }
                ])
                team.push(new Engineer(teamInfo.name,teamInfo.id,teamInfo.email,roleInfo.github))
                break;

                case "Intern":
                roleInfo = await inquirer.prompt([
                    {
                        name:"school",
                        type:"input",
                        message:"Enter intern's school: "
                    }
                ])
                team.push(new Intern(teamInfo.name,teamInfo.id,teamInfo.email,roleInfo.school))
                break;
            }
        } catch(err) {
            console.log(err);
        } 

    }//end async function

    async function run(){
        try{
        while(teamComplete != true){
            await buildMember();
            const cont = await addMembers();
            if(cont.addMember === 'Yes'){
            }else{
                teamComplete = true;
                var htmlFile = render(team);
                fs.writeFileSync(outputPath,htmlFile);
            } //send my html to output
        }
        }catch(err){
            console.log(err);
        } 
}
    run();

