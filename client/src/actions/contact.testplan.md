# Test Specification: contact.js (Actions Layer)

## Purpose of the Module

The `contact.js` actions module is responsible for handling Next.js server actions for contact form submissions. It acts as an action layer that:

- Receives form data from the presentation layer (React Server Actions pattern)
- Extracts form field values using FormData API
- Maps form data to service layer parameters
- Invokes the service layer function
- Returns service layer results to the presentation layer

This module is a **trusted primitive** used by the presentation layer (components), which handles form submission and UI state management. The service layer (`contact.js` service) is a **trusted primitive** that handles business logic, validation, and email sending.

## Public Functions/Exports

### `contactAction(previousState, formData)`

**Type:** `async function` (Next.js Server Action)
**Parameters:**
- `previousState` (any): Previous state from useActionState hook (not used in this implementation)
- `formData` (FormData): Form data object containing email, subject, and message fields

**Returns:** `Promise<{success: boolean, error?: string}>`

**Description:** Extracts email, subject, and message from FormData, calls the service layer `sendEmail` function, and returns the result. This is a Next.js server action that can be used with `useActionState` hook.

## Complete List of Use Cases

### Use Case 1: Successful Form Submission
- **Input:** FormData with valid email, subject, and message fields
- **Expected Behavior:** 
  - Extracts all three fields correctly
  - Calls service layer with correct parameters
  - Returns service layer result (success: true)
- **Side Effects:** None (delegates to service layer)

### Use Case 2: Form Submission with Missing Fields
- **Input:** FormData with some fields missing (null/undefined from .get())
- **Expected Behavior:** 
  - Extracts available fields (may be null)
  - Passes null/undefined values to service layer
  - Service layer handles validation and returns error
  - Returns service layer error result
- **Side Effects:** None

### Use Case 3: Form Submission with Empty String Fields
- **Input:** FormData with empty string values
- **Expected Behavior:** 
  - Extracts empty strings
  - Passes empty strings to service layer
  - Service layer validates and returns error
  - Returns service layer error result
- **Side Effects:** None

## Edge Cases

### Edge Case 1: Missing Email Field
- **Input:** FormData without "email" field
- **Expected Behavior:** 
  - `formData.get("email")` returns `null`
  - Passes `null` to service layer
  - Service layer validates and returns error
  - Returns service layer error result

### Edge Case 2: Missing Subject Field
- **Input:** FormData without "subject" field
- **Expected Behavior:** 
  - `formData.get("subject")` returns `null`
  - Passes `null` to service layer
  - Service layer may accept or reject
  - Returns service layer result

### Edge Case 3: Missing Message Field
- **Input:** FormData without "message" field
- **Expected Behavior:** 
  - `formData.get("message")` returns `null`
  - Passes `null` to service layer
  - Service layer validates and returns error
  - Returns service layer error result

### Edge Case 4: All Fields Missing
- **Input:** FormData with no fields or empty FormData
- **Expected Behavior:** 
  - All `.get()` calls return `null`
  - Passes all `null` values to service layer
  - Service layer validates and returns error
  - Returns service layer error result

### Edge Case 5: FormData with Extra Fields
- **Input:** FormData with additional fields beyond email, subject, message
- **Expected Behavior:** 
  - Extracts only the three required fields
  - Ignores extra fields
  - Passes extracted values to service layer
  - Returns service layer result

### Edge Case 6: PreviousState Parameter (Unused)
- **Input:** Any value for previousState parameter
- **Expected Behavior:** 
  - Parameter is accepted but not used
  - Function proceeds normally
  - No impact on result

### Edge Case 7: FormData with Non-String Values
- **Input:** FormData with File objects or other non-string values
- **Expected Behavior:** 
  - `.get()` returns the value as-is (File object, etc.)
  - Passes non-string value to service layer
  - Service layer validates type and returns error
  - Returns service layer error result

## Error Conditions

### Error Condition 1: Service Layer Validation Error
- **Scenario:** Service layer returns error response (e.g., invalid email, empty message)
- **Expected Behavior:** 
  - Error result is returned as-is from service layer
  - No additional error handling in action layer
  - Returns: `{success: false, error: "..."}`

### Error Condition 2: Service Layer Exception
- **Scenario:** Service layer throws an unhandled exception
- **Expected Behavior:** 
  - Exception propagates to caller (not caught in action layer)
  - Presentation layer must handle

## Invalid Inputs

### Invalid Input 1: Null FormData
- **Input:** `formData` is `null`
- **Expected Behavior:** 
  - Calling `formData.get()` throws TypeError
  - Exception propagates to caller

### Invalid Input 2: Undefined FormData
- **Input:** `formData` is `undefined`
- **Expected Behavior:** 
  - Calling `formData.get()` throws TypeError
  - Exception propagates to caller

### Invalid Input 3: Non-FormData Object
- **Input:** Regular object instead of FormData
- **Expected Behavior:** 
  - May or may not have `.get()` method
  - Behavior depends on object type
  - May throw or return undefined

## Domain/Business Rules Enforced

### Business Rule 1: Form Field Extraction
- Fields are extracted using FormData `.get()` method
- Field names must match exactly: "email", "subject", "message"
- Case-sensitive field name matching

### Business Rule 2: Parameter Mapping
- Form field "email" → service parameter `email`
- Form field "subject" → service parameter `subject`
- Form field "message" → service parameter `message`
- Order of parameters matches service layer signature

### Business Rule 3: Result Propagation
- Service layer result is returned directly (no transformation)
- No additional error handling or result modification
- Return value structure: `{success: boolean, error?: string}`

### Business Rule 4: PreviousState Handling
- `previousState` parameter is accepted but not used
- No state management or accumulation in action layer
- Function is stateless (pure pass-through)

## Expected Interactions with Dependencies

### Dependency 1: `@/services/contact.sendEmail(email, subject, message)`
- **Interaction:** Called once with extracted form values
- **Expected Parameters:**
  - `email`: Value from `formData.get("email")` (may be null/string)
  - `subject`: Value from `formData.get("subject")` (may be null/string)
  - `message`: Value from `formData.get("message")` (may be null/string)
- **Expected Return:** `Promise<{success: boolean, error?: string}>`
- **Mock Strategy:** Mock the service module to return success/error responses

### Dependency 2: `formData.get(fieldName)`
- **Interaction:** Called three times for "email", "subject", "message"
- **Expected Return:** String value or `null` if field doesn't exist
- **Mock Strategy:** Create mock FormData object with `.get()` method

## Inputs, Outputs, and Expected Side Effects

### Inputs
- `previousState` (any): Previous state (unused)
- `formData` (FormData): Form data containing email, subject, message fields

### Outputs
- **Success:** `{success: true}` (from service layer)
- **Error:** `{success: false, error: "..."}` (from service layer)

### Side Effects
- Calls service layer function (may send email)
- No state mutations in action layer
- No database changes
- No file system changes
- Pure pass-through function (except for service layer side effects)

## Test Case Matrix

### Happy Path Tests

| ID   | Test Case                              | FormData Fields                          | Expected Output                    |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC1  | Successful form submission             | email, subject, message (all valid)     | `{success: true}`                 |
| TC2  | Form with valid data                   | All fields present with valid values    | `{success: true}`                 |

### Form Data Extraction Tests

| ID   | Test Case                              | FormData Fields                          | Expected Behavior                  |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC3  | Extract email field correctly         | email="test@example.com"                 | Calls service with correct email  |
| TC4  | Extract subject field correctly        | subject="Test Subject"                   | Calls service with correct subject |
| TC5  | Extract message field correctly        | message="Test message"                   | Calls service with correct message |
| TC6  | Extract all fields together            | All three fields present                 | Calls service with all parameters  |

### Missing Field Tests

| ID   | Test Case                              | FormData Fields                          | Expected Output                    |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC7  | Missing email field                    | subject, message only                    | Service error (invalid email)      |
| TC8  | Missing subject field                   | email, message only                     | Service may accept or reject       |
| TC9  | Missing message field                  | email, subject only                      | Service error (empty message)      |
| TC10 | All fields missing                     | Empty FormData                           | Service error (multiple validations) |

### Empty Field Tests

| ID   | Test Case                              | FormData Fields                          | Expected Output                    |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC11 | Empty string email                     | email=""                                 | Service error (invalid email)      |
| TC12 | Empty string subject                   | subject=""                               | Service may accept                 |
| TC13 | Empty string message                   | message=""                               | Service error (empty message)      |

### Parameter Passing Tests

| ID   | Test Case                              | FormData                                 | Expected Service Call              |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC14 | Verify email parameter passed          | email="user@test.com"                    | sendEmail("user@test.com", ...)    |
| TC15 | Verify subject parameter passed        | subject="My Subject"                     | sendEmail(..., "My Subject", ...)  |
| TC16 | Verify message parameter passed        | message="My message"                     | sendEmail(..., ..., "My message")  |
| TC17 | Verify null values passed              | Missing fields                           | sendEmail(null, null, null)        |

### Return Value Tests

| ID   | Test Case                              | Service Layer Response                   | Expected Return                    |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC18 | Return success result                  | `{success: true}`                       | `{success: true}`                  |
| TC19 | Return error result                    | `{success: false, error: "..."}`        | `{success: false, error: "..."}`  |
| TC20 | Return value unchanged                 | Any service response                     | Exact same object returned         |

### Edge Case Tests

| ID   | Test Case                              | Input                                    | Expected Behavior                  |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC21 | PreviousState parameter (unused)       | Any previousState value                  | No impact on result                 |
| TC22 | FormData with extra fields             | email, subject, message, extra1, extra2 | Only extracts required fields      |
| TC23 | FormData with whitespace values        | Fields with leading/trailing spaces      | Passes as-is to service            |
| TC24 | FormData with special characters       | Fields with HTML/special chars           | Passes as-is to service            |

### Error Propagation Tests

| ID   | Test Case                              | Service Layer Behavior                   | Expected Behavior                  |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC25 | Service layer throws exception         | sendEmail throws Error                   | Exception propagates to caller     |
| TC26 | Service layer returns error response   | `{success: false, error: "..."}`         | Error response returned            |

