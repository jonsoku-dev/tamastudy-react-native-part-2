import React, { FunctionComponent, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddIcon, TrashIcon } from '../../icons';
import { IBoard } from '../../../contexts/useBoardContext';

interface Props {
  type: IBoard['type'];
  title: IBoard['title'];
  calorie: IBoard['calorie'];
  createdAt: IBoard['createdAt'];
}

const MenuCard: FunctionComponent<Props> = ({
  type,
  title,
  calorie,
  createdAt,
}) => {
  const [image, setImage] = useState<string | null>(null);

  const callPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      console.log(status);
      if (status !== 'granted') {
        alert('권한이 없습니다.');
      }
    }
  };

  const onClickAddImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onClickRemoveImage = () => {
    setImage(null);
  };

  useEffect(() => {
    callPermission();
  }, []);

  return (
    <View style={styles.cardWrapper}>
      {/* Title */}
      <View style={styles.cardTitle}>
        <Text style={styles.cardTitleText}>{type}</Text>
      </View>
      {/* Content */}
      <View style={styles.cardContent}>
        {image ? (
          <View style={styles.cardImageBox}>
            <TouchableOpacity onPress={onClickAddImage}>
              <Image
                source={{ uri: image }}
                style={{ width: 160, height: 160 }}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardRemoveIcon}
              onPress={onClickRemoveImage}
            >
              <TrashIcon size={14} color={'#fff'} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={onClickAddImage}>
            <View style={styles.cardContentImage}>
              <AddIcon />
              <Text style={styles.cardContentImageText}>
                사진을 등록해주세요.
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.cardContentInfo}>
          <Text>{title}</Text>
          <Text>{calorie} kcal</Text>
          <Text>{createdAt}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {},
  cardTitle: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardContentImage: {
    width: 160,
    height: 160,
    padding: 16,
    backgroundColor: '#dfe6e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContentInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardImageBox: {},
  cardRemoveIcon: {
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    padding: 4,
  },
  cardContentImageText: {
    marginTop: 16,
  },
});

export default MenuCard;
