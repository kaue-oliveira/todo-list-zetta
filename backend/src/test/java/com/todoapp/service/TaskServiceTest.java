package com.todoapp.service;

import com.todoapp.dto.TaskDTO;
import com.todoapp.entity.Task;
import com.todoapp.entity.User;
import com.todoapp.repository.TaskRepository;
import com.todoapp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TaskService taskService;

    private User testUser;
    private Task testTask;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .name("Test User")
                .email("test@example.com")
                .password("password")
                .build();

        testTask = Task.builder()
                .id(1L)
                .name("Test Task")
                .description("Test Description")
                .status(Task.TaskStatus.PENDING)
                .user(testUser)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    @Test
    void testGetUserTasks() {
        List<Task> tasks = Arrays.asList(testTask);
        when(taskRepository.findByUserId(1L)).thenReturn(tasks);

        List<TaskDTO> result = taskService.getUserTasks(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getName());
    }

    @Test
    void testGetUserTasksByStatus() {
        List<Task> tasks = Arrays.asList(testTask);
        when(taskRepository.findByUserIdAndStatus(1L, Task.TaskStatus.PENDING)).thenReturn(tasks);

        List<TaskDTO> result = taskService.getUserTasksByStatus(1L, "PENDING");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("PENDING", result.get(0).getStatus());
    }

    @Test
    void testGetTaskById() {
        when(taskRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(testTask));

        TaskDTO result = taskService.getTaskById(1L, 1L);

        assertNotNull(result);
        assertEquals("Test Task", result.getName());
    }

    @Test
    void testGetTaskByIdNotFound() {
        when(taskRepository.findByIdAndUserId(anyLong(), anyLong())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> taskService.getTaskById(1L, 1L));
    }

    @Test
    void testCreateTask() {
        TaskDTO taskDTO = TaskDTO.builder()
                .name("New Task")
                .description("New Description")
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(taskRepository.save(any(Task.class))).thenReturn(testTask);

        TaskDTO result = taskService.createTask(taskDTO, 1L);

        assertNotNull(result);
        assertEquals("Test Task", result.getName());
    }

    @Test
    void testUpdateTask() {
        TaskDTO taskDTO = TaskDTO.builder()
                .name("Updated Task")
                .description("Updated Description")
                .status("COMPLETED")
                .build();

        when(taskRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(testTask));
        when(taskRepository.save(any(Task.class))).thenReturn(testTask);

        TaskDTO result = taskService.updateTask(1L, taskDTO, 1L);

        assertNotNull(result);
    }

    @Test
    void testToggleTaskStatus() {
        when(taskRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(testTask));
        when(taskRepository.save(any(Task.class))).thenReturn(testTask);

        TaskDTO result = taskService.toggleTaskStatus(1L, 1L);

        assertNotNull(result);
    }

    @Test
    void testDeleteTask() {
        when(taskRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(testTask));

        assertDoesNotThrow(() -> taskService.deleteTask(1L, 1L));
        verify(taskRepository).delete(testTask);
    }
}
