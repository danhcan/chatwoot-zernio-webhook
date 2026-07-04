# Chatwoot + Zernio Webhook Integration

Webhook server để kết nối Chatwoot và Zernio, cho phép đồng bộ tin nhắn từ social media channels.

## Tính năng

- Nhận webhook từ Chatwoot khi có sự kiện mới (tin nhắn, conversation)
- Tự động post tin nhắn lên các social media platforms qua Zernio API
- Hỗ trợ Instagram, Facebook, Twitter, LinkedIn và các platforms khác

## Cài đặt

### 1. Clone và cài đặt dependencies

```bash
cd chatwoot-zernio-webhook
npm install
```

### 2. Cấu hình environment variables

Copy file `.env.example` thành `.env`:

```bash
cp .env.example .env
```

Chỉnh sửa `.env` và thêm API keys của bạn:

```env
PORT=3000
ZERNIO_API_KEY=your_actual_zernio_api_key
CHATWOOT_WEBHOOK_SECRET=your_webhook_secret
```

### 3. Lấy Zernio API Key

1. Đăng nhập vào [Zernio Dashboard](https://zernio.com/dashboard)
2. Vào phần API Settings
3. Copy API key của bạn

### 4. Chạy server

Development mode (auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server sẽ chạy tại `http://localhost:3000`

## Cấu hình Chatwoot Webhook

1. Đăng nhập vào Chatwoot admin panel
2. Vào **Settings** → **Integrations** → **Webhooks**
3. Thêm webhook mới với URL: `http://your-server:3000/webhook/chatwoot`
4. Chọn các events bạn muốn nhận:
   - `message_created`
   - `conversation_created`
   - `conversation_status_changed`
5. Save và test webhook

## API Endpoints

### `GET /health`
Health check endpoint để kiểm tra server status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-07-05T10:30:00.000Z"
}
```

### `POST /webhook/chatwoot`
Webhook endpoint để nhận events từ Chatwoot.

**Request body:** Chatwoot webhook payload

**Response:**
```json
{
  "success": true
}
```

## Cách hoạt động

1. Chatwoot gửi webhook khi có sự kiện mới (tin nhắn từ social media)
2. Server nhận và xử lý webhook
3. Server sử dụng Zernio API để post/reply lên social media platform tương ứng
4. Log được ghi lại để tracking

## Deploy lên Production

### Option 1: Railway

1. Tạo tài khoản tại [Railway.app](https://railway.app)
2. Connect GitHub repo
3. Deploy project
4. Thêm environment variables trong Railway dashboard
5. Copy public URL và cấu hình trong Chatwoot

### Option 2: Heroku

```bash
heroku create chatwoot-zernio-webhook
heroku config:set ZERNIO_API_KEY=your_key
git push heroku main
```

### Option 3: VPS (DigitalOcean, Linode)

```bash
# SSH vào server
git clone <your-repo>
cd chatwoot-zernio-webhook
npm install
npm install -g pm2

# Tạo .env file
nano .env

# Start với PM2
pm2 start src/index.js --name chatwoot-webhook
pm2 save
pm2 startup
```

## Troubleshooting

### Webhook không nhận được events
- Kiểm tra URL webhook trong Chatwoot có đúng không
- Verify server đang chạy: `curl http://localhost:3000/health`
- Check logs để xem có errors không

### Zernio API errors
- Verify API key đúng trong `.env`
- Check platform name có được hỗ trợ không
- Xem Zernio API docs tại https://zernio.com/docs

## License

MIT
