package com.todoapp.service;

import com.todoapp.dto.TaskDTO;
import com.todoapp.entity.Task;
import com.todoapp.entity.User;
import com.todoapp.repository.TaskRepository;
import com.todoapp.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<TaskDTO> getUserTasks(Long userId) {
        log.info("Fetching all tasks for user: {}", userId);
        return taskRepository.findByUserId(userId)
                .stream()
                .map(TaskDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TaskDTO> getUserTasksByStatus(Long userId, String status) {
        log.info("Fetching tasks for user: {} with status: {}", userId, status);
        Task.TaskStatus taskStatus = Task.TaskStatus.valueOf(status.toUpperCase());
        return taskRepository.findByUserIdAndStatus(userId, taskStatus)
                .stream()
                .map(TaskDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TaskDTO getTaskById(Long taskId, Long userId) {
        log.info("Fetching task: {} for user: {}", taskId, userId);
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return TaskDTO.fromEntity(task);
    }

    @Transactional
    public TaskDTO createTask(TaskDTO taskDTO, Long userId) {
        log.info("Creating new task for user: {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = Task.builder()
                .name(taskDTO.getName())
                .description(taskDTO.getDescription())
                .status(Task.TaskStatus.PENDING)
                .user(user)
                .build();

        Task savedTask = taskRepository.save(task);
        return TaskDTO.fromEntity(savedTask);
    }

    @Transactional
    public TaskDTO updateTask(Long taskId, TaskDTO taskDTO, Long userId) {
        log.info("Updating task: {} for user: {}", taskId, userId);

        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());

        if (taskDTO.getStatus() != null) {
            task.setStatus(Task.TaskStatus.valueOf(taskDTO.getStatus().toUpperCase()));
        }

        Task updatedTask = taskRepository.save(task);
        return TaskDTO.fromEntity(updatedTask);
    }

    @Transactional
    public void deleteTask(Long taskId, Long userId) {
        log.info("Deleting task: {} for user: {}", taskId, userId);

        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        taskRepository.delete(task);
    }

    @Transactional
    public TaskDTO toggleTaskStatus(Long taskId, Long userId) {
        log.info("Toggling status of task: {} for user: {}", taskId, userId);

        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Task.TaskStatus newStatus = task.getStatus() == Task.TaskStatus.PENDING
                ? Task.TaskStatus.COMPLETED
                : Task.TaskStatus.PENDING;

        task.setStatus(newStatus);
        Task updatedTask = taskRepository.save(task);
        return TaskDTO.fromEntity(updatedTask);
    }
}
