class Calculator {
  constructor(prevOperandText, currOperandText) {
    this.prevOperandText = prevOperandText
    this.currOperandText = currOperandText
    this.clear()
  }

  clear() {
    this.currOperand = ''
    this.prevOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if(number === '.' && this.currOperand.includes('.')) return
    this.currOperand = this.currOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if(this.currOperand === '') {
      this.operation = operation
      return
    }
    if(this.prevOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.prevOperand = this.currOperand
    this.currOperand = ''
  }

  compute() {
    let result
    const prevVal = parseFloat(this.prevOperand)
    const currVal = parseFloat(this.currOperand)
    if(isNaN(prevVal) || isNaN(currVal)) return

    switch(this.operation) {
      case '+':
        result = prevVal + currVal
        break;
      case '-':
        result = prevVal - currVal
        break;
      case '×':
        result = prevVal * currVal
        break;
      case '÷':
        result = prevVal / currVal
        break;
      default:
        return
    }

    this.currOperand = result
    this.operation = undefined
    this.prevOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    
    let integerDisplay
    if(isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('hi', {maximumFractionDigits: 0})
    }
    if(decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currOperandText.innerText = this.getDisplayNumber(this.currOperand)
    if(this.operation != null) {
      this.prevOperandText.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
    } else {
      this.prevOperandText.innerText = this.getDisplayNumber(this.prevOperand)
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOperandText = document.querySelector('[data-previous-operand]')
const currOperandText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevOperandText, currOperandText)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})