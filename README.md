# 📖 Catholic & Jesuit Academic Journal Reader

Dự án này là một ứng dụng web được thiết kế đặc biệt để đọc các tài liệu, báo cáo, và tập san học thuật liên quan đến thần học Công giáo và Dòng Tên. Ứng dụng tập trung vào trải nghiệm đọc (UI/UX), tối ưu hóa SEO, và tuân thủ chặt chẽ phong cách thiết kế mang tính học thuật.

## 🌟 Mục đích dự án

- **Trải nghiệm đọc tối ưu:** Mang lại trải nghiệm đọc không bị phân tâm, tương tự như đọc một tập san học thuật hoặc sách giấy.
- **Tính chính xác về thần học:** Sử dụng đúng ngôn ngữ và thuật ngữ Công giáo (ví dụ: "Thiên Chúa", "kinh nghiệm thiêng liêng", "tu sĩ Dòng Tên").
- **Thiết kế chuyên biệt (Niche Design):** Mang âm hưởng Công giáo/Dòng Tên cổ điển, trang trọng nhưng vẫn hiện đại, dễ tiếp cận trên mọi thiết bị.

## 🛠️ Tech Stack (Công nghệ sử dụng)

- **Framework:** Next.js 16.3.4 (App Router, Turbopack)
- **Ngôn ngữ:** TypeScript
- **Styling:** Tailwind CSS v4, `@tailwindcss/typography`
- **Xử lý nội dung:** `react-markdown`, Node.js `fs` (đọc markdown tĩnh ở thời điểm build - SSG)
- **Deployment:** Vercel (Khuyến nghị) / Static Export

## 🎨 Design System (Hệ thống thiết kế)

- **Màu nền (Background):** Parchment/Ivory (`#FAFAFA` hoặc `#F9F6F0`) - mang lại cảm giác giấy da cổ điển.
- **Màu chủ đạo (Primary):** Deep Burgundy/Crimson (`#722F37`) - đỏ tía trang trọng.
- **Màu điểm xuyết (Accent):** Gold/Brass (`#C5B358`) - màu vàng đồng.
- **Typography:**
  - Tiêu đề (Headings): **Playfair Display** (cổ điển, serif)
  - Nội dung (Body): **Lora** (dễ đọc, serif)
  - UI/Controls: **Inter** (hiện đại, sans-serif)

## ✨ Các tính năng nổi bật (Features)

1. **Thanh công cụ đọc (Reading Tools Speed Dial):** 
   - Hỗ trợ phóng to/thu nhỏ cỡ chữ (A-/A+) linh hoạt.
   - Chế độ sáng/tối (Dark/Light mode).
   - Nút In (Print) tích hợp.
2. **Mục lục động (Dynamic Table of Contents - TOC):**
   - Trên Desktop: Thanh điều hướng ghim bên trái màn hình, tự động highlight theo nội dung đang cuộn (Intersection Observer).
   - Trên Mobile: Drawer (ngăn kéo) vuốt từ cạnh màn hình, có xử lý khóa cuộn trang và hỗ trợ bàn phím (phím Escape), click ra ngoài để đóng.
3. **Thanh tiến trình (Reading Progress Bar):** Thanh chỉ báo thanh mảnh ở mép trên màn hình cho biết % bài viết đã đọc.
4. **Chia sẻ và Trích dẫn (Copy Anchor):** Các tiêu đề có chứa icon 🔗, cho phép người dùng click để copy link kèm theo hiệu ứng phản hồi (dấu tick ✅).
5. **Tối ưu hóa In ấn (Print Optimization):** CSS `@media print` được cấu hình đặc biệt để khi in hoặc xuất PDF, các thành phần UI (nút bấm, mục lục động) sẽ tự động bị ẩn, màu sắc chuyển về đen trắng tối ưu cho máy in, và loại bỏ Drop Cap để dàn trang chuẩn mực.
6. **Tối ưu SEO và Metadata:** Hỗ trợ chuẩn Open Graph (OG) với ảnh đại diện tùy chỉnh (IHS emblem), Schema Markup `ScholarlyArticle` chuẩn JSON-LD phục vụ Google Search.
7. **Thời gian đọc dự kiến (Reading Time):** Tự động tính toán thời gian đọc dựa trên số lượng từ trong nội dung bài viết.
8. **Chữ hoa đầu đoạn (Drop Cap):** Ký tự đầu tiên của bài viết được làm nổi bật tự động để tăng tính thẩm mỹ và học thuật.
9. **Chống chớp giao diện (FOUC Prevention):** Tích hợp script đồng bộ trước khi React hydrate để đảm bảo chế độ Sáng/Tối và cỡ chữ được áp dụng mượt mà, không bị chớp giật lúc tải trang.

## 🚀 Hướng dẫn cài đặt & Chạy dự án (Local Development)

### Yêu cầu hệ thống:
- Node.js (phiên bản 18.x trở lên)
- npm (hoặc pnpm/yarn)

### Các bước thực hiện:

1. **Clone repository (nếu có):**
   ```bash
   git clone <your-repo-url>
   cd app-build
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy server phát triển (Development):**
   ```bash
   npm run dev
   ```
   Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem kết quả. Mọi thay đổi trong code sẽ được hot-reload (Turbopack).

4. **Biên dịch và chạy thử bản Production:**
   ```bash
   npm run build
   npm run start
   ```

## 📂 Cấu trúc thư mục chính

- `content/report.md`: Chứa nội dung chính của bài báo cáo/bài viết dưới định dạng Markdown.
- `src/app/layout.tsx`: Root Layout cấu hình SEO, Font chữ và FOUC Script.
- `src/app/page.tsx`: Component Server chính đảm nhận đọc file Markdown, tính thời gian đọc, và bóc tách tiêu đề.
- `src/components/`: Chứa toàn bộ các Client Component tương tác (TOC, ReadingTools, CopyAnchor, v.v.).
- `src/app/globals.css`: File CSS toàn cục chứa biến màu, Tailwind directives và các rule tùy chỉnh (đặc biệt là in ấn).
- `public/`: Chứa các tài nguyên tĩnh như hình ảnh OG (`og-image.png`).
