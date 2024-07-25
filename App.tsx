import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';



const MAX_DIGITS_BEFORE_OPERATOR = 10; // מקסימום ספרות או אופרטורים לפני אופרטור חישוב
const MAX_DIGITS_AFTER_OPERATOR = 11; // מקסימום ספרות או אופרטורים לאחר אופרטור חישוב
const MAX_RESULT_LENGTH = 22; // מקסימום אורך התוצאה

const App = () => {
  const [input, setInput] = useState('');
  const [lastOperator, setLastOperator] = useState(false);

  const handlePress = (value) => {
    if (value === '%' ){
       if (/^\d+(\.\d*)?$/.test(input)) {setInput(parseFloat(input)/100)
       }else 
       if(!isNaN(parseFloat(input.charAt(input.length - 1)))){
        const match = input.match(/\d+$/);
        let num_conv_to_perc = (match[0]);
        let relevant_input = input.slice(0,(input.length - (num_conv_to_perc.length + 1)));
        let fixed_value = (eval(relevant_input)/100)*parseFloat(num_conv_to_perc);
        setInput(input.slice(0,(input.length - (num_conv_to_perc.length))) + fixed_value) 
      } 
      } 

    else if (['+', '-', '*', '/'].includes(value)) {
      if (input.length > 0 && !lastOperator) {
        setInput(input + value);
        setLastOperator(true);
      }
      }else if (value === '+-' && !lastOperator) {
      // הפיכת הסימן של המספר האחרון
      const lastOperatorIndex = Math.max(input.lastIndexOf('+'), input.lastIndexOf('-'), input.lastIndexOf('*'), input.lastIndexOf('/'));
      let lastSegment = input.slice(lastOperatorIndex);

      if (input.charAt(lastOperatorIndex)=== '-'){
        value = '+'
      } else {
        value = '-'
      }
      
      if (lastSegment) {
        // אם המספר האחרון מתחיל ב-, הורד את ה-
        if (input.charAt(lastOperatorIndex) === '-'|| '+') {
          setInput(input.slice(0, lastOperatorIndex) + value + lastSegment.slice(1));
        } else {
          setInput(input.slice(0, lastOperatorIndex + 1) + value + lastSegment);
        }
          // lastSegment = input.slice(lastOperatorIndex + 1);
        
      }
    } else {
      const currentDigitCount = input.replace(/[^0-9]/g, '').length;
      const hasOperator = /[+\-*/]/.test(input);
  
      if (hasOperator) {
        if (currentDigitCount < MAX_DIGITS_AFTER_OPERATOR) {
          setInput(input + value);
          setLastOperator(false);
        }
      } else {
        if (input.length < MAX_DIGITS_BEFORE_OPERATOR || (input.length < MAX_DIGITS_BEFORE_OPERATOR + MAX_DIGITS_AFTER_OPERATOR)) {
          setInput(input + value);
          setLastOperator(value === '+' || value === '-' || value === '*' || value === '/');
        }
      }
    }
  };
  


  const handleClear = () => {
    setInput('');
    setLastOperator(false);
  };

  const calculate = (expression) => {
    try {
      const percentageExpression = expression

      const result = new Function('return ' + percentageExpression)();
      
      const resultString = result.toString();
      return resultString.length > MAX_RESULT_LENGTH
        ? resultString.slice(0, MAX_RESULT_LENGTH) // תיקון: חיתוך התוצאה מצד שמאל ולא ימין
        : resultString;
    } catch (e) {
      return 'Error';
    }
  };

  const handleEqual = () => {
    setInput(calculate(input).toString());
    setLastOperator(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{input}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('+-')}>
          <Text style={styles.buttonText}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('%')}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('*')}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.equalButton} onPress={handleEqual}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderColor: '#0000ff',
    borderWidth: 5,
    borderRadius: 10,
  },
  displayContainer: {
    backgroundColor: '#00a000',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  displayText: {
    fontSize: 48,
    color: 'white',
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ff00ff',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
  },
  equalButton: {
    backgroundColor: '#ff0000',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3.5,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default App;
