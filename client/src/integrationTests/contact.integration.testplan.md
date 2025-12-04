# Integration Test Plan: Contact Form Feature

## High-Level Feature Description

The Contact Form feature allows users to submit inquiries through a web form. The feature processes form submissions, validates input data, and sends email notifications to the business. The feature spans multiple layers:

- **Presentation Layer**: React form component (`ContactForm`)
- **Actions Layer**: Next.js server action (`contactAction`)
- **Service Layer**: Email sending service (`sendEmail`)
- **Utils Layer**: Email transport creation (`createPrivateEmailTransport`)
- **External Dependency**: Nodemailer (SMTP email sending)

## User Journey / Business Flow

1. **User fills out contact form** with:
   - Email address
   - Subject line
   - Message content

2. **User submits form** → FormData is created and sent to server action

3. **Server action extracts form data** → Maps FormData fields to service parameters

4. **Service layer validates input**:
   - Email format validation (regex)
   - Message non-empty validation

5. **Service layer creates email transport** → Utils layer validates environment variables and creates nodemailer transport

6. **Service layer sends email** → Uses transport to send formatted HTML email

7. **Response returned** → Success or error response propagated back through layers

8. **UI updates** → Component displays success message or error

## All Interactions Between Layers

### Layer Flow: Action → Service → Utils → Nodemailer

1. **Action Layer → Service Layer**
   - Input: `email` (string | null), `subject` (string | null), `message` (string | null)
   - Output: `{success: boolean, error?: string}`
   - Interaction: Direct function call, no transformation

2. **Service Layer → Utils Layer**
   - Input: None (reads from process.env)
   - Output: `nodemailer.Transporter` instance
   - Interaction: Async function call, transport creation

3. **Service Layer → Nodemailer Transport**
   - Input: Email configuration object
   - Output: Promise (email sent)
   - Interaction: `transporter.sendMail()` method call

4. **Utils Layer → Environment Variables**
   - Reads: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - Validates: All required, port is numeric
   - Output: Validated configuration or throws error

## API Inputs/Outputs for Each Operation

### Operation 1: Form Submission (Action Layer Entry Point)

**Input:**
- `previousState`: Any (unused)
- `formData`: FormData object with fields:
  - `email`: string | null
  - `subject`: string | null
  - `message`: string | null

**Output:**
- Success: `{success: true}`
- Error: `{success: false, error: string}`

### Operation 2: Email Sending (Service Layer)

**Input:**
- `email`: string | null
- `subject`: string | null
- `message`: string | null

**Output:**
- Success: `{success: true}`
- Validation Error: `{success: false, error: "Invalid email format."}` or `{success: false, error: "Message cannot be empty."}`
- System Error: `{success: false, error: "Something went wrong. Please try again."}`

### Operation 3: Transport Creation (Utils Layer)

**Input:**
- None (reads from `process.env`)

**Output:**
- Success: `nodemailer.Transporter` instance
- Error: Throws `Error` with descriptive message

## What a Real Integration Test Should Assert

### Success Path Assertions

1. **Form data extraction**: Action layer correctly extracts all fields from FormData
2. **Parameter passing**: Service layer receives correct parameters
3. **Validation**: Service layer validates email format and message presence
4. **Environment validation**: Utils layer validates all required env vars
5. **Transport creation**: Utils layer creates valid nodemailer transport
6. **Email sending**: Transport successfully sends email with correct format
7. **Response propagation**: Success response returned through all layers
8. **Email content**: Email contains correct sender, subject, reply-to, and HTML body

### Error Path Assertions

1. **Invalid email format**: Service layer returns error, no email sent
2. **Empty message**: Service layer returns error, no email sent
3. **Missing env vars**: Utils layer throws error, caught by service layer
4. **Invalid port**: Utils layer throws error, caught by service layer
5. **SMTP failure**: Transport sendMail fails, service layer returns error
6. **Error propagation**: Errors correctly propagate through layers

### Side Effects Assertions

1. **Email sent**: Verify email was actually sent (using test SMTP or mock at boundary)
2. **Email format**: Verify email HTML structure and content
3. **No duplicate sends**: Verify single email per valid submission
4. **Environment isolation**: Tests don't affect each other's env vars

## Error Paths That Must Be Tested End-to-End

### Error Path 1: Invalid Email Format
- **Flow**: FormData → Action → Service (validation fails)
- **Expected**: `{success: false, error: "Invalid email format."}`
- **Assertions**: No transport created, no email sent

### Error Path 2: Empty Message
- **Flow**: FormData → Action → Service (validation fails)
- **Expected**: `{success: false, error: "Message cannot be empty."}`
- **Assertions**: No transport created, no email sent

### Error Path 3: Missing Environment Variables
- **Flow**: FormData → Action → Service → Utils (env validation fails)
- **Expected**: `{success: false, error: "Something went wrong. Please try again."}`
- **Assertions**: Utils throws error, service catches and returns error

### Error Path 4: Invalid SMTP Port
- **Flow**: FormData → Action → Service → Utils (port validation fails)
- **Expected**: `{success: false, error: "Something went wrong. Please try again."}`
- **Assertions**: Utils throws error, service catches and returns error

### Error Path 5: SMTP Send Failure
- **Flow**: FormData → Action → Service → Utils → Transport (sendMail fails)
- **Expected**: `{success: false, error: "Something went wrong. Please try again."}`
- **Assertions**: Service catches transport error and returns error

### Error Path 6: Missing Form Fields
- **Flow**: FormData (missing fields) → Action → Service (validation fails)
- **Expected**: `{success: false, error: "Invalid email format."}` or `{success: false, error: "Message cannot be empty."}`
- **Assertions**: Service validates null/undefined values

## Pre-Conditions / Post-Conditions

### Pre-Conditions for Success Path

1. **Environment Variables Set**:
   - `SMTP_HOST`: Valid SMTP hostname
   - `SMTP_PORT`: Valid port number (string)
   - `SMTP_USER`: Valid email address
   - `SMTP_PASS`: Valid password

2. **Form Data Valid**:
   - Email: Valid email format string
   - Subject: Any string (can be empty)
   - Message: Non-empty string

3. **SMTP Server Accessible** (or test transport configured):
   - Network connectivity to SMTP server
   - Valid credentials
   - OR test transport that captures emails

### Post-Conditions for Success Path

1. **Email Sent**: Email successfully sent via SMTP (or captured by test transport)
2. **Response Returned**: `{success: true}` returned to action layer
3. **No Errors**: No exceptions thrown through layers
4. **State Unchanged**: Environment variables unchanged
5. **Email Content Correct**: Email contains:
   - From: `Contact Us from Nefara! <SMTP_USER>`
   - To: `SMTP_USER`
   - Reply-To: User's email
   - Subject: User's subject
   - HTML body with user's email and message

### Pre-Conditions for Error Paths

1. **Validation Errors**: Invalid input data (invalid email, empty message)
2. **Environment Errors**: Missing or invalid environment variables
3. **SMTP Errors**: SMTP server unavailable or credentials invalid

### Post-Conditions for Error Paths

1. **No Email Sent**: Email not sent when validation fails
2. **Error Response**: Appropriate error message returned
3. **No Side Effects**: No partial state changes
4. **Error Propagation**: Error correctly propagated through layers

## Test Case Matrix

### Success Path Tests

| ID   | Test Case                              | Pre-Conditions                          | Expected Result                      | Assertions                           |
|------|----------------------------------------|-----------------------------------------|--------------------------------------|--------------------------------------|
| IT1  | Successful form submission             | Valid FormData, all env vars set        | `{success: true}`                    | Email sent, correct format           |
| IT2  | Form with all valid fields             | Complete FormData, valid env           | `{success: true}`                    | All fields passed correctly          |
| IT3  | Form with empty subject                | Valid email/message, empty subject      | `{success: true}`                    | Email sent with empty subject        |

### Validation Error Tests

| ID   | Test Case                              | Pre-Conditions                          | Expected Result                      | Assertions                           |
|------|----------------------------------------|-----------------------------------------|--------------------------------------|--------------------------------------|
| IT4  | Invalid email format                   | Invalid email in FormData               | `{success: false, error: "Invalid email format."}` | No transport, no email |
| IT5  | Empty message                          | Empty message in FormData               | `{success: false, error: "Message cannot be empty."}` | No transport, no email |
| IT6  | Missing email field                    | FormData without email                  | `{success: false, error: "Invalid email format."}` | No transport, no email |
| IT7  | Missing message field                  | FormData without message                | `{success: false, error: "Message cannot be empty."}` | No transport, no email |
| IT8  | Null email value                       | FormData with null email                | `{success: false, error: "Invalid email format."}` | No transport, no email |
| IT9  | Null message value                     | FormData with null message              | `{success: false, error: "Message cannot be empty."}` | No transport, no email |

### Environment Error Tests

| ID   | Test Case                              | Pre-Conditions                          | Expected Result                      | Assertions                           |
|------|----------------------------------------|-----------------------------------------|--------------------------------------|--------------------------------------|
| IT10 | Missing SMTP_HOST                      | SMTP_HOST not set                       | `{success: false, error: "Something went wrong..."}` | Utils throws, service catches |
| IT11 | Missing SMTP_PORT                      | SMTP_PORT not set                       | `{success: false, error: "Something went wrong..."}` | Utils throws, service catches |
| IT12 | Missing SMTP_USER                      | SMTP_USER not set                       | `{success: false, error: "Something went wrong..."}` | Utils throws, service catches |
| IT13 | Missing SMTP_PASS                      | SMTP_PASS not set                       | `{success: false, error: "Something went wrong..."}` | Utils throws, service catches |
| IT14 | Invalid SMTP_PORT (non-numeric)        | SMTP_PORT="invalid"                     | `{success: false, error: "Something went wrong..."}` | Utils throws, service catches |
| IT15 | Empty SMTP_PORT                        | SMTP_PORT=""                            | `{success: false, error: "Something went wrong..."}` | Utils throws, service catches |

### SMTP Error Tests

| ID   | Test Case                              | Pre-Conditions                          | Expected Result                      | Assertions                           |
|------|----------------------------------------|-----------------------------------------|--------------------------------------|--------------------------------------|
| IT16 | SMTP send failure                      | Valid env, SMTP rejects email           | `{success: false, error: "Something went wrong..."}` | Service catches error |
| IT17 | SMTP connection timeout                 | Valid env, SMTP times out               | `{success: false, error: "Something went wrong..."}` | Service catches error |

### Integration Flow Tests

| ID   | Test Case                              | Pre-Conditions                          | Expected Result                      | Assertions                           |
|------|----------------------------------------|-----------------------------------------|--------------------------------------|--------------------------------------|
| IT18 | End-to-end success flow                | All valid inputs, env vars              | `{success: true}`                    | All layers execute correctly          |
| IT19 | Error propagation through layers       | Invalid input, valid env                | Error response                       | Error correctly propagated            |
| IT20 | Email content verification              | Valid input, test transport             | Email with correct content           | HTML format, fields correct          |

