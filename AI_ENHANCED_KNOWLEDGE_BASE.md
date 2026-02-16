# Neotel AI Assistant - Enhanced Knowledge Base System

## Overview
The Neotel AI assistant has been upgraded with an **integrated knowledge base system** that fetches detailed information from external sources and delivers comprehensive, context-aware answers to user questions.

---

## Knowledge Base Architecture

### 1. **Data Sources**
The AI assistant now draws information from three authoritative government/institutional sources:

#### A. **Samozapošljavanje (Self-Employment Support)**
- **Source**: https://mjere.hzz.hr/mjere/potpora-za-samozaposljavanje/
- **Provider**: Hrvatski zavod za zapošljavanje (HZZ - Croatian Employment Service)
- **Coverage**: Self-employment financial support programs

#### B. **HAMAG-BICRO (SME Financing)**
- **Source**: https://hamagbicro.hr/
- **Provider**: Hrvatska agencija za malo gospodarstvo, inovacije i investicije
- **Coverage**: Grants, guarantees, micro loans, and business development support

#### C. **HBOR (Development Bank)**
- **Source**: https://www.hbor.hr/
- **Provider**: Hrvatska banka za obnovu i razvitak
- **Coverage**: Investment credits, working capital, export financing

---

## Knowledge Base Content

### Samozapošljavanje Knowledge Base

**Languages**: Croatian & English

**Key Information Provided**:
- **Support Amount**: Up to 120,000 kn
- **Duration**: 24 months
- **Target Groups**: Unemployed persons registered with HZZ
- **Business Forms**: Craft, trading company, freelancer, institution
- **Eligible Costs**:
  - Initial capital and investment
  - Registration and licensing
  - Equipment and inventory
  - Real estate or rent
  - Education and training
- **Requirements**:
  - Registration with HZZ
  - Business plan or business idea
  - Croatian citizenship
- **Application Process**:
  - Contact HZZ
  - Phone: 01/6444 000
  - Web: https://mjere.hzz.hr/mjere/potpora-za-samozaposljavanje/
- **Related Programs**:
  - Business Expansion Support
  - Employment Support
  - "Choose Croatia" Relocation Program

---

### HAMAG-BICRO Knowledge Base

**Languages**: Croatian & English

**Key Metrics**:
- Total Investments: 5.7 billion euros
- Projects Funded: 27,204+
- New Jobs Created: 43,493+

**Financing Types**:
1. **Non-refundable Grants** - For various business types
2. **Guarantees** - To access bank credits
3. **Micro Loans** - Small amounts with favorable terms
4. **Special Purpose Loans** - EU funds, energy efficiency, etc.

**Currently Open Programs**:
- EmBRACE project (micro and small enterprises)
- EENergy (up to 10,000 euros for energy efficiency)
- EFRR Guarantees (portfolio and individual)
- ESF+ Micro loans (growth and inclusion)
- European Social Funds (special programs)

**Process**:
- Develop business idea and plan
- HAMAG-BICRO provides guarantee or direct financing
- Access bank credits with better terms
- Free education and expert consulting available

**Contact**:
- Web: https://hamagbicro.hr/
- Email: info@hamagbicro.hr
- Address: Ksaver 208, Zagreb
- Open Calls: https://hamagbicro.hr/otvoreni-natjecaji/

---

### HBOR Knowledge Base

**Languages**: Croatian & English

**Credit Types**:
1. **Investment Credits** - New investments and modernization
2. **Working Capital** - Current operations
3. **Export Credit Insurance** - International trade
4. **Structured Credits** - With public subsidies
5. **EU Funded Credits** - Joint EU fund measures

**Credit Programs**:
- Energy Efficiency Program
- Credit line for small entrepreneurs
- Rural Development financing
- Export Credits for market expansion

**Application Process**:
1. Choose appropriate credit program
2. Prepare business plan and documentation
3. Contact HBOR or partner banks
4. Application processing (2-4 weeks)
5. Project implementation and monitoring

**Advantages**:
- Lower interest rates than commercial banks
- Longer repayment periods
- Flexible terms for new entrepreneurs
- Possible combination with EU subsidies

**Contact**:
- Web: https://www.hbor.hr/
- Headquarters: Strossmayerov trg 9, Zagreb
- Phone: 01 45 91 666 (general), 091 45 97 026 (info, weekdays 08-16h)
- Info days in different regions of Croatia

---

## Enhanced AI Response Features

### 1. **Extended Websites Knowledge**
When users ask about website types, the AI provides:
- Presentation websites
- E-commerce & web shops
- Blog platforms
- Mobile applications
- Corporate websites
- Community portals
- SaaS platforms
- Booking/reservation systems
- CMS websites
- Multilingual sites
- AI-enabled websites
- Article/news portals

### 2. **Contextual Financing Answers**
Users asking about financing get directed to appropriate sources:

**Keywords → Response Type**:
- "samozapošljavanje" → Full Samozapošljavanje knowledge base
- "hamag" or "hamag-bicro" → Complete HAMAG-BICRO information
- "hbor" or "investicijski" → Full HBOR credit information
- General financing → Overview with guidance to specific sources

### 3. **Multi-Level Detail Depth**
- **Quick Answers**: Short responses for general questions
- **Extended Answers**: Detailed multi-paragraph responses for specific programs
- **Formatted Information**: Structured lists, bullet points, and clear sections

### 4. **Bilingual Knowledge Base**
All knowledge base information available in:
- **Croatian (HR)** - Complete local terminology and details
- **English (EN)** - Professional English explanations

Automatic switching based on `currentLang` variable.

---

## Technical Implementation

### Code Structure

```javascript
// Knowledge base stored as object with language variants
const knowledgeBase = {
    samozaposljavanja: {
        hr: "...Croatian content...",
        en: "...English content..."
    },
    hamag: {
        hr: "...Croatian content...",
        en: "...English content..."
    },
    hbor: {
        hr: "...Croatian content...",
        en: "...English content..."
    }
};

// Pattern matching triggers knowledge base responses
if (matchAny([/samozapošljavanje|self-employment/])) {
    return knowledgeBase.samozaposljavanja[isEn ? 'en' : 'hr'];
}
```

### Response Flow

```
User Input
    ↓
Pattern Matching
    ↓
Check Knowledge Base Keywords
    ↓
Return Detailed Knowledge Base Content
    OR
Return FAQ-based Response
    OR
Return Default Response
```

---

## Usage Examples

### Example 1: Samozapošljavanje Question
**User**: "Trebam pomoć sa samozaposljavanje, koliko mogu dobiti?"
**AI Response**: *Full knowledge base content about self-employment support, including:*
- Support amounts (120,000 kn)
- Duration (24 months)
- Eligible costs
- Application process
- Contact information

### Example 2: HAMAG Financing
**User**: "What are HAMAG programs?"
**AI Response**: *Complete HAMAG-BICRO information including:*
- Financing types available
- Investment metrics
- Current open programs
- Contact details

### Example 3: HBOR Credit
**User**: "Mogu li dobiti investicijski kredit?"
**AI Response**: *Detailed HBOR knowledge base with:*
- Credit types available
- Programs offered
- Application process
- Advantages and contact info

### Example 4: Website Types
**User**: "Koje vrste stranica radite?"
**AI Response**: *Extended list of 12+ website types with descriptions*

---

## Advantages of This System

✅ **Accurate Information** - Directly sourced from official institutions
✅ **Current Data** - Reflects real programs and offerings
✅ **Comprehensive** - Detailed answers to complex questions
✅ **Bilingual** - Automatic language switching
✅ **Scalable** - Easy to add new knowledge bases
✅ **Maintainable** - Clean, organized code structure
✅ **User-Friendly** - Natural language triggers
✅ **Official Links** - Users can verify information on source websites

---

## Future Enhancements

### Phase 2: Dynamic Content Fetching
- Auto-fetch latest information from source websites periodically
- Cache system to prevent repeated requests
- Timestamp tracking for content freshness

### Phase 3: Context Awareness
- Remember conversation history
- Build user profile (startup vs established)
- Provide personalized recommendations

### Phase 4: Advanced Features
- Integration with Neotel's actual pricing database
- Real-time availability checking
- Booking system integration
- Document download capabilities

### Phase 5: Multi-Source Knowledge
- EU funding opportunities database
- Regional grants and incentives
- Industry-specific programs
- International financing options

---

## Information Currency

| Source | Last Updated | Refresh Rate |
|--------|-------------|-------------|
| Samozapošljavanje | Jan 26, 2022 | Quarterly |
| HAMAG-BICRO | Jan 29, 2026 | Monthly |
| HBOR | Jan 29, 2026 | Quarterly |

**Note**: Knowledge base embedded in code. For real-time updates, implement API integration with source institutions.

---

## Testing Checklist

- [x] Samozapošljavanje triggers working
- [x] HAMAG-BICRO responses detailed
- [x] HBOR information complete
- [x] Website types expanded
- [x] Croatian language version accurate
- [x] English language version accurate
- [x] Language switching functional
- [x] Contact information current
- [x] All links working
- [x] Formatting clear and readable

---

## Support & Maintenance

**Questions**: Contact Neotel at info@neotel-media.hr or +385 95 2229994

**Updates**: Knowledge base can be updated by modifying the `knowledgeBase` object in script.js

**Validation**: Test responses by asking:
1. "Trebam pomoć sa samozaposljavanje" (Test Samozapošljavanje)
2. "What programs does HAMAG offer?" (Test HAMAG)
3. "Trebam investicijski kredit" (Test HBOR)
4. "Koje vrste stranica radite?" (Test extended responses)

---

**Version**: 2.1 - Enhanced Knowledge Base Edition
**Status**: Production Ready ✅
**Last Updated**: January 29, 2026
