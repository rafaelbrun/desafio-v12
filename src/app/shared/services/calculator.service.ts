import { Injectable } from "@angular/core";
import { storeKeys } from "../constants/storeKeys";

@Injectable({ providedIn: 'root' })
export class CalculatorService {

    public calculate(equation: string, name: string): string {
        let components = (equation.split(" "));

        let numbers: number[] = [];
        let operators: string[] = [];
        let levels = 0;
        let index = 0;

        components.forEach(component => {
            /[0-9.]/.test(component) ? numbers.push(parseInt(component)) : operators.push(component);
        })

        if (operators.includes('(')) {
            const { deepestLevel, deepestIndex } = this.getDeepestLevel(components);
            levels = deepestLevel;
            index = deepestIndex;

            while (levels > 0) {
                numbers = [];
                operators = [];

                const insideComponents = components.slice(index + 1, components.indexOf(')', index));

                insideComponents.forEach(component => {
                    /[0-9.]/.test(component) ? numbers.push(parseInt(component)) : operators.push(component);
                })
                this.resolveComplexEquation(numbers, operators);

                components.splice(index + 1, (components.indexOf(')', index) + 1) - (index + 1));
                components[index] = numbers[0].toFixed(2).toString();

                const { deepestLevel, deepestIndex } = this.getDeepestLevel(components);
                levels = deepestLevel;
                index = deepestIndex;
            }

            components.forEach(component => {
                /[0-9.]/.test(component) ? numbers.push(parseInt(component)) : operators.push(component);
            })
            this.resolveComplexEquation(numbers, operators);
        } else {
            this.resolveComplexEquation(numbers, operators);
        }

        const result = numbers[0].toFixed(2).toString();
        this.saveOperation(equation, result, name);

        return result;
    }

    private resolveComplexEquation(numbers: number[], operators: string[]) {
        while (operators.length > 0) {
            if (operators.includes('*')) {
                const index = operators.indexOf('*');
                numbers[index] = this.resolveSimpleEquation(numbers[index], numbers[index + 1], operators[index]);
                numbers.splice(index + 1, 1);
                operators.splice(index, 1);

                continue;
            }
            if (operators.includes('/')) {
                const index = operators.indexOf('/');
                numbers[index] = this.resolveSimpleEquation(numbers[index], numbers[index + 1], operators[index]);
                numbers.splice(index + 1, 1);
                operators.splice(index, 1);

                continue;
            }
            if (operators.includes('-')) {
                const index = operators.indexOf('-');
                numbers[index] = this.resolveSimpleEquation(numbers[index], numbers[index + 1], operators[index]);
                numbers.splice(index + 1, 1);
                operators.splice(index, 1);

                continue;
            }
            if (operators.includes('+')) {
                const index = operators.indexOf('+');
                numbers[index] = this.resolveSimpleEquation(numbers[index], numbers[index + 1], operators[index]);
                numbers.splice(index + 1, 1);
                operators.splice(index, 1);
            }
        }
    }

    private resolveSimpleEquation(firstNumber: number, secondNumber: number, operator: string) {
        switch (operator) {
            case '+':
                return firstNumber + secondNumber;

            case '-':
                return firstNumber - secondNumber;

            case '*':
                return firstNumber * secondNumber;

            case '/':
                return firstNumber / secondNumber;

            default:
                return 0;
        }
    }

    private getDeepestLevel(operators: string[]) {
        let currentLevel = 0;
        let deepestLevel = 0;
        let deepestIndex = 0;
        operators.forEach((operator, index) => {
            operator == '(' && currentLevel++;
            operator == ')' && currentLevel--;

            if (currentLevel > deepestLevel) {
                deepestLevel = currentLevel
                deepestIndex = index;
            }
        })

        return {
            deepestLevel,
            deepestIndex
        };
    }

    private saveOperation(equation: string, result: string, name: string) {
        const currenteDate = this.getDateToString(new Date());
        const data = currenteDate + '   ' + name + ' | ' + equation + ' = ' + result;

        let results = JSON.parse(localStorage.getItem(storeKeys.HISTORY_OPERATION) || '[]');
        results.push(data);
        localStorage.setItem(storeKeys.HISTORY_OPERATION, JSON.stringify(results));
    }

    private getDateToString(date: Date) {
        const dateISO = date.toISOString().split('T')[0];
        const dateSplit = dateISO.split(/[\s-]+/);
        return dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
    }
}