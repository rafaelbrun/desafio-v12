import { Component } from '@angular/core';
import { CalculatorService } from 'src/app/shared/services/calculator.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {

  numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  equation: string = '';
  errorMessage: string = '';
  name: string = '';

  bracketsOpen: number = 0;

  isSolved: boolean = false;

  constructor(
    private calculatorService: CalculatorService
  ) { }

  handleDigitButton(character: string) {
    if (this.isSolved) { this.equation = ''; this.isSolved = false }

    if (!this.validateBrackets(character) || !this.validateOperators(character)) {
      return;
    }

    this.errorMessage = '';

    character == ' )' && this.bracketsOpen++;
    character == '( ' && this.bracketsOpen--;

    this.equation += character;
  }

  handleEquation() {
    if (this.name == '') {
      this.showErrorMessage('Informe o seu nome');
      return;
    }

    if (this.bracketsOpen != 0) {
      this.showErrorMessage('Existem parenteses aberto');
      return;
    }

    this.errorMessage = '';
    this.bracketsOpen = 0;
    this.isSolved = true;
    this.equation = this.calculatorService.calculate(this.equation, this.name);
  }

  handleClean() {
    this.equation = '';
    this.errorMessage = '';
    this.bracketsOpen = 0;
  }

  handleDeleteCharacter() {
    const lastCharacter = this.equation[this.equation.length - 1];
    this.errorMessage = '';

    lastCharacter == ' )' && this.bracketsOpen++;
    lastCharacter == '( ' && this.bracketsOpen--;

    if (lastCharacter == ' ') {
      this.equation = this.equation.slice(0, -3);
      return;
    }

    this.equation = this.equation.slice(0, -1);
  }

  validateBrackets(character: string) {
    const lastCharater = this.equation[this.equation.length - 1];

    if (character == ' )' && this.bracketsOpen == 0) {
      this.showErrorMessage('Não há parenteses aberto');
      return false;
    }

    if (character == ' )' && lastCharater == '( ') {
      this.showErrorMessage('Conteúdo dos paranteses não pode ser vazio');
      return false;
    }

    if (character == '( ' && lastCharater != ' ' && this.equation != '' && lastCharater != '( ') {
      this.showErrorMessage('É necessário um operador antes de parenteses');
      return false;
    }

    if (this.numbers.includes(character) && lastCharater == ' )') {
      this.showErrorMessage('É necessário um operador depois de parenteses');
      return false;
    }

    return true;
  }

  validateOperators(character: string) {
    if (this.numbers.includes(character) || character == '( ') {
      return true;
    }

    if (this.equation[this.equation.length - 1] == ' ' || this.equation == '') {
      this.showErrorMessage('É necessário um número antes do operador');
      return false;
    }

    return true;
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
  }
}
