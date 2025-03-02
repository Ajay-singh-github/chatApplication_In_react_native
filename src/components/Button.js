import { TouchableOpacity, Text } from 'react-native';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: 'blue', padding: 10, marginBottom: 10 }}
    >
      <Text style={{ color: 'white' }}>{title}</Text>
    </TouchableOpacity>
  );
}
