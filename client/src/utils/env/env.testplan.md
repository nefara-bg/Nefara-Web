# Test Specification: env.js

## Purpose of the Module

The `env.js` utility module provides validation and sanitization functions for public environment variables used throughout the application. It ensures that environment variables are in the correct format and safe to use, preventing injection attacks and runtime errors.

## Public Functions/Exports

### `validateClientUrl(url)`

**Type:** `function`
**Parameters:**
- `url` (string | undefined): The NEXT_PUBLIC_CLIENT_URL environment variable value
**Returns:** `string` - Validated and sanitized URL, or default fallback
**Description:** Validates that the client URL is a valid HTTP/HTTPS URL. Returns a safe default if invalid.

### `validateContactEmail(email)`

**Type:** `function`
**Parameters:**
- `email` (string | undefined): The NEXT_PUBLIC_CONTACT_EMAIL environment variable value
**Returns:** `string` - Validated email or empty string
**Description:** Validates that the contact email is in valid email format. Returns empty string if invalid.

### `validateContactPhone(phone)`

**Type:** `function`
**Parameters:**
- `phone` (string | undefined): The NEXT_PUBLIC_CONTACT_PHONE environment variable value
**Returns:** `string` - Validated phone or empty string
**Description:** Validates that the contact phone is in a reasonable format. Returns empty string if invalid.

## Complete List of Use Cases

### Use Case 1: Validate Valid Client URL
- **Input:** Valid HTTP/HTTPS URL (e.g., "https://example.com")
- **Expected Behavior:** 
  - Returns the URL as-is if valid
  - No changes to valid URLs
- **Side Effects:** None

### Use Case 2: Validate Valid Contact Email
- **Input:** Valid email format (e.g., "contact@example.com")
- **Expected Behavior:** 
  - Returns the email as-is if valid
  - No changes to valid emails
- **Side Effects:** None

### Use Case 3: Validate Valid Contact Phone
- **Input:** Valid phone format (e.g., "+359123456789")
- **Expected Behavior:** 
  - Returns the phone as-is if valid
  - No changes to valid phones
- **Side Effects:** None

### Use Case 4: Invalid Client URL Falls Back to Default
- **Input:** Invalid URL or undefined
- **Expected Behavior:** 
  - Returns safe default: "http://localhost:3000"
  - Prevents broken URLs in metadata
- **Side Effects:** None

### Use Case 5: Invalid Contact Email Returns Empty String
- **Input:** Invalid email format or undefined
- **Expected Behavior:** 
  - Returns empty string ""
  - Prevents invalid emails in links
- **Side Effects:** None

### Use Case 6: Invalid Contact Phone Returns Empty String
- **Input:** Invalid phone format or undefined
- **Expected Behavior:** 
  - Returns empty string ""
  - Prevents invalid phones in links
- **Side Effects:** None

## Edge Cases

### Edge Case 1: Null Input
- **Input:** `null` for any function
- **Expected Behavior:** Treated as undefined, returns default/empty string
- **Side Effects:** None

### Edge Case 2: Undefined Input
- **Input:** `undefined` for any function
- **Expected Behavior:** Returns default/empty string
- **Side Effects:** None

### Edge Case 3: Empty String Input
- **Input:** Empty string `""`
- **Expected Behavior:** 
  - Client URL: Returns default
  - Email/Phone: Returns empty string
- **Side Effects:** None

### Edge Case 4: Whitespace-Only Input
- **Input:** String with only whitespace
- **Expected Behavior:** 
  - Trimmed, then validated
  - Returns default/empty string if invalid after trim
- **Side Effects:** None

### Edge Case 5: Client URL with Localhost in Production
- **Input:** "http://localhost:3000" (should be caught in production)
- **Expected Behavior:** 
  - Currently allowed (may want to add production check later)
  - Returns as-is if valid URL format
- **Side Effects:** None

### Edge Case 6: Email with Special Characters
- **Input:** Email with +, -, etc. (e.g., "user+test@example.com")
- **Expected Behavior:** 
  - Valid email format, returns as-is
  - Special characters are valid in emails
- **Side Effects:** None

### Edge Case 7: Phone with Various Formats
- **Input:** Phone in different formats (with spaces, dashes, etc.)
- **Expected Behavior:** 
  - Validates basic phone structure
  - Returns as-is if reasonable format
- **Side Effects:** None

### Edge Case 8: Malicious Content in URL
- **Input:** URL with script tags or injection attempts
- **Expected Behavior:** 
  - URL validation should reject invalid formats
  - Returns default if not valid URL
- **Security Impact:** Prevents URL injection attacks

### Edge Case 9: Malicious Content in Email
- **Input:** Email with injection attempts
- **Expected Behavior:** 
  - Email validation should reject invalid formats
  - Returns empty string if not valid email
- **Security Impact:** Prevents email injection attacks

## Error Conditions

### Error Condition 1: None
- These functions are designed to never throw errors
- All edge cases return safe defaults

## Invalid Inputs

### Invalid Input 1: Non-String Types
- **Input:** Number, object, array, boolean
- **Expected Behavior:** 
  - Converted to string first
  - Then validated
  - Returns default/empty if invalid

### Invalid Input 2: Invalid URL Format
- **Input:** "not-a-url", "ftp://example.com", "javascript:alert(1)"
- **Expected Behavior:** 
  - URL validation fails
  - Returns default URL

### Invalid Input 3: Invalid Email Format
- **Input:** "not-an-email", "user@", "@domain.com", "user@domain"
- **Expected Behavior:** 
  - Email validation fails
  - Returns empty string

### Invalid Input 4: Invalid Phone Format
- **Input:** "not-a-phone", "abc123", empty string
- **Expected Behavior:** 
  - Phone validation fails
  - Returns empty string

## Domain/Business Rules Enforced

### Business Rule 1: Security First
- All environment variables must be validated before use
- Invalid values return safe defaults (never throw)
- Prevents injection attacks through env vars

### Business Rule 2: URL Validation
- Client URL must be valid HTTP/HTTPS URL
- Must start with http:// or https://
- Default fallback: "http://localhost:3000"
- Prevents broken URLs in metadata

### Business Rule 3: Email Validation
- Contact email must match valid email format
- Uses same regex as contact service: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Returns empty string if invalid
- Prevents invalid emails in mailto: links

### Business Rule 4: Phone Validation
- Contact phone should be non-empty string
- Basic validation (not empty, reasonable length)
- Returns empty string if invalid
- Prevents invalid phones in tel: links

### Business Rule 5: Safe Defaults
- All functions return safe defaults
- Never throw errors
- Always return strings

## Expected Interactions with Dependencies

### Dependency 1: `process.env`
- **Interaction:** Read environment variables
- **Expected Behavior:** Values may be undefined, null, or strings
- **Mock Strategy:** Mock `process.env` in tests

## Inputs, Outputs, and Expected Side Effects

### Inputs
- `url` (string | undefined): NEXT_PUBLIC_CLIENT_URL value
- `email` (string | undefined): NEXT_PUBLIC_CONTACT_EMAIL value
- `phone` (string | undefined): NEXT_PUBLIC_CONTACT_PHONE value

### Outputs
- **Client URL:** Valid URL string or "http://localhost:3000"
- **Email:** Valid email string or ""
- **Phone:** Valid phone string or ""

### Side Effects
- None (pure functions)

## Test Case Matrix

### Happy Path Tests

| ID   | Test Case                          | Input                                    | Expected Output              |
|------|------------------------------------|------------------------------------------|------------------------------|
| TC1  | Validate valid HTTPS URL           | "https://example.com"                    | "https://example.com"        |
| TC2  | Validate valid HTTP URL             | "http://example.com"                     | "http://example.com"         |
| TC3  | Validate URL with port              | "https://example.com:3000"                | "https://example.com:3000"   |
| TC4  | Validate valid email                | "contact@example.com"                    | "contact@example.com"        |
| TC5  | Validate email with plus            | "user+test@example.com"                  | "user+test@example.com"       |
| TC6  | Validate valid phone                | "+359123456789"                          | "+359123456789"              |
| TC7  | Validate phone with spaces          | "+359 12 345 6789"                       | "+359 12 345 6789"           |

### Validation Error Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC8  | Invalid URL - not a URL            | "not-a-url"                              | "http://localhost:3000" (default)                  |
| TC9  | Invalid URL - FTP protocol         | "ftp://example.com"                      | "http://localhost:3000" (default)                  |
| TC10 | Invalid URL - javascript protocol  | "javascript:alert(1)"                     | "http://localhost:3000" (default)                  |
| TC11 | Invalid email - no @                | "not-an-email"                           | ""                                                  |
| TC12 | Invalid email - no domain           | "user@"                                  | ""                                                  |
| TC13 | Invalid email - no TLD              | "user@domain"                            | ""                                                  |
| TC14 | Invalid phone - empty               | ""                                       | ""                                                  |
| TC15 | Invalid phone - non-phone string    | "not-a-phone"                            | "" (or keep if basic validation passes)            |

### Edge Case Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC16 | Null URL input                     | null                                     | "http://localhost:3000"                            |
| TC17 | Undefined URL input                | undefined                                | "http://localhost:3000"                            |
| TC18 | Empty string URL                   | ""                                       | "http://localhost:3000"                            |
| TC19 | Whitespace-only URL                | "   "                                    | "http://localhost:3000"                            |
| TC20 | Null email input                   | null                                     | ""                                                  |
| TC21 | Undefined email input               | undefined                                | ""                                                  |
| TC22 | Empty string email                 | ""                                       | ""                                                  |
| TC23 | Whitespace-only email              | "   "                                    | ""                                                  |
| TC24 | Null phone input                   | null                                     | ""                                                  |
| TC25 | Undefined phone input               | undefined                                | ""                                                  |
| TC26 | Whitespace-only phone              | "   "                                    | ""                                                  |
| TC27 | Non-string URL (number)            | 123                                      | "http://localhost:3000" (converted, then invalid)   |
| TC28 | Non-string email (number)          | 123                                      | "" (converted, then invalid)                        |
| TC29 | Non-string phone (number)          | 123456789                                | "123456789" (converted, may be valid)              |

### Security Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC30 | URL with script injection          | "https://example.com?<script>"            | "http://localhost:3000" (invalid URL format)       |
| TC31 | Email with script injection        | "user<script>@example.com"                | "" (invalid email format)                           |
| TC32 | Phone with injection attempt       | "123456;alert('xss')"                    | "" or original (depends on validation strictness) |

