import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AddIcon, TrashIcon } from '../../icons';
import { IBoard, useBoardContext } from '../../../contexts/useBoardContext';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
  type: IBoard['type'];
  title: IBoard['title'];
  calorie: IBoard['calorie'];
  createdDate?: IBoard['createdDate'];
  date?: IBoard['date'];
  image?: IBoard['image'];
}

const MenuCard: FunctionComponent<Props> = ({
                                              type,
                                              title,
                                              calorie,
                                              createdDate,
                                              date,
                                              image,
                                            }) => {
  /**
   * custom hook
   */
  const { createBoard, updateBoard, deleteBoard, updateBoardImage, deleteBoardImage } = useBoardContext();

  /**
   * state
   */
  const [uploadImage, setUploadImage] = useState<any>(null);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateCalorie, setUpdateCalorie] = useState(0);
  const [editMode, setEditMode] = useState(false);

  /**
   * handle function
   */
  const handleChangeTitle = (title: string) => {
    setUpdateTitle(title);
  };

  const handleChangeCalorie = (calorie: string) => {
    setUpdateCalorie(+calorie);
  };

  /**
   * click function
   */
  const onClickCancelButton = () => {
    setEditMode(false);
  };

  const onClickSaveButton = () => {
    date ? updateBoard(
      {
        title: updateTitle,
        calorie: updateCalorie,
        type,
        date: date,
      },
      onClickCancelButton,
    ) : createBoard(
      {
        title: updateTitle,
        calorie: updateCalorie,
        type,
      },
      onClickCancelButton,
    );
  };

  const onClickAddImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setUploadImage(result.uri);
      if (date) {
        updateBoardImage({
            date,
            image: result.uri,
            type,
          },
          onClickCancelButton,
        );
      } else {
        createBoard({
            title: '타이틀을 입력해주세요.', // "타이틀을 입력해주세요."
            calorie: updateCalorie, // 0
            image: result.uri,
            type, // morning, lunch, dinner
          },
          onClickCancelButton);
      }
    }
  };

  const onClickRemoveImage = () => {
    if (date) {
      deleteBoardImage({ date, type }, onClickCancelButton);
      setUploadImage(null);
    }
  };

  const onClickDelete = (date: IBoard['date'], type: IBoard['type']) => () => {

    clearState();

    deleteBoard({
        date,
        type,
      },
      onClickCancelButton,
    );
  };

  /**
   * util function
   */
  const clearState = () => {
    setUpdateTitle('');
    setUpdateCalorie(0);
    setUploadImage(null);
  };

  /**
   * useEffect
   */

  const callPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('권한이 없습니다.');
      }
    }
  };

  useEffect(() => {
    callPermission();
  }, []);

  useEffect(() => {
    setUploadImage(image);
    setUpdateTitle(title);
    setUpdateCalorie(calorie);
  }, [image, title, calorie]);

  return (
    <View style={styles.cardWrapper}>
      {/* Title */}
      <View style={styles.cardTitle}>
        <Text style={styles.cardTitleText}>{type}</Text>
        {date && (
          <TouchableOpacity onPress={onClickDelete(date, type)}>
            <Text style={{ color: 'red' }}>
              DELETE
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Content */}
      <View style={styles.cardContent}>
        {uploadImage ? (
          <View style={styles.cardImageBox}>
            <TouchableOpacity onPress={onClickAddImage}>
              <Image
                source={{ uri: uploadImage }}
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
        {editMode ? (
          <View style={styles.cardContentInfo}>
            <TextInput
              style={[styles.baseInput]}
              value={updateTitle}
              onChangeText={handleChangeTitle}
            ></TextInput>
            <TextInput
              keyboardType={'number-pad'}
              style={[styles.baseInput]}
              value={String(updateCalorie)}
              onChangeText={handleChangeCalorie}
            ></TextInput>
            <View style={styles.inputButtonBox}>
              <Button onPress={onClickSaveButton} title={'저장하기'} />
              <Button
                onPress={onClickCancelButton}
                title={'취소하기'}
                color={'red'}
              />
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setEditMode(true)}>
            <View style={styles.cardContentInfo}>
              <Text>{title}</Text>
              <Text>{calorie} kcal</Text>
              <Text>{createdDate}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  baseInput: {
    borderWidth: 1,
    borderColor: 'black',
  },
  inputButtonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default MenuCard;
