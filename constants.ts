
import { OperationMode, NoteTemplate, NotePriority, LoreEntry, RelationshipType, ExportTemplate, AppTheme } from './types'; 

export const COMMON_RELATIONSHIP_TYPES: RelationshipType[] = [
  "Ally", "Enemy", "Friend", "Rival", "Family (Sibling)", "Family (Parent)", 
  "Family (Child)", "Family (Spouse)", "Family (Other)", "Mentor", "Mentee", 
  "Romantic Interest", "Complicated", "Neutral", "Servant", "Master", "Acquaintance", "Other"
];


export const OPERATION_MODES: OperationMode[] = [
  {
    value: 'scene-analysis',
    label: 'วิเคราะห์ฉาก',
    systemInstruction: `คุณคือผู้ช่วยนักเขียน AI ผู้เชี่ยวชาญด้านการวิเคราะห์ฉาก
1.  วิเคราะห์ฉากที่ให้มาในรายละเอียดเกี่ยวกับองค์ประกอบ โครงสร้าง จังหวะ โทน อารมณ์ สัญลักษณ์ และผลกระทบโดยรวมต่อเรื่องราว
2.  หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้ใช้ข้อมูลนั้นประกอบการวิเคราะห์ด้วย
3.  เสนอแนะแนวทางที่นำไปปฏิบัติได้เพื่อปรับปรุงหรือขยายความ โดยเน้นจุดแข็งและส่วนที่ควรพัฒนา
4.  สร้างบล็อก YAML metadata สรุปข้อมูลสำคัญของฉาก (เช่น title, characters, mood, pov, key_elements) แยกต่างหากจากส่วนวิเคราะห์ โดยให้อยู่ในรูปแบบ:
    \`\`\`yaml
    # YAML metadata block
    title: "ชื่อฉาก (ถ้ามี)"
    characters_involved: ["ตัวละคร A", "ตัวละคร B"]
    mood: "อารมณ์หลักของฉาก"
    pov_character: "ตัวละคร POV (ถ้ามี)"
    key_elements: ["องค์ประกอบสำคัญ 1", "องค์ประกอบสำคัญ 2"]
    setting_summary: "สรุปสถานที่/เวลาสั้นๆ"
    purpose_achieved: "จุดประสงค์ของฉากที่สำเร็จ (ถ้าประเมินได้)"
    \`\`\`
    (ปรับเปลี่ยน field ตามความเหมาะสมของข้อมูลที่มีในฉาก)`,
    userPromptFormatter: (input) => `กรุณาวิเคราะห์ฉากต่อไปนี้ และสร้าง YAML metadata block สรุปข้อมูล:\n\n${input}`,
  },
  {
    value: 'character-analysis',
    label: 'วิเคราะห์ตัวละคร',
    systemInstruction: `คุณคือผู้ช่วยนักเขียน AI ผู้เชี่ยวชาญด้านการวิเคราะห์ตัวละคร
1.  วิเคราะห์ข้อมูลตัวละครที่ให้มาเกี่ยวกับลักษณะนิสัย แรงจูงใจ เป้าหมาย ความขัดแย้งภายในและภายนอก ความสัมพันธ์กับตัวละครอื่น พัฒนาการของตัวละคร และบทบาทในเรื่องราว
2.  หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้ใช้ข้อมูลนั้นประกอบการวิเคราะห์ด้วย
3.  ให้คำแนะนำเพื่อทำให้ตัวละครมีมิติและน่าเชื่อถือยิ่งขึ้น
4.  สร้างบล็อก YAML metadata สรุปข้อมูลสำคัญของตัวละคร (เช่น name, role, key_traits, main_goal, primary_conflict) แยกต่างหากจากส่วนวิเคราะห์ โดยให้อยู่ในรูปแบบ:
    \`\`\`yaml
    # YAML metadata block
    name: "ชื่อตัวละคร"
    role_in_story: "บทบาทหลักในเรื่อง"
    key_traits: ["ลักษณะนิสัยเด่น 1", "ลักษณะนิสัยเด่น 2"]
    main_goal: "เป้าหมายหลักของตัวละคร"
    primary_conflict: "ความขัดแย้งหลัก (ภายในหรือภายนอก)"
    arcana_affinity: ["พลัง Arcana (ถ้ามี)"]
    key_relationships: [{character: "ชื่อตัวละครอื่น", type: "ประเภทความสัมพันธ์"}]
    \`\`\`
    (ปรับเปลี่ยน field ตามความเหมาะสมของข้อมูลที่มีในตัวละคร)`,
    userPromptFormatter: (input) => `กรุณาวิเคราะห์ตัวละครจากข้อมูลต่อไปนี้ และสร้าง YAML metadata block สรุปข้อมูล:\n\n${input}`,
  },
  {
    value: 'magic-system',
    label: 'วิเคราะห์ระบบเวท/พลังพิเศษ',
    systemInstruction: "คุณคือผู้ช่วยนักเขียน AI ผู้เชี่ยวชาญด้านการวิเคราะห์ระบบพลังเหนือธรรมชาติ จงวิเคราะห์ระบบที่ให้มาในแง่ของกฎเกณฑ์ ข้อจำกัด แหล่งพลังงาน ผลกระทบต่อโลกและตัวละคร ความสมดุล ความคิดสร้างสรรค์ และความสอดคล้องภายใน หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้ใช้ข้อมูลนั้นประกอบการวิเคราะห์ด้วย พร้อมเสนอแนะแนวทางเพื่อเพิ่มความน่าเชื่อถือ ความลึกซึ้ง และความน่าสนใจของระบบ",
    userPromptFormatter: (input) => `กรุณาวิเคราะห์ระบบเวทมนตร์/พลังพิเศษจากรายละเอียดต่อไปนี้:\n\n${input}`,
  },
  {
    value: 'plot-structuring',
    label: 'สร้างโครงเรื่อง (Plot Structuring)',
    systemInstruction: "คุณคือผู้ช่วยนักเขียน AI ผู้เชี่ยวชาญการสร้างโครงเรื่อง งานของคุณคือช่วยผู้ใช้วางโครงเรื่องตามแนวคิดที่ให้มา หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้ใช้ข้อมูลนั้นเป็นพื้นฐานในการสร้างโครงเรื่องด้วย เสนอโครงสร้างที่เป็นไปได้ (เช่น Three-Act Structure, Hero's Journey) พร้อมระบุจุดสำคัญ เช่น Inciting Incident, Rising Action, Climax, Falling Action, Resolution ให้คำแนะนำที่ชัดเจนและปฏิบัติได้จริง",
    userPromptFormatter: (input) => `ช่วยสร้างโครงเรื่องจากแนวคิดต่อไปนี้:\n\n${input}\n\n(เช่น ประเภทเรื่อง, แนวคิดหลัก, ตัวละครสำคัญ, จุดจบที่ต้องการ หรือองค์ประกอบสำคัญอื่นๆ ที่ผู้ใช้ต้องการให้มีในเรื่อง)`,
  },
  {
    value: 'tone-sentiment-analysis',
    label: 'วิเคราะห์โทนและอารมณ์',
    systemInstruction: "คุณคือ AI นักวิเคราะห์วรรณกรรมที่เชี่ยวชาญการประเมินโทนและอารมณ์ของเรื่อง จงวิเคราะห์ข้อความที่ให้มา แล้วระบุโทนโดยรวม และอารมณ์เด่นๆ ที่สื่อออกมา หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้พิจารณาว่าโทนและอารมณ์สอดคล้องกับโปรเจกต์โดยรวมหรือไม่ พร้อมยกตัวอย่างส่วนของข้อความที่สนับสนุนการวิเคราะห์นั้นๆ",
    userPromptFormatter: (input) => `กรุณาวิเคราะห์โทนและอารมณ์ของข้อความต่อไปนี้:\n\n${input}`,
  },
  {
    value: 'lore-consistency-check',
    label: 'ตรวจสอบความต่อเนื่องกับข้อมูลโลก',
    systemInstruction: "คุณคือ AI ผู้ดูแลคลังข้อมูล (Lore Keeper) อัจฉริยะ หน้าที่ของคุณคือตรวจสอบความสอดคล้องของเนื้อเรื่องที่ได้รับกับชุดข้อมูลโลก (Lore Entries) ที่ให้มา (ซึ่งอาจเป็นข้อมูลจากโปรเจกต์ที่กำลังทำงานอยู่) จงเปรียบเทียบเนื้อเรื่องกับข้อมูลตัวละคร, สถานที่, เหตุการณ์, กฎเกณฑ์ต่างๆ ใน Lore หากพบความไม่สอดคล้องหรือความขัดแย้งใดๆ ให้ระบุออกมาอย่างชัดเจนพร้อมอธิบายว่าขัดแย้งกับข้อมูลส่วนใดใน Lore และถ้าเป็นไปได้ เสนอแนะแนวทางแก้ไข",
    userPromptFormatter: (input, contextData) => { // contextData will contain { projectLore: LoreEntry[] }
      const loreEntries = contextData?.projectLore || [];
      let prompt = `กรุณาตรวจสอบความต่อเนื่องของเนื้อเรื่องต่อไปนี้ กับข้อมูลโลก (Lore) ที่ให้มา:\n\n## เนื้อเรื่องที่ต้องการตรวจสอบ:\n${input}\n\n`;
      if (loreEntries && loreEntries.length > 0) {
        prompt += `## ข้อมูลโลก (Lore Entries) สำหรับอ้างอิง:\n`;
        loreEntries.forEach(entry => {
          prompt += `### ${entry.title} (ประเภท: ${entry.type})\n${entry.content}\n\n`;
        });
      } else {
        prompt += `## ข้อมูลโลก (Lore Entries):\n(ไม่มีข้อมูล Lore ให้มาเพื่อเปรียบเทียบ หรือโปรเจกต์นี้ยังไม่มีข้อมูล Lore)\n`;
      }
      return prompt;
    },
  },
  {
    value: 'continuity-check',
    label: 'ตรวจสอบความต่อเนื่อง (ทั่วไป)',
    systemInstruction: "คุณคือผู้ช่วยนักเขียน AI ผู้เชี่ยวชาญด้านการตรวจสอบความต่อเนื่องในงานเขียน จงตรวจสอบเนื้อหาที่ให้มาอย่างละเอียดเพื่อหาความไม่สอดคล้องกันในเหตุการณ์ ไทม์ไลน์ ลักษณะและการกระทำของตัวละคร และองค์ประกอบอื่นใดที่อาจขัดแย้งกัน หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้ใช้ข้อมูลนั้นประกอบการตรวจสอบด้วย ระบุจุดที่ไม่สอดคล้องและให้คำแนะนำที่เป็นรูปธรรมเพื่อแก้ไข",
    userPromptFormatter: (input) => `กรุณาตรวจสอบความต่อเนื่องของเนื้อหาต่อไปนี้:\n\n${input}`,
  },
  {
    value: 'scene-creation',
    label: 'สร้างฉากใหม่',
    systemInstruction: "คุณคือผู้ช่วยนักเขียน AI ที่มีความคิดสร้างสรรค์สูง จงสร้างฉากใหม่ตามคำอธิบายและข้อกำหนดที่ให้มา หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้ใช้ข้อมูลนั้นเป็นแรงบันดาลใจหรือพื้นฐานในการสร้างฉาก โดยเน้นการเล่าเรื่องที่น่าสนใจ บรรยากาศที่ชัดเจน การกระทำของตัวละครที่มีความหมาย และบทสนทนาที่เป็นธรรมชาติ (ถ้ามี) สร้างฉากที่สมบูรณ์พร้อมรายละเอียดที่จำเป็น",
    userPromptFormatter: (input) => `กรุณาสร้างฉากจากคำอธิบายต่อไปนี้:\n\n${input}`,
  },
  {
    value: 'scene-rewrite',
    label: 'ปรับแก้ฉาก',
    systemInstruction: "คุณคือผู้ช่วยนักเขียน AI ที่มีทักษะในการแก้ไขและเขียนใหม่ จงปรับปรุงฉากที่ให้มาตามเป้าหมายที่ผู้ใช้ระบุ หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้พยายามปรับแก้ฉากให้สอดคล้องกับข้อมูลนั้นด้วย หากไม่ได้ระบุเป้าหมาย ให้เน้นการเพิ่มความชัดเจน ความกระชับ การใช้ภาษา ผลกระทบทางอารมณ์ จังหวะ และประสิทธิภาพโดยรวมของฉาก",
    userPromptFormatter: (input) => `กรุณาปรับแก้ฉากต่อไปนี้:\n\n${input}`,
  },
  {
    value: 'show-dont-tell-enhancer',
    label: 'เพิ่มมิติด้วย Show, Don\'t Tell',
    systemInstruction: `คุณคือผู้ช่วยนักเขียน AI ที่เชี่ยวชาญเทคนิค 'Show, Don't Tell' งานของคุณคือวิเคราะห์สิ่งที่ผู้ใช้ป้อนเข้ามา และ:
1.  ระบุส่วนที่เป็นการ 'บอกเล่า' (Telling)
2.  อธิบายสั้นๆ ว่าทำไมส่วนนั้นจึงเป็นการ 'บอกเล่า'
3.  เสนอทางเลือก 1-3 วิธีในการเขียนใหม่โดยใช้เทคนิค 'แสดงให้เห็น' (Showing) โดยอาจใช้ข้อมูลจาก Project Context (ถ้ามี) เพื่อเพิ่มความสมจริง
จัดรูปแบบคำแนะนำของคุณให้ชัดเจนและอ่านง่าย`,
    userPromptFormatter: (input) => `ข้อความสำหรับปรับปรุงด้วยหลัก 'Show, Don't Tell':\n\n${input}`,
  },
  {
    value: 'rate-scene',
    label: 'ให้คะแนนฉาก',
    systemInstruction: "คุณคือผู้ช่วยนักเขียน AI และนักวิจารณ์ผู้เชี่ยวชาญ จงให้คะแนนฉากที่ผู้ใช้ป้อนเข้ามาจาก 1-10 โดยพิจารณาจาก: ความน่าสนใจ, การดำเนินเรื่อง, บทสนทนา, การใช้ภาษา, การพัฒนาตัวละคร, และผลกระทบทางอารมณ์ หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้ประเมินความสอดคล้องกับโปรเจกต์นั้นด้วย อธิบายเหตุผลพร้อมเสนอแนะจุดแข็งและจุดที่ควรปรับปรุง",
    userPromptFormatter: (input) => `กรุณาให้คะแนนและวิจารณ์ฉากต่อไปนี้:\n\n${input}`,
  },
  {
    value: 'create-world',
    label: 'สร้างโลกในนิยาย',
    systemInstruction: "คุณคือผู้ช่วยนักเขียน AI ผู้เชี่ยวชาญด้านการสร้างโลก (World-Building) จงช่วยผู้ใช้สร้างและขยายรายละเอียดเกี่ยวกับโลกในจินตนาการตามคำสั่งหรือแนวคิดที่ให้มา หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้ต่อยอดจากข้อมูลนั้น พยายามให้ข้อมูลที่สร้างสรรค์, มีความสอดคล้องภายใน, และจุดประกายจินตนาการ",
    userPromptFormatter: (input) => `กรุณาช่วยสร้าง/ขยายรายละเอียดโลกในนิยายจากข้อมูลต่อไปนี้:\n\n${input}`,
  },
  {
    value: 'dialogue-generation',
    label: 'สร้างบทสนทนา',
    systemInstruction: "คุณคือ AI นักเขียนบทสนทนาผู้เชี่ยวชาญ สร้างบทสนทนาที่สมจริงและน่าติดตามระหว่างตัวละครตามรายละเอียดที่กำหนด หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้ใช้ลักษณะนิสัยของตัวละครหรือสถานการณ์ในโปรเจกต์นั้นมาประกอบการสร้างบทสนทนา",
    userPromptFormatter: (input) => `สร้างบทสนทนาตามรายละเอียดนี้:\n\n${input}\n\nตัวอย่าง: ระบุจำนวนตัวละคร, ชื่อ (ถ้ามี), ลักษณะนิสัยโดยย่อของแต่ละคน, สถานการณ์ที่กำลังเผชิญ, และสิ่งที่ต้องการให้เกิดขึ้นในบทสนทนานี้`,
  },
  {
    value: 'summarize-elaborate',
    label: 'สรุปย่อ / ขยายความ',
    systemInstruction: "คุณคือ AI ผู้เชี่ยวชาญด้านการสรุปและขยายความเนื้อหา จงวิเคราะห์คำสั่งของผู้ใช้:\n- หากผู้ใช้ต้องการ 'สรุปย่อ' ให้ย่อความเนื้อหาที่ให้มาให้กระชับที่สุดโดยยังคงใจความสำคัญทั้งหมด\n- หากผู้ใช้ต้องการ 'ขยายความ' ให้เพิ่มรายละเอียด ตัวอย่าง คำอธิบายเพิ่มเติม หรือมุมมองที่แตกต่าง โดยอาจใช้ข้อมูลจาก Project Context (ถ้ามี) เพื่อเพิ่มความลึกซึ้ง\n- หากผู้ใช้ไม่ได้ระบุชัดเจน ให้พิจารณาจากเนื้อหาและพยายามทำความเข้าใจเจตนา",
    userPromptFormatter: (input) => `คำสั่ง: [ระบุที่นี่ว่าต้องการ "สรุปย่อ" หรือ "ขยายความ" และถ้าเป็นการขยายความ สามารถระบุส่วนที่ต้องการเน้นได้]\n\nเนื้อหา:\n${input}`,
  },
  {
    value: 'custom',
    label: 'กำหนดเอง',
    systemInstruction: "คุณคือผู้ช่วยนักเขียน AI ที่มีความหลากหลายและปรับตัวได้ดี จงปฏิบัติตามคำแนะนำเฉพาะของผู้ใช้อย่างสุดความสามารถ หากมีข้อมูลโปรเจกต์ (Project Context) ให้มา ให้พิจารณาข้อมูลนั้นในการตอบสนองด้วย พยายามทำความเข้าใจเจตนาของผู้ใช้และส่งมอบผลลัพธ์ที่เกี่ยวข้องและมีคุณภาพสูง",
    userPromptFormatter: (input) => input, 
  },
];

export const INITIAL_AI_RESPONSE_MESSAGE = '<p class="text-gray-400 dark:text-gray-500 italic">ผลลัพธ์จาก AI จะปรากฏที่นี่...</p>';
export const PROCESSING_AI_RESPONSE_MESSAGE = '<p class="text-gray-400 dark:text-gray-500 italic">กำลังประมวลผล...</p>';

export const AVAILABLE_AI_MODELS: string[] = [
  'gemini-2.5-flash-preview-04-17', // Default and recommended Flash model
  'gemini-pro', 
];
export const MODEL_NAME = AVAILABLE_AI_MODELS[0]; // Default model

export const MAX_INPUT_FILES = 10; 
export const AI_MAX_INPUT_CHARS = 75000; 
export const MAX_CHAT_EXCHANGES = 10; 
export const PROJECT_CONTEXT_MAX_NOTE_CHARS = 150; 
export const PROJECT_CONTEXT_MAX_LORE_CHARS = 150; 
export const MAX_PROJECT_NOTES_IN_CONTEXT = 5; 
export const MAX_PROJECT_LORE_IN_CONTEXT = 5; 


export const NOTE_PRIORITIES: { value: NotePriority; label: string; colorClass: string }[] = [
    { value: 'none', label: 'ไม่มี', colorClass: 'bg-slate-500' },
    { value: 'low', label: 'ต่ำ', colorClass: 'bg-green-500' },
    { value: 'medium', label: 'กลาง', colorClass: 'bg-yellow-500' },
    { value: 'high', label: 'สูง', colorClass: 'bg-red-500' },
];


const getCurrentDateFormatted = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; 
};

export const NOTE_TEMPLATES: NoteTemplate[] = [
  {
    id: 'character-sketch',
    name: 'โครงร่างตัวละคร (Character Sketch)',
    icon: '👤',
    category: 'ตัวละคร',
    content: `# ตัวละคร: [ชื่อตัวละคร]

## ข้อมูลเบื้องต้น
- **บทบาท:** 
- **เผ่าพันธุ์/ประเภท:**
- **อายุ/ลักษณะภายนอก:**

## ลักษณะนิสัย
- **จุดเด่น:**
- **จุดด้อย:**
- **แรงจูงใจ:**
- **ความกลัว:**

## ประวัติความเป็นมา
- (บรรยายประวัติย่อของตัวละคร)

## Arcana/พลังพิเศษ (ถ้ามี)
- **ชื่อพลัง:**
- **คำอธิบาย:**
- **ข้อจำกัด:**

## ความสัมพันธ์
- **ตัวละคร A:** (ลักษณะความสัมพันธ์)
- **ตัวละคร B:** (ลักษณะความสัมพันธ์)

## เป้าหมายในเรื่อง
- 

## บันทึกเพิ่มเติม
- 
`
  },
  {
    id: 'plot-outline',
    name: 'โครงเรื่องย่อ (Plot Outline)',
    icon: '📈',
    category: 'โครงเรื่อง',
    content: `# โครงเรื่อง: [ชื่อเรื่อง/บท]

## แนวคิดหลัก (Logline)
- 

## ตัวละครหลัก
- [ชื่อตัวละคร 1]: (บทบาทสั้นๆ)
- [ชื่อตัวละคร 2]: (บทบาทสั้นๆ)

## ฉากเปิด (Opening Scene)
- (บรรยายสั้นๆ)

## จุด Inciting Incident
- (เหตุการณ์ที่เริ่มต้นเรื่องราว)

## Rising Action (เหตุการณ์สำคัญ)
1.  
2.  
3.  

## จุด Climax
- (จุดสูงสุดของเรื่อง)

## Falling Action
- (ผลลัพธ์จาก Climax)

## บทสรุป (Resolution)
- 

## ประเด็น/ธีมหลัก
- 
`
  },
  {
    id: 'world-building',
    name: 'สร้างโลก (World Building Element)',
    icon: '🌍',
    category: 'สร้างโลก',
    content: `# องค์ประกอบโลก: [ชื่อองค์ประกอบ]

## ประเภท
- (เช่น สถานที่, วัฒนธรรม, สิ่งมีชีวิต, เทคโนโลยี, ระบบเวทมนตร์)

## คำอธิบายโดยละเอียด
- 

## กฎ/ลักษณะเฉพาะ
- 

## ประวัติความเป็นมา (ถ้ามี)
- 

## ความเชื่อมโยงกับส่วนอื่นในโลก
- 

## ผลกระทบต่อเนื้อเรื่อง/ตัวละคร
- 

## ภาพร่าง/แรงบันดาลใจ (ถ้ามี)
- (แนบลิงก์รูปภาพ หรือคำอธิบาย)
`
  },
  {
    id: 'writers-daily-log',
    name: 'บันทึกประจำวันนักเขียน (Writer\'s Daily Log)',
    icon: '🗓️',
    category: 'บันทึก',
    content: `# บันทึกนักเขียน: ${getCurrentDateFormatted()}

## เป้าหมายวันนี้
- 

## สิ่งที่ทำสำเร็จ
- (จำนวนคำ, ฉากที่เขียน, ปัญหาที่แก้ไข)

## ความคืบหน้า/สิ่งที่ค้นพบ
- 

## อุปสรรค/สิ่งที่ต้องปรับปรุง
- 

## ไอเดียใหม่/สิ่งที่ต้องทำต่อ
- 

## ความรู้สึก/กำลังใจ
- 
`
  },
  {
    id: 'feedback-request',
    name: 'ขอ Feedback',
    icon: '💬',
    category: 'Feedback',
    content: `# ขอ Feedback สำหรับ: [ชื่อส่วน/หัวข้อ]

## ส่วนที่ต้องการ Feedback โดยเฉพาะ
- (ระบุส่วนที่ต้องการให้ผู้ตรวจทานเน้นเป็นพิเศษ)

## คำถามเฉพาะสำหรับผู้ตรวจทาน
1.  
2.  

## บริบทของเนื้อหา (ถ้าจำเป็น)
- (อธิบายสั้นๆ เกี่ยวกับเนื้อหาส่วนนี้เพื่อให้ผู้ตรวจทานเข้าใจ)

## วันที่ต้องการ Feedback กลับ
- 

## ขอบคุณสำหรับความช่วยเหลือ!
`
  },
  // New Content Templates
  {
    id: 'ancient-log-template',
    name: 'บันทึกโบราณ (Ancient Log)',
    icon: '📜',
    category: 'การค้นพบ',
    content: `# บันทึกโบราณ: [ชื่อการค้นพบ/โบราณวัตถุ]

## วันที่ค้นพบ:
- 

## สถานที่ค้นพบ:
- 

## โบราณวัตถุ/สิ่งที่ค้นพบ:
- รายการที่ 1:
- รายการที่ 2:

## การแปลสัญลักษณ์/อักษรโบราณ:
- (ข้อความที่แปลได้ หรือความหมายของสัญลักษณ์)

## บันทึกทางประวัติศาสตร์ที่เกี่ยวข้อง:
- 

## ทฤษฎี/ข้อสันนิษฐาน:
- 

## หมายเหตุเพิ่มเติม:
- `
  },
  {
    id: 'mysterious-tale-template',
    name: 'เรื่องราวลึกลับ (Mysterious Tale)',
    icon: '✒️',
    category: 'โครงเรื่อง',
    content: `# เรื่องราวลึกลับ: [ชื่อเรื่อง/แนวคิด]

## เหตุการณ์เริ่มต้น (Inciting Incident):
- 

## ผู้ต้องสงสัยหลัก/ปมปริศนา:
- [ชื่อผู้ต้องสงสัย/ปริศนา 1]: (รายละเอียด)
- [ชื่อผู้ต้องสงสัย/ปริศนา 2]: (รายละเอียด)

## เบาะแสที่รวบรวมได้:
1. 
2. 
3. 

## แรงจูงใจที่ซ่อนเร้น:
- (ของตัวละครหลัก หรือ ผู้ต้องสงสัย)

## จุดหักมุมที่อาจเกิดขึ้น (Potential Twists):
- 

## ความลับของตัวละคร:
- [ชื่อตัวละคร]: (ความลับ)

## หมายเหตุ/แนวคิดเพิ่มเติม:
- `
  },
  {
    id: 'magic-tome-template',
    name: 'ตำราเวทมนตร์ (Magic Tome)',
    icon: '✨',
    category: 'สร้างโลก',
    content: `# ตำราเวทมนตร์: [ชื่อระบบเวทมนตร์/ศาสตร์]

## ชื่อคาถา/วิชา: [ชื่อคาถา]
- **ประเภท/สายเวทมนตร์:** 
- **ส่วนประกอบ/เวลาที่ใช้ร่าย:** 
- **ผลลัพธ์และระยะเวลา:** 
- **ข้อจำกัด/ความเสี่ยง:** 
- **ผู้ใช้ที่มีชื่อเสียง/ต้นกำเนิด:** 

## ชื่อคาถา/วิชา: [ชื่อคาถาอื่น]
- **ประเภท/สายเวทมนตร์:** 
- **ส่วนประกอบ/เวลาที่ใช้ร่าย:** 
- **ผลลัพธ์และระยะเวลา:** 
- **ข้อจำกัด/ความเสี่ยง:** 
- **ผู้ใช้ที่มีชื่อเสียง/ต้นกำเนิด:** 

## กฎโดยรวมของระบบเวทมนตร์นี้:
- 

## หมายเหตุเพิ่มเติม:
- `
  },
  {
    id: 'adventure-log-template',
    name: 'บันทึกการผจญภัย (Adventure Log)',
    icon: '⚔️',
    category: 'เหตุการณ์',
    content: `# บันทึกการผจญภัย: [ชื่อภารกิจ/การเดินทาง]

## เป้าหมายภารกิจ:
- 

## สมาชิกในทีม/ผู้ร่วมเดินทาง:
- [ชื่อ]: (บทบาท/ความสามารถ)
- [ชื่อ]: (บทบาท/ความสามารถ)

## เหตุการณ์สำคัญ/การต่อสู้:
1.  **[ชื่อเหตุการณ์/การต่อสู้]:** (รายละเอียด, ผลลัพธ์)
2.  **[ชื่อเหตุการณ์/การต่อสู้]:** (รายละเอียด, ผลลัพธ์)

## สิ่งของที่ได้รับ/รางวัล:
- 

## บทเรียนที่ได้รับ:
- 

## ขั้นตอนต่อไป:
- 

## บันทึกเพิ่มเติม/แผนที่:
- `
  }
];

// --- EXPORT TEMPLATES ---
const commonExportWrapper = (noteContentHtml: string, noteTitle: string, templateCss: string, appTheme: AppTheme): string => {
  // Determine if the app's current theme is dark to suggest a dark base for export if not overridden by template
  const isAppThemeDark = appTheme.name.toLowerCase().includes('dark') || appTheme.name.toLowerCase().includes('deep') || appTheme.name.toLowerCase().includes('midnight');
  
  // Basic prose styles to ensure readability, can be overridden by templateCss
  const baseProseStyles = `
    .prose-sm { font-size: 16px; line-height: 1.7; color: #333; }
    .prose-sm h1, .prose-sm h2, .prose-sm h3 { margin-top: 1.2em; margin-bottom: 0.6em; font-weight: 600; }
    .prose-sm p { margin-bottom: 1em; }
    .prose-sm ul, .prose-sm ol { margin-bottom: 1em; padding-left: 1.5em; }
    .prose-sm blockquote { border-left: 3px solid #ccc; padding-left: 1em; margin-left: 0; font-style: italic; color: #555; }
    .prose-sm code { background-color: #f0f0f0; padding: 0.1em 0.3em; border-radius: 3px; font-family: monospace; }
    .prose-sm pre { background-color: #f0f0f0; padding: 0.8em; border-radius: 5px; overflow-x: auto; }
    .prose-sm pre code { background-color: transparent; padding: 0; }
    .dark-mode .prose-sm { color: #ddd; }
    .dark-mode .prose-sm h1, .dark-mode .prose-sm h2, .dark-mode .prose-sm h3 { color: #eee; }
    .dark-mode .prose-sm blockquote { border-left-color: #555; color: #aaa; }
    .dark-mode .prose-sm code { background-color: #333; color: #ddd; }
    .dark-mode .prose-sm pre { background-color: #222; }
  `;

  return `
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${noteTitle || 'Exported Note'}</title>
    <style>
        body { margin: 0; padding: 0; line-height: 1.6; font-family: 'Sarabun', sans-serif; }
        .export-container { max-width: 800px; margin: 20px auto; padding: 30px; border-radius: 8px; background-color: #fff; }
        .dark-mode .export-container { background-color: #2c2c2c; } /* Default dark container if template doesn't specify */
        h1.export-title { font-size: 2em; margin-bottom: 0.5em; padding-bottom: 0.3em; }
        hr.note-title-divider { margin-top: 0; margin-bottom: 1.5em; }
        ${baseProseStyles}
        ${templateCss}
    </style>
</head>
<body class="${isAppThemeDark ? 'dark-mode' : ''}">
    <div class="export-container prose-sm">
        <h1 class="export-title">${noteTitle || 'บันทึกที่ส่งออก'}</h1>
        <hr class="note-title-divider">
        ${noteContentHtml}
    </div>
</body>
</html>`;
};

export const EXPORT_TEMPLATES: ExportTemplate[] = [
  {
    id: 'ancient-scroll',
    name: 'ม้วนคัมภีร์โบราณ (Ancient Scroll)',
    description: 'ธีมกระดาษปาปิรัสสีน้ำตาลอ่อน ให้ความรู้สึกย้อนยุคและคลาสสิก',
    getCss: (appTheme: AppTheme) => `
      body { background-color: #E0CA9E; /* Light tan for page background beyond container */ }
      .export-container { background-color: #FDF5E6; color: #5C4033; border: 1px solid #D2B48C; font-family: 'Georgia', 'Times New Roman', Times, serif; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      .export-title { color: #8B4513; border-bottom: 2px dotted #8B4513; }
      .note-title-divider { border-color: #8B4513; border-style: dotted;}
      /* Dark mode adaptation for this specific template if app is dark */
      .dark-mode .export-container { background-color: #5a4a3b; color: #EAE0C8; border-color: #8c765c; }
      .dark-mode .export-title { color: #D2B48C; border-bottom-color: #D2B48C; }
      .dark-mode .note-title-divider { border-color: #D2B48C; }
    `,
    getHtmlWrapper: commonExportWrapper,
  },
  {
    id: 'shadowed-ink',
    name: 'หมึกในเงา (Shadowed Ink)',
    description: 'ธีมมืดพร้อมตัวอักษรสว่าง เน้นความลึกลับและดุดัน',
    getCss: (appTheme: AppTheme) => `
      body { background-color: #1a1a1a; }
      .export-container { background-color: #2D2D2D; color: #E0E0E0; border: 1px solid #444; font-family: 'Arial', sans-serif; }
      .export-title { color: #FFFFFF; border-bottom: 1px solid #777; text-shadow: 0 0 5px rgba(255,255,255,0.3); }
      .note-title-divider { border-color: #777; }
      /* This template is inherently dark, so .dark-mode class on body has less effect unless overriding base prose specifically */
      .dark-mode .prose-sm code { background-color: #444; color: #eee; }
      .dark-mode .prose-sm pre { background-color: #333; }
    `,
    getHtmlWrapper: commonExportWrapper,
  },
  {
    id: 'arcane-script',
    name: 'อักขระลึกลับ (Arcane Script)',
    description: 'ธีมสีน้ำเงินเข้มหรือดำ ตกแต่งด้วยลวดลายเวทมนตร์ ให้ความรู้สึกขลังและทรงพลัง',
    getCss: (appTheme: AppTheme) => `
      body { background-color: #0D123B; }
      .export-container { background-color: #1A237E; color: #B0BEC5; border: 1px solid #3F51B5; font-family: 'Georgia', serif; position: relative; }
      /* Basic placeholder for arcane symbols - could be enhanced with SVG */
      .export-container::before { content: '❖'; font-size: 1.5em; color: rgba(129, 140, 248, 0.2); position: absolute; top: 15px; left: 15px; }
      .export-container::after { content: '✧'; font-size: 1.5em; color: rgba(129, 140, 248, 0.2); position: absolute; bottom: 15px; right: 15px; }
      .export-title { color: #E8EAF6; border-bottom: 1px dashed #7986CB; }
      .note-title-divider { border-color: #7986CB; border-style: dashed; }
    `,
    getHtmlWrapper: commonExportWrapper,
  },
  {
    id: 'steel-parchment',
    name: 'เหล็กกล้าและแผ่นหนัง (Steel & Parchment)',
    description: 'ผสมผสานความแข็งแกร่งของโลหะกับความคลาสสิกของแผ่นหนัง เหมาะสำหรับเรื่องราวการผจญภัย',
    getCss: (appTheme: AppTheme) => `
      body { background-color: #5D6D7E; }
      .export-container { background-color: #F5F5F5; color: #333; border: 3px solid #757575; border-image: linear-gradient(45deg, #757575, #BDBDBD) 1; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 35px; }
      .export-title { color: #424242; border-bottom: 2px solid #616161; padding-bottom: 0.3em; text-transform: uppercase; letter-spacing: 0.5px; }
      .note-title-divider { border-color: #616161; }
      /* Dark mode specific adjustments */
      .dark-mode .export-container { background-color: #4A4A4A; color: #DCDCDC; border-color: #8E8E8E; border-image: linear-gradient(45deg, #8E8E8E, #606060) 1; }
      .dark-mode .export-title { color: #F0F0F0; border-bottom-color: #A0A0A0; }
      .dark-mode .note-title-divider { border-color: #A0A0A0; }
    `,
    getHtmlWrapper: commonExportWrapper,
  }
];
