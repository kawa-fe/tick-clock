import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
  margin-top:60px;
  flex: 0.8;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.Image`
  align-self: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  margin:30px;
`;

export const Title = styled.Text`
  color: #2980B9; 
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  padding: 30px;
  border-radius: 20px;
`;


export const Button = styled.TouchableOpacity`
  width: 72px;
  height: 72px;
  background: #2980B9;
  border-radius: 36px;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  margin-top:20px;
`;

export const Icon = styled(MaterialIcons).attrs({
  size: 32,
  color: '#fff',
})``;

export const Progress = styled.Text`
  color: #CB356B;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`;
