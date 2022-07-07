// Dependencies
const readline = require('readline')
const { stdin: input, stdout: output } = require('process')

// creating a console interface for input and output processes
const reader = readline.createInterface({ input, output })

// importing utils 
const { caesarEncoded, caesarDecoded } = require('./utils/secure')

// information  for the user
console.info('\n🔐 Cipher Generator!\n')
console.info('Rules:')
console.info('Your input should be in the format: message message-shift-number')
console.info('An example is: "I am a Daniel" 2')

// prompt the user for his/her name
reader.question('\nEnter the message you want to encrypt and a shift number: ', (expression) => {
    // assigning the variable data from the input stream
    let data = expression

    // split by string and number using regex
    data = data.match(/(?:[^\s"]+|"[^"]*")+/g)

    // get the message and shift number from the data varible by splitting it since it is a string
    let message = data[0]
    let shiftno  = data[1]

    // converting the shiftno varible to the number data type
    shiftno = Number(shiftno)

    // checks if message is a string
    if (typeof message !== 'string' || typeof message === 'undefined') { 
        console.log('Please enter a valid message!')
        process.exit(1)
    }

    // checks if shiftno is a number
    if (typeof shiftno !== 'number' || typeof shiftno === 'undefined' || isNaN(shiftno) ) { 
        console.log('Please enter a valid number!')
        process.exit(1)
    }


    const ENCRYPTED = caesarEncoded(message, shiftno)
    console.log(`Your encrypted message is: ${ENCRYPTED}\n`)
    
    reader.question("Do you want to decrypt your message? (Y/N) ", (answer) => { 
        let revert = answer

        if(revert == 'Y') {
            try {
                const DECRYPTED = caesarDecoded(ENCRYPTED, shiftno)
                console.log(`Your decrypted message is: ${DECRYPTED}\n`)

                // close the readline process 
                reader.close();
            } catch (error) {
                console.log(`An error occured - ${error.message}`)
            }
        } 
        reader.close()
    })
    
}) 