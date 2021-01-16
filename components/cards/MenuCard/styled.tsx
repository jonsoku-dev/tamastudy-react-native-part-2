import styled from '@emotion/native';

/**
 * shared
 */

const CommonImageSize = `
  width: 160px;
  height: 160px;
`;


export const Wrapper = styled.View`
`;

/**
 * Title
 */

export const TitleBox = styled.View`
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const DeleteButtonText = styled.Text`
  text-align: right;
  color:red;
`;

/**
 * Content
 */

export const ContentBox = styled.View`
  flex-direction: row;
`;

export const ContentImageBox = styled.View``;

export const ContentImage = styled.Image`
  ${CommonImageSize};
`;

export const ContentTrash = styled.View`
  background-color: red;
  align-items: center;
  padding: 4px 0;
`;

export const ContentEmptyImageBox = styled.View`
  ${CommonImageSize};
  padding: 16px;
  background-color: #dfe6e9;
  justify-content: center;
  align-items: center;
`;

export const EmptyImageText = styled.Text`
  margin-top: 16px;
`;

/*
 * Detail
 */

export const DetailBox = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 16px;
`;
export const DetailTitleText = styled.Text`
  font-size: 18px;
  font-weight: 800;
  margin: 4px 0;
`;
export const DetailCalorieText = styled.Text`
  margin: 4px 0;
  font-style: italic;
`;

export const DetailForm = styled.View``;
export const DetailFormInput = styled.TextInput`
  margin: 8px 0;
  padding: 8px;
`;
export const DetailButtonBox = styled.View``;
export const DetailButton = styled.Button``;
export const DetailCancelButton = styled(DetailButton)``;