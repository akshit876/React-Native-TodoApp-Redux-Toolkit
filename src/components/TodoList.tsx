import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/storeHook';
import Icon from 'react-native-vector-icons/Ionicons';
import {deleteTodo, toggleTodo} from '../features/todos/todosSlice';
import Toast from 'react-native-toast-message';
import useFakeAPI from '../hooks/api/fakeAPI';
import {fetchApiData} from '../features/fakeAPI';

const TodoList = () => {
  const todosState = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const {data, loading, error} = useFakeAPI();

  if (loading) {
    console.log('loaing...');
  }
  // if (error) {
  //   console.error(error);
  // }

  console.log({todosState});

  const OnDeleteTodo = id => {
    dispatch(deleteTodo(id));
    Toast.show({
      type: 'error',
      text1: 'Todo was deleted successfully',
    });
  };

  const onToggleTodo = id => {
    dispatch(toggleTodo(id));
    Toast.show({
      type: 'success',
      text1: 'Todo was completed successfully',
    });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          {item.isComplete ? (
            <Text style={[styles.lineThrough, styles.textBox]}>
              {item.name}
            </Text>
          ) : (
            <Text style={styles.itemText}>{item.name}</Text>
          )}
        </View>
        {/* <TouchableOpacity> */}
        <View style={styles.buttonContainer}>
          <Icon
            name="trash-outline"
            size={25}
            color="#333"
            onPress={() => OnDeleteTodo(item.id)}
          />
          <Icon
            name="checkmark-circle-outline"
            size={25}
            color="#333"
            onPress={() => onToggleTodo(item.id)}
          />
        </View>
        {/* </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={todosState}
        renderItem={({item}) => renderItem({item})}
        keyExtractor={item => `${item.id}_${item.name}`}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    flex: 1,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    flex: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  textBox: {
    fontSize: 16,
    color: '#333',
    // maxWidth:
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    fontSize: 16,
    color: '#333',
  },
});
