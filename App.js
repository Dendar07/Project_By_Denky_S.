import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Animated,
} from 'react-native';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  // Fungsi untuk menambahkan tugas
  const addTask = () => {
    if (taskText.trim() === '') {
      Alert.alert('Peringatan', 'Tugas tidak boleh kosong!');
      return;
    }
    const newTask = { id: Date.now().toString(), text: taskText, fadeAnim: new Animated.Value(1) };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskText('');
  };

  // Fungsi untuk menghapus tugas dengan animasi fade-out
  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);

    if (taskToDelete) {
      Animated.timing(taskToDelete.fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan tugas baru"
          placeholderTextColor="#888"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Tambah</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View style={[styles.taskContainer, { opacity: item.fadeAnim }]}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Hapus</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Daftar tugas kosong. Tambahkan tugas baru!</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#888',
  },
});

export default ToDoApp;
