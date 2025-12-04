# Test Specification: url.js

## Purpose of the Module

The `url.js` utility module provides safe URL encoding functions for email and phone numbers used in `mailto:` and `tel:` links. It prevents injection attacks by properly encoding special characters.

## Public Functions/Exports

### `encodeEmailForMailto(email)`

**Type:** `function`
**Parameters:**
- `email` (string): The email address to encode
**Returns:** `string` - URL-encoded email address
**Description:** Safely encodes an email address for use in `mailto:` links by URL-encoding special characters to prevent injection attacks.

### `encodePhoneForTel(phone)`

**Type:** `function`
**Parameters:**
- `phone` (string): The phone number to encode
**Returns:** `string` - URL-encoded phone number
**Description:** Safely encodes a phone number for use in `tel:` links by URL-encoding special characters to prevent injection attacks.

## Complete List of Use Cases

### Use Case 1: Encode Valid Email Address
- **Input:** Valid email string (e.g., "user@example.com")
- **Expected Behavior:** 
  - Returns URL-encoded email
  - Special characters are encoded
  - Email remains functional in mailto: link
- **Side Effects:** None

### Use Case 2: Encode Email with Special Characters
- **Input:** Email with special characters (e.g., "user+test@example.com")
- **Expected Behavior:** 
  - Special characters are properly encoded
  - Email remains functional
- **Side Effects:** None

### Use Case 3: Encode Valid Phone Number
- **Input:** Valid phone string (e.g., "+359123456789")
- **Expected Behavior:** 
  - Returns URL-encoded phone
  - Special characters are encoded
  - Phone remains functional in tel: link
- **Side Effects:** None

### Use Case 4: Encode Phone with Special Characters
- **Input:** Phone with special characters (e.g., "+359 12 345 6789")
- **Expected Behavior:** 
  - Spaces and special characters are properly encoded
  - Phone remains functional
- **Side Effects:** None

## Edge Cases

### Edge Case 1: Null Input
- **Input:** `null` for email or phone
- **Expected Behavior:** Returns empty string `""`
- **Side Effects:** None

### Edge Case 2: Undefined Input
- **Input:** `undefined` for email or phone
- **Expected Behavior:** Returns empty string `""`
- **Side Effects:** None

### Edge Case 3: Empty String Input
- **Input:** Empty string `""`
- **Expected Behavior:** Returns empty string `""`
- **Side Effects:** None

### Edge Case 4: Non-String Input
- **Input:** Number, object, array, etc.
- **Expected Behavior:** Converts to string first, then encodes
- **Side Effects:** None

### Edge Case 5: Whitespace-Only Input
- **Input:** String with only whitespace (e.g., "   ")
- **Expected Behavior:** Trims whitespace, returns empty string if result is empty
- **Side Effects:** None

### Edge Case 6: Email with Injection Attempt
- **Input:** Email with query parameters or script tags (e.g., "user@example.com?subject=<script>")
- **Expected Behavior:** All special characters are encoded, preventing injection
- **Security Impact:** Prevents mailto: link injection attacks

### Edge Case 7: Phone with Injection Attempt
- **Input:** Phone with special characters that could break tel: link (e.g., "123456;alert('xss')")
- **Expected Behavior:** All special characters are encoded, preventing injection
- **Security Impact:** Prevents tel: link injection attacks

## Error Conditions

### Error Condition 1: None
- These functions are designed to never throw errors
- All edge cases return safe defaults (empty string)

## Invalid Inputs

### Invalid Input 1: Null
- **Input:** `null`
- **Expected Behavior:** Returns `""`

### Invalid Input 2: Undefined
- **Input:** `undefined`
- **Expected Behavior:** Returns `""`

### Invalid Input 3: Non-String Types
- **Input:** Number, object, array, boolean
- **Expected Behavior:** Converts to string, then encodes

## Domain/Business Rules Enforced

### Business Rule 1: Security First
- All user input must be URL-encoded before use in mailto: or tel: links
- Prevents injection attacks through URL manipulation
- Special characters are always encoded

### Business Rule 2: Safe Defaults
- Invalid or missing input returns empty string
- Never throws errors
- Always returns a string

### Business Rule 3: Input Sanitization
- Input is trimmed before encoding
- Empty strings after trimming return empty string
- Type coercion happens before encoding

## Expected Interactions with Dependencies

### Dependency 1: `encodeURIComponent()`
- **Interaction:** Used to encode the input string
- **Expected Behavior:** Properly encodes all special characters
- **Mock Strategy:** Not needed (native function)

## Inputs, Outputs, and Expected Side Effects

### Inputs
- `email` (string | null | undefined): Email address to encode
- `phone` (string | null | undefined): Phone number to encode

### Outputs
- **Success:** URL-encoded string
- **Empty/Invalid:** Empty string `""`

### Side Effects
- None (pure functions)

## Test Case Matrix

### Happy Path Tests

| ID   | Test Case                          | Input                                    | Expected Output              |
|------|------------------------------------|------------------------------------------|------------------------------|
| TC1  | Encode valid email                 | "user@example.com"                       | "user%40example.com"         |
| TC2  | Encode email with plus             | "user+test@example.com"                  | "user%2Btest%40example.com"  |
| TC3  | Encode valid phone                 | "+359123456789"                          | "%2B359123456789"            |
| TC4  | Encode phone with spaces           | "+359 12 345 6789"                       | "%2B359%2012%20345%206789"   |

### Security Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC5  | Email with query injection         | "user@example.com?subject=<script>"      | Encoded, no script tags                            |
| TC6  | Email with special chars            | "user&test@example.com"                  | All special chars encoded                           |
| TC7  | Phone with injection attempt        | "123456;alert('xss')"                    | All special chars encoded                           |
| TC8  | Phone with special chars            | "+359-12-345-6789"                       | All special chars encoded                           |

### Edge Case Tests

| ID   | Test Case                          | Input                                    | Expected Output                                    |
|------|------------------------------------|------------------------------------------|----------------------------------------------------|
| TC9  | Null email input                   | null                                     | ""                                                  |
| TC10 | Undefined email input              | undefined                                | ""                                                  |
| TC11 | Empty string email                 | ""                                       | ""                                                  |
| TC12 | Null phone input                   | null                                     | ""                                                  |
| TC13 | Undefined phone input              | undefined                                | ""                                                  |
| TC14 | Empty string phone                 | ""                                       | ""                                                  |
| TC15 | Whitespace-only email              | "   "                                    | ""                                                  |
| TC16 | Whitespace-only phone              | "   "                                    | ""                                                  |
| TC17 | Non-string email (number)          | 123                                      | "123" (converted to string)                        |
| TC18 | Non-string phone (number)          | 123456789                                | "123456789" (converted to string)                   |

