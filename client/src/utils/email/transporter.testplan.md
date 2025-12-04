# Test Specification: transporter.js

## Purpose of the Module

The `transporter.js` utility module is responsible for creating and configuring a nodemailer email transport instance. It acts as a configuration utility that:

- Reads SMTP configuration from environment variables
- Converts and validates port configuration
- Determines secure connection settings based on port number
- Constructs a properly configured nodemailer transport object
- Provides a reusable transport factory for the service layer

This module is a **trusted primitive** used by the service layer (`contact.js`), which handles business logic, validation, and error handling.

## Public Functions/Exports

### `createPrivateEmailTransport()`

**Type:** `async function`
**Parameters:** None
**Returns:** `Promise<nodemailer.Transporter>`

**Description:** Creates and returns a configured nodemailer transport instance. Reads SMTP configuration from environment variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) and configures connection settings including timeouts and security options.

## Complete List of Use Cases

### Use Case 1: Successful Transport Creation with Standard Port
- **Input:** Valid environment variables (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
- **Expected Behavior:** 
  - Reads all environment variables correctly
  - Converts SMTP_PORT to number
  - Creates transport with correct configuration
  - Returns nodemailer transporter instance
- **Side Effects:** None (pure configuration function)

### Use Case 2: Transport Creation with Secure Port (465)
- **Input:** SMTP_PORT=465, other valid env vars
- **Expected Behavior:** 
  - Sets `secure: true`
  - Sets `requireTLS: false`
  - Returns configured transporter
- **Side Effects:** None

### Use Case 3: Transport Creation with Non-Secure Port
- **Input:** SMTP_PORT=587 (or any port != 465), other valid env vars
- **Expected Behavior:** 
  - Sets `secure: false`
  - Sets `requireTLS: true`
  - Returns configured transporter
- **Side Effects:** None

### Use Case 4: Transport Creation with Different Port Numbers
- **Input:** Various port numbers (25, 2525, 587, 465, etc.)
- **Expected Behavior:** 
  - Correctly converts port string to number
  - Correctly determines secure flag based on port
  - Returns configured transporter
- **Side Effects:** None

## Edge Cases

### Edge Case 1: Missing SMTP_PORT Environment Variable (FAILS)
- **Input:** SMTP_PORT is undefined
- **Expected Behavior:** 
  - Validation fails before transport creation
  - Throws Error: "SMTP_PORT environment variable is required"
- **Side Effects:** No transport is created

### Edge Case 2: Missing SMTP_HOST Environment Variable (FAILS)
- **Input:** SMTP_HOST is undefined
- **Expected Behavior:** 
  - Validation fails before transport creation
  - Throws Error: "SMTP_HOST environment variable is required"
- **Side Effects:** No transport is created

### Edge Case 3: Missing SMTP_USER Environment Variable (FAILS)
- **Input:** SMTP_USER is undefined
- **Expected Behavior:** 
  - Validation fails before transport creation
  - Throws Error: "SMTP_USER environment variable is required"
- **Side Effects:** No transport is created

### Edge Case 4: Missing SMTP_PASS Environment Variable (FAILS)
- **Input:** SMTP_PASS is undefined
- **Expected Behavior:** 
  - Validation fails before transport creation
  - Throws Error: "SMTP_PASS environment variable is required"
- **Side Effects:** No transport is created

### Edge Case 5: SMTP_PORT as Non-Numeric String (FAILS)
- **Input:** SMTP_PORT="not-a-number"
- **Expected Behavior:** 
  - `Number("not-a-number")` returns `NaN`
  - Validation fails before transport creation
  - Throws Error: "SMTP_PORT must be a valid number"
- **Side Effects:** No transport is created

### Edge Case 6: SMTP_PORT as Empty String (FAILS)
- **Input:** SMTP_PORT=""
- **Expected Behavior:** 
  - Validation fails before transport creation
  - Throws Error: "SMTP_PORT environment variable is required"
- **Side Effects:** No transport is created

### Edge Case 7: SMTP_PORT as Zero
- **Input:** SMTP_PORT="0"
- **Expected Behavior:** 
  - Port becomes `0`
  - Secure flag: `0 === 465` is false
  - Transport created with port 0

### Edge Case 8: SMTP_PORT as Negative Number
- **Input:** SMTP_PORT="-1"
- **Expected Behavior:** 
  - Port becomes `-1`
  - Secure flag: `-1 === 465` is false
  - Transport created with negative port

### Edge Case 9: SMTP_PORT as Very Large Number
- **Input:** SMTP_PORT="99999"
- **Expected Behavior:** 
  - Port becomes `99999`
  - Secure flag: `99999 === 465` is false
  - Transport created with large port number

### Edge Case 10: SMTP_PORT as Float
- **Input:** SMTP_PORT="465.5"
- **Expected Behavior:** 
  - Port becomes `465.5`
  - Secure flag: `465.5 === 465` is false (strict equality)
  - Transport created with float port

## Error Conditions

### Error Condition 1: Nodemailer Creation Failure
- **Scenario:** nodemailer.createTransport() throws an error (unlikely but possible)
- **Expected Behavior:** 
  - Error propagates to caller (not caught in this module)
  - Service layer handles the error

## Invalid Inputs

### Invalid Input 1: All Environment Variables Missing (FAILS)
- **Input:** All SMTP_* env vars are undefined
- **Expected Behavior:** 
  - Validation fails on first missing variable (SMTP_HOST)
  - Throws Error: "SMTP_HOST environment variable is required"
- **Side Effects:** No transport is created

### Invalid Input 2: Empty String Environment Variables (FAILS)
- **Input:** All SMTP_* env vars are empty strings
- **Expected Behavior:** 
  - Validation fails on SMTP_PORT empty string check
  - Throws Error: "SMTP_PORT environment variable is required"
- **Side Effects:** No transport is created

## Domain/Business Rules Enforced

### Business Rule 1: Environment Variable Validation
- All required environment variables must be present and non-empty:
  - SMTP_HOST: Required, must be defined
  - SMTP_PORT: Required, must be defined and non-empty
  - SMTP_USER: Required, must be defined
  - SMTP_PASS: Required, must be defined
- Missing or empty required variables throw descriptive errors
- Validation occurs before transport creation

### Business Rule 2: Port Number Conversion and Validation
- SMTP_PORT must be converted from string to number using `Number()`
- Port conversion happens before secure flag determination

### Business Rule 3: Secure Connection Logic
- Secure connection is determined by: `port === 465`
- Uses strict equality (===) comparison
- If port is 465: `secure: true, requireTLS: false`
- If port is not 465: `secure: false, requireTLS: true`

### Business Rule 4: Timeout Configuration
- All timeouts are set to 5000ms:
  - `connectionTimeout: 5000`
  - `socketTimeout: 5000`
  - `greetingTimeout: 5000`
- These are hardcoded values

### Business Rule 5: Authentication Configuration
- Auth object contains:
  - `user: process.env.SMTP_USER`
  - `pass: process.env.SMTP_PASS`
- Both values are read directly from environment (no transformation)

### Business Rule 6: Transport Configuration Structure
- Transport config must include:
  - `host`: from SMTP_HOST
  - `port`: converted number from SMTP_PORT
  - `secure`: boolean based on port === 465
  - `requireTLS`: boolean inverse of secure
  - `auth`: object with user and pass
  - `connectionTimeout`: 5000
  - `socketTimeout`: 5000
  - `greetingTimeout`: 5000

## Expected Interactions with Dependencies

### Dependency 1: `nodemailer.createTransport(options)`
- **Interaction:** Called once with configuration object
- **Expected Parameters:** Object with host, port, secure, requireTLS, auth, and timeout properties
- **Expected Return:** nodemailer Transporter instance
- **Mock Strategy:** Mock nodemailer module to return a mock transporter

### Dependency 2: `process.env.SMTP_HOST`
- **Interaction:** Read once for host configuration
- **Expected Value:** String containing SMTP hostname
- **Mock Strategy:** Set in test environment or mock `process.env`

### Dependency 3: `process.env.SMTP_PORT`
- **Interaction:** Read once and converted to number
- **Expected Value:** String containing port number (will be converted)
- **Mock Strategy:** Set in test environment or mock `process.env`

### Dependency 4: `process.env.SMTP_USER`
- **Interaction:** Read once for auth.user
- **Expected Value:** String containing SMTP username
- **Mock Strategy:** Set in test environment or mock `process.env`

### Dependency 5: `process.env.SMTP_PASS`
- **Interaction:** Read once for auth.pass
- **Expected Value:** String containing SMTP password
- **Mock Strategy:** Set in test environment or mock `process.env`

## Inputs, Outputs, and Expected Side Effects

### Inputs
- None (function takes no parameters)
- Reads from `process.env`: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

### Outputs
- **Success:** Returns nodemailer Transporter instance
- **Error:** Propagates any errors from nodemailer (not caught in this module)

### Side Effects
- Reads environment variables (no mutation)
- Creates nodemailer transport instance (no network connection yet)
- No database changes
- No file system changes
- No state mutations (pure configuration function)

## Test Case Matrix

### Happy Path Tests

| ID   | Test Case                              | Environment Variables                    | Expected Output                          |
|------|----------------------------------------|------------------------------------------|------------------------------------------|
| TC1  | Successful transport creation          | All valid env vars (port 587)            | Transporter with secure=false, requireTLS=true |
| TC2  | Transport with secure port (465)       | SMTP_PORT=465, other valid               | Transporter with secure=true, requireTLS=false |
| TC3  | Transport with standard port (587)      | SMTP_PORT=587, other valid               | Transporter with secure=false, requireTLS=true |
| TC4  | Transport with port 25                 | SMTP_PORT=25, other valid                | Transporter with secure=false, requireTLS=true |
| TC5  | Transport with custom port (2525)      | SMTP_PORT=2525, other valid              | Transporter with secure=false, requireTLS=true |

### Configuration Verification Tests

| ID   | Test Case                              | Environment Variables                    | Expected Configuration                   |
|------|----------------------------------------|------------------------------------------|------------------------------------------|
| TC6  | Verify host is set correctly           | SMTP_HOST="smtp.example.com"            | host: "smtp.example.com"                |
| TC7  | Verify port conversion to number       | SMTP_PORT="587"                          | port: 587 (number)                      |
| TC8  | Verify auth.user is set correctly      | SMTP_USER="user@example.com"            | auth.user: "user@example.com"           |
| TC9  | Verify auth.pass is set correctly      | SMTP_PASS="password123"                  | auth.pass: "password123"                |
| TC10 | Verify all timeouts are 5000ms          | Any valid env vars                       | All timeouts: 5000                      |
| TC11 | Verify requireTLS inverse of secure     | SMTP_PORT=465                            | requireTLS: false (when secure: true)   |
| TC12 | Verify requireTLS inverse of secure    | SMTP_PORT=587                            | requireTLS: true (when secure: false)   |

### Edge Case Tests

| ID   | Test Case                              | Environment Variables                    | Expected Behavior                       |
|------|----------------------------------------|------------------------------------------|------------------------------------------|
| TC13 | Missing SMTP_PORT (FAILS)               | SMTP_PORT undefined                      | Throws Error: "SMTP_PORT environment variable is required" |
| TC14 | Missing SMTP_HOST (FAILS)               | SMTP_HOST undefined                      | Throws Error: "SMTP_HOST environment variable is required" |
| TC15 | Missing SMTP_USER (FAILS)               | SMTP_USER undefined                      | Throws Error: "SMTP_USER environment variable is required" |
| TC16 | Missing SMTP_PASS (FAILS)               | SMTP_PASS undefined                      | Throws Error: "SMTP_PASS environment variable is required" |
| TC17 | SMTP_PORT as non-numeric string (FAILS) | SMTP_PORT="not-a-number"                 | Throws Error: "SMTP_PORT must be a valid number" |
| TC18 | SMTP_PORT as empty string (FAILS)       | SMTP_PORT=""                             | Throws Error: "SMTP_PORT environment variable is required" |
| TC19 | SMTP_PORT as zero                       | SMTP_PORT="0"                            | Port becomes 0, secure=false             |
| TC20 | SMTP_PORT as negative number            | SMTP_PORT="-1"                           | Port becomes -1, secure=false           |
| TC21 | SMTP_PORT as very large number          | SMTP_PORT="99999"                        | Port becomes 99999, secure=false         |
| TC22 | SMTP_PORT as float                      | SMTP_PORT="465.5"                        | Port becomes 465.5, secure=false         |
| TC23 | All environment variables missing       | All SMTP_* undefined                     | Transport with all undefined values     |
| TC24 | Empty string environment variables      | All SMTP_* = ""                          | Transport with empty/zero values        |

