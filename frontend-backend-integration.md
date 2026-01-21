# Frontend-Backend Integration Documentation

This document outlines the changes made to connect the frontend with the backend endpoints in the Court Case Management System.

## Overview

The integration involves creating a service layer that abstracts API calls to the backend, making it easier to maintain and test the codebase. The service layer is organized by functionality, with each service handling a specific aspect of the application.

## API Service Layer

### Base API Configuration (`api.js`)

- Created a centralized axios instance with default configuration
- Added request and response interceptors for error handling
- Set base URL to `http://localhost:5000`
- Enabled credentials for cross-origin requests

### Authentication Service (`authService.js`)

- Implemented methods for user authentication:
  - `checkAuthStatus`: Check if user is logged in
  - `login`: Log in with email and password
  - `signup`: Register a new user
  - `googleLogin`: Log in with Google
  - `googleSignup`: Register with Google
  - `logout`: Log out user
  - `setPassword`: Set password for Google users

### Case Service (`caseService.js`)

- Implemented methods for case management:
  - `createCase`: Create a new case
  - `getCases`: Get all cases with filters
  - `getCaseStats`: Get case statistics
  - `getCaseById`: Get a single case by ID
  - `updateCase`: Update a case
  - `deleteCase`: Delete a case (admin only)
  - `assignParalegal`: Assign paralegal to case
  - `removeParalegal`: Remove paralegal from case
  - `closeCase`: Close a case
  - `archiveCase`: Archive a case

### Task Service (`taskService.js`)

- Implemented methods for task management:
  - `createTask`: Create a new task
  - `getTasks`: Get all tasks with filters
  - `getTaskStats`: Get task statistics
  - `getOverdueTasks`: Get overdue tasks
  - `getCaseTasks`: Get tasks for a specific case
  - `getTaskById`: Get a single task by ID
  - `updateTask`: Update a task
  - `deleteTask`: Delete a task
  - `updateTaskStatus`: Update task status
  - `updateTaskProgress`: Update task progress
  - `addComment`: Add comment to task
  - `addAttachment`: Add attachment to task

### Document Service (`documentService.js`)

- Implemented methods for document management:
  - `uploadDocument`: Upload a document
  - `getDocuments`: Get all documents with filters
  - `getDocumentStats`: Get document statistics
  - `getDocumentById`: Get a single document by ID
  - `downloadDocument`: Download a document
  - `updateDocument`: Update document details
  - `updateAccessPermissions`: Update document access permissions
  - `deleteDocument`: Delete a document
  - `restoreDocument`: Restore a deleted document (admin only)

### Message Service (`messageService.js`)

- Implemented methods for messaging:
  - `sendMessage`: Send a message
  - `getMessages`: Get all messages
  - `getUnreadCount`: Get unread count
  - `searchMessages`: Search messages
  - `getConversation`: Get conversation with specific user
  - `markAllAsRead`: Mark all messages as read
  - `getMessageById`: Get single message by ID
  - `markAsRead`: Mark message as read
  - `deleteMessage`: Delete message
  - `uploadAttachment`: Upload attachment to message
  - `getCaseMessages`: Get case messages
  - `getConnectionMessages`: Get connection messages

### Notification Service (`notificationService.js`)

- Implemented methods for notifications:
  - `getNotifications`: Get all notifications
  - `getUnreadCount`: Get unread count
  - `getNotificationsByType`: Get notifications by type
  - `getNotificationsByPriority`: Get notifications by priority
  - `markAllAsRead`: Mark all notifications as read
  - `deleteAllRead`: Delete all read notifications
  - `deleteOldNotifications`: Delete old notifications (admin only)
  - `deleteExpiredNotifications`: Delete expired notifications (admin only)
  - `getNotificationById`: Get notification by ID
  - `markAsRead`: Mark notification as read
  - `deleteNotification`: Delete notification

### Reminder Service (`reminderService.js`)

- Implemented methods for reminders:
  - `createReminder`: Create a new reminder
  - `getReminders`: Get all reminders
  - `getUpcomingReminders`: Get upcoming reminders
  - `deleteOldReminders`: Delete old reminders (admin only)
  - `getCaseReminders`: Get reminders for a specific case
  - `getReminderById`: Get a single reminder by ID
  - `updateReminder`: Update a reminder
  - `cancelReminder`: Cancel a reminder
  - `snoozeReminder`: Snooze a reminder
  - `dismissReminder`: Dismiss a reminder

### Connection Service (`connectionService.js`)

- Implemented methods for connection management:
  - `searchAdvocates`: Search advocates (client only)
  - `searchParalegals`: Search paralegals (client only)
  - `sendConnectionRequest`: Send connection request (client only)
  - `getReceivedRequests`: Get received connection requests (advocate/paralegal only)
  - `getSentRequests`: Get sent connection requests (client only)
  - `acceptConnectionRequest`: Accept connection request (advocate/paralegal only)
  - `rejectConnectionRequest`: Reject connection request (advocate/paralegal only)
  - `getConnectionStats`: Get connection statistics
  - `getMyConnections`: Get my connections
  - `getConnectionDetails`: Get connection details
  - `removeConnection`: Remove connection

### Activity Service (`activityService.js`)

- Implemented methods for activity tracking:
  - `getCaseActivities`: Get all activities for a specific case
  - `getCaseTimeline`: Get complete timeline for a case
  - `getActivityStats`: Get activity statistics for a case
  - `getUserActivity`: Get current user's activity history
  - `getRecentActivities`: Get recent activities across all accessible cases
  - `getActivitiesByType`: Get activities filtered by type
  - `getActivityById`: Get single activity details
  - `deleteActivity`: Delete activity (admin only)

### Timeline Service (`timelineService.js`)

- Implemented methods for timeline management:
  - `addEvent`: Add timeline event (Advocate/Admin only)
  - `getTimeline`: Get timeline for a case
  - `getUpcomingEvents`: Get upcoming events for a case
  - `getMilestones`: Get milestones for a case
  - `getEventById`: Get single event by ID
  - `updateEvent`: Update timeline event (Advocate/Admin only)
  - `deleteEvent`: Delete timeline event (Advocate/Admin only)
  - `markAsMilestone`: Mark event as milestone (Advocate/Admin only)
  - `addHearing`: Add hearing (Advocate/Admin only)
  - `getHearings`: Get hearings for a case
  - `completeHearing`: Mark hearing as completed (Advocate/Admin only)
  - `postponeHearing`: Postpone hearing (Advocate/Admin only)

### Note Service (`noteService.js`)

- Implemented methods for note management:
  - `createNote`: Create a new note
  - `getMyNotes`: Get current user's notes
  - `getAllNotes`: Get all notes (admin only)
  - `getChecklistItems`: Get checklist items for a note
  - `addChecklistItem`: Add checklist item to a note
  - `updateChecklistItem`: Update checklist item
  - `toggleChecklistItem`: Toggle checklist item completion
  - `deleteChecklistItem`: Delete checklist item
  - `uploadAttachment`: Upload attachment to note
  - `deleteAttachment`: Delete attachment from note
  - `downloadAttachment`: Download attachment
  - `archiveNote`: Archive/Unarchive note
  - `getNoteById`: Get note by ID
  - `updateNote`: Update note
  - `deleteNote`: Delete note

## Context Updates

### Authentication Context (`AuthContext.jsx`)

- Updated to use the new `authService` instead of direct axios calls
- Simplified error handling and response processing

## Next Steps

To complete the integration, the following steps should be taken:

1. Update all components to use the service layer instead of hardcoded data:
   - `AdvocateHome.jsx`
   - `Dashboard.jsx`
   - `MattersPage.jsx`
   - `CaseSummaryPageReact.jsx`
   - `DocumentsPage.jsx`
   - `MessagesPageReact.jsx`
   - `BillingPageReact.jsx`
   - `Timeline.jsx`

2. Create context providers for major features:
   - `CaseContext.jsx`
   - `TaskContext.jsx`
   - `DocumentContext.jsx`
   - `MessageContext.jsx`
   - `NotificationContext.jsx`

3. Implement loading states and error handling in components

4. Add form handling for creating and updating resources

5. Implement real-time features using WebSockets or polling

## Benefits of the Integration

1. **Separation of Concerns**: API calls are now separated from UI components
2. **Code Reusability**: Services can be reused across different components
3. **Maintainability**: Easier to update API endpoints or add new features
4. **Testing**: Services can be tested independently of UI components
5. **Error Handling**: Centralized error handling for API calls
