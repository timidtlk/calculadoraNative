import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import { useState } from 'react';
import Display from './components/Display';

export default function App() {
  const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  }
  
  const [state, setState] = useState(initialState);
  const [displayValue, setDisplayValue] = useState(state.displayValue);

  const addDigit = n => {
    if (n === '.' && state.displayValue.includes('.')) {
      return;
    }
    const clearDisplay = state.displayValue === '0' || state.clearDisplay;
    const currentValue = clearDisplay ? '' : state.displayValue;
    const updatedDisplayValue = currentValue + n;

    setState((prevState) => ({
      ...prevState,
      displayValue: updatedDisplayValue,
      clearDisplay: false
    }));

    if (n !== '.') {
      const newValue = parseFloat(updatedDisplayValue);
      const updatedValues = [...state.values];
      updatedValues[state.current] = newValue;

      setState((prevState) => ({
        ...prevState,
        values: updatedValues
      }));
    }
  };
  const clearMemory = () => {
    setState(initialState);
  };
  const setOperation = operation => {
    if (state.current === 0) {
      setState((prevState) => ({
        ...prevState,
        operation,
        current: 1,
        clearDisplay: true
      }));
    } else {
      const equals = operation === '=';
      const values = [...state.values];
      try {
        values[0] = eval(`${values[0]} ${state.operation} ${values[1]}`)
      } catch (e) {
        values[0] = state.values[0];
      }
      values[1] = 0;
      setState((prevState) => ({
        ...prevState,
        displayValue: values[0].toString(),
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      }))
    }
  };

  return (
    <View style={styles.Container}>
      <Display value={state.displayValue} />
      <View style={styles.buttons}>
        <Button label='AC' triple onClick={() => clearMemory()} />
        <Button label='÷' operation onClick={() => setOperation('/')} />
        <Button label='7' onClick={() => addDigit('7')} />
        <Button label='8' onClick={() => addDigit('8')} />
        <Button label='9' onClick={() => addDigit('9')} />
        <Button label='×' operation onClick={() => setOperation('*')} />
        <Button label='4' onClick={() => addDigit('4')} />
        <Button label='5' onClick={() => addDigit('5')} />
        <Button label='6' onClick={() => addDigit('6')} />
        <Button label='-' operation onClick={() => setOperation('-')} />
        <Button label='1' onClick={() => addDigit('1')} />
        <Button label='2' onClick={() => addDigit('2')} />
        <Button label='3' onClick={() => addDigit('3')} />
        <Button label='+' operation onClick={() => setOperation('+')} />
        <Button label='0' double onClick={() => addDigit('0')} />
        <Button label='.' onClick={() => addDigit('.')} />
        <Button label='=' operation onClick={() => setOperation('=')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
