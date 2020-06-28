import React, { useRef, useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Modal from 'react-native-modalbox';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import StoryContainer from '../Stories/Components/StoryContainer';
import {renderif} from '../../utilities/CommonMethods'


const Stories = (props) => {
  const { StoriesData } = props;
  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);
  const { colors } = props.theme;
  const onStorySelect = (index) => {
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = (isScroll) => {
    const newIndex = currentUserIndex + 1;
    if (StoriesData.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      console.log('next');
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious();
      console.log('previous');
      setCurrentScrollValue(scrollValue);
    }
  };

  const renderSeperator = () => (
    <View style={{ height: 1, backgroundColor: '#000' }} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={StoriesData}
        horizontal
        renderItem={({ item, index }) => (
          <View>
          {renderIf(item.channels.length,
            <TouchableOpacity onPress={() => onStorySelect(index)}>
            <Image
              style={styles.circle}
              source={{ uri: item.imageURL }}
              isHorizontal
            />
            <Text style={{fontSize: 9, textAlign: 'center',color:colors.text}}>{item.nameAR}</Text>
          </TouchableOpacity>                
          )}
          </View>
          
        )}
      />




      <Modal
        AnimationConfig={ {useNativeDriver:true,isInteraction:true}}
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
        {/* eslint-disable-next-line max-len */}
        <CubeNavigationHorizontal  callBackAfterSwipe={g => onScrollChange(g)} 
        ref={modalScroll} style={styles.container} responderCaptureDx={80}>
          {StoriesData.map((item, index) => (
            <StoryContainer
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              user={item}
              isNewStory={index !== currentUserIndex}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: '5%',
  },
  circle: {
    width: 66,
    margin: 4,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#72bec5',
  },
  modal: {
    flex: 1,
  },

});


export default Stories;
