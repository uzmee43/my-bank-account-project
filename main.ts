#! /usr/bin/env node

import inquirer from "inquirer";
// Bank account interface
interface BankAccount{
    accountNumber:number;
    balance:number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance():void

}
// Bank account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;
    constructor(accountNumber:number,balance:number)
    {this.accountNumber = accountNumber;
        this.balance = balance;
    } 
    // dabit money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount
            console.log(`withdrawal of $ ${amount} successfull. Remaining balance is $ ${this.balance}`);
            
        }else{this.balance !== this.balance
            console.log("Insufficient balance");
            
        }
    }
    // credit money
    deposit(amount: number): void {
        if(amount >100){
            amount -=1;
        }this.balance += amount;
        console.log(`Deposit of $ ${amount} successful. your Remaining balance $ ${this.balance}`);
        
    }
    // checkBalance

    checkBalance(): void {
        console.log(`Current balance is $ ${this.balance}`);
           
    }

}
// customer class
class Customers{
    fistName:string;
    lastName:string;
    gender:string
    age:number;
    moblieNO:number;
    account:BankAccount
    constructor( fistName:string,lastName:string,gender:string,  age:number, moblieNO:number, account:BankAccount){
        this.fistName = fistName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.moblieNO = moblieNO;
        this.account = account
    }

}
// creat a bank account
const accounts:BankAccount[]=[
    new BankAccount(5000,1000),
    new BankAccount(5001,2000),
    new BankAccount(5002,500)
]
// creat a customer
const customers:Customers[] = [
    new Customers("uzma","khan","female",27,3456789000,accounts[0]),
    new Customers("hani","khan","female",20,3356789000,accounts[1]),
    new Customers("huzaifa","khan","male",30,3456789000,accounts[2]),
]
//  function



async function service() {
    do{

        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type: "number",
            message:"Enter your account number"

        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`WELLCOME ${customer.fistName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"select an operation please!",
                choices:["Despoist","Withdraw","check Balance","Exit"]
            }])
            switch(ans.select){
                case "Despoist":
                    const depositAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"Enter the amount to deposit"
                    })
                    customer.account.deposit(depositAmount.amount)
                    break;

                        case "Withdraw":
                            const withdrawAmount = await inquirer.prompt({
                                name:"amount",
                                type:"number",
                                message:"Enter the amount to withdraw"
                            })
                            customer.account.withdraw(withdrawAmount.amount)
                            break;
                            case "check Balance":
                                customer.account.checkBalance();
                                break;
                                case "Exit":
                                    console.log(`Exiting the bank program.........`);
                                    console.log("\n**********Thank you for using our bank services**********");
                                    return;
                                    
                                    

            }
        }else{
            console.log("Invalid account number. Try again please");
            
        }



    }while(true)
    
}
service()





























































