# ✍️ Ashval Writer's Suite - คู่มือนักเขียน AI อัจฉริยะ (ฉบับภาษาไทย)

Ashval Writer's Suite คือ Web Application ส่วนตัวสำหรับนักเขียน ที่ต้องการใช้ AI ช่วยในงานเขียนอย่างจริงจังและครบวงจร ถูกออกแบบมาเพื่อช่วยให้คุณจัดการโน้ต, งาน, ข้อมูลโลก (Lore), โครงเรื่อง, เอกสาร Longform และสร้างสรรค์เนื้อหาด้วยพลังของ AI (ปัจจุบันเชื่อมต่อกับ Google Gemini ผ่าน Firebase Functions หรือ Backend ที่คุณต้องตั้งค่าเอง หรือสามารถใช้ Custom API Key ที่ผู้ใช้ป้อนได้) แอปพลิเคชันนี้เน้นความเรียบง่าย, เป็นมิตรกับผู้ใช้, และความสามารถในการปรับแต่งสูง

**การแก้ไขล่าสุด:**
*   อัปเดต README เพื่อให้สอดคล้องกับโครงสร้างแอปปัจจุบัน, การรวม Firebase, การจัดการ API Key, และฟีเจอร์ใหม่ๆ
*   แก้ไขปัญหาหน้าขาวที่หน้า `/analytics` โดยการเพิ่ม placeholder component
*   แก้ไขข้อผิดพลาด `Failed to fetch` ขณะโหลดแอปพลิเคชัน
*   แก้ไขปัญหาการ import path ที่ไม่ถูกต้อง
*   ปรับปรุงสี UI ในบางธีม (เช่น Obsidian Night) และ Bottom Navigation Bar เพื่อให้มองเห็นได้ชัดเจนขึ้น

## ✨ คุณสมบัติหลัก

*   **การจัดการข้อมูลรอบด้าน:**
    *   **โน้ต (Notes):** สร้าง, แก้ไข, จัดหมวดหมู่, ค้นหาโน้ต พร้อม Markdown Editor และ Live Preview, รองรับการใส่ภาพปก, ไอคอน Emoji, ระบบเวอร์ชัน, และการเชื่อมโยงระหว่างโน้ต (`[[ชื่อโน้ต]]`)
    *   **งาน (Tasks):** จัดการรายการสิ่งที่ต้องทำ, กำหนดความสำคัญ, วันที่ครบกำหนด, และแบ่งงานย่อย (AI ช่วยแนะนำงานย่อยได้) สามารถนำเข้าไฟล์ Markdown เป็นงานใหม่ได้ มีหน้า Task Focus พร้อม Pomodoro Timer ในตัว
    *   **คลังข้อมูลโลก (World Anvil/Lore):** สร้างและจัดระเบียบข้อมูลตัวละคร, สถานที่, ไอเทม, ระบบพลัง (ArcanaSystem), และองค์ประกอบอื่นๆ ของโลกในนิยายคุณ
    *   **โครงเรื่อง (Plot Outline):** วางโครงเรื่องแบบลำดับชั้น (Nested) จัดการจุดสำคัญในเรื่องราวของคุณ และเชื่อมโยงโน้ตและข้อมูลโลก (Lore) เข้ากับแต่ละจุดในโครงเรื่อง
    *   **เอกสาร Longform (Longform Documents):** รวบรวมและจัดลำดับโน้ตเพื่อสร้างเอกสารขนาดยาว เช่น ต้นฉบับนิยาย หรือบทความ
    *   **สตูดิโอเผยแพร่ (Publishing Hub):**
        *   **จัดการแม่แบบ (User Templates):** สร้างและใช้แม่แบบโน้ตส่วนตัวเพื่อความรวดเร็ว
        *   **ส่งออกผลงาน (Export):** ส่งออกโน้ตเดี่ยว หรือ เอกสาร Longform เป็นไฟล์ HTML โดยใช้เทมเพลตสวยงาม หรือ PDF (ผ่าน `html2pdf.js`)
    *   **การนำเข้าไฟล์:** นำเข้าไฟล์ `.txt`, `.md`, `.pdf`, `.docx` เป็นโน้ตใหม่ และนำเข้า `.md` สำหรับงานและ AI Prompt
*   **AI ผู้ช่วยนักเขียน (AI Writer):**
    *   ขับเคลื่อนด้วย **Google Gemini API** (เชื่อมต่อผ่าน Firebase Functions เมื่อ Deploy หรือ Backend ที่ผู้ใช้ตั้งค่าเอง, หรือใช้ Custom API Key ที่ผู้ใช้ป้อน (เก็บใน LocalStorage หรือป้อนเมื่อใช้งาน))
    *   หลากหลายโหมดการทำงาน: วิเคราะห์ฉาก/ตัวละคร, สร้างโครงเรื่อง, ตรวจสอบความต่อเนื่อง, สร้างฉากใหม่, ปรับแก้, สรุป/ขยายความ และโหมดกำหนดเอง
    *   AI เข้าใจบริบทจากโปรเจกต์ปัจจุบัน, ข้อมูลที่เลือก, และคำสั่งที่ผู้ใช้ป้อน
    *   สามารถสร้าง YAML metadata block จากการวิเคราะห์ AI
    *   บันทึกผลลัพธ์ AI เป็นโน้ตใหม่, คัดลอก, หรือแทรกลงในโน้ตที่กำลังแก้ไข
*   **การจัดการโปรเจกต์ (Project Management):**
    *   สร้างหลายโปรเจกต์เพื่อแยกงานเขียนแต่ละเรื่อง
    *   หน้าแดชบอร์ดสรุปภาพรวมโปรเจกต์ แสดงสถิติเบื้องต้น และมี Quick Actions
    *   แก้ไขรายละเอียด, เก็บถาวร, หรือลบโปรเจกต์
*   **เครื่องมือเสริมประสิทธิภาพ:**
    *   **Pomodoro Timer:** ช่วยในการโฟกัสและจัดการเวลา (รวมอยู่ในหน้า Task Focus)
    *   **พจนานุกรม (Dictionary):** AI เรียนรู้คำศัพท์ที่คุณใช้ หรือคุณสามารถเพิ่มคำศัพท์เองได้
    *   **ธีม (Themes):** เลือกธีมสว่าง/มืดได้หลายแบบเพื่อความสบายตา
    *   **Ashval AI Mascot:** มาสคอต AI แสดงคำแนะนำ และมี Panel สำหรับสนทนา (ฟังก์ชันสนทนายังไม่เชื่อมต่อ AI)
    *   **Graph View:** แสดงความเชื่อมโยงของโน้ต, ข้อมูลโลก, และโครงเรื่อง (อยู่ระหว่างพัฒนา)
    *   **Bottom Navigation Bar:** แถบนำทางด้านล่างสำหรับมุมมองมือถือ เพิ่มความสะดวกในการใช้งาน
*   **ความเป็นส่วนตัวและความปลอดภัย:**
    *   ข้อมูลส่วนใหญ่ (โน้ต, งาน, โปรเจกต์ ฯลฯ) บันทึกใน Local Storage ของเบราว์เซอร์คุณเท่านั้น
    *   ผู้ใช้สามารถป้อน Custom Gemini API Key ของตนเองได้ ซึ่งจะถูกเก็บไว้ใน Local Storage ของเบราว์เซอร์คุณ หรือเลือกป้อนเมื่อใช้งาน (Prompt mode) หรือไม่ป้อนเลยเพื่อใช้ค่าเริ่มต้นจาก Server (Firebase Function)

## 📁 โครงสร้างไฟล์ของแอปพลิเคชัน (Frontend)

```
ashval-writer-suite/
├── AiSubtaskSuggestionModal.tsx # Modal แนะนำงานย่อยโดย AI
├── AiWriter.tsx              # UI และ Logic ส่วน AI Writer
├── ApiKeyPromptModal.tsx     # Modal ป้อน API Key
├── AppSettingsPage.tsx       # หน้าตั้งค่าแอป, จัดการโปรเจกต์, และ Roadmap
├── AshvalMascot.tsx          # UI มาสคอต AI
├── BottomNavBar.tsx          # UI แถบนำทางด้านล่างสำหรับมือถือ
├── CategoryFilterControl.tsx # UI สำหรับกรองตามหมวดหมู่
├── DictionaryManager.tsx     # UI จัดการพจนานุกรม
├── EmojiPicker.tsx           # UI เลือก Emoji
├── GraphView.tsx             # UI แสดงความเชื่อมโยงของโน้ต (เบื้องต้น)
├── Header.tsx                # UI ส่วนหัวของแอป
├── LinkContentModal.tsx      # Modal เชื่อมโยงเนื้อหา (โน้ต/Lore) กับ Plot Outline
├── LongformDocumentModal.tsx # Modal จัดการเอกสาร Longform
├── NoteItem.tsx              # UI แสดงโน้ตแต่ละรายการ
├── NoteModal.tsx             # Modal เพิ่ม/แก้ไขโน้ต
├── NoteTaskApp.tsx           # **ไฟล์หลักของแอปพลิเคชัน React**
├── PlotOutlineManager.tsx    # UI จัดการโครงเรื่อง
├── PlotOutlineModal.tsx      # Modal เพิ่ม/แก้ไขจุดในโครงเรื่อง
├── PlotOutlineNodeItem.tsx   # UI แสดงจุดโครงเรื่องแต่ละรายการ
├── PomodoroTimer.tsx         # UI Pomodoro Timer (ใช้ใน TaskFocusPage)
├── ProjectDashboard.tsx      # UI แดชบอร์ดโปรเจกต์
├── ProjectSelector.tsx       # UI เลือก/สร้างโปรเจกต์ (ใน Header)
├── PublishingHubPage.tsx     # UI รวมการจัดการแม่แบบ, Longform, และ Export
├── Sidebar.tsx               # UI แถบเมนูด้านข้าง
├── TaskFocusPage.tsx         # UI รวมรายการงานและ Pomodoro Timer
├── TaskItem.tsx              # UI แสดงงานแต่ละรายการ
├── TaskModal.tsx             # Modal เพิ่ม/แก้ไขงาน
├── ThemeSelector.tsx         # UI เลือกธีม (ใน Header)
├── ViewNoteModal.tsx         # Modal แสดงรายละเอียดโน้ต
├── WorldAnvilManager.tsx     # UI จัดการคลังข้อมูลโลก (Lore)
├── build.js                  # สคริปต์สำหรับ Build โปรเจกต์ด้วย esbuild
├── index.html                # ไฟล์ HTML หลัก
├── index.tsx                 # จุดเริ่มต้นการ Render แอป React
├── metadata.json             # ข้อมูล Meta ของแอป
├── package.json              # กำหนด Dependencies และสคริปต์
├── README.md                 # ไฟล์นี้ (ฉบับภาษาไทย)
├── types.ts                  # นิยาม TypeScript Interfaces และ Types
├── frontend/
│   └── src/
│       ├── constants.ts      # ค่าคงที่ต่างๆ ที่ใช้ในแอป
│       └── services/
│           ├── geminiService.ts    # จัดการการเรียก Gemini API (ฝั่ง Frontend, มี logic เลือกใช้ custom key หรือ backend)
│           └── appDataService.ts   # (ปัจจุบัน) จำลองการบันทึก/โหลดข้อมูล (เน้น LocalStorage)
├── backend/                    # (ทางเลือก) โค้ดส่วน Backend Express สำหรับจัดการ API Key และเรียก Gemini
│   ├── server.js
│   └── routes/
│       └── aiRoutes.js
├── functions/                  # (แนะนำ) โค้ด Firebase Functions สำหรับเป็น Backend API
│   └── src/
│       └── index.ts            # API endpoints สำหรับ Gemini
└── firebase.json               # การตั้งค่า Firebase Hosting และ Functions
```

## 📄 คำอธิบายไฟล์สำคัญ (Frontend)

*   **`index.html`**: หน้าเว็บหลัก โหลด CSS, JavaScript Libraries จาก CDN และสคริปต์หลักของแอป
*   **`index.tsx`**: จุดเริ่มต้นของ React Application ทำหน้าที่ Render คอมโพเนนต์หลัก `NoteTaskApp`
*   **`NoteTaskApp.tsx`**: **หัวใจของแอปพลิเคชัน** จัดการ State ส่วนใหญ่, UI Routing, และประกอบ UI ทั้งหมดเข้าด้วยกัน รวมถึงการเริ่มต้น Firebase
*   **`types.ts`**: กำหนดโครงสร้างข้อมูล (Interfaces และ Types)
*   **`frontend/src/constants.ts`**: เก็บค่าคงที่ต่างๆ ที่ใช้ในแอปพลิเคชัน
*   **`frontend/src/services/geminiService.ts`**: โค้ดส่วน Frontend ที่จัดการการเรียก Gemini API โดยสามารถใช้ Custom API Key ที่ผู้ใช้ป้อน หรือเรียกผ่าน Backend API (`/api/ai/...`) ซึ่งอาจเป็น Firebase Functions หรือ Express server
*   **`frontend/src/services/appDataService.ts`**: (ปัจจุบัน) เน้นการทำงานกับ LocalStorage สำหรับการบันทึกและโหลดข้อมูลแอป
*   **`build.js`**: สคริปต์ Node.js ที่ใช้ `esbuild` เพื่อแปลงโค้ด TypeScript/JSX เป็น JavaScript และเตรียมไฟล์สำหรับ Deploy ในโฟลเดอร์ `dist`
*   **`PublishingHubPage.tsx`**: หน้ารวมสำหรับการจัดการแม่แบบผู้ใช้, เอกสาร Longform, และการส่งออกผลงาน
*   **`TaskFocusPage.tsx`**: หน้าสำหรับจัดการงานและใช้งาน Pomodoro Timer
*   **`firebase.json`**: กำหนดค่าสำหรับ Firebase Hosting (เช่น rewrite rule ให้ `/api/**` ชี้ไปที่ Firebase Function `api`) และการ deploy Functions

## 🚀 ขั้นตอนการรันแอปพลิเคชัน (สำหรับนักพัฒนา)

แอปพลิเคชันนี้ถูกออกแบบมาให้ข้อมูลหลักถูกเก็บใน Local Storage ของเบราว์เซอร์ การเรียกใช้ AI Writer ผ่าน `/api/` จะถูกจัดการโดย Firebase Functions (ถ้า deploy ด้วย Firebase) หรือ Express backend (ถ้าตั้งค่าเอง) ผู้ใช้ยังสามารถป้อน Custom Gemini API Key ของตนเองได้ในหน้า Settings ซึ่งจะถูกใช้โดยตรงจาก Frontend หรือส่งไปให้ Backend

**สิ่งที่คุณต้องเตรียม:**

1.  **Node.js และ npm:** ตรวจสอบว่าติดตั้ง Node.js (เวอร์ชัน 18 ขึ้นไปแนะนำ) และ npm เรียบร้อยแล้ว
2.  **Firebase CLI (แนะนำ):** หากต้องการ Deploy ด้วย Firebase Hosting และ Functions ([ติดตั้ง Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli))
3.  **API Key ของ Google Gemini:** (จำเป็นสำหรับฟังก์ชัน AI) คุณต้องมี API Key จาก [Google AI Studio](https://aistudio.google.com/app/apikey)

**ขั้นตอนการ Build และรัน:**

1.  **Clone Repository (ถ้ามี):**
    ```bash
    git clone [your-repository-url]
    cd ashval-writer-suite
    ```

2.  **ติดตั้ง Dependencies:**
    เปิด Terminal ในโฟลเดอร์โปรเจกต์หลัก แล้วรัน:
    ```bash
    npm install
    ```
    หากคุณจะ Deploy Firebase Functions ให้ `cd functions` แล้วรัน `npm install` อีกครั้ง

3.  **ตั้งค่า Firebase (แนะนำสำหรับ Backend):**
    *   สร้างโปรเจกต์ใน [Firebase Console](https://console.firebase.google.com/)
    *   อัปเดต `firebaseConfig` ใน `NoteTaskApp.tsx` (ประมาณบรรทัดที่ 40) ด้วย Credentials ของโปรเจกต์ Firebase ของคุณ
    *   ตั้งค่า Environment Variable สำหรับ Gemini API Key ใน Firebase Functions:
        ```bash
        # cd เข้าไปในโฟลเดอร์ functions ก่อน (ถ้ายังไม่ได้อยู่)
        firebase functions:config:set gemini.apikey="YOUR_GEMINI_API_KEY"
        ```
        (โค้ดใน `functions/src/index.ts` จะอ่านค่านี้จาก `process.env.GEMINI_APIKEY`)
    *   (ทางเลือก) หากต้องการใช้ Express Backend แทน Firebase Functions:
        *   `cd backend`
        *   สร้างไฟล์ `.env` และใส่ `API_KEY=YOUR_GEMINI_API_KEY`
        *   รัน `npm start` หรือ `npm run dev`
        *   คุณอาจต้องปรับ `REACT_APP_BACKEND_API_URL` ใน `build.js` และ `firebase.json` (ถ้าไม่ใช้ Firebase Functions)

4.  **Build แอปพลิเคชัน Frontend:**
    รันคำสั่งจากโฟลเดอร์โปรเจกต์หลัก:
    ```bash
    npm run build:frontend
    ```
    คำสั่งนี้จะใช้ `esbuild` เพื่อสร้างไฟล์ที่จำเป็นทั้งหมดในโฟลเดอร์ `dist`

5.  **Deploy (แนะนำด้วย Firebase):**
    จากโฟลเดอร์โปรเจกต์หลัก:
    ```bash
    firebase deploy
    ```
    คำสั่งนี้จะ Deploy ทั้ง Hosting (ไฟล์จาก `dist`) และ Functions

6.  **เปิดแอปพลิเคชันในเบราว์เซอร์:**
    *   เข้าผ่าน URL ของ Firebase Hosting ที่ได้หลังจากการ Deploy
    *   หรือหากรัน Backend Server อื่นๆ ให้เข้าผ่าน URL ของ Server นั้น
    *   สำหรับการทดสอบ UI โดยไม่ใช้ AI หรือ Backend สามารถเปิดไฟล์ `dist/index.html` โดยตรงในเบราว์เซอร์ได้

## 💡 การใช้งานเบื้องต้น

1.  **แดชบอร์ด:** แสดงภาพรวมของโปรเจกต์และกิจกรรมล่าสุด
2.  **การจัดการโปรเจกต์:** สร้าง, เลือก, แก้ไข, เก็บถาวร, หรือลบโปรเจกต์ผ่านเมนู Project Selector (มุมบนกลาง) และหน้า "ตั้งค่า"
3.  **โน้ต/โครงเรื่อง/คลังข้อมูลโลก:** เข้าถึงผ่าน Sidebar เพื่อสร้างและจัดการข้อมูล
4.  **งาน & โฟกัส (Tasks & Focus):** รวมรายการงานและ Pomodoro Timer ในหน้าเดียว
5.  **สตูดิโอเผยแพร่ (Publishing Hub):** จัดการแม่แบบ, สร้างเอกสาร Longform, และส่งออกผลงาน
6.  **AI Writer:** เลือกโหมด AI, ป้อนคำสั่ง, และรับผลลัพธ์ (ตรวจสอบการตั้งค่า API Key)
7.  **เครื่องมือ:** ใช้พจนานุกรม, Graph View (เบื้องต้น)
8.  **ตั้งค่า:** ปรับแต่งธีม, รูปแบบตัวอักษร, การตั้งค่า AI, การแจ้งเตือน, จัดการโปรเจกต์ และดูแผนการพัฒนา

ขอให้สนุกกับการใช้ Ashval Writer's Suite นะครับ! หากมีคำถามหรือข้อเสนอแนะเพิ่มเติม แจ้งได้เลยครับ
```
  </change>
</changes>
```
The README.md has been updated to reflect the current application structure, features, Firebase integration, API key handling, and setup instructions. This includes details about new components like the Publishing Hub, Task Focus Page, Longform Document management, and the more flexible API key system. The file structure and setup instructions now also better reflect the use of Firebase Functions as a primary backend option.