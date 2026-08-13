import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center p-5 bg-background-dark">
      <Text className="text-2xl font-bold text-foreground-dark">This is a modal</Text>
      <Link href="/" dismissTo className="mt-4 py-4">
        <Text className="text-brand-500 text-base">Go to home screen</Text>
      </Link>
    </View>
  );
}
