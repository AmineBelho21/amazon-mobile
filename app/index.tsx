import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {

  const [data, setData] = useState<any>(null);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/articles`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setData(data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="color-red-500">Edit tshehe to edit this screen.</Text>
      {data && <Text className="color-blue-500">{JSON.stringify(data)}</Text>}
    </View>
  );
}
