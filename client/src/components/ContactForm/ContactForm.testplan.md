# Test Specification: ContactForm.jsx

## Purpose of the Module

The `ContactForm.jsx` component is a React client component that provides the user interface for submitting contact form inquiries. It handles form rendering, user interactions, state management, and displays success/error feedback to users.

## Public Functions/Exports

### `ContactForm` (Default Export)

**Type:** React Functional Component
**Props:** None
**Returns:** JSX Element
**Description:** Renders a contact form with email, subject, and message fields. Manages form submission state, displays success toast notifications, and shows error messages.

## Complete List of Use Cases

### Use Case 1: Component Renders Successfully
- **Input:** Component mounted
- **Expected Behavior:** 
  - Form fields are rendered (email, subject, message)
  - Submit button is rendered
  - No toast visible initially
  - No error message visible initially
- **Side Effects:** None

### Use Case 2: Form Fields Display Correctly
- **Input:** Component rendered
- **Expected Behavior:** 
  - Email field with label and placeholder
  - Subject field with label and placeholder
  - Message field (multiline) with label and placeholder
  - All fields are required
- **Side Effects:** None

### Use Case 3: Submit Button Initial State
- **Input:** Component rendered
- **Expected Behavior:** 
  - Submit button is enabled
  - Button shows correct text (from translations)
  - Button has correct type="submit"
- **Side Effects:** None

### Use Case 4: Form Submission - Success Path
- **Input:** User fills form and submits
- **Expected Behavior:** 
  - Form submits with correct FormData
  - Button becomes disabled during submission (isPending)
  - Button shows loading text
  - On success, toast appears with success message
  - Toast auto-closes after 5 seconds
  - Error message is not displayed
- **Side Effects:** Form submission triggers server action

### Use Case 5: Form Submission - Error Path
- **Input:** User submits form with invalid data
- **Expected Behavior:** 
  - Form submits
  - Button becomes disabled during submission
  - On error, error message is displayed
  - Toast does not appear
  - Error message shows correct error text
- **Side Effects:** Form submission triggers server action

### Use Case 6: Toast Auto-Close
- **Input:** Success toast appears
- **Expected Behavior:** 
  - Toast is visible
  - After 5 seconds, toast auto-closes
  - Toast can be manually closed via onClose
- **Side Effects:** None

### Use Case 7: Loading State During Submission
- **Input:** Form submission in progress
- **Expected Behavior:** 
  - Button is disabled
  - Button text changes to loading message
  - Form cannot be submitted again
- **Side Effects:** None

## Edge Cases

### Edge Case 1: State with Success but No Toast Trigger
- **Input:** State changes to success but useEffect hasn't run
- **Expected Behavior:** 
  - Toast should appear when state.success is true
  - useEffect should trigger toast display
- **Side Effects:** None

### Edge Case 2: State with Error Message
- **Input:** State contains error property
- **Expected Behavior:** 
  - Error Typography component is rendered
  - Error text is displayed
  - Error has correct styling (color="error", fontStyle="italic")
- **Side Effects:** None

### Edge Case 3: State with Both Success and Error
- **Input:** State contains both success and error (shouldn't happen, but test it)
- **Expected Behavior:** 
  - Toast appears (success takes precedence)
  - Error message may or may not be visible (depends on implementation)
- **Side Effects:** None

### Edge Case 4: Multiple Rapid Submissions
- **Input:** User clicks submit multiple times quickly
- **Expected Behavior:** 
  - Button becomes disabled after first click
  - Only one submission occurs
  - Loading state prevents duplicate submissions
- **Side Effects:** Only one form submission

### Edge Case 5: Toast Manual Close
- **Input:** User clicks close on toast
- **Expected Behavior:** 
  - Toast closes immediately
  - setToast(false) is called
  - Toast does not auto-close after manual close
- **Side Effects:** None

### Edge Case 6: Translation Keys Missing
- **Input:** Translation keys are missing
- **Expected Behavior:** 
  - Component may show translation keys or handle gracefully
  - Form still functions
- **Side Effects:** None

## Error Conditions

### Error Condition 1: Server Action Throws Exception
- **Scenario:** contactAction throws an unhandled exception
- **Expected Behavior:** 
  - Error may propagate to React error boundary
  - Or may be caught by useActionState
  - Component should handle gracefully

### Error Condition 2: Translation Hook Fails
- **Scenario:** useTranslations() throws or returns undefined
- **Expected Behavior:** 
  - Component may crash or show fallback
  - Should be handled by error boundary

## Invalid Inputs

### Invalid Input 1: None
- Component doesn't accept props, so no invalid prop inputs

## Domain/Business Rules Enforced

### Business Rule 1: Form Structure
- Form must have three fields: email, subject, message
- Email field has type="email"
- Message field is multiline with 4 rows
- All fields are required (HTML5 validation)

### Business Rule 2: State Management
- Uses `useActionState` hook for form state
- Initial state: `{ error: null }`
- State updates trigger re-renders
- Success state triggers toast display

### Business Rule 3: Toast Behavior
- Toast appears when `state?.success` is true
- Toast auto-closes after 5 seconds
- Toast can be manually closed
- Toast positioned bottom-right

### Business Rule 4: Error Display
- Error message appears when `state?.error` exists
- Error message has error styling
- Error message is italic
- Error message replaces or appears below form

### Business Rule 5: Loading State
- Button is disabled when `isPending` is true
- Button text changes to loading message when pending
- Button text shows normal message when not pending
- Form cannot be submitted when button is disabled

### Business Rule 6: Form Submission
- Form uses `action={formAction}` (Next.js server action pattern)
- FormData is automatically created from form fields
- Server action receives FormData and previousState

## Expected Interactions with Dependencies

### Dependency 1: `@/actions/contact.contactAction`
- **Interaction:** Called via form submission
- **Expected Parameters:** 
  - `previousState`: Current state from useActionState
  - `formData`: FormData object with email, subject, message
- **Expected Return:** `Promise<{success: boolean, error?: string}>`
- **Mock Strategy:** Mock the action to return success/error responses

### Dependency 2: `next-intl.useTranslations()`
- **Interaction:** Called to get translation function
- **Expected Return:** Translation function `t(key: string) => string`
- **Mock Strategy:** Mock to return a function that returns the key or mock translations

### Dependency 3: `react-emoji-render.Twemoji`
- **Interaction:** Used to render emoji in button text
- **Expected Behavior:** Renders emoji SVG
- **Mock Strategy:** Mock to return simple text or span

### Dependency 4: `@mui/material` Components
- **Interaction:** Used for UI components
- **Expected Behavior:** Renders Material-UI components
- **Mock Strategy:** May need to mock or use real components with ThemeProvider

## Inputs, Outputs, and Expected Side Effects

### Inputs
- None (component accepts no props)

### Outputs
- JSX Element containing form, toast, and error message

### Side Effects
- Form submission triggers server action
- State changes trigger re-renders
- Toast display/hide
- Error message display/hide

## Test Case Matrix

### Rendering Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC1  | Component renders                  | Component mounted                        | Form fields, button, no toast, no error           |
| TC2  | Email field renders                | Component mounted                        | Email input with label and placeholder            |
| TC3  | Subject field renders               | Component mounted                        | Subject input with label and placeholder           |
| TC4  | Message field renders               | Component mounted                        | Multiline message input with label and placeholder |
| TC5  | Submit button renders               | Component mounted                        | Button enabled, correct text, type="submit"        |

### State Management Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC6  | Initial state - no toast            | Component mounted                        | Toast not visible                                  |
| TC7  | Initial state - no error            | Component mounted                        | Error message not visible                          |
| TC8  | Success state triggers toast        | State changes to {success: true}         | Toast becomes visible                              |
| TC9  | Error state shows error message     | State changes to {error: "message"}      | Error message visible with correct text            |

### Form Submission Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC10 | Form submission calls action        | User submits form                        | contactAction called with FormData                 |
| TC11 | Button disabled during submission   | Form submitting (isPending=true)         | Button disabled, loading text shown                |
| TC12 | Button enabled after submission     | Form submission complete                 | Button enabled, normal text shown                  |
| TC13 | Success response shows toast        | Action returns {success: true}           | Toast appears with success message                 |
| TC14 | Error response shows error          | Action returns {error: "message"}        | Error message appears                              |

### Toast Behavior Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC15 | Toast appears on success            | State.success = true                     | Toast visible with correct message                  |
| TC16 | Toast auto-closes after 5 seconds   | Toast visible                            | Toast closes after 5 seconds                       |
| TC17 | Toast can be manually closed        | User clicks close                        | Toast closes immediately                           |
| TC18 | Toast positioned correctly          | Toast visible                            | Toast at bottom-right                               |

### Error Display Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC19 | Error message displays correctly    | State.error = "Error text"               | Error Typography visible with correct text         |
| TC20 | Error message has correct styling   | Error message visible                    | Error has color="error", fontStyle="italic"         |
| TC21 | Error message hidden on success     | State changes from error to success      | Error message hidden, toast shown                   |

### Loading State Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC22 | Button disabled when pending        | isPending = true                         | Button disabled attribute present                  |
| TC23 | Button shows loading text           | isPending = true                         | Button text is loading message                     |
| TC24 | Button shows normal text            | isPending = false                        | Button text is normal message with emoji           |

### Integration Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC25 | Complete success flow               | User fills and submits valid form        | Form submits, toast appears, no error              |
| TC26 | Complete error flow                 | User submits invalid form                | Form submits, error appears, no toast              |
| TC27 | Multiple submissions prevented      | User clicks submit multiple times        | Only one submission, button disabled               |


