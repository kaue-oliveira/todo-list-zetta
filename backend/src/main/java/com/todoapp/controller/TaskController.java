package com.todoapp.controller;

import com.todoapp.dto.TaskDTO;
import com.todoapp.security.UserPrincipal;
import com.todoapp.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@Slf4j
@Tag(name = "Tasks", description = "Task management endpoints")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    @Operation(summary = "Get all tasks", description = "Retrieve all tasks for the authenticated user")
    public ResponseEntity<List<TaskDTO>> getAllTasks(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Fetching all tasks for user: {}", userPrincipal.getId());
        List<TaskDTO> tasks = taskService.getUserTasks(userPrincipal.getId());
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get tasks by status", description = "Retrieve tasks filtered by status (PENDING or COMPLETED)")
    public ResponseEntity<List<TaskDTO>> getTasksByStatus(
            @PathVariable @Parameter(description = "Task status: PENDING or COMPLETED") String status,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Fetching tasks with status: {} for user: {}", status, userPrincipal.getId());
        List<TaskDTO> tasks = taskService.getUserTasksByStatus(userPrincipal.getId(), status);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get task by ID", description = "Retrieve a specific task by its ID")
    public ResponseEntity<TaskDTO> getTaskById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Fetching task: {} for user: {}", id, userPrincipal.getId());
        TaskDTO task = taskService.getTaskById(id, userPrincipal.getId());
        return ResponseEntity.ok(task);
    }

    @PostMapping
    @Operation(summary = "Create new task", description = "Create a new task for the authenticated user")
    public ResponseEntity<TaskDTO> createTask(
            @Valid @RequestBody TaskDTO taskDTO,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Creating new task for user: {}", userPrincipal.getId());
        TaskDTO createdTask = taskService.createTask(taskDTO, userPrincipal.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update task", description = "Update an existing task")
    public ResponseEntity<TaskDTO> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskDTO taskDTO,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Updating task: {} for user: {}", id, userPrincipal.getId());
        TaskDTO updatedTask = taskService.updateTask(id, taskDTO, userPrincipal.getId());
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task", description = "Delete a task by its ID")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Deleting task: {} for user: {}", id, userPrincipal.getId());
        taskService.deleteTask(id, userPrincipal.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/toggle")
    @Operation(summary = "Toggle task status", description = "Toggle task status between PENDING and COMPLETED")
    public ResponseEntity<TaskDTO> toggleTaskStatus(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("Toggling status of task: {} for user: {}", id, userPrincipal.getId());
        TaskDTO updatedTask = taskService.toggleTaskStatus(id, userPrincipal.getId());
        return ResponseEntity.ok(updatedTask);
    }
}
