# AI Assistant Testing Guide

## Quick Test Commands

Test the enhanced AI assistant with these questions to verify all features are working:

### 1. **Samozapošljavanje (Self-Employment) Tests**

**Test 1.1 - Croatian**
```
User Input: "Trebam pomoć sa samozaposljavanje"
Expected: Full knowledge base response about self-employment support, 120,000 kn, 24 months, application process
```

**Test 1.2 - English**
```
User Input: "How can I get self-employment support?"
Expected: Complete English version of knowledge base with all details
```

**Test 1.3 - Variation**
```
User Input: "Trebam poticaj za obrt"
Expected: Same Samozapošljavanje knowledge base triggered
```

---

### 2. **HAMAG-BICRO Tests**

**Test 2.1 - Croatian**
```
User Input: "Što je HAMAG"
Expected: Full HAMAG knowledge base with financing types, metrics, programs, contact
```

**Test 2.2 - English**
```
User Input: "Tell me about HAMAG-BICRO"
Expected: Complete English knowledge base response
```

**Test 2.3 - Variation**
```
User Input: "Trebam bespovratnu potporu"
Expected: HAMAG knowledge base triggered
```

---

### 3. **HBOR Tests**

**Test 3.1 - Croatian**
```
User Input: "Trebam investicijski kredit"
Expected: Full HBOR knowledge base with credit types, programs, contact info
```

**Test 3.2 - English**
```
User Input: "What is HBOR?"
Expected: Complete HBOR information in English
```

**Test 3.3 - Variation**
```
User Input: "HBOR krediti"
Expected: HBOR knowledge base triggered
```

---

### 4. **Extended Website Types Tests**

**Test 4.1 - Croatian**
```
User Input: "Koje vrste stranica radite?"
Expected: List of 12+ website types (presentation, e-commerce, blog, etc.)
```

**Test 4.2 - English**
```
User Input: "What types of websites can you build?"
Expected: Extended list of all website types with descriptions
```

**Test 4.3 - Variation**
```
User Input: "Radite li e-commerce?"
Expected: Detailed explanation of e-commerce capabilities
```

---

### 5. **Language Switching Tests**

**Test 5.1**
```
1. Switch language to HR
2. Ask: "Trebam samozaposljavanje"
3. Expected: Croatian knowledge base response
4. Switch language to EN
5. Ask same question in English
6. Expected: English knowledge base response
```

---

### 6. **Fallback Tests**

**Test 6.1 - FAQ Response**
```
User Input: "Koliko je telefon?"
Expected: Short FAQ response with phone number (not knowledge base)
```

**Test 6.2 - Default Response**
```
User Input: "asdfghjkl"
Expected: Generic "Thank you for your question" response
```

---

## Expected Behavior

### Knowledge Base Triggers
- **Very Long Responses** (multiple paragraphs with formatting)
- **Detailed Bullet Points**
- **Contact Information** included
- **Multiple Language Versions** available

### FAQ Responses
- **Short Answers** (1-2 sentences)
- **Direct Information**
- **No extensive formatting**

### Default Response
- **Generic greeting** asking to clarify
- **List of 4 main services**
- **Invitation to contact**

---

## Response Quality Checklist

When testing, verify:

- [ ] Response is detailed and comprehensive
- [ ] Information is accurate
- [ ] Links to external websites included (where relevant)
- [ ] Contact information provided
- [ ] Language switching works smoothly
- [ ] Both HR and EN versions available
- [ ] Formatting is readable (bullet points, line breaks)
- [ ] No syntax errors or truncation
- [ ] Appropriate response type triggered (KB vs FAQ vs default)

---

## Common Issues & Solutions

### Issue: Short response instead of knowledge base
**Solution**: Check spelling of trigger keywords in user input

### Issue: English response when Croatian expected
**Solution**: Verify language button is set to HR in navbar

### Issue: Knowledge base not showing contact info
**Solution**: Ensure knowledge base data is properly formatted with line breaks

### Issue: Multiple questions answered when asking one
**Solution**: User may be asking compound question - ask separately

---

## Performance Notes

- Response time: < 500ms (AI simulates delay with 500ms timeout)
- Knowledge base size: ~3KB per language
- No network calls required (all data embedded)
- Works offline once page loaded

---

## Contact for Issues

If you encounter problems:
- **Email**: info@neotel-media.hr
- **Phone**: +385 95 2229994
- **Hours**: Mon-Fri 09:00-17:00

Include:
- Browser/device used
- User input that caused issue
- Actual vs expected response
- Language setting (HR/EN)

---

## Test Completion Criteria

✅ All knowledge bases returning full detailed content
✅ Language switching working for all responses
✅ FAQ responses working for general questions
✅ Default response triggers appropriately
✅ Extended website types displaying correctly
✅ No errors in browser console
✅ Chat window opening/closing smoothly
✅ Messages displaying with proper formatting

**Status**: Ready for Production Testing
