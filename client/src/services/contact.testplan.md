# Test Specification: contact.js

## Purpose of the Module

The `contact.js` service module is responsible for sending email notifications when users submit contact form messages. It acts as a service layer abstraction that:

- Accepts contact form data (email, subject, message)
- Creates an email transport connection using SMTP configuration
- Sends formatted HTML emails to a configured recipient
- Handles errors gracefully and returns structured success/error responses
- Provides a clean interface for the action layer to interact with email functionality

## Public Functions/Exports

### `sendEmail(email, subject, message)`

**Type:** `async function`
**Parameters:**
- `email` (string): The sender's email address
- `subject` (string): The email subject line
- `message` (string): The email message body

**Returns:** `Promise<{success: boolean, error?: string}>`

**Description:** Sends an email notification using nodemailer. The email is sent from a configured SMTP account to itself, with the sender's email set as the reply-to address. The email body includes HTML formatting with the sender's email and message.

## Complete List of Use Cases

### Use Case 1: Successful Email Send
- **Input:** Valid email, subject, and message strings
- **Expected Behavior:** 
  - Creates email transport successfully
  - Sends email with correct formatting
  - Returns `{success: true}`
- **Side Effects:** Email is sent via SMTP

### Use Case 2: Email Send with Special Characters in Message
- **Input:** Valid email, subject, message containing HTML/special characters
- **Expected Behavior:** 
  - Message is properly escaped/formatted in HTML
  - Email sends successfully
  - Returns `{success: true}`
- **Side Effects:** Email is sent with properly formatted HTML

### Use Case 3: Email Send with Empty Subject
- **Input:** Valid email, empty string subject, valid message
- **Expected Behavior:** 
  - Email sends with empty subject
  - Returns `{success: true}`
- **Side Effects:** Email is sent with empty subject

### Use Case 4: Email Send with Empty Message (REJECTED)
- **Input:** Valid email, valid subject, empty string message
- **Expected Behavior:** 
  - Validation fails before email transport is created
  - Returns `{success: false, error: "Message cannot be empty."}`
- **Side Effects:** No email is sent, no transport is created

### Use Case 5: Email Send with Very Long Message
- **Input:** Valid email, valid subject, very long message string
- **Expected Behavior:** 
  - Email sends successfully regardless of message length
  - Returns `{success: true}`
- **Side Effects:** Email is sent with long message

## Edge Cases

### Edge Case 1: Null/Undefined Email Parameter (REJECTED)
- **Input:** `null` or `undefined` for email parameter
- **Expected Behavior:** 
  - Validation fails before email transport is created
  - Returns `{success: false, error: "Invalid email format."}`
- **Side Effects:** No email is sent, no transport is created

### Edge Case 2: Null/Undefined Subject Parameter
- **Input:** `null` or `undefined` for subject parameter
- **Expected Behavior:** Function should handle gracefully

### Edge Case 3: Null/Undefined Message Parameter
- **Input:** `null` or `undefined` for message parameter
- **Expected Behavior:** Function should handle gracefully

### Edge Case 4: Invalid Email Format (REJECTED)
- **Input:** Invalid email format string (e.g., "not-an-email")
- **Expected Behavior:** 
  - Validation fails before email transport is created
  - Returns `{success: false, error: "Invalid email format."}`
- **Side Effects:** No email is sent, no transport is created

### Edge Case 5: Email Transport Creation Failure
- **Input:** Valid parameters but environment variables missing/invalid
- **Expected Behavior:** 
  - `createPrivateEmailTransport()` throws or returns invalid transport
  - Function catches error and returns `{success: false, error: "Something went wrong. Please try again."}`

### Edge Case 6: SMTP Send Failure
- **Input:** Valid parameters but SMTP server unavailable or rejects email
- **Expected Behavior:** 
  - `transporter.sendMail()` throws error
  - Function catches error and returns `{success: false, error: "Something went wrong. Please try again."}`

### Edge Case 7: Network Timeout
- **Input:** Valid parameters but network connection times out
- **Expected Behavior:** 
  - Transport operation times out
  - Function catches error and returns `{success: false, error: "Something went wrong. Please try again."}`

### Edge Case 8: Missing Environment Variables
- **Input:** Valid parameters but `process.env.SMTP_USER` is undefined
- **Expected Behavior:** 
  - Email may fail during send
  - Function catches error and returns error response

## Error Conditions

### Error Condition 1: Transport Creation Error
- **Scenario:** `createPrivateEmailTransport()` throws an error
- **Expected Response:** `{success: false, error: "Something went wrong. Please try again."}`

### Error Condition 2: SMTP Send Error
- **Scenario:** `transporter.sendMail()` throws an error (network, authentication, invalid recipient, etc.)
- **Expected Response:** `{success: false, error: "Something went wrong. Please try again."}`

### Error Condition 3: Generic Exception
- **Scenario:** Any unexpected error occurs during execution
- **Expected Response:** `{success: false, error: "Something went wrong. Please try again."}`

## Invalid Inputs

### Invalid Input 1: Non-string Email
- **Input:** Email parameter is a number, object, array, etc.
- **Expected Behavior:** Function may proceed (nodemailer may handle) or may fail

### Invalid Input 2: Non-string Subject
- **Input:** Subject parameter is a number, object, array, etc.
- **Expected Behavior:** Function may proceed or may fail depending on nodemailer behavior

### Invalid Input 3: Non-string Message
- **Input:** Message parameter is a number, object, array, etc.
- **Expected Behavior:** Function may proceed or may fail depending on nodemailer behavior

### Invalid Input 4: Empty String Email (REJECTED)
- **Input:** Email is empty string ""
- **Expected Behavior:** 
  - Validation fails before email transport is created
  - Returns `{success: false, error: "Invalid email format."}`
- **Side Effects:** No email is sent, no transport is created

## Domain/Business Rules Enforced

### Business Rule 1: Email Format
- The email is sent from `process.env.SMTP_USER` with display name "Contact Us from Nefara!"
- The recipient is always `process.env.SMTP_USER` (sending to self)
- The reply-to address is set to the sender's email

### Business Rule 2: HTML Email Format
- Email body must be HTML formatted
- Must include sender's email in an `<h4>` tag
- Message must be wrapped in a `<p>` tag
- Email structure: `<div><h4>This message was sent by: {email}</h4><p>{message}</p></div>`

### Business Rule 3: Email Validation
- Email parameter must be a non-empty string
- Email must match valid email format (contains @ and valid domain structure)
- Invalid or empty emails must be rejected before transport creation
- Validation error response: `{success: false, error: "Invalid email format."}`

### Business Rule 4: Message Validation
- Message parameter must not be empty or whitespace-only
- Empty or whitespace-only messages must be rejected before transport creation
- Validation error response: `{success: false, error: "Message cannot be empty."}`

### Business Rule 5: Error Handling
- All errors must be caught and returned as a structured response
- Error messages must be user-friendly: "Something went wrong. Please try again." (for system errors) or "Message cannot be empty." (for validation errors)
- Never throw unhandled exceptions

### Business Rule 6: Success Response Format
- Success response must be: `{success: true}`
- No additional data is returned on success

## Expected Interactions with Dependencies

### Dependency 1: `@/utils/email/transporter.createPrivateEmailTransport()`
- **Interaction:** Called once at the start of the function
- **Expected Return:** A nodemailer transporter object
- **Mock Strategy:** Mock to return a transporter object with a `sendMail` method

### Dependency 2: `transporter.sendMail(options)`
- **Interaction:** Called once with email options
- **Expected Parameters:**
  - `from`: `Contact Us from Nefara! <${process.env.SMTP_USER}>`
  - `to`: `process.env.SMTP_USER`
  - `subject`: The provided subject parameter
  - `replyTo`: The provided email parameter
  - `html`: Formatted HTML string with email and message
- **Expected Return:** Promise that resolves when email is sent
- **Mock Strategy:** Mock to resolve successfully or reject with error

### Dependency 3: `process.env.SMTP_USER`
- **Interaction:** Read twice (for `from` and `to` fields)
- **Expected Value:** String containing SMTP username/email
- **Mock Strategy:** Set in test environment or mock `process.env`

## Inputs, Outputs, and Expected Side Effects

### Inputs
- `email` (string): Sender's email address
- `subject` (string): Email subject line
- `message` (string): Email message body

### Outputs
- **Success:** `{success: true}`
- **Error:** `{success: false, error: "Something went wrong. Please try again."}`

### Side Effects
- Email is sent via SMTP to `process.env.SMTP_USER`
- Network/IO operations occur (SMTP connection and transmission)
- No database changes
- No file system changes
- No state mutations (pure function except for side effects of email sending)

## Test Case Matrix

### Happy Path Tests

| ID   | Test Case                          | Input                                    | Expected Output              |
|------|------------------------------------|------------------------------------------|------------------------------|
| TC1  | Successful email send              | Valid email, subject, message            | `{success: true}`            |
| TC2  | Email with special characters      | Valid email, subject, message with HTML  | `{success: true}`            |
| TC3  | Email with empty subject           | Valid email, "", valid message          | `{success: true}`            |
| TC5  | Email with very long message       | Valid email, subject, very long string  | `{success: true}`            |

### Invalid Input Tests

| ID   | Test Case                    | Input                                    | Expected Output                                    |
|------|------------------------------|------------------------------------------|----------------------------------------------------|
| TC4  | Email with empty message     | Valid email, valid subject, ""           | `{success: false, error: "Message cannot be empty."}` |
| TC6  | Null email parameter         | null, valid subject, valid message       | `{success: false, error: "Invalid email format."}` |
| TC7  | Undefined email parameter    | undefined, valid subject, valid message  | `{success: false, error: "Invalid email format."}` |
| TC8  | Null subject parameter       | Valid email, null, valid message        | Error response or success                          |
| TC9  | Undefined subject parameter  | Valid email, undefined, valid message   | Error response or success                          |
| TC10 | Null message parameter       | Valid email, valid subject, null         | Error response or success                          |
| TC11 | Undefined message parameter  | Valid email, valid subject, undefined    | Error response or success                          |
| TC12 | Invalid email format         | "not-an-email", valid subject, message  | `{success: false, error: "Invalid email format."}` |
| TC13 | Empty string email           | "", valid subject, valid message         | `{success: false, error: "Invalid email format."}` |
| TC14 | Non-string email             | 123, valid subject, valid message        | `{success: false, error: "Invalid email format."}` |
| TC15 | Non-string subject           | Valid email, 123, valid message          | Success or error                                  |
| TC16 | Non-string message           | Valid email, valid subject, 123          | Success or error                                  |

### Error Condition Tests

| ID   | Test Case                      | Input                                    | Expected Output                                    |
|------|--------------------------------|------------------------------------------|----------------------------------------------------|
| TC17 | Transport creation failure     | Valid params, transport throws           | `{success: false, error: "Something went wrong..."}` |
| TC18 | SMTP send failure              | Valid params, sendMail throws            | `{success: false, error: "Something went wrong..."}` |
| TC19 | Network timeout error          | Valid params, sendMail times out         | `{success: false, error: "Something went wrong..."}` |
| TC20 | Missing SMTP_USER env var      | Valid params, SMTP_USER undefined        | Error response                                     |

### Business Rule Verification Tests

| ID   | Test Case                          | Input                    | Expected Output                                    |
|------|------------------------------------|--------------------------|----------------------------------------------------|
| TC21 | Verify email format in HTML        | Valid email, subject, msg | HTML contains correct email format                 |
| TC22 | Verify message format in HTML      | Valid email, subject, msg | HTML contains correct message format               |
| TC23 | Verify reply-to is set correctly   | Valid email, subject, msg | sendMail called with correct replyTo               |
| TC24 | Verify from field format           | Valid email, subject, msg | sendMail called with correct from field            |
| TC25 | Verify to field is SMTP_USER       | Valid email, subject, msg | sendMail called with SMTP_USER as to               |

