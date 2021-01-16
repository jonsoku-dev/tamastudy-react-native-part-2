import React, { FunctionComponent, useEffect, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AddIcon, TrashIcon } from '../../icons';
import { useBoardContext } from '../../../contexts/useBoardContext';
import { IBoard } from '../../../interfaces/IBoard';
import * as S from './styled';

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
    <S.Wrapper>
      {/* Title */}
      <S.TitleBox>
        <S.TitleText>{type}</S.TitleText>
        {date && (
          <TouchableOpacity onPress={onClickDelete(date, type)}>
            <S.DeleteButtonText>
              DELETE
            </S.DeleteButtonText>
          </TouchableOpacity>
        )}
      </S.TitleBox>
      {/* Content */}
      <S.ContentBox>
        {uploadImage ? (
          <S.ContentImageBox>
            <TouchableOpacity onPress={onClickAddImage}>
              <S.ContentImage
                source={{ uri: uploadImage }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClickRemoveImage}
            >
              <S.ContentTrash>
                <TrashIcon size={20} color={'#fff'} />
              </S.ContentTrash>
            </TouchableOpacity>
          </S.ContentImageBox>
        ) : (
          <TouchableOpacity onPress={onClickAddImage}>
            <S.ContentEmptyImageBox>
              <AddIcon />
              <S.EmptyImageText>
                사진을 등록해주세요.
              </S.EmptyImageText>
            </S.ContentEmptyImageBox>
          </TouchableOpacity>
        )}
        <S.DetailBox>
          {editMode ? (
            <S.DetailForm>
              <S.DetailFormInput
                value={updateTitle}
                onChangeText={handleChangeTitle}
              />
              <S.DetailFormInput
                keyboardType={'number-pad'}
                value={String(updateCalorie)}
                onChangeText={handleChangeCalorie}
              />
              <S.DetailButtonBox>
                <S.DetailButton onPress={onClickSaveButton} title={'저장하기'} />
                <S.DetailCancelButton
                  onPress={onClickCancelButton}
                  title={'취소하기'}
                  color={'red'}
                />
              </S.DetailButtonBox>
            </S.DetailForm>
          ) : (
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <S.DetailTitleText>{title}</S.DetailTitleText>
              <S.DetailCalorieText>{calorie} kcal</S.DetailCalorieText>
            </TouchableOpacity>
          )}
        </S.DetailBox>
      </S.ContentBox>
    </S.Wrapper>
  );
};

export default MenuCard;
