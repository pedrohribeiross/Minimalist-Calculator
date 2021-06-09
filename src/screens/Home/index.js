import React, {useEffect, useState, useContext} from 'react';
import {Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ThemeContext} from 'styled-components';

import CustomButtom from '../../components/CustomButton';
import CustomScreen from '../../components/CustomScreen';

import {Container, RowButtonArea, SwitchArea} from './style';

export default ({toggleTheme}) => {
  const [input, setInput] = useState('');
  const [prevNum, setPrevNum] = useState('');
  const [curNum, setCurNum] = useState('');
  const [operator, setOperator] = useState('');

  const {colors, title} = useContext(ThemeContext);

  useEffect(() => {
    const math_it_Up = {
      '+': function (x, y) {
        return x + y;
      },
      '-': function (x, y) {
        return x - y;
      },
      '*': function (x, y) {
        return x * y;
      },
      '/': function (x, y) {
        return x / y;
      },
    };

    if (curNum !== '') {
      if (operator !== '') {
        let solution = math_it_Up[operator](
          parseFloat(prevNum),
          parseFloat(curNum),
        );

        setInput(solution);
        setOperator('');
        setCurNum('');
      }
    }
  }, [curNum, operator, prevNum]);

  const clickButton = e => {
    if (e === '+' || e === '-' || e === '/' || e === '*') {
      operation_Func(e);
    } else {
      setInput(input + e);
    }
  };

  const addPercentage = () => {
    setInput(input / 100);
  };

  const addPlusMinus = () => {
    if (input > 0) {
      setInput(-input);
    } else if (input < 0) {
      setInput(Math.abs(input));
    }
  };

  const addDecimalToInput = e => {
    if (input.indexOf('.') === -1) {
      setInput(input + e);
    }
  };

  const handleClear = () => {
    setInput('');
    setPrevNum('');
    setCurNum('');
    setOperator('');
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const solve = () => {
    setCurNum(input);
    setInput('');
  };

  function operation_Func(e) {
    setPrevNum(input);
    setInput('');
    setOperator(e);
  }

  return (
    <Container colors={[colors.primary, colors.secondary]} locations={[0, 0.8]}>
      <SwitchArea>
        <Icon name="sun" size={20} color={colors.colorFunctionPrimary} solid />
        <Switch
          value={title === 'dark'}
          onValueChange={toggleTheme}
          thumbColor={colors.colorSwitch}
          trackColor={{
            false: colors.colorFunctionPrimary,
            true: colors.colorFunctionSecondary,
          }}
        />
        <Icon
          name="moon"
          size={20}
          color={colors.colorFunctionSecondary}
          solid
        />
      </SwitchArea>
      <CustomScreen inputValue={input} />

      <RowButtonArea>
        <CustomButtom
          btn="C"
          color={colors.colorFunctionSecondary}
          onPress={handleClear}
        />
        <CustomButtom
          btn="+/-"
          color={colors.colorFunctionSecondary}
          onPress={() => addPlusMinus()}
        />
        <CustomButtom
          btn={<Icon name="percentage" size={25} />}
          color={colors.colorFunctionSecondary}
          onPress={() => addPercentage()}
        />
        <CustomButtom
          btn={<Icon name="divide" size={25} />}
          color={colors.colorFunctionPrimary}
          onPress={() => clickButton('/')}
        />
      </RowButtonArea>

      <RowButtonArea>
        <CustomButtom btn="7" onPress={() => clickButton('7')} />
        <CustomButtom btn="8" onPress={() => clickButton('8')} />
        <CustomButtom btn="9" onPress={() => clickButton('9')} />
        <CustomButtom
          btn={<Icon name="times" size={25} />}
          color={colors.colorFunctionPrimary}
          onPress={() => clickButton('*')}
        />
      </RowButtonArea>

      <RowButtonArea>
        <CustomButtom btn="4" onPress={() => clickButton('4')} />
        <CustomButtom btn="5" onPress={() => clickButton('5')} />
        <CustomButtom btn="6" onPress={() => clickButton('6')} />
        <CustomButtom
          btn={<Icon name="minus" size={25} />}
          color={colors.colorFunctionPrimary}
          onPress={() => clickButton('-')}
        />
      </RowButtonArea>

      <RowButtonArea>
        <CustomButtom btn="1" onPress={() => clickButton('1')} />
        <CustomButtom btn="2" onPress={() => clickButton('2')} />
        <CustomButtom btn="3" onPress={() => clickButton('3')} />
        <CustomButtom
          btn={<Icon name="plus" size={25} />}
          color={colors.colorFunctionPrimary}
          onPress={() => clickButton('+')}
        />
      </RowButtonArea>

      <RowButtonArea>
        <CustomButtom btn="0" onPress={() => clickButton('0')} />
        <CustomButtom btn="." onPress={() => addDecimalToInput('.')} />
        <CustomButtom
          btn={<Icon name="backspace" size={25} />}
          onPress={handleBackspace}
        />
        <CustomButtom
          btn={<Icon name="equals" size={25} />}
          background={colors.backgroundEquals}
          onPress={() => solve()}
        />
      </RowButtonArea>
    </Container>
  );
};
