# Test Specification: phone.js

## Purpose of the Module

The `phone.js` utility module is responsible for parsing and formatting Bulgarian phone numbers. It acts as a pure utility function that:

- Validates input types and handles edge cases
- Strips non-digit and non-plus characters from phone numbers
- Validates Bulgarian phone number format (+359 followed by 9 digits)
- Formats valid phone numbers into a standardized display format
- Provides consistent phone number formatting for the presentation layer

This module is a **trusted primitive** used by the presentation layer (components), which handles UI rendering and user interaction.

## Public Functions/Exports

### `parseBgPhone(number)`

**Type:** `function`
**Parameters:**
- `number` (any): The phone number to parse and format

**Returns:** `string` or throws `Error`

**Description:** Parses a phone number string, validates it matches Bulgarian format (+359 followed by 9 digits), and returns a formatted string in the pattern "+359 XX XXX XXXX". Returns empty string for invalid input types (null, undefined, non-string, or empty string). Throws error for invalid format after sanitization.

## Complete List of Use Cases

### Use Case 1: Valid Bulgarian Phone Number - Standard Format
- **Input:** "+359123456789" or "+359 123 456 789"
- **Expected Behavior:** 
  - Strips spaces/formatting
  - Validates format
  - Returns: "+359 12 345 6789"
- **Side Effects:** None (pure function)

### Use Case 2: Valid Bulgarian Phone Number - With Special Characters
- **Input:** "+359-123-456-789" or "+359 (123) 456-789" (single type of formatting)
- **Expected Behavior:** 
  - Strips dashes, parentheses, spaces
  - Validates format
  - Returns: "+359 12 345 6789"
- **Side Effects:** None

### Use Case 3: Valid Bulgarian Phone Number - With Extra Whitespace
- **Input:** "+359  123  456  789" (multiple spaces)
- **Expected Behavior:** 
  - Strips all spaces
  - Validates format
  - Returns: "+359 12 345 6789"
- **Side Effects:** None

### Use Case 4: Valid Bulgarian Phone Number - Different Prefix Combinations
- **Input:** Various valid 2-digit prefixes (10-99) followed by valid 3+4 digits
- **Expected Behavior:** 
  - All valid combinations format correctly
  - Returns: "+359 XX XXX XXXX" format
- **Side Effects:** None

## Edge Cases

### Edge Case 1: Null Input
- **Input:** `null`
- **Expected Behavior:** 
  - Returns empty string `""`
  - No error thrown
- **Side Effects:** None

### Edge Case 2: Undefined Input
- **Input:** `undefined`
- **Expected Behavior:** 
  - Returns empty string `""`
  - No error thrown
- **Side Effects:** None

### Edge Case 3: Empty String Input
- **Input:** `""`
- **Expected Behavior:** 
  - Empty string check returns early
  - Returns empty string `""`
  - No error thrown
- **Side Effects:** None

### Edge Case 4: Non-String Input (Number)
- **Input:** `359123456789` (number type)
- **Expected Behavior:** 
  - Type check fails
  - Returns empty string `""`
  - No error thrown
- **Side Effects:** None

### Edge Case 5: Non-String Input (Object)
- **Input:** `{}` or `[]`
- **Expected Behavior:** 
  - Type check fails
  - Returns empty string `""`
  - No error thrown
- **Side Effects:** None

### Edge Case 6: Non-String Input (Boolean)
- **Input:** `true` or `false`
- **Expected Behavior:** 
  - Type check fails
  - Returns empty string `""`
  - No error thrown
- **Side Effects:** None

### Edge Case 7: Phone Number Missing Country Code
- **Input:** "123456789" (no +359)
- **Expected Behavior:** 
  - After sanitization, doesn't match pattern
  - Throws Error: "Invalid Bulgarian phone format"
- **Side Effects:** None

### Edge Case 8: Phone Number with Wrong Country Code
- **Input:** "+123456789012" (wrong country code)
- **Expected Behavior:** 
  - After sanitization, doesn't match +359 pattern
  - Throws Error: "Invalid Bulgarian phone format"
- **Side Effects:** None

### Edge Case 9: Phone Number Too Short
- **Input:** "+35912345678" (only 8 digits after +359)
- **Expected Behavior:** 
  - After sanitization, doesn't match pattern (needs 9 digits)
  - Throws Error: "Invalid Bulgarian phone format"
- **Side Effects:** None

### Edge Case 10: Phone Number Too Long
- **Input:** "+3591234567890" (10 digits after +359)
- **Expected Behavior:** 
  - After sanitization, doesn't match pattern (needs exactly 9 digits)
  - Throws Error: "Invalid Bulgarian phone format"
- **Side Effects:** None

### Edge Case 11: Phone Number with Only Plus Sign
- **Input:** "+"
- **Expected Behavior:** 
  - After sanitization, doesn't match pattern
  - Throws Error: "Invalid Bulgarian phone format"
- **Side Effects:** None

### Edge Case 12: Phone Number with Letters
- **Input:** "+359abc123456" (contains letters)
- **Expected Behavior:** 
  - Letters are stripped by sanitization
  - Remaining digits may or may not match pattern
  - Either returns formatted or throws error
- **Side Effects:** None

### Edge Case 13: Phone Number with Only Digits (No Plus)
- **Input:** "359123456789" (no leading +)
- **Expected Behavior:** 
  - After sanitization, becomes "359123456789"
  - Doesn't match pattern (needs +359)
  - Throws Error: "Invalid Bulgarian phone format"
- **Side Effects:** None

### Edge Case 14: Whitespace-Only String
- **Input:** "   " (only spaces)
- **Expected Behavior:** 
  - Spaces are stripped
  - Empty string remains
  - Throws Error: "Invalid Bulgarian phone format"
- **Side Effects:** None

### Edge Case 15: String with Only Special Characters
- **Input:** "---()[]" (only special chars, no digits)
- **Expected Behavior:** 
  - Special characters are stripped
  - Empty string remains
  - Throws Error: "Invalid Bulgarian phone format"
- **Side Effects:** None

## Error Conditions

### Error Condition 1: Invalid Format After Sanitization
- **Scenario:** Input string exists and is valid type, but after stripping non-digit/non-plus characters, doesn't match +359 pattern
- **Expected Behavior:** 
  - Throws Error: "Invalid Bulgarian phone format"
  - Error message is exactly as specified

## Invalid Inputs

### Invalid Input 1: Wrong Format - Missing Digits
- **Input:** "+35912345" (only 5 digits after +359)
- **Expected Behavior:** Throws Error: "Invalid Bulgarian phone format"

### Invalid Input 2: Wrong Format - Extra Digits
- **Input:** "+35912345678901" (11 digits after +359)
- **Expected Behavior:** Throws Error: "Invalid Bulgarian phone format"

### Invalid Input 3: Wrong Format - Invalid Prefix
- **Input:** "+359012345678" (prefix starts with 0, which may be invalid)
- **Expected Behavior:** 
  - May match pattern if regex allows 0X prefix
  - Returns formatted or throws error depending on regex validation

### Invalid Input 4: Wrong Format - Missing Plus
- **Input:** "359123456789" (no +)
- **Expected Behavior:** Throws Error: "Invalid Bulgarian phone format"

## Domain/Business Rules Enforced

### Business Rule 1: Input Type Validation
- Function accepts any input type
- If input is `null`, `undefined`, not a string, or empty string, returns empty string `""`
- No error is thrown for type mismatches or empty strings

### Business Rule 2: Character Sanitization
- All characters except digits (0-9) and plus sign (+) are removed
- Sanitization happens before format validation
- Regex pattern: `/[^\d+]/g` removes all non-digit, non-plus characters

### Business Rule 3: Format Validation
- Phone number must match pattern: `^\+359(\d{2})(\d{3})(\d{4})$`
- Must start with `+359`
- Must have exactly 9 digits after `+359`
- Digits are grouped as: 2 digits (prefix), 3 digits (middle), 4 digits (last)

### Business Rule 4: Output Formatting
- Valid phone numbers are formatted as: `+359 XX XXX XXXX`
- Format includes:
  - Country code: `+359`
  - Space separator
  - Prefix (2 digits): `XX`
  - Space separator
  - Middle (3 digits): `XXX`
  - Space separator
  - Last (4 digits): `XXXX`

### Business Rule 5: Error Handling
- Invalid format (after sanitization) throws Error with message: "Invalid Bulgarian phone format"
- Invalid input types return empty string (no error)
- Error is thrown, not returned

## Expected Interactions with Dependencies

### Dependency 1: None
- This is a pure utility function with no external dependencies
- No file system access
- No network access
- No database access
- No side effects

## Inputs, Outputs, and Expected Side Effects

### Inputs
- `number` (any): Phone number to parse and format

### Outputs
- **Success (valid format):** Formatted string: `"+359 XX XXX XXXX"`
- **Success (invalid type):** Empty string: `""`
- **Error (invalid format):** Throws Error: `"Invalid Bulgarian phone format"`

### Side Effects
- No side effects (pure function)
- No state mutations
- No external calls
- No I/O operations

## Test Case Matrix

### Happy Path Tests

| ID   | Test Case                              | Input                                    | Expected Output                    |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC1  | Valid phone - no formatting            | "+359123456789"                          | "+359 12 345 6789"                 |
| TC2  | Valid phone - with spaces              | "+359 123 456 789"                        | "+359 12 345 6789"                 |
| TC3  | Valid phone - with dashes              | "+359-123-456-789"                        | "+359 12 345 6789"                 |
| TC4  | Valid phone - with parentheses         | "+359 (123) 456-789"                      | "+359 12 345 6789"                 |
| TC5  | Valid phone - different prefix (10)    | "+359101234567"                           | "+359 10 123 4567"                 |
| TC6  | Valid phone - different prefix (99)    | "+359991234567"                           | "+359 99 123 4567"                 |
| TC7  | Valid phone - prefix 88               | "+359881234567"                           | "+359 88 123 4567"                 |

### Invalid Input Type Tests

| ID   | Test Case                              | Input                                    | Expected Output                    |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC9  | Null input                             | null                                     | ""                                 |
| TC10 | Undefined input                        | undefined                                | ""                                 |
| TC11 | Number input                          | 359123456789                             | ""                                 |
| TC12 | Object input                           | {}                                       | ""                                 |
| TC13 | Array input                            | []                                       | ""                                 |
| TC14 | Boolean input (true)                   | true                                     | ""                                 |
| TC15 | Boolean input (false)                  | false                                    | ""                                 |
| TC16 | Empty string input                     | ""                                       | ""                                 |

### Invalid Format Tests

| ID   | Test Case                              | Input                                    | Expected Output                    |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC17 | Missing country code                   | "123456789"                              | Throws Error                       |
| TC18 | Wrong country code                     | "+123456789012"                          | Throws Error                       |
| TC19 | Too short (8 digits)                  | "+35912345678"                           | Throws Error                       |
| TC20 | Too long (10 digits)                  | "+3591234567890"                         | Throws Error                       |
| TC21 | Only plus sign                         | "+"                                      | Throws Error                       |
| TC22 | No plus sign                           | "359123456789"                           | Throws Error                       |
| TC23 | Whitespace only                       | "   "                                    | Throws Error                       |
| TC24 | Special chars only                    | "---()[]"                                | Throws Error                       |
| TC25 | With letters (stripped)                | "+359abc123456"                          | Throws Error (if doesn't match)    |
| TC26 | Mixed formatting with extra text       | "+359 (123) 456-789 ext. 123"            | Throws Error (too many digits)     |
| TC27 | Invalid prefix (00)                   | "+359001234567"                          | May format or throw (depends on regex) |

### Sanitization Tests

| ID   | Test Case                              | Input                                    | Expected Output                    |
|------|----------------------------------------|------------------------------------------|------------------------------------|
| TC28 | Multiple spaces                        | "+359  123  456  789"                    | "+359 12 345 6789"                 |
| TC29 | Mixed special characters               | "+359-123.456_789"                       | "+359 12 345 6789"                 |
| TC30 | Phone with letters mixed in            | "+359a1b2c3d4e5f6g7h8i9"                | "+359 12 345 6789"                 |
| TC31 | Phone with Unicode characters          | "+359１２３４５６７８９" (full-width)    | "+359 12 345 6789" (if sanitized) |

